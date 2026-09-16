import {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  VerticalAlign, convertMillimetersToTwip, ImageRun,
  Footer, PageNumber
} from "docx";
import { saveAs } from "file-saver";
import type { ReportData } from "../types/report";
import { image1Base64, image2Base64, image3Base64 } from "./imageData";

const THIN_BORDER = { style: BorderStyle.SINGLE, size: 6, color: "000000" };
const NO_BORDER  = { style: BorderStyle.NONE,   size: 0, color: "auto"   };
const ALL_BORDERS = { top: THIN_BORDER, bottom: THIN_BORDER, left: THIN_BORDER, right: THIN_BORDER };
const NO_BORDERS  = { top: NO_BORDER,  bottom: NO_BORDER,  left: NO_BORDER,  right: NO_BORDER  };

const MARGIN = convertMillimetersToTwip(20);

function dots(n = 50) { return '.'.repeat(n); }

// Decode bundled base64 image data to Uint8Array for docx embedding
function base64ToUint8Array(base64: string): Uint8Array {
  const clean = base64.replace(/^data:image\/[a-z]+;base64,/, "");
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function makeImageRun(data: Uint8Array, widthPx: number, heightPx: number) {
  return new ImageRun({
    data,
    transformation: { width: widthPx, height: heightPx },
    type: "png",
  });
}

function cell(
  text: string,
  opts: {
    bold?: boolean;
    colSpan?: number;
    borders?: typeof ALL_BORDERS;
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
    shade?: string;
    vAlign?: any;
    width?: number;
    isHeader?: boolean;
  } = {}
) {
  return new TableCell({
    width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    columnSpan: opts.colSpan,
    shading: opts.shade ? { fill: opts.shade } : undefined,
    borders: opts.borders ?? ALL_BORDERS,
    verticalAlign: opts.vAlign ?? VerticalAlign.CENTER,
    margins: { top: 120, bottom: 120, left: 120, right: 120 },
    children: [
      new Paragraph({
        alignment: opts.align ?? AlignmentType.LEFT,
        children: [new TextRun({ text, bold: opts.bold ?? false, size: 20 })],
      }),
    ],
  });
}

function hdrRow(texts: string[]) {
  return new TableRow({
    tableHeader: true,
    // No background shading — clean white header row matching reference image
    children: texts.map(t => cell(t, { bold: true })),
  });
}

function dataRow(texts: string[]) {
  return new TableRow({ children: texts.map(t => cell(t)) });
}

function forensicTable(samples: ReportData["forensicSamples"], steps: string[]) {
  const rows = samples.filter(s => steps.includes(s.step));
  
  const headers = ["Steps", "Evidence Material", "Collected (Y) / Not Collected (N)", "Reason for not collecting"];
  const widths = [15, 35, 25, 25];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((t, i) => cell(t, { bold: true, width: widths[i] })),
      }),
      ...(rows.length ? rows : [{ step: "", material: "", collected: false, reason: "" }]).map(s =>
        new TableRow({
          children: [
            cell(s.step, { width: widths[0] }),
            cell(s.material, { width: widths[1] }),
            cell(s.collected ? "Y" : "N", { width: widths[2] }),
            cell(s.reason, { width: widths[3] })
          ]
        })
      ),
    ],
  });
}

function run(text: string, opts: { bold?: boolean; italics?: boolean; size?: number } = {}) {
  return new TextRun({ text, bold: opts.bold, italics: opts.italics, size: opts.size ?? 20 });
}

function para(runs: TextRun[], spacing?: { before?: number; after?: number }) {
  return new Paragraph({ children: runs, spacing: { before: spacing?.before ?? 80, after: spacing?.after ?? 80 } });
}

function secHeader(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22 })],
    spacing: { before: 200, after: 80 },
  });
}

function sp(before = 80, after = 80) {
  return new Paragraph({ text: "", spacing: { before, after } });
}

// Legend entries shown in the body map chart
const LEGEND_TEXTS = [
  "AB Abrasion", "ER Erythema (redness)", "OI Other Injury (describe)",
  "ALS Alternate Light Source", "F/H Fiber/Hair", "PE Petechiae",
  "BI Bite", "FB Foreign Body", "PS Potential Saliva",
  "BU Burn", "IN Induration", "SHX Sample Per History",
  "DE Debris", "IW Incised Wound", "SI Suction Injury",
  "DF Deformity", "LA Laceration", "SW Swelling",
  "DS Dry Secretion", "MS Moist Secretion", "TB Toluidine Blue",
  "EC Ecchymosis (bruise)", "OF Other Foreign Material (describe)",
  "TE Tenderness", "V/S Vegetation/Soil",
];

/** Returns [chartTable, injuryBoxTable] matching the reference image layout:
 *  - Legend (NO border) on the left
 *  - Body image (NO border) on the right, with RIGHT/LEFT/ANTERIOR/POSTERIOR labels below
 *  - Full-width bordered "NO INJURIES" box below with tall bottom padding
 */
function bodyImageParts(
  imgData: Uint8Array,
  wPx: number,
  hPx: number,
  topCaption: string,
  marks: ReportData["bodyMapMarks"],
  noInjuryText: string,
  showDirectionLabels = false
): [Table, Table] {

  // Build children for the image cell (no border)
  const imageCellChildren: Paragraph[] = [];

  // Top caption (e.g. "RIGHT        LEFT" for genital chart)
  if (topCaption) {
    imageCellChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: topCaption, bold: true, size: 18, font: "Times New Roman" })],
        spacing: { before: 60, after: 60 },
      })
    );
  }

  imageCellChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [makeImageRun(imgData, wPx, hPx)],
      spacing: { after: showDirectionLabels ? 40 : 0 },
    })
  );

  // Body map direction labels below the image:
  //   RIGHT    LEFT    LEFT    RIGHT
  //   ANTERIOR         POSTERIOR
  if (showDirectionLabels) {
    imageCellChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "RIGHT", bold: true, size: 16, font: "Times New Roman" }),
          new TextRun({ text: "         LEFT    LEFT         ", size: 16, font: "Times New Roman" }),
          new TextRun({ text: "RIGHT", bold: true, size: 16, font: "Times New Roman" }),
        ],
        spacing: { before: 0, after: 20 },
      })
    );
    imageCellChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "ANTERIOR", bold: true, size: 16, font: "Times New Roman" }),
          new TextRun({ text: "                         ", size: 16, font: "Times New Roman" }),
          new TextRun({ text: "POSTERIOR", bold: true, size: 16, font: "Times New Roman" }),
        ],
        spacing: { before: 0, after: 60 },
      })
    );
  }

  // Two-column table:  legend (NO border)  |  image (NO border)
  const chartTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          // ── Legend — NO border, plain text
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            borders: NO_BORDERS,
            children: [
              new Paragraph({
                children: [new TextRun({ text: "LEGEND: TYPES OF FINDINGS", bold: true, size: 16 })],
                spacing: { after: 60 },
              }),
              ...LEGEND_TEXTS.map(t =>
                new Paragraph({
                  children: [new TextRun({ text: t, size: 14 })],
                  spacing: { before: 0, after: 20 },
                })
              ),
            ],
          }),
          // ── Image — NO border (matches reference images)
          new TableCell({
            width: { size: 70, type: WidthType.PERCENTAGE },
            borders: NO_BORDERS,
            children: imageCellChildren,
          }),
        ],
      }),
    ],
  });

  // Full-width bordered box below — "NO INJURIES DETECTED…" with tall bottom padding
  const injuryBoxTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: ALL_BORDERS,
            margins: { top: 140, bottom: 1800, left: 140, right: 140 },
            children:
              marks.length === 0
                ? [new Paragraph({ children: [new TextRun({ text: noInjuryText, bold: true, size: 20 })] })]
                : [
                    new Paragraph({ children: [new TextRun({ text: "Findings detected:", bold: true, size: 20 })] }),
                    ...marks.map(m =>
                      new Paragraph({
                        children: [new TextRun({ text: `• ${m.type}: ${m.description}`, size: 20 })],
                        spacing: { after: 40 },
                      })
                    ),
                  ],
          }),
        ],
      }),
    ],
  });

  return [chartTable, injuryBoxTable];
}

export const exportToWord = async (data: ReportData) => {
  const { caseParticulars: cas, accusedParticulars: acc, identificationMarks: id,
    history: hist, clothingInfo, marksOfViolence: mov, generalConfiguration: gen,
    axillaryHair, beardMustache, pubicHair,
    genitalTable: gt, penis: pen, scrotum: scr, diseaseInjury: dis,
    bodyMapMarks, forensicSamples: smp,
    opinion: opin, doctorDetails: doc_det } = data;

  // Decode the three body map images directly from bundled data (no 404/network issues)
  const img1 = base64ToUint8Array(image1Base64);
  const img2 = base64ToUint8Array(image2Base64);
  const img3 = base64ToUint8Array(image3Base64);


  const doc = new Document({
    styles: { default: { document: { run: { font: "Times New Roman", size: 20 } } } },
    sections: [{
      properties: {
        page: { margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  children: [PageNumber.CURRENT],
                  size: 18,
                  font: "Times New Roman",
                }),
              ],
            }),
          ],
        }),
      },
      children: [

        // ── Title ──────────────────────────────────────────────────────────
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "MEDICO-LEGAL EXAMINATION OF ACCUSED OF SEXUAL VIOLENCE", bold: true, size: 26 })],
          spacing: { after: 240 },
        }),

        // ── 1. Case Particulars ────────────────────────────────────────────
        secHeader("1. Case Particulars:"),
        para([
          run("Requisition from: ", { bold: true }), run(cas.requisitionFrom || dots(15)),
          run("   vide letter No: ", { bold: true }), run(cas.letterNo || dots(10)),
          run("   dated ", { bold: true }), run(cas.letterDate || dots(10)),
          run("   for examination of: "), run(cas.examinationOf || dots(20)),
        ]),
        para([run("Brought and identified by: ", { bold: true }), run(cas.broughtBy || dots(40))]),

        // ── 2. Accused Particulars ─────────────────────────────────────────
        secHeader("2. Particulars of the alleged accused:"),
        para([run("i. Name: ", { bold: true }), run(acc.name || dots(20)), run("   S/o ", { bold: true }), run(acc.fatherName || dots(15))]),
        para([run("ii. Address: ", { bold: true }), run(acc.address || dots(50))]),
        para([
          run("iii. Age: ", { bold: true }), run(acc.age || dots(8)),
          run("   iv. Occupation: ", { bold: true }), run(acc.occupation || dots(12)),
          run("   v. Religion: ", { bold: true }), run(acc.religion || dots(12)),
        ]),
        para([run("vi. Consent given in writing: ", { bold: true }), run(acc.consentGiven ? "YES" : "NO")]),
        para([run(acc.consentText || "Consent has been given voluntarily in writing in presence of witnesses.")], { before: 40, after: 100 }),

        // ── 3. Examined in presence of ─────────────────────────────────────
        para([run("3. Examined in presence of", { bold: true }), run(dots(80))]),
        para([run("    Place of Examination: - ", { bold: true }), run(acc.placeOfExamination || "Dept of FM&T, SCB MCH, KATAKA")]),
        para([run("    Date and Time of Examination: - ", { bold: true }), run(acc.dateTimeOfExamination || dots(25))]),

        // ── LTI / RTI / PHOTO (Image 2 style: centered horizontally & vertically) ──
        sp(80, 80),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: { top: THIN_BORDER, bottom: THIN_BORDER, left: THIN_BORDER, right: THIN_BORDER, insideVertical: THIN_BORDER, insideHorizontal: NO_BORDER },
          rows: [
            new TableRow({
              children: ["CLEAR LTI", "CLEAR RTI", "PHOTO"].map(label =>
                new TableCell({
                  width: { size: 33.33, type: WidthType.PERCENTAGE },
                  borders: { top: THIN_BORDER, bottom: THIN_BORDER, left: THIN_BORDER, right: THIN_BORDER },
                  verticalAlign: VerticalAlign.CENTER,
                  margins: { top: 1200, bottom: 1200, left: 150, right: 150 },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: label, size: 20 })] })],
                })
              ),
            }),
          ],
        }),
        sp(80, 80),

        // ── 4. Marks of Identification ─────────────────────────────────────
        secHeader("4. Marks of Identification:"),
        para([run("(1) "), run(id.mark1 || dots(80))]),
        para([run("(2) "), run(id.mark2 || dots(80))]),

        // ── Brief History ──────────────────────────────────────────────────
        secHeader("Brief History:"),
        para([run("i. As given by police: ", { bold: true })], { before: 80, after: 0 }),
        para([run(hist.policeHistory || "AS PER INQUEST .")], { before: 0, after: 120 }),

        para([run("ii. As given by alleged accused:", { bold: true })], { before: 80, after: 80 }),
        para([run("    a. If he admits or denies the incidence (Account of incidence as per his statement)")]),
        para([run(hist.statement || dots(80))], { before: 0, after: 240 }),

        para([run("    b. Did he know the victim before: "), run(hist.knowsVictim || "NO")]),
        para([run("    c. If any injury is present on the body of the accused, then to see, if it could be due to struggle and resistance by the victim: "), run(hist.struggleInjury || "NO")], { before: 0, after: 240 }),

        para([run("    d. If his clothing's show any evidence of lipstick, stains of blood, foreign hair, mud, grass, vaginal stains, if so, his explanation about the same: "), run(hist.clothingEvidence || "NO")], { before: 80, after: 240 }),

        para([run("    e. If his clothing show evidence of recent tear, loss of button, any loose foreign pubic hair, his explanation about it: "), run(hist.clothingRecentTear || "NO")], { before: 80, after: 240 }),

        para([run("    f. Any history of S.T.D before: "), run(hist.stdHistory || "YES/NO")], { before: 80, after: 0 }),
        para([run("    g. Did he take bath, wash etc. after the alleged incidence: "), run(hist.tookBath || "YES")], { before: 0, after: 0 }),
        para([run("    h. Has he changed clothes after the incidence: "), run(hist.changedClothes || "YES")], { before: 0, after: 240 }),

        // ── 5. Physical Examination ────────────────────────────────────────
        secHeader("5. Physical examination"),
        para([run("i. Clothing: If same was worn during the incidence look for presence of blood stains, semen, vaginal stain, female pubis hair, mud, grass, lipstick, any tear etc. and describe: "), run(clothingInfo || "NO")], { before: 80, after: 240 }),
        
        para([run("ii. Marks of violence if any (Tick mark if present and describe):", { bold: true })], { before: 80, after: 0 }),
        para([run("    [ ] Bite marks: "), run(mov.biteMarks || "ABSENT")], { before: 0, after: 0 }),
        para([run("    [ ] Abrasions: "), run(mov.abrasions || "ABSENT")], { before: 0, after: 0 }),
        para([run("    [ ] Contusions: "), run(mov.contusions || "ABSENT")], { before: 0, after: 0 }),
        para([run("    [ ] Any other: "), run(mov.other || "ABSENT")], { before: 0, after: 240 }),

        para([run("iii. General Configuration:", { bold: true })], { before: 80, after: 0 }),
        para([
          run("    Height   "), run(gen.height || dots(10)),
          run("            Weight   "), run(gen.weight || dots(10)),
          run("            Body Built   "), run(gen.bodyBuilt || dots(15)),
          run("            Blood Pressure: "), run(gen.bloodPressure || "122/90mmhg"),
        ], { before: 0, after: 0 }),
        para([
          run("    Pulse: "), run(gen.pulse || "96 b/min"),
          run("                           Mental status : "), run(gen.mentalStatus || "SOUND MIND"),
        ], { before: 0, after: 240 }),

        para([run("iv. Axillary hair: ", { bold: true }), run(axillaryHair || "ADULT TYPE")], { before: 80, after: 0 }),
        para([run("v. Beard & Mustaches: ", { bold: true }), run(beardMustache || "PRESENT AND ADULT TYPE")], { before: 0, after: 0 }),
        para([run("vi. Pubic hair (including tanner staging): ", { bold: true }), run(pubicHair || "ADULT TYPE, TANNER STAGE IV.")], { before: 0, after: 0 }),
        para([run("    (If matted preserve clipping for forensic examination)")], { before: 0, after: 240 }),

        // Dentition – render each jaw row dynamically
        para([run("vii. Dentition: (Encircle the teeth not erupted)", { bold: true })], { before: 80, after: 80 }),

        // Helper to build a jaw row: not-erupted teeth appear as (n), erupted as plain n
        ...(() => {
          const toothNums = [8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8];

          const buildJawRuns = (jawArr: boolean[]): TextRun[] => {
            const runs: TextRun[] = [];
            toothNums.forEach((num, idx) => {
              if (idx === 8) {
                runs.push(new TextRun({ text: "  |  ", size: 18, font: "Courier New" }));
              }
              const erupted = jawArr[idx];
              if (erupted) {
                runs.push(new TextRun({ text: ` ${num} `, size: 18, font: "Courier New" }));
              } else {
                // Circled / encircled = wrap in underline + bold to visually distinguish
                runs.push(new TextRun({ text: `(${num})`, size: 18, font: "Courier New", bold: true, underline: {} }));
              }
            });
            return runs;
          };

          return [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: buildJawRuns(data.dentition.upperJaw),
              spacing: { before: 0, after: 0 },
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "---------------------------------------------------------------------", size: 18, font: "Courier New" })],
              spacing: { before: 0, after: 0 },
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: buildJawRuns(data.dentition.lowerJaw),
              spacing: { before: 0, after: 160 },
            }),
          ];
        })(),

        para([
          run("Total no: ", { bold: true }), run(data.dentition.totalPermanent || "........."),
          run("   Permanent: ", { bold: true }), run(data.dentition.totalPermanent || "........."),
          run("   Temporary: ", { bold: true }), run(data.dentition.totalTemporary || "............"),
          run("   Artificial, if any: ", { bold: true }), run(data.dentition.artificial || ".............."),
        ], { before: 80, after: 0 }),
        para([
          run("Spacing behind 2nd permanent molar: ", { bold: true }), run(data.dentition.spacingBehind2ndMolar || "....................................................................")
        ], { before: 0, after: 240 }),

        // Genital
        secHeader("viii. Genital Examination:"),
        para([run("a. (Y = Yes, N = No, DNK = Do Not Know)")]),
        new Table({
          width: { size: 65, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [
              cell("", { bold: true }),
              cell("Pubic region", { bold: true, align: AlignmentType.CENTER }),
              cell("Thigh and adjoining part", { bold: true, align: AlignmentType.CENTER }),
            ]}),
            new TableRow({ children: [cell("Matted hair"), cell(gt.mattedHairPubic, { align: AlignmentType.CENTER }), cell(gt.mattedHairThigh, { align: AlignmentType.CENTER })] }),
            new TableRow({ children: [cell("Seminal stain"), cell(gt.seminalStainPubic, { align: AlignmentType.CENTER }), cell(gt.seminalStainThigh, { align: AlignmentType.CENTER })] }),
            new TableRow({ children: [cell("Blood"), cell(gt.bloodPubic, { align: AlignmentType.CENTER }), cell(gt.bloodThigh, { align: AlignmentType.CENTER })] }),
            new TableRow({ children: [cell("Loose hair"), cell(gt.looseHairPubic, { align: AlignmentType.CENTER }), cell(gt.looseHairThigh, { align: AlignmentType.CENTER })] }),
            new TableRow({ children: [cell("Injuries"), cell(gt.injuriesPubic, { align: AlignmentType.CENTER }), cell(gt.injuriesThigh, { align: AlignmentType.CENTER })] }),
          ],
        }),

        sp(120, 60),
        para([run("b. Penis:", { bold: true })]),
        new Table({
          width: { size: 65, type: WidthType.PERCENTAGE },
          rows: [
            hdrRow(["Parameter", "Remark"]),
            dataRow(["Development (Tanner Stage)", pen.development]),
            dataRow(["Any defect", pen.defect]),
            dataRow(["Deformity", pen.deformity]),
            dataRow(["Flaccid Length & Girth", pen.flaccidLengthGirth]),
            dataRow(["Erect Length & Girth", pen.erectLengthGirth]),
            dataRow(["Glans & Frenulum", pen.glansFrenulum]),
            dataRow(["Foreskin (Roll Up)", pen.foreskinRoll]),
            dataRow(["Frenulum Injury", pen.frenulumInjury]),
            dataRow(["Other Injury", pen.otherInjury]),
            dataRow(["Evidence of STD", pen.stdEvidence]),
            dataRow(["Smegma", pen.smegma]),
            dataRow(["Prepucal Hair", pen.prepucalHair]),
            dataRow(["Nearby Stains", pen.nearbyStains]),
          ],
        }),
        para([run("Any Other Remark: "), run(pen.otherRemarks || dots(60))]),

        sp(120, 60),
        para([run("c. Scrotum and testes", { bold: true })]),
        new Table({
          width: { size: 65, type: WidthType.PERCENTAGE },
          rows: [
            hdrRow(["Parameter", "Remark"]),
            dataRow(["Development (Tanner Stage)", scr.development]),
            dataRow(["Enlargement", scr.enlargement]),
            dataRow(["Both testes descended", scr.testesDescended]),
            dataRow(["Disease", scr.disease]),
            dataRow(["Injury", scr.injury]),
            dataRow(["Cremasteric Reflex", scr.cremastericReflex]),
          ],
        }),
        para([run("Any Other Remark: "), run(scr.otherRemarks || dots(60))]),

        sp(120, 60),
        para([run("d. Disease/Injury: (Y = Yes, N = No, DNK = Do Not Know, EO = Emission Occurred)", { bold: true })]),
        new Table({
          width: { size: 55, type: WidthType.PERCENTAGE },
          rows: [
            hdrRow(["", "Any Disease/Injury"]),
            dataRow(["Vas deference", dis.vasDeferens]),
            dataRow(["Epididymis", dis.epididymis]),
            dataRow(["Prostate", dis.prostate]),
            dataRow(["On the genital", dis.onGenital]),
            dataRow(["Anywhere on the body", dis.anywhereOnBody]),
          ],
        }),

        // ── Body Map Charts ────────────────────────────────────────────────
        ...(() => {
          const [apChart, apBox] = bodyImageParts(
            img1, 320, 400, "",
            bodyMapMarks.filter(m => m.view === "anterior_posterior"),
            "NO INJURIES DETECTED IN THE ANTERIOR AND POSTERIOR PART OF BODY.",
            true
          );
          const [liChart, liBox] = bodyImageParts(
            img2, 320, 400, "",
            bodyMapMarks.filter(m => m.view === "lateral_inner"),
            "NO INJURIES DETECTED IN THE LATERAL AND INNER VIEWS.",
            false
          );
          // Genital chart: top caption shows RIGHT / LEFT column headers
          const [gChart, gBox] = bodyImageParts(
            img3, 260, 340, "RIGHT                              LEFT",
            bodyMapMarks.filter(m => m.view === "genital"),
            "NO INJURIES DETECTED IN THE ABOVE DETAILED REGIONAL VIEWS.",
            false
          );
          return [
            // ── Page break + centered title for Body Map (Anterior/Posterior)
            new Paragraph({ text: "", pageBreakBefore: true }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "BODY MAP CHART – ANTERIOR AND POSTERIOR VIEW", bold: true, size: 22 })],
              spacing: { before: 0, after: 120 },
            }),
            apChart,
            sp(60, 60),
            apBox,

            // ── Page break + centered title for Body Map (Lateral/Inner)
            new Paragraph({ text: "", pageBreakBefore: true }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "BODY MAP CHART – LATERAL & INNER VIEWS (RIGHT & LEFT LEGS/BODY)", bold: true, size: 22 })],
              spacing: { before: 0, after: 120 },
            }),
            liChart,
            sp(60, 60),
            liBox,

            // ── Page break + centered title for Genital Map
            new Paragraph({ text: "", pageBreakBefore: true }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "GENITAL MAP CHART - DETAILED REGIONAL VIEWS (RIGHT & LEFT)", bold: true, size: 22 })],
              spacing: { before: 0, after: 120 },
            }),
            gChart,
            sp(60, 60),
            gBox,
          ];
        })(),

        // ── 6. Forensic Samples ────────────────────────────────────────────
        new Paragraph({ text: "", pageBreakBefore: true }),
        secHeader("6. Collection of Samples for Forensic Analysis:"),
        para([run("a. Clothing (envelope labeled step 1A and 1B):")]),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            hdrRow(["Steps", "Evidence Material", "Collected (Y) / Not Collected (N)", "Reason for not collecting"]),
            ...smp.filter(s => s.step === "1").map(s => dataRow([s.step, s.material, s.collected ? "Y" : "N", s.reason])),
          ],
        }),
        sp(80, 40), para([run("b. Collection of Hair Sample (In envelope labeled step 2A, 2B and 2C)")]),
        forensicTable(smp, ["2A", "2B", "2C"]),
        sp(80, 40), para([run("c. Collection of Loose foreign pubic hair or fiber of clothing (step 3)")]),
        forensicTable(smp, ["3A", "3B"]),
        sp(80, 40), para([run("d. Collection of Swabs for semen, blood, mud, grass etc on body (step 4)")]),
        forensicTable(smp, ["4A", "4B", "4C", "4D"]),
        sp(80, 40), para([run("e. Urethral swabs and smears and Scrotal Swabs and smears (step 5)")]),
        forensicTable(smp, ["5A", "5B", "5C"]),
        sp(80, 40), para([run("f. Penile swabs and smears and Penile washings for vaginal epithelia (step 6)")]),
        forensicTable(smp, ["6A", "6B"]),
        sp(80, 40), para([run("g. Nail Cuttings and scrapings (step 7)")]),
        forensicTable(smp, ["7 A", "7 B"]),
        sp(80, 40), para([run("h. Swabs from buccal mucosa (step 8)")]),
        forensicTable(smp, ["8"]),
        sp(80, 40), para([run("i. Blood Collection (step 9)")]),
        forensicTable(smp, ["9A", "9B"]),

        sp(120, 60),
        para([run("7. X-ray for age estimation (if needed): ", { bold: true }), run("NOT APPLICABLE.")]),
        sp(60, 40),
        para([run("8. Tests advised for potency / impotency (Wherever required)", { bold: true })]),
        para([run("   1. Blood Sample Collection (EDTA) for following tests:")], { before: 40, after: 20 }),
        para([run("      • GTT (Glucose Tolerance Test)   • Serum Electrolytes   • Serum Creatinine")], { before: 10, after: 10 }),
        para([run("      • Liver Function Tests (LFT)   • Full Blood Count, Hemogram, Esr, Hb")], { before: 10, after: 10 }),
        para([run("      • Serum Prolactin Level   • Thyroid Function Test   • Serum Testosterone   • SHBG")], { before: 10, after: 20 }),
        para([run("   2. Accused referred for special investigation for confirmation of potency (if required):")], { before: 40, after: 20 }),
        para([run("      • Nocturnal Penile Tumescence (NPT)   • Cavernosography   • PIPE Test")], { before: 10, after: 10 }),
        para([run("      • Doppler Studies   • Pudendal Arteriography   • Pharmacocavernosometry")], { before: 10, after: 40 }),

        // ── Opinion ────────────────────────────────────────────────────────
        sp(140, 60),
        secHeader("Opinion: (May be given as format attached as Appendix A)"),
        para([run("1. " + opin.sexualCapability)]),
        para([run("2. " + opin.bodilyInjuries)]),
        para([run("3. " + opin.wearingApparel)]),
        para([run("4. " + opin.recentSexualAct)]),
        para([run("5. " + opin.urethralSwab)]),
        para([run("6. " + opin.forensicSamples)]),

        // ── Signature Block ────────────────────────────────────────────────
        sp(250, 40),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: NO_BORDERS,
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: NO_BORDERS,
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  children: [
                    new Paragraph({ children: [run("Station: " + (doc_det.station || "KATAKA"))] }),
                    new Paragraph({ children: [run("Date: " + (doc_det.date || dots(15)))] }),
                    new Paragraph({ children: [run("Time: " + (doc_det.time || dots(15)))] }),
                  ],
                }),
                new TableCell({
                  borders: NO_BORDERS,
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  children: [
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [run("Signature " + dots(30))] }),
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [run("Name: " + (doc_det.name || dots(20)))] }),
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [run("Reg. No: " + (doc_det.regNo || dots(15)))] }),
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [run("Designation: " + (doc_det.designation || dots(20)))] }),
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [run("Official seal")] }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  const safeName = (acc.name || "report").replace(/[^a-z0-9]/gi, "_").toLowerCase();
  saveAs(blob, `MLC_Accused_${safeName}.docx`);
};

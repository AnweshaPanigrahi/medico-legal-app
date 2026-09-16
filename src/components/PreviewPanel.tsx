import React, { useRef, useEffect, useState } from 'react';
import type { ReportData } from '../types/report';
import { exportToWord } from '../utils/exportToWord';
import { image1Base64, image2Base64, image3Base64 } from '../utils/imageData';

interface PreviewPanelProps {
  data: ReportData;
}

const A4_WIDTH_PX = 794; // A4 at 96 DPI

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ data }) => {
  const teethNumbersLeft = [8, 7, 6, 5, 4, 3, 2, 1];
  const teethNumbersRight = [1, 2, 3, 4, 5, 6, 7, 8];
  const panelRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const availableWidth = entry.contentRect.width - 32; // 16px padding each side
        const newScale = Math.min(1, availableWidth / A4_WIDTH_PX);
        setScale(newScale > 0 ? newScale : 1);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleBeforePrint = () => {
      document.title = '';
    };
    const handleAfterPrint = () => {
      document.title = 'Clinical Exam Hub - Medico-Legal Accused Examination';
    };
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = '';
    window.print();
    setTimeout(() => {
      document.title = originalTitle || 'Clinical Exam Hub - Medico-Legal Accused Examination';
    }, 1000);
  };

  const renderVerticalLegend = () => (
    <div style={{ width: '195px', fontSize: '8pt', lineHeight: '1.35', flexShrink: 0, paddingRight: '8px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', fontSize: '8.5pt' }}>
        LEGEND: TYPES OF FINDINGS
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <div>AB Abrasion</div>
        <div>ER Erythema (redness)</div>
        <div>OI Other Injury (describe)</div>
        <div>ALS Alternate Light Source</div>
        <div>F/H Fiber/Hair</div>
        <div>PE Petechiae</div>
        <div>BI Bite</div>
        <div>FB Foreign Body</div>
        <div>PS Potential Saliva</div>
        <div>BU Burn</div>
        <div>IN Induration</div>
        <div>SHX Sample Per History</div>
        <div>DE Debris</div>
        <div>IW Incised Wound</div>
        <div>SI Suction Injury</div>
        <div>DF Deformity</div>
        <div>LA Laceration</div>
        <div>SW Swelling</div>
        <div>DS Dry Secretion</div>
        <div>MS Moist Secretion</div>
        <div>TB Toluidine Blue</div>
        <div>EC Ecchymosis (bruise)</div>
        <div>OF Other Foreign Material (describe)</div>
        <div>TE Tenderness</div>
        <div>V/S Vegetation/Soil</div>
      </div>
    </div>
  );

  const renderPrintDiagram = (view: 'anterior_posterior' | 'lateral_inner' | 'genital') => {
    const marks = data.bodyMapMarks.filter(m => m.view === view);

    switch (view) {
      case 'anterior_posterior':
        return (
          <div style={{ flex: 1, borderLeft: '1px solid #000', borderRight: '1px solid #000', padding: '8px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={`data:image/png;base64,${image1Base64}`}
                alt="Body Map - Anterior and Posterior View"
                style={{ maxHeight: '420px', maxWidth: '100%', display: 'block', margin: '0 auto' }}
              />
              {marks.map(mark => (
                <div
                  key={mark.id}
                  style={{
                    position: 'absolute',
                    left: `${mark.x}%`,
                    top: `${mark.y}%`,
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '8px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'translate(-50%, -50%)',
                    border: '1.5px solid white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.6)',
                    WebkitPrintColorAdjust: 'exact',
                    colorAdjust: 'exact',
                  }}
                  title={`${mark.type}: ${mark.description}`}
                >
                  {mark.type}
                </div>
              ))}
            </div>
            <div style={{ width: '100%', maxWidth: '340px', marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '9pt' }}>
                <span>RIGHT</span>
                <span>LEFT</span>
                <span>LEFT</span>
                <span>RIGHT</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '9pt', marginTop: '2px' }}>
                <span style={{ flex: 1, textAlign: 'center' }}>ANTERIOR</span>
                <span style={{ flex: 1, textAlign: 'center' }}>POSTERIOR</span>
              </div>
            </div>
          </div>
        );
      case 'lateral_inner':
        return (
          <div style={{ flex: 1, borderLeft: '1px solid #000', borderRight: '1px solid #000', padding: '8px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={`data:image/png;base64,${image2Base64}`}
                alt="Body Map - Lateral & Inner Views"
                style={{ maxHeight: '430px', maxWidth: '100%', display: 'block', margin: '0 auto' }}
              />
              {marks.map(mark => (
                <div
                  key={mark.id}
                  style={{
                    position: 'absolute',
                    left: `${mark.x}%`,
                    top: `${mark.y}%`,
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '8px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'translate(-50%, -50%)',
                    border: '1.5px solid white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.6)',
                    WebkitPrintColorAdjust: 'exact',
                    colorAdjust: 'exact',
                  }}
                  title={`${mark.type}: ${mark.description}`}
                >
                  {mark.type}
                </div>
              ))}
            </div>
          </div>
        );
      case 'genital':
        return (
          <div style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={`data:image/png;base64,${image3Base64}`}
                alt="Genital Map Chart - Detailed Regional Views"
                style={{ maxHeight: '440px', maxWidth: '100%', display: 'block', margin: '0 auto' }}
              />
              {marks.map(mark => (
                <div
                  key={mark.id}
                  style={{
                    position: 'absolute',
                    left: `${mark.x}%`,
                    top: `${mark.y}%`,
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '8px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'translate(-50%, -50%)',
                    border: '1.5px solid white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.6)',
                    WebkitPrintColorAdjust: 'exact',
                    colorAdjust: 'exact',
                  }}
                  title={`${mark.type}: ${mark.description}`}
                >
                  {mark.type}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  const renderPrintTeethRow = (array: boolean[]) => {
    const leftPart = teethNumbersLeft.map((num, i) => {
      const isErupted = array[i];
      return (
        <span
          key={`print-left-${num}`}
          className={`dentition-tooth ${isErupted ? 'erupted' : 'not-erupted'}`}
          style={!isErupted ? {
            border: '1.5px solid black',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '18px',
            height: '18px',
            margin: '0 2px'
          } : { margin: '0 4px', width: '18px', display: 'inline-block', textAlign: 'center' }}
        >
          {num}
        </span>
      );
    });

    const rightPart = teethNumbersRight.map((num, i) => {
      const isErupted = array[i + 8];
      return (
        <span
          key={`print-right-${num}`}
          className={`dentition-tooth ${isErupted ? 'erupted' : 'not-erupted'}`}
          style={!isErupted ? {
            border: '1.5px solid black',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '18px',
            height: '18px',
            margin: '0 2px'
          } : { margin: '0 4px', width: '18px', display: 'inline-block', textAlign: 'center' }}
        >
          {num}
        </span>
      );
    });

    return (
      <div className="dentition-row" style={{ display: 'flex', alignItems: 'center' }}>
        {leftPart}
        <span style={{ margin: '0 8px', fontWeight: 'bold' }}>|</span>
        {rightPart}
      </div>
    );
  };

  const pMap = data.bodyMapMarks;

  // Helper: render a forensic sub-table given step prefixes
  const renderForensicSubTable = (stepPrefixes: string[]) => {
    const rows = data.forensicSamples.filter(s => stepPrefixes.includes(s.step));
    if (rows.length === 0) return null;
    return (
      <table className="report-table" style={{ fontSize: '8.5pt', marginTop: '6px', marginBottom: '10px' }}>
        <thead>
          <tr>
            <th style={{ width: '8%' }}>Steps</th>
            <th style={{ width: '50%' }}>Evidence Material</th>
            <th style={{ width: '18%' }}>Collected (Y) / Not Collected (N)</th>
            <th>Reason for not collecting</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((sample) => (
            <tr key={sample.step}>
              <td>{sample.step}</td>
              <td>{sample.material}</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {sample.collected ? 'Y' : 'N'}
              </td>
              <td>{sample.collected ? '' : sample.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const scalerRef = useRef<HTMLDivElement>(null);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = scalerRef.current;
    if (!el) return;
    const updateHeight = () => {
      if (el) {
        setScaledHeight(el.offsetHeight * scale);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [scale]);

  // Scale the wrapper to fit the available panel width
  const wrapperStyle: React.CSSProperties = {
    transform: `scale(${scale})`,
    transformOrigin: 'top center',
    width: `${A4_WIDTH_PX}px`,
  };

  const outerContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: scaledHeight ? `${scaledHeight}px` : 'auto',
    overflow: 'hidden',
  };

  return (
    <div className="preview-panel" ref={panelRef}>
      <div className="preview-controls">
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          📄 Report Preview (A4 Layout)
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={() => exportToWord(data)}>
            Download Word
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            Print or Save PDF
          </button>
        </div>
      </div>

      <div className="preview-outer-container" style={outerContainerStyle}>
        <div ref={scalerRef} className="preview-pages-wrapper preview-scaler" style={wrapperStyle}>

        {/* PAGE 1 */}
        <div className="report-paper">
          <div className="report-page-header">
            MEDICO-LEGAL EXAMINATION OF ACCUSED OF SEXUAL VIOLENCE
          </div>

          <div className="report-section">
            <div className="report-section-title">1. Case Particulars:</div>
            <div className="data-row">
              <span className="data-label">Requisition from.</span>
              <span className="data-value">{data.caseParticulars.requisitionFrom}</span>
              <span className="data-label" style={{ marginLeft: '12px' }}>vide letter. No.</span>
              <span className="data-value" style={{ maxWidth: '130px' }}>{data.caseParticulars.letterNo}</span>
              <span className="data-label" style={{ marginLeft: '12px' }}>.dated</span>
              <span className="data-value" style={{ maxWidth: '120px' }}>{data.caseParticulars.letterDate}</span>
            </div>
            <div className="data-row">
              <span className="data-label">for examination of</span>
              <span className="data-value">{data.caseParticulars.examinationOf}</span>
            </div>
            <div className="data-row">
              <span className="data-label">brought and identified by .</span>
              <span className="data-value">{data.caseParticulars.broughtBy}</span>
            </div>
          </div>

          <div className="report-section">
            <div className="report-section-title">2. Particulars of the alleged accused:</div>
            <div className="data-row">
              <span className="data-label">i. Name.</span>
              <span className="data-value">{data.accusedParticulars.name}</span>
              <span className="data-label" style={{ marginLeft: '10px' }}>.S/o</span>
              <span className="data-value">{data.accusedParticulars.fatherName}</span>
            </div>
            <div className="data-row">
              <span className="data-label">ii. Address</span>
              <span className="data-value">{data.accusedParticulars.address}</span>
            </div>
            <div className="data-row">
              <span className="data-label">iii. Age as stated</span>
              <span className="data-value">{data.accusedParticulars.age}</span>
              <span className="data-label" style={{ marginLeft: '15px' }}>iv. Occupation.</span>
              <span className="data-value">{data.accusedParticulars.occupation}</span>
            </div>
            <div className="data-row">
              <span className="data-label">v. Religion:</span>
              <span className="data-value">{data.accusedParticulars.religion}</span>
            </div>
            <div className="data-row">
              <span className="data-label">vi. Consent given in writing:</span>
              <span className="data-value">
                {data.accusedParticulars.consentGiven ? 'YES' : 'NO'}
              </span>
            </div>
            {data.accusedParticulars.consentText && (
              <div style={{ borderTop: '1px dotted black', borderBottom: '1px dotted black', padding: '4px 0', marginTop: '4px', fontSize: '9.5pt' }}>
                {data.accusedParticulars.consentText}
              </div>
            )}
          </div>

          <div className="report-section">
            <div className="data-row" style={{ alignItems: 'baseline' }}>
              <span className="data-label" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>3. Examined in presence of.....................................................................................................................................</span>
              <span className="data-value" style={{ display: 'none' }}>{data.accusedParticulars.examinedPresenceOf}</span>
            </div>
            {data.accusedParticulars.examinedPresenceOf && (
              <div style={{ fontStyle: 'italic', paddingLeft: '24px', fontSize: '9pt', color: '#333' }}>
                ({data.accusedParticulars.examinedPresenceOf})
              </div>
            )}
            <div style={{ paddingLeft: '40px', marginTop: '8px' }}>
              <div style={{ fontSize: '10pt', lineHeight: '1.6' }}>
                Place of Examination: - {data.accusedParticulars.placeOfExamination || 'Dept of FM&T, SCB MCH, KATAKA'}
              </div>
              <div style={{ fontSize: '10pt', lineHeight: '1.6' }}>
                Date and Time of Examination: - {data.accusedParticulars.dateTimeOfExamination ? data.accusedParticulars.dateTimeOfExamination : '.................................................'}
              </div>
            </div>

            {/* LTI / RTI / PHOTO - inline matching Image 2 */}
            <div style={{ margin: '14px 0 16px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #777', tableLayout: 'fixed' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '33.33%', height: '140px', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #777', fontSize: '11pt', letterSpacing: '0.5px' }}>
                      CLEAR LTI
                    </td>
                    <td style={{ width: '33.33%', height: '140px', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #777', fontSize: '11pt', letterSpacing: '0.5px' }}>
                      CLEAR RTI
                    </td>
                    <td style={{ width: '33.33%', height: '140px', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #777', fontSize: '11pt', letterSpacing: '0.5px' }}>
                      PHOTO
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <div className="report-section">
            <div className="report-section-title">4. Marks of Identification:</div>
            <div className="data-row">
              <span className="data-label">(1)</span>
              <span className="data-value">{data.identificationMarks.mark1 ? data.identificationMarks.mark1 : '.................................................................................................................................'}</span>
            </div>
            <div className="data-row">
              <span className="data-label">(2)</span>
              <span className="data-value">{data.identificationMarks.mark2 ? data.identificationMarks.mark2 : '.................................................................................................................................'}</span>
            </div>
          </div>

        </div>

        {/* PAGE 2 */}
        <div className="report-paper page-break">
          <div className="report-section">
            <div className="report-section-title">Brief History:</div>
            <div className="data-row">
              <span className="data-label">i. As given by police:</span>
              <span className="data-value">{data.history.policeHistory}</span>
            </div>
            <div style={{ fontWeight: 'bold', margin: '5px 0' }}>ii. As given by alleged accused:</div>
            <div className="data-row" style={{ paddingLeft: '15px' }}>
              <span className="data-label">a. If he admits or denies the incidence (Account of incidence as per his statement)</span>
              <span className="data-value" style={{ width: '100%', minHeight: '40px', marginTop: '5px' }}>{data.history.statement}</span>
            </div>
            <div className="data-row" style={{ paddingLeft: '15px', marginTop: '5px' }}>
              <span className="data-label">b. Did he know the victim before:</span>
              <span className="data-value">{data.history.knowsVictim}</span>
            </div>
            <div className="data-row" style={{ paddingLeft: '15px' }}>
              <span className="data-label">c. If any injury is present on the body of the accused, then to see, if it could be due to struggle and resistance by the victim:</span>
              <span className="data-value">{data.history.struggleInjury}</span>
            </div>
            <div className="data-row" style={{ paddingLeft: '15px' }}>
              <span className="data-label">d. If his clothing's show any evidence of lipstick, stains of blood, foreign hair, mud, grass, vaginal stains, if so, his explanation about the same:</span>
              <span className="data-value">{data.history.clothingEvidence}</span>
            </div>
            <div className="data-row" style={{ paddingLeft: '15px' }}>
              <span className="data-label">e. If his clothing show evidence of recent tear, loss of button, any loose foreign pubic hair, his explanation about it:</span>
              <span className="data-value">{data.history.clothingRecentTear}</span>
            </div>
            <div className="data-row" style={{ paddingLeft: '15px' }}>
              <span className="data-label">f. Any history of S.T.D before:</span>
              <span className="data-value">{data.history.stdHistory}</span>
            </div>
            <div className="data-row" style={{ paddingLeft: '15px' }}>
              <span className="data-label">g. Did he take bath, wash etc. after the alleged incidence:</span>
              <span className="data-value">{data.history.tookBath}</span>
            </div>
            <div className="data-row" style={{ paddingLeft: '15px' }}>
              <span className="data-label">h. Has he changed clothes after the incidence:</span>
              <span className="data-value">{data.history.changedClothes}</span>
            </div>
          </div>

          <div className="report-section">
            <div className="report-section-title">5. Physical examination</div>
            <div className="data-row">
              <span className="data-label">i. Clothing: If same was worn during the incidence look for presence of blood stains, semen, vaginal stain, female pubis hair, mud, grass, lipstick, any tear etc. and describe:</span>
              <span className="data-value" style={{ width: '100%', minHeight: '30px', marginTop: '5px' }}>{data.clothingInfo}</span>
            </div>

            <div style={{ marginTop: '10px' }}>
              <span className="data-label" style={{ fontWeight: 'bold' }}>ii. Marks of violence if any (Tick mark if present and describe):</span>
              <div style={{ paddingLeft: '15px', marginTop: '5px' }}>
                <div className="data-row">
                  <span className="data-label">[ {data.marksOfViolence.biteMarks !== 'ABSENT' ? 'X' : ' '} ] Bite marks:</span>
                  <span className="data-value">{data.marksOfViolence.biteMarks}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">[ {data.marksOfViolence.abrasions !== 'ABSENT' ? 'X' : ' '} ] Abrasions:</span>
                  <span className="data-value">{data.marksOfViolence.abrasions}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">[ {data.marksOfViolence.contusions !== 'ABSENT' ? 'X' : ' '} ] Contusions:</span>
                  <span className="data-value">{data.marksOfViolence.contusions}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">[ {data.marksOfViolence.other !== 'ABSENT' ? 'X' : ' '} ] Any other:</span>
                  <span className="data-value">{data.marksOfViolence.other}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '15px' }}>
              <span className="data-label" style={{ fontWeight: 'bold' }}>iii. General Configuration:</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginTop: '5px' }}>
                <div className="data-row">
                  <span className="data-label">Height:</span>
                  <span className="data-value">{data.generalConfiguration.height}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">Weight:</span>
                  <span className="data-value">{data.generalConfiguration.weight}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">Body Built:</span>
                  <span className="data-value">{data.generalConfiguration.bodyBuilt}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px', marginTop: '5px' }}>
                <div className="data-row">
                  <span className="data-label">Blood Pressure:</span>
                  <span className="data-value">{data.generalConfiguration.bloodPressure}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">Pulse:</span>
                  <span className="data-value">{data.generalConfiguration.pulse}</span>
                </div>
              </div>
              <div className="data-row" style={{ marginTop: '5px' }}>
                <span className="data-label">Mental status :</span>
                <span className="data-value">{data.generalConfiguration.mentalStatus}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
              <div className="data-row">
                <span className="data-label">iv. Axillary hair:</span>
                <span className="data-value">{data.axillaryHair}</span>
              </div>
              <div className="data-row">
                <span className="data-label">v. Beard &amp; Mustaches:</span>
                <span className="data-value">{data.beardMustache}</span>
              </div>
            </div>
            <div className="data-row" style={{ marginTop: '5px' }}>
              <span className="data-label">vi. Pubic hair (including tanner staging):</span>
              <span className="data-value">{data.pubicHair}</span>
            </div>

            <div style={{ marginTop: '15px' }}>
              <span className="data-label" style={{ fontWeight: 'bold' }}>vii. Dentition: (Encircle the teeth not erupted)</span>
              <div className="dentition-preview-chart" style={{ border: '1px solid black', padding: '12px', borderRadius: '4px', maxWidth: '400px', margin: '8px auto' }}>
                {renderPrintTeethRow(data.dentition.upperJaw)}
                <div style={{ borderTop: '1px solid black', width: '90%', margin: '4px 0' }} />
                {renderPrintTeethRow(data.dentition.lowerJaw)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '10px' }}>
                <div className="data-row">
                  <span className="data-label">Total no:</span>
                  <span className="data-value" />
                </div>
                <div className="data-row">
                  <span className="data-label">Permanent:</span>
                  <span className="data-value">{data.dentition.totalPermanent}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">Temporary:</span>
                  <span className="data-value">{data.dentition.totalTemporary}</span>
                </div>
              </div>
              <div className="data-row" style={{ marginTop: '5px' }}>
                <span className="data-label">Artificial, if any:</span>
                <span className="data-value">{data.dentition.artificial}</span>
              </div>
              <div className="data-row">
                <span className="data-label">Spacing behind 2nd permanent molar:</span>
                <span className="data-value">{data.dentition.spacingBehind2ndMolar}</span>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <span className="data-label" style={{ fontWeight: 'bold' }}>viii. Genital Examination:</span>
              <div style={{ fontSize: '9pt', marginTop: '5px' }}>a. (Indicate as Y = Yes, N = No, DNK = Do Not Know)</div>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Pubic region</th>
                    <th>Thigh and adjoining part</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Matted hair</td>
                    <td>{data.genitalTable.mattedHairPubic}</td>
                    <td>{data.genitalTable.mattedHairThigh}</td>
                  </tr>
                  <tr>
                    <td>Seminal stain</td>
                    <td>{data.genitalTable.seminalStainPubic}</td>
                    <td>{data.genitalTable.seminalStainThigh}</td>
                  </tr>
                  <tr>
                    <td>Blood</td>
                    <td>{data.genitalTable.bloodPubic}</td>
                    <td>{data.genitalTable.bloodThigh}</td>
                  </tr>
                  <tr>
                    <td>Loose foreign hair</td>
                    <td>{data.genitalTable.looseHairPubic}</td>
                    <td>{data.genitalTable.looseHairThigh}</td>
                  </tr>
                  <tr>
                    <td>Injuries</td>
                    <td>{data.genitalTable.injuriesPubic}</td>
                    <td>{data.genitalTable.injuriesThigh}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PAGE 3 */}
        <div className="report-paper page-break">
          <div className="report-section">
            <span className="data-label" style={{ fontWeight: 'bold' }}>b. Penis:</span>
            <table className="report-table">
              <thead>
                <tr>
                  <th style={{ width: '55%' }}>Parameter</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Development (Tanner Shape)</td><td>{data.penis.development}</td></tr>
                <tr><td>Any defect</td><td>{data.penis.defect}</td></tr>
                <tr><td>Deformity</td><td>{data.penis.deformity}</td></tr>
                <tr><td>Length and Girth of penis in flaccid condition</td><td>{data.penis.flaccidLengthGirth}</td></tr>
                <tr><td>Length and Girth of penis in erect condition</td><td>{data.penis.erectLengthGirth}</td></tr>
                <tr><td>Glans penis and frenulum</td><td>{data.penis.glansFrenulum}</td></tr>
                <tr><td>Whether foreskin can be freely rolled up or is circumcised</td><td>{data.penis.foreskinRoll}</td></tr>
                <tr><td>Any injury on the frenulum</td><td>{data.penis.frenulumInjury}</td></tr>
                <tr><td>Any injury elsewhere on the organ</td><td>{data.penis.otherInjury}</td></tr>
                <tr><td>Evidence of any disease e.g. STD</td><td>{data.penis.stdEvidence}</td></tr>
                <tr><td>Presence of smegma under the foreskin</td><td>{data.penis.smegma}</td></tr>
                <tr><td>Hair under prepuce</td><td>{data.penis.prepucalHair}</td></tr>
                <tr><td>Any stains nearby</td><td>{data.penis.nearbyStains}</td></tr>
              </tbody>
            </table>
            <div className="data-row">
              <span className="data-label">Any Other Remark</span>
              <span className="data-value">{data.penis.otherRemarks}</span>
            </div>
          </div>

          <div className="report-section" style={{ marginTop: '15px' }}>
            <span className="data-label" style={{ fontWeight: 'bold' }}>c. Scrotum and testes:</span>
            <table className="report-table">
              <thead>
                <tr>
                  <th style={{ width: '55%' }}>Parameter</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Development (Tanner Stage)</td><td>{data.scrotum.development}</td></tr>
                <tr><td>Enlargement</td><td>{data.scrotum.enlargement}</td></tr>
                <tr><td>Both testes descended or not</td><td>{data.scrotum.testesDescended}</td></tr>
                <tr><td>Any disease</td><td>{data.scrotum.disease}</td></tr>
                <tr><td>Any injury</td><td>{data.scrotum.injury}</td></tr>
                <tr><td>Cremasteric Reflex</td><td>{data.scrotum.cremastericReflex}</td></tr>
              </tbody>
            </table>
            <div className="data-row">
              <span className="data-label">Any Other Remark</span>
              <span className="data-value">{data.scrotum.otherRemarks}</span>
            </div>
          </div>

          <div className="report-section" style={{ marginTop: '15px' }}>
            <span className="data-label" style={{ fontWeight: 'bold' }}>d. Details regarding any Disease/Injury: (Indicate as Y = Yes, N = No, DNK = Do Not Know, EO = Evidence Occurred)</span>
            <table className="report-table" style={{ marginTop: '8px' }}>
              <thead>
                <tr>
                  <th style={{ width: '55%' }}>&nbsp;</th>
                  <th>Any Disease/Injury</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Vas deference</td><td>{data.diseaseInjury.vasDeferens}</td></tr>
                <tr><td>Epididymis</td><td>{data.diseaseInjury.epididymis}</td></tr>
                <tr><td>Prostate</td><td>{data.diseaseInjury.prostate}</td></tr>
                <tr><td>On the genital</td><td>{data.diseaseInjury.onGenital}</td></tr>
                <tr><td>Anywhere on the body</td><td>{data.diseaseInjury.anywhereOnBody}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGE 4 - Body Map Anterior and Posterior */}
        <div className="report-paper page-break">
          <div className="report-section">
            <div className="report-section-title" style={{ textAlign: 'center', fontSize: '11pt', fontWeight: 'bold', marginBottom: '14px', letterSpacing: '0.5px' }}>
              BODY MAP CHART – ANTERIOR AND POSTERIOR VIEW
            </div>
            <div style={{ display: 'flex', alignItems: 'stretch', minHeight: '480px' }}>
              {renderVerticalLegend()}
              {renderPrintDiagram('anterior_posterior')}
            </div>
            <div style={{ border: '1px solid black', padding: '8px 12px', minHeight: '42px', marginTop: '12px' }}>
              {pMap.filter(m => m.view === 'anterior_posterior').length === 0 ? (
                <div style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '9.5pt' }}>
                  NO INJURIES DETECTED IN THE ANTERIOR AND POSTERIOR PART OF BODY.
                </div>
              ) : (
                <div style={{ textAlign: 'left', fontWeight: 'normal', fontSize: '9.5pt' }}>
                  <span style={{ fontWeight: 'bold' }}>Findings detected:</span>
                  <ol style={{ marginLeft: '20px', marginTop: '4px' }}>
                    {pMap.filter(m => m.view === 'anterior_posterior').map(m => (
                      <li key={m.id}>
                        <strong>{m.type}</strong> - {m.description} (Loc: X:{m.x}%, Y:{m.y}%)
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PAGE 5 - Body Map Lateral & Inner Views */}
        <div className="report-paper page-break">
          <div className="report-section">
            <div className="report-section-title" style={{ textAlign: 'center', fontSize: '11pt', fontWeight: 'bold', marginBottom: '14px', letterSpacing: '0.5px' }}>
              BODY MAP CHART - LATERAL &amp; INNER VIEWS (RIGHT &amp; LEFT LEGS/BODY)
            </div>
            <div style={{ display: 'flex', alignItems: 'stretch', minHeight: '480px' }}>
              {/* No legend on lateral/inner page – matches original Word format */}
              {renderPrintDiagram('lateral_inner')}
            </div>
            <div style={{ border: '1px solid black', padding: '8px 12px', minHeight: '42px', marginTop: '12px' }}>
              {pMap.filter(m => m.view === 'lateral_inner').length === 0 ? (
                <div style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '9.5pt' }}>
                  NO INJURIES DETECTED
                </div>
              ) : (
                <div style={{ textAlign: 'left', fontWeight: 'normal', fontSize: '9.5pt' }}>
                  <span style={{ fontWeight: 'bold' }}>Findings detected:</span>
                  <ol style={{ marginLeft: '20px', marginTop: '4px' }}>
                    {pMap.filter(m => m.view === 'lateral_inner').map(m => (
                      <li key={m.id}>
                        <strong>{m.type}</strong> - {m.description} (Loc: X:{m.x}%, Y:{m.y}%)
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PAGE 6 - Genital Map */}
        <div className="report-paper page-break">
          <div className="report-section">
            <div style={{ display: 'flex', alignItems: 'stretch', minHeight: '480px' }}>
              {renderPrintDiagram('genital')}
            </div>
            <div style={{ border: '1px solid black', padding: '8px 12px', minHeight: '42px', marginTop: '12px' }}>
              {pMap.filter(m => m.view === 'genital').length === 0 ? (
                <div style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '9.5pt' }}>
                  NO INJURIES DETECTED IN THE ABOVE DETAILED REGIONAL VIEWS.
                </div>
              ) : (
                <div style={{ textAlign: 'left', fontWeight: 'normal', fontSize: '9.5pt' }}>
                  <span style={{ fontWeight: 'bold' }}>Findings detected:</span>
                  <ol style={{ marginLeft: '20px', marginTop: '4px' }}>
                    {pMap.filter(m => m.view === 'genital').map(m => (
                      <li key={m.id}>
                        <strong>{m.type}</strong> - {m.description} (Loc: X:{m.x}%, Y:{m.y}%)
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PAGE 6 - Forensic Samples */}
        <div className="report-paper page-break">
          <div className="report-section">
            <div className="report-section-title">6. Collection of Samples for Forensic Analysis:</div>
            <div style={{ fontSize: '9.5pt' }}>
              <strong>a. Clothing, where available</strong> – (Each garment to be wrapped separately and packed in paper bags after air drying – in envelope labeled step 1A and 1B)
              <div className="data-row" style={{ marginTop: '4px' }}>
                <span className="data-value" style={{ minHeight: '20px' }}>
                  {data.forensicSamples.find(s => s.step === '1')?.reason || 'NOT PRODUCED'}
                </span>
              </div>
            </div>

            <div style={{ fontSize: '9.5pt', marginTop: '12px' }}>
              <strong>b. Collection of Hair Sample</strong> (In envelope labeled step 2A, 2B and 2C)
            </div>
            {renderForensicSubTable(['2A', '2B', '2C'])}

            <div style={{ fontSize: '9.5pt', marginTop: '6px' }}>
              <strong>c. Collection of Loose foreign pubic hair or fiber of clothing</strong>, if present on the body or under the clothing of accused (In envelope labeled step 3)
            </div>
            {renderForensicSubTable(['3A', '3B'])}

            <div style={{ fontSize: '9.5pt', marginTop: '6px' }}>
              <strong>d. Collection of Swabs for semen, blood, mud, grass etc on body</strong> (In envelope labeled step 4)
            </div>
            {renderForensicSubTable(['4A', '4B', '4C', '4D'])}

            <div style={{ fontSize: '9.5pt', marginTop: '6px' }}>
              <strong>e. Collection of Urethral swabs and smears and Scrotal Swabs and smears</strong> (In envelope labeled step 5) (for detection of seminal content, gonococci etc., DNA testing, STD, etc.)
            </div>
            {renderForensicSubTable(['5A', '5B', '5C'])}

            <div style={{ fontSize: '9.5pt', marginTop: '6px' }}>
              <strong>f. Collection of Penile swabs and smears and Penile washings examined for vaginal epithelia</strong> (In envelope labeled step 6)
            </div>
            {renderForensicSubTable(['6A', '6B'])}

            <div style={{ fontSize: '9.5pt', marginTop: '6px' }}>
              <strong>g. Collection of Nail Cuttings and scrapings</strong> (In envelope labeled step 7)
            </div>
            {renderForensicSubTable(['7 A', '7 B'])}

            <div style={{ fontSize: '9.5pt', marginTop: '6px' }}>
              <strong>h. Collection of Swabs from buccal mucosa</strong> (In envelope labeled step 8)
            </div>
            {renderForensicSubTable(['8'])}

            <div style={{ fontSize: '9.5pt', marginTop: '6px' }}>
              <strong>i. Blood Collection</strong> (In envelope labeled step 9)
            </div>
            {renderForensicSubTable(['9A', '9B'])}
          </div>
        </div>

        {/* PAGE 7 - Potency Tests & Opinion */}
        {/* PAGE 7 - Potency Tests & Opinion */}
        <div className="report-paper page-break" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="report-section" style={{ marginBottom: '8px' }}>
            <div className="data-row">
              <span className="data-label" style={{ fontWeight: 'bold' }}>7. X-ray for age estimation (if needed) :</span>
              <span className="data-value">NOT APPLICABLE.</span>
            </div>
          </div>

          <div className="report-section" style={{ marginBottom: '8px' }}>
            <div className="report-section-title">8. Tests advised for potency / impotency (Wherever required)</div>

            {data.potencyTests.isApplicable ? (
              <div style={{ fontSize: '9pt' }}>
                <div style={{ fontWeight: 'bold' }}>1. Blood Sample Collection (EDTA) for following tests:</div>
                <div style={{ marginLeft: '12px', marginTop: '3px', fontSize: '8.5pt' }}>
                  {data.potencyTests.bloodTests.map(t => (
                    <div key={t}>• {t}</div>
                  ))}
                </div>
                <div style={{ fontWeight: 'bold', marginTop: '6px' }}>2. Accused referred for special investigation for confirmation of potency (if required):</div>
                <div style={{ marginLeft: '12px', marginTop: '3px', fontSize: '8.5pt' }}>
                  {data.potencyTests.specialInvestigations.map(t => (
                    <div key={t}>• {t}</div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '9pt', marginTop: '4px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>1. Blood Sample Collection (EDTA) for following tests:</div>
                  <div style={{ marginLeft: '12px', fontSize: '8.5pt' }}>
                    <div>• GTT (Glucose Tolerance Test)</div>
                    <div>• Serum Electrolytes</div>
                    <div>• Serum Creatinine</div>
                    <div>• Liver Function Tests (LFT)</div>
                    <div>• Full Blood Count, Hemogram, Esr, Hb</div>
                    <div>• Serum Prolactin Level</div>
                    <div>• Thyroid Function Test</div>
                    <div>• Serum Testosterone</div>
                    <div>• Sex Hormone Binding Globulin (SHBG)</div>
                  </div>
                  <div style={{ fontWeight: 'bold', marginTop: '6px', marginBottom: '3px' }}>2. Accused referred for special investigation for confirmation of potency (if required):</div>
                  <div style={{ marginLeft: '12px', fontSize: '8.5pt' }}>
                    <div>• Nocturnal Penile Tumescence (NPT)</div>
                    <div>• Cavernosography</div>
                    <div>• Pharmacologically Induced Penile Erection (PIPE) Test</div>
                    <div>• Doppler Studies</div>
                    <div>• Pudendal Arteriography</div>
                    <div>• Pharmacocavernosometry</div>
                  </div>
                </div>
                <div className="potency-warning-block" style={{ margin: '6px 0', fontSize: '10.5pt' }}>
                  THE ABOVE-MENTIONED TEST IS NOT APPLICABLE.
                </div>
              </>
            )}
          </div>
        </div>

        {/* PAGE 8 - Opinion */}
        <div className="report-paper page-break">
          <div className="report-section" style={{ marginBottom: '8px' }}>
            <div className="report-section-title">Opinion: (May be given as format attached as Appendix A)</div>
            <div style={{ paddingLeft: '5px', marginTop: '4px', fontSize: '9.5pt', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div className="opinion-paragraph">
                <span className="opinion-num">1.</span>
                {data.opinion.sexualCapability || 'From examination of the physical & mental development & mental status, there was nothing detected to suggest that the accused is not capable of sexual intercourse.'}
              </div>
              <div className="opinion-paragraph">
                <span className="opinion-num">2.</span>
                {data.opinion.bodilyInjuries || 'No bodily injuries could be detected on the person of the accused.'}
              </div>
              <div className="opinion-paragraph">
                <span className="opinion-num">3.</span>
                {data.opinion.wearingApparel || 'The wearing apparels of the time of the alleged incident were not produced and the wearing apparels of the time of examination do not reveal any physical clue relating to sexual offence.'}
              </div>
              <div className="opinion-paragraph">
                <span className="opinion-num">4.</span>
                {data.opinion.recentSexualAct || 'There were no physical findings on the body of the subject suggestive of a recent sexual act, however, possibility of the same could not be ruled out completely.'}
              </div>
              <div className="opinion-paragraph">
                <span className="opinion-num">5.</span>
                {data.opinion.urethralSwab || 'Urethral swab & smear has been preserved and handed over to accompanying police for onward transmission to SBPL, Cuttack and the report not yet received.'}
              </div>
              <div className="opinion-paragraph">
                <span className="opinion-num">6.</span>
                {data.opinion.forensicSamples || 'Air dried soaked salivary gauze and plucked pubic hair has been preserved and handed over to accompanying police constable in packed & sealed condition for onward transmission to SFSL, BBSR for grouping & cross matching.'}
              </div>
            </div>
          </div>

          <div className="signature-block" style={{ marginTop: 'auto', paddingTop: '8px', breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <div>
              <div className="data-row" style={{ width: '220px' }}>
                <span className="data-label">Station:</span>
                <span className="data-value">{data.doctorDetails.station}</span>
              </div>
              <div className="data-row" style={{ width: '220px', marginTop: '4px' }}>
                <span className="data-label">Date:</span>
                <span className="data-value">{data.doctorDetails.date}</span>
              </div>
              <div className="data-row" style={{ width: '220px', marginTop: '4px' }}>
                <span className="data-label">Time:</span>
                <span className="data-value">{data.doctorDetails.time}</span>
              </div>
            </div>

            <div className="signature-right">
              <div>Signature ......................................................</div>
              <div className="data-row" style={{ marginTop: '4px' }}>
                <span className="data-label">Name:</span>
                <span className="data-value" style={{ fontWeight: 'bold' }}>{data.doctorDetails.name}</span>
              </div>
              <div className="data-row">
                <span className="data-label">Reg. No:</span>
                <span className="data-value">{data.doctorDetails.regNo}</span>
              </div>
              <div className="data-row">
                <span className="data-label">Designation:</span>
                <span className="data-value" style={{ fontSize: '9pt' }}>{data.doctorDetails.designation}</span>
              </div>
              <div style={{ marginTop: '6px', height: '42px', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8.5pt', color: '#000', fontWeight: 'bold' }}>
                Official seal
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
};

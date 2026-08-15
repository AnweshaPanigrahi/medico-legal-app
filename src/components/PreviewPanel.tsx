import React, { useRef, useEffect, useState } from 'react';
import type { ReportData } from '../types/report';

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

  const handlePrint = () => {
    window.print();
  };

  const renderPrintSvg = (view: 'anterior_posterior' | 'lateral_inner' | 'genital') => {
    const marks = data.bodyMapMarks.filter(m => m.view === view);

    switch (view) {
      case 'anterior_posterior':
        return (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0', position: 'relative', height: '180px' }}>
            <svg viewBox="0 0 200 100" style={{ height: '100%', width: 'auto', border: '1px solid #ccc' }}>
              <g transform="translate(10, 0)">
                <text x="40" y="8" fill="black" fontSize="5" fontWeight="bold" textAnchor="middle">ANTERIOR VIEW</text>
                <circle cx="40" cy="18" r="7" fill="none" stroke="black" strokeWidth="1" />
                <path d="M 37,25 L 37,30 M 43,25 L 43,30" stroke="black" strokeWidth="1" />
                <path d="M 28,33 Q 32,30 40,30 Q 48,30 52,33 L 56,60 Q 57,63 54,63 L 50,62 L 48,38 L 47,80 L 41,80 L 41,50 L 39,50 L 39,80 L 33,80 L 32,38 L 30,62 L 26,63 Q 23,63 24,60 Z" fill="none" stroke="black" strokeWidth="1" />
                <path d="M 33,80 L 31,95 L 34,95 Z" fill="none" stroke="black" strokeWidth="1" />
                <path d="M 47,80 L 49,95 L 46,95 Z" fill="none" stroke="black" strokeWidth="1" />
              </g>
              <g transform="translate(110, 0)">
                <text x="40" y="8" fill="black" fontSize="5" fontWeight="bold" textAnchor="middle">POSTERIOR VIEW</text>
                <circle cx="40" cy="18" r="7" fill="none" stroke="black" strokeWidth="1" />
                <path d="M 37,25 L 37,30 M 43,25 L 43,30" stroke="black" strokeWidth="1" />
                <path d="M 40,30 L 40,58" stroke="black" strokeWidth="0.5" strokeDasharray="1" />
                <path d="M 28,33 Q 32,30 40,30 Q 48,30 52,33 L 56,60 Q 57,63 54,63 L 50,62 L 48,38 L 47,80 L 41,80 L 41,50 L 39,50 L 39,80 L 33,80 L 32,38 L 30,62 L 26,63 Q 23,63 24,60 Z" fill="none" stroke="black" strokeWidth="1" />
                <path d="M 33,80 L 31,95 L 34,95 Z" fill="none" stroke="black" strokeWidth="1" />
                <path d="M 47,80 L 49,95 L 46,95 Z" fill="none" stroke="black" strokeWidth="1" />
              </g>
            </svg>
            {marks.map(mark => (
              <div
                key={mark.id}
                style={{
                  position: 'absolute',
                  left: `calc(50% - 180px + ${mark.x * 3.6}px)`,
                  top: `${mark.y * 1.8}px`,
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '14px',
                  height: '14px',
                  fontSize: '7px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translate(-50%, -50%)',
                  border: '1.5px solid white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  WebkitPrintColorAdjust: 'exact',
                  colorAdjust: 'exact',
                } as React.CSSProperties}
              >
                {mark.type}
              </div>
            ))}
          </div>
        );
      case 'lateral_inner':
        return (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0', position: 'relative', height: '180px' }}>
            <svg viewBox="0 0 200 100" style={{ height: '100%', width: 'auto', border: '1px solid #ccc' }}>
              <g transform="translate(10, 0)">
                <text x="40" y="8" fill="black" fontSize="5" fontWeight="bold" textAnchor="middle">LATERAL RIGHT</text>
                <path d="M 40,12 C 45,12 47,15 45,18 C 43,21 44,23 42,25 C 41,26 42,28 40,30 L 40,33 L 43,33 L 42,60 C 42,65 39,78 37,95 L 34,95 L 36,65 L 34,35 C 34,30 35,12 40,12 Z" fill="none" stroke="black" strokeWidth="1" />
              </g>
              <g transform="translate(110, 0)">
                <text x="40" y="8" fill="black" fontSize="5" fontWeight="bold" textAnchor="middle">LATERAL LEFT</text>
                <path d="M 40,12 C 35,12 33,15 35,18 C 37,21 36,23 38,25 C 39,26 38,28 40,30 L 40,33 L 37,33 L 38,60 C 38,65 41,78 43,95 L 46,95 L 44,65 L 46,35 C 46,30 45,12 40,12 Z" fill="none" stroke="black" strokeWidth="1" />
              </g>
            </svg>
            {marks.map(mark => (
              <div
                key={mark.id}
                style={{
                  position: 'absolute',
                  left: `calc(50% - 180px + ${mark.x * 3.6}px)`,
                  top: `${mark.y * 1.8}px`,
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '14px',
                  height: '14px',
                  fontSize: '7px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translate(-50%, -50%)',
                  border: '1.5px solid white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  WebkitPrintColorAdjust: 'exact',
                  colorAdjust: 'exact',
                } as React.CSSProperties}
              >
                {mark.type}
              </div>
            ))}
          </div>
        );
      case 'genital':
        return (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0', position: 'relative', height: '180px' }}>
            <svg viewBox="0 0 200 100" style={{ height: '100%', width: 'auto', border: '1px solid #ccc' }}>
              <text x="100" y="10" fill="black" fontSize="5" fontWeight="bold" textAnchor="middle">GENITAL DETAILED REGIONAL VIEW</text>
              <g transform="translate(50, 15)">
                <path d="M 10,10 L 40,40 L 40,80" fill="none" stroke="black" strokeWidth="1" />
                <path d="M 90,10 L 60,40 L 60,80" fill="none" stroke="black" strokeWidth="1" />
                <ellipse cx="50" cy="45" rx="8" ry="15" fill="none" stroke="black" strokeWidth="1" />
                <circle cx="46" cy="62" r="5" fill="none" stroke="black" strokeWidth="1" />
                <circle cx="54" cy="62" r="5" fill="none" stroke="black" strokeWidth="1" />
              </g>
            </svg>
            {marks.map(mark => (
              <div
                key={mark.id}
                style={{
                  position: 'absolute',
                  left: `calc(50% - 180px + ${mark.x * 3.6}px)`,
                  top: `${mark.y * 1.8}px`,
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '14px',
                  height: '14px',
                  fontSize: '7px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translate(-50%, -50%)',
                  border: '1.5px solid white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  WebkitPrintColorAdjust: 'exact',
                  colorAdjust: 'exact',
                } as React.CSSProperties}
              >
                {mark.type}
              </div>
            ))}
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

  // Scale the wrapper to fit the available panel width
  const wrapperStyle: React.CSSProperties = {
    transform: `scale(${scale})`,
    transformOrigin: 'top center',
    width: `${A4_WIDTH_PX}px`,
    // Compensate height so pages don't leave huge empty space when scaled down
    marginBottom: scale < 1 ? `${(scale - 1) * 100}%` : '0',
  };

  return (
    <div className="preview-panel" ref={panelRef}>
      <div className="preview-controls">
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          📄 Report Preview (A4 Layout)
        </span>
        <button className="btn btn-primary" onClick={handlePrint}>
          Print or Save PDF
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={wrapperStyle}>

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
            <div className="data-row">
              <span className="data-label" style={{ whiteSpace: 'nowrap' }}>3. Examined in presence of</span>
              <span className="data-value">{data.accusedParticulars.examinedPresenceOf}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Place of Examination.</span>
              <span className="data-value">{data.accusedParticulars.placeOfExamination}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Date and Time of Examination.</span>
              <span className="data-value">{data.accusedParticulars.dateTimeOfExamination}</span>
            </div>
          </div>

          <div className="photo-lti-box">
            <div className="box-placeholder">CLEAR LTI</div>
            <div className="box-placeholder">CLEAR RTI</div>
            <div className="box-placeholder">PHOTO</div>
          </div>

          <div className="report-section">
            <div className="report-section-title">4. Marks of Identification:</div>
            <div className="data-row">
              <span className="data-label">(1)</span>
              <span className="data-value">{data.identificationMarks.mark1}</span>
            </div>
            <div className="data-row">
              <span className="data-label">(2)</span>
              <span className="data-value">{data.identificationMarks.mark2}</span>
            </div>
          </div>

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
        </div>

        {/* PAGE 2 */}
        <div className="report-paper page-break">
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

        {/* PAGE 4 - Body Maps */}
        <div className="report-paper page-break">
          <div className="report-section">
            <div className="report-section-title">BODY MAP CHART – ANTERIOR AND POSTERIOR VIEW</div>
            {renderPrintSvg('anterior_posterior')}
            <div style={{ fontSize: '7.5pt', fontStyle: 'italic', margin: '5px 0' }}>
              LEGEND/TYPES OF INJURIES: AB=Abrasion, ER=Erythema (Redness), OI=Other Injury (Red), ALS=Alternate Light Source, F/H=Fiber/Hair, PE=Petechiae, BI=Bite, FB=Foreign Body, PS=Potential Saliva, BU=Burn, IN=Induration, SHX=Sample Per History, DE=Debris, IW=Incised Wound, SI=Suction Injury, DF=Deformity, LA=Laceration, SW=Swelling, DS=Dry Secretion, MS=Moist Secretion, TB=Toluidine Blue, EC=Ecchymosis, OF=Other Foreign Material (Unverified), TE=Tenderness, V/S=Vegetation/Soil.
            </div>
            <div style={{ fontWeight: 'bold', border: '1px solid black', padding: '6px', textAlign: 'center', marginTop: '5px' }}>
              {pMap.filter(m => m.view === 'anterior_posterior').length === 0 ? (
                'NO INJURIES DETECTED IN THE ANTERIOR AND POSTERIOR PART OF BODY.'
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

          <div className="report-section" style={{ marginTop: '20px' }}>
            <div className="report-section-title">BODY MAP CHART - LATERAL &amp; INNER VIEWS (RIGHT &amp; LEFT LEGS/BODY)</div>
            {renderPrintSvg('lateral_inner')}
            <div style={{ fontSize: '7.5pt', fontStyle: 'italic', margin: '5px 0' }}>
              LEGEND/TYPES OF INJURIES: AB=Abrasion, ER=Erythema (Redness), OI=Other Injury (Red), ALS=Alternate Light Source, F/H=Fiber/Hair, PE=Petechiae, BI=Bite, FB=Foreign Body, PS=Potential Saliva, BU=Burn, IN=Induration, SHX=Sample Per History, DE=Debris, IW=Incised Wound, SI=Suction Injury, DF=Deformity, LA=Laceration, SW=Swelling, DS=Dry Secretion, MS=Moist Secretion, TB=Toluidine Blue, EC=Ecchymosis, OF=Other Foreign Material (Unverified), TE=Tenderness, V/S=Vegetation/Soil.
            </div>
            <div style={{ fontWeight: 'bold', border: '1px solid black', padding: '6px', textAlign: 'center', marginTop: '5px' }}>
              {pMap.filter(m => m.view === 'lateral_inner').length === 0 ? (
                'NO INJURIES DETECTED.'
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

        {/* PAGE 5 - Genital Map */}
        <div className="report-paper page-break">
          <div className="report-section">
            <div className="report-section-title">GENITAL MAP CHART - DETAILED REGIONAL VIEWS (RIGHT &amp; LEFT)</div>
            {renderPrintSvg('genital')}
            <div style={{ fontWeight: 'bold', border: '1px solid black', padding: '6px', textAlign: 'center', marginTop: '5px' }}>
              {pMap.filter(m => m.view === 'genital').length === 0 ? (
                'NO INJURIES DETECTED IN THE ABOVE DETAILED REGIONAL VIEWS.'
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
        <div className="report-paper page-break">
          <div className="report-section">
            <div className="data-row">
              <span className="data-label" style={{ fontWeight: 'bold' }}>7. X-ray for age estimation (if needed) :</span>
              <span className="data-value">NOT APPLICABLE.</span>
            </div>
          </div>

          <div className="report-section" style={{ marginTop: '15px' }}>
            <div className="report-section-title">8. Tests advised for potency / impotency (Wherever required)</div>

            {data.potencyTests.isApplicable ? (
              <div style={{ fontSize: '9.5pt' }}>
                <div style={{ fontWeight: 'bold' }}>1. Blood Sample Collection (EDTA) for following tests:</div>
                <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
                  {data.potencyTests.bloodTests.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 'bold', marginTop: '10px' }}>2. Accused referred for special investigation for confirmation of potency (if required):</div>
                <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
                  {data.potencyTests.specialInvestigations.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '9.5pt', marginTop: '8px' }}>
                  <div style={{ marginBottom: '6px' }}>1. Blood Sample Collection (EDTA) for following tests:</div>
                  <ul style={{ marginLeft: '25px', fontSize: '9pt' }}>
                    <li>GTT (Glucose Tolerance Test)</li>
                    <li>Serum Electrolytes</li>
                    <li>Serum Creatinine</li>
                    <li>Liver Function Tests (LFT)</li>
                    <li>Full Blood Count, Hemogram, Esr, Hb</li>
                    <li>Serum Prolactin Level</li>
                    <li>Thyroid Function Test</li>
                    <li>Serum Testosterone</li>
                    <li>Sex Hormone Binding Globulin (SHBG)</li>
                  </ul>
                  <div style={{ marginTop: '8px', marginBottom: '6px' }}>2. Accused referred for special investigation for confirmation of potency (if required):</div>
                  <ul style={{ marginLeft: '25px', fontSize: '9pt' }}>
                    <li>Nocturnal Penile Tumescence (NPT)</li>
                    <li>Cavernosography</li>
                    <li>Pharmacologically Induced Penile Erection (PIPE) Test</li>
                    <li>Doppler Studies</li>
                    <li>Pudendal Arteriography</li>
                    <li>Pharmacocavernosometry</li>
                  </ul>
                </div>
                <div className="potency-warning-block" style={{ marginTop: '30px' }}>
                  THE ABOVE-MENTIONED TEST IS NOT APPLICABLE.
                </div>
              </>
            )}
          </div>

          <div className="report-section" style={{ marginTop: '20px' }}>
            <div className="report-section-title">Opinion: (May be given as format attached as Appendix A)</div>
            <div style={{ paddingLeft: '5px', marginTop: '8px', fontSize: '10pt', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

          <div className="signature-block" style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <div>
              <div className="data-row" style={{ width: '220px' }}>
                <span className="data-label">Station:</span>
                <span className="data-value">{data.doctorDetails.station}</span>
              </div>
              <div className="data-row" style={{ width: '220px', marginTop: '5px' }}>
                <span className="data-label">Date:</span>
                <span className="data-value">{data.doctorDetails.date}</span>
              </div>
              <div className="data-row" style={{ width: '220px', marginTop: '5px' }}>
                <span className="data-label">Time:</span>
                <span className="data-value">{data.doctorDetails.time}</span>
              </div>
            </div>

            <div className="signature-right">
              <div>Signature ......................................................</div>
              <div className="data-row" style={{ marginTop: '5px' }}>
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
              <div style={{ marginTop: '10px', height: '50px', border: '1px solid #aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8pt', color: '#666' }}>
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

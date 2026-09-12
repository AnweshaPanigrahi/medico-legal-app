import React, { useState } from 'react';
import type { ReportData, ForensicSampleItem } from '../types/report';
import { DentitionChart } from './DentitionChart';
import { BodyMapAnnotator } from './BodyMapAnnotator';
import { FileText, History, Activity, ShieldAlert, Heart, ClipboardCheck, Award } from 'lucide-react';

interface FormPanelProps {
  data: ReportData;
  onChange: (data: ReportData) => void;
}

type TabType = 'case_info' | 'history' | 'physical' | 'dentition' | 'genital' | 'body_map' | 'forensics' | 'opinion';

const POTENCY_BLOOD_OPTIONS = [
  'GTT (Glucose Tolerance Test)',
  'Serum Electrolytes',
  'Serum Creatinine',
  'Liver Function Tests (LFT)',
  'Full Blood Count, Hemogram, Esr, Hb',
  'Serum Prolactin Level',
  'Thyroid Function Test',
  'Serum Testosterone',
  'Sex Hormone Binding Globulin (SHBG)',
];

const POTENCY_SPECIAL_OPTIONS = [
  'Nocturnal Penile Tumescence (NPT)',
  'Cavernosography',
  'Pharmacologically Induced Penile Erection (PIPE) Test',
  'Doppler Studies',
  'Pudendal Arteriography',
  'Pharmacocavernosometry',
];

export const FormPanel: React.FC<FormPanelProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<TabType>('case_info');

  const updateSection = <K extends keyof ReportData>(section: K, value: ReportData[K]) => {
    onChange({
      ...data,
      [section]: value,
    });
  };

  const handleCaseParticularsChange = (field: keyof ReportData['caseParticulars'], val: string) => {
    updateSection('caseParticulars', {
      ...data.caseParticulars,
      [field]: val,
    });
  };

  const handleAccusedParticularsChange = (field: keyof ReportData['accusedParticulars'], val: any) => {
    updateSection('accusedParticulars', {
      ...data.accusedParticulars,
      [field]: val,
    });
  };

  const handleIdentificationChange = (field: keyof ReportData['identificationMarks'], val: string) => {
    updateSection('identificationMarks', {
      ...data.identificationMarks,
      [field]: val,
    });
  };

  const handleHistoryChange = (field: keyof ReportData['history'], val: string) => {
    updateSection('history', {
      ...data.history,
      [field]: val,
    });
  };

  const handleViolenceChange = (field: keyof ReportData['marksOfViolence'], val: string) => {
    updateSection('marksOfViolence', {
      ...data.marksOfViolence,
      [field]: val,
    });
  };

  const handleGeneralConfigChange = (field: keyof ReportData['generalConfiguration'], val: string) => {
    updateSection('generalConfiguration', {
      ...data.generalConfiguration,
      [field]: val,
    });
  };

  const handleGenitalTableChange = (field: keyof ReportData['genitalTable'], val: string) => {
    updateSection('genitalTable', {
      ...data.genitalTable,
      [field]: val,
    });
  };

  const handlePenisChange = (field: keyof ReportData['penis'], val: string) => {
    updateSection('penis', {
      ...data.penis,
      [field]: val,
    });
  };

  const handleScrotumChange = (field: keyof ReportData['scrotum'], val: string) => {
    updateSection('scrotum', {
      ...data.scrotum,
      [field]: val,
    });
  };

  const handleDiseaseInjuryChange = (field: keyof ReportData['diseaseInjury'], val: string) => {
    updateSection('diseaseInjury', {
      ...data.diseaseInjury,
      [field]: val,
    });
  };

  const handleForensicSampleChange = (step: string, field: keyof ForensicSampleItem, val: any) => {
    const updated = data.forensicSamples.map((item) => {
      if (item.step === step) {
        return { ...item, [field]: val };
      }
      return item;
    });
    updateSection('forensicSamples', updated);
  };

  const handlePotencyToggle = (isApplicable: boolean) => {
    const defaultBlood = isApplicable ? [...POTENCY_BLOOD_OPTIONS] : [];
    const defaultSpecial = isApplicable ? [...POTENCY_SPECIAL_OPTIONS] : [];
    
    updateSection('potencyTests', {
      isApplicable,
      bloodTests: defaultBlood,
      specialInvestigations: defaultSpecial,
    });
  };

  const handlePotencyListChange = (listType: 'bloodTests' | 'specialInvestigations', item: string, checked: boolean) => {
    const currentList = [...data.potencyTests[listType]];
    let updatedList;
    if (checked) {
      updatedList = [...currentList, item];
    } else {
      updatedList = currentList.filter(i => i !== item);
    }
    updateSection('potencyTests', {
      ...data.potencyTests,
      [listType]: updatedList,
    });
  };

  const handleOpinionChange = (field: keyof ReportData['opinion'], val: string) => {
    updateSection('opinion', {
      ...data.opinion,
      [field]: val,
    });
  };

  const handleDoctorChange = (field: keyof ReportData['doctorDetails'], val: string) => {
    updateSection('doctorDetails', {
      ...data.doctorDetails,
      [field]: val,
    });
  };

  const tabsRef = React.useRef<HTMLDivElement>(null);

  const handleTabsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (tabsRef.current && e.deltaY !== 0) {
      tabsRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="form-panel">
      <div className="form-header">
        <h1>Clinical Exam Hub</h1>
        <p>Medico-Legal Examination of Accused of Sexual Violence</p>
      </div>

      <div className="form-tabs" ref={tabsRef} onWheel={handleTabsWheel}>
        <button className={`tab-btn ${activeTab === 'case_info' ? 'active' : ''}`} onClick={() => setActiveTab('case_info')}>
          Case Info
        </button>
        <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          History
        </button>
        <button className={`tab-btn ${activeTab === 'physical' ? 'active' : ''}`} onClick={() => setActiveTab('physical')}>
          Physical Exam
        </button>
        <button className={`tab-btn ${activeTab === 'dentition' ? 'active' : ''}`} onClick={() => setActiveTab('dentition')}>
          Dentition
        </button>
        <button className={`tab-btn ${activeTab === 'genital' ? 'active' : ''}`} onClick={() => setActiveTab('genital')}>
          Genitals
        </button>
        <button className={`tab-btn ${activeTab === 'body_map' ? 'active' : ''}`} onClick={() => setActiveTab('body_map')}>
          Body Map
        </button>
        <button className={`tab-btn ${activeTab === 'forensics' ? 'active' : ''}`} onClick={() => setActiveTab('forensics')}>
          Forensics
        </button>
        <button className={`tab-btn ${activeTab === 'opinion' ? 'active' : ''}`} onClick={() => setActiveTab('opinion')}>
          Opinion
        </button>
      </div>

      <div className="form-body">
        {/* TAB 1: CASE INFO */}
        <div className={`form-section ${activeTab === 'case_info' ? 'active' : ''}`}>
          <div className="form-group-title"><FileText size={16} /> 1. Requisition & Case Particulars</div>
          <div className="input-grid">
            <div className="input-field input-grid-full">
              <label>Requisition From</label>
              <input
                type="text"
                value={data.caseParticulars.requisitionFrom}
                onChange={(e) => handleCaseParticularsChange('requisitionFrom', e.target.value)}
                placeholder="e.g. Inspector In-charge, Cuttack Sadar PS"
              />
            </div>
            <div className="input-field">
              <label>vide letter. No.</label>
              <input
                type="text"
                value={data.caseParticulars.letterNo}
                onChange={(e) => handleCaseParticularsChange('letterNo', e.target.value)}
                placeholder="e.g. 142/26"
              />
            </div>
            <div className="input-field">
              <label>Dated</label>
              <input
                type="text"
                value={data.caseParticulars.letterDate}
                onChange={(e) => handleCaseParticularsChange('letterDate', e.target.value)}
                placeholder="e.g. 15.08.2026"
              />
            </div>
            <div className="input-field input-grid-full">
              <label>For Examination of</label>
              <input
                type="text"
                value={data.caseParticulars.examinationOf}
                onChange={(e) => handleCaseParticularsChange('examinationOf', e.target.value)}
                placeholder="e.g. Accused Rahul Kumar, Age 28"
              />
            </div>
            <div className="input-field input-grid-full">
              <label>Brought and Identified by</label>
              <input
                type="text"
                value={data.caseParticulars.broughtBy}
                onChange={(e) => handleCaseParticularsChange('broughtBy', e.target.value)}
                placeholder="e.g. Constable S.K. Mohanty, Badge No. 412"
              />
            </div>
          </div>

          <div className="form-group-title" style={{ marginTop: '1rem' }}><Activity size={16} /> 2. Accused Particulars & Consent</div>
          <div className="input-grid">
            <div className="input-field">
              <label>Accused Name</label>
              <input
                type="text"
                value={data.accusedParticulars.name}
                onChange={(e) => handleAccusedParticularsChange('name', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>S/o (Father's Name)</label>
              <input
                type="text"
                value={data.accusedParticulars.fatherName}
                onChange={(e) => handleAccusedParticularsChange('fatherName', e.target.value)}
              />
            </div>
            <div className="input-field input-grid-full">
              <label>Address</label>
              <textarea
                value={data.accusedParticulars.address}
                onChange={(e) => handleAccusedParticularsChange('address', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>Age as stated</label>
              <input
                type="text"
                value={data.accusedParticulars.age}
                onChange={(e) => handleAccusedParticularsChange('age', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>Occupation</label>
              <input
                type="text"
                value={data.accusedParticulars.occupation}
                onChange={(e) => handleAccusedParticularsChange('occupation', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>Religion</label>
              <input
                type="text"
                value={data.accusedParticulars.religion}
                onChange={(e) => handleAccusedParticularsChange('religion', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>Consent given in writing?</label>
              <select
                value={data.accusedParticulars.consentGiven ? 'yes' : 'no'}
                onChange={(e) => handleAccusedParticularsChange('consentGiven', e.target.value === 'yes')}
              >
                <option value="yes">YES</option>
                <option value="no">NO</option>
              </select>
            </div>
            <div className="input-field input-grid-full">
              <label>Consent Details Text (Optional description of consent process)</label>
              <textarea
                value={data.accusedParticulars.consentText}
                onChange={(e) => handleAccusedParticularsChange('consentText', e.target.value)}
                placeholder="e.g. I, Rahul Kumar, aged 28, S/o Hari Kumar, voluntarily give my consent for my medico-legal examination..."
              />
            </div>
          </div>

          <div className="form-group-title" style={{ marginTop: '1rem' }}><ClipboardCheck size={16} /> 3. Examination Details</div>
          <div className="input-grid">
            <div className="input-field input-grid-full">
              <label>Examined in presence of</label>
              <input
                type="text"
                value={data.accusedParticulars.examinedPresenceOf}
                onChange={(e) => handleAccusedParticularsChange('examinedPresenceOf', e.target.value)}
                placeholder="e.g. Constable S.K. Mohanty"
              />
            </div>
            <div className="input-field">
              <label>Place of Examination</label>
              <input
                type="text"
                value={data.accusedParticulars.placeOfExamination}
                onChange={(e) => handleAccusedParticularsChange('placeOfExamination', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>Date and Time</label>
              <input
                type="text"
                value={data.accusedParticulars.dateTimeOfExamination}
                onChange={(e) => handleAccusedParticularsChange('dateTimeOfExamination', e.target.value)}
                placeholder="e.g. 15.08.2026 at 10:30 AM"
              />
            </div>
          </div>

          <div className="form-group-title" style={{ marginTop: '1rem' }}><ClipboardCheck size={16} /> 4. Marks of Identification</div>
          <div className="input-grid">
            <div className="input-field">
              <label>Mark of Identification (1)</label>
              <input
                type="text"
                value={data.identificationMarks.mark1}
                onChange={(e) => handleIdentificationChange('mark1', e.target.value)}
                placeholder="e.g. Black mole on right cheek"
              />
            </div>
            <div className="input-field">
              <label>Mark of Identification (2)</label>
              <input
                type="text"
                value={data.identificationMarks.mark2}
                onChange={(e) => handleIdentificationChange('mark2', e.target.value)}
                placeholder="e.g. Surgical scar over left knee joint"
              />
            </div>
          </div>
        </div>

        {/* TAB 2: HISTORY */}
        <div className={`form-section ${activeTab === 'history' ? 'active' : ''}`}>
          <div className="form-group-title"><History size={16} /> Case History & Statements</div>
          <div className="input-field">
            <label>i. Brief history as given by police</label>
            <textarea
              value={data.history.policeHistory}
              onChange={(e) => handleHistoryChange('policeHistory', e.target.value)}
            />
          </div>

          <h4 style={{ margin: '0.5rem 0', color: 'var(--text-secondary)' }}>ii. Brief history as given by accused:</h4>
          
          <div className="input-field">
            <label>a. Admits or denies the incidence / Account of incident</label>
            <textarea
              value={data.history.statement}
              onChange={(e) => handleHistoryChange('statement', e.target.value)}
              placeholder="e.g. He denies the incidence, stating he is innocent..."
            />
          </div>
          <div className="input-grid" style={{ marginTop: '0.5rem' }}>
            <div className="input-field">
              <label>b. Did he know the victim before?</label>
              <input
                type="text"
                value={data.history.knowsVictim}
                onChange={(e) => handleHistoryChange('knowsVictim', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>c. Any injury due to struggle/resistance?</label>
              <input
                type="text"
                value={data.history.struggleInjury}
                onChange={(e) => handleHistoryChange('struggleInjury', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>d. Evidence of lipstick, blood, grass, semen on clothes?</label>
              <input
                type="text"
                value={data.history.clothingEvidence}
                onChange={(e) => handleHistoryChange('clothingEvidence', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>e. Evidence of recent tears, button losses, loose pubic hair?</label>
              <input
                type="text"
                value={data.history.clothingRecentTear}
                onChange={(e) => handleHistoryChange('clothingRecentTear', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>f. History of S.T.D. before?</label>
              <input
                type="text"
                value={data.history.stdHistory}
                onChange={(e) => handleHistoryChange('stdHistory', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>g. Did he wash/bathe after alleged incident?</label>
              <input
                type="text"
                value={data.history.tookBath}
                onChange={(e) => handleHistoryChange('tookBath', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>h. Has he changed clothes after the incident?</label>
              <input
                type="text"
                value={data.history.changedClothes}
                onChange={(e) => handleHistoryChange('changedClothes', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* TAB 3: PHYSICAL EXAM */}
        <div className={`form-section ${activeTab === 'physical' ? 'active' : ''}`}>
          <div className="form-group-title"><Activity size={16} /> Physical Examination Details</div>
          
          <div className="input-field">
            <label>i. Clothing worn during incidence description (if same was worn)</label>
            <textarea
              value={data.clothingInfo}
              onChange={(e) => updateSection('clothingInfo', e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ii. Marks of violence (if present, describe; if not, keep "ABSENT")</span>
            <div className="input-grid">
              <div className="input-field">
                <label>Bite Marks</label>
                <input
                  type="text"
                  value={data.marksOfViolence.biteMarks}
                  onChange={(e) => handleViolenceChange('biteMarks', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Abrasions</label>
                <input
                  type="text"
                  value={data.marksOfViolence.abrasions}
                  onChange={(e) => handleViolenceChange('abrasions', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Contusions</label>
                <input
                  type="text"
                  value={data.marksOfViolence.contusions}
                  onChange={(e) => handleViolenceChange('contusions', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Any other</label>
                <input
                  type="text"
                  value={data.marksOfViolence.other}
                  onChange={(e) => handleViolenceChange('other', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>iii. General Configuration</span>
            <div className="input-grid">
              <div className="input-field">
                <label>Height</label>
                <input
                  type="text"
                  value={data.generalConfiguration.height}
                  onChange={(e) => handleGeneralConfigChange('height', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Weight</label>
                <input
                  type="text"
                  value={data.generalConfiguration.weight}
                  onChange={(e) => handleGeneralConfigChange('weight', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Body Built</label>
                <input
                  type="text"
                  value={data.generalConfiguration.bodyBuilt}
                  onChange={(e) => handleGeneralConfigChange('bodyBuilt', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Blood Pressure</label>
                <input
                  type="text"
                  value={data.generalConfiguration.bloodPressure}
                  onChange={(e) => handleGeneralConfigChange('bloodPressure', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Pulse Rate</label>
                <input
                  type="text"
                  value={data.generalConfiguration.pulse}
                  onChange={(e) => handleGeneralConfigChange('pulse', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Mental Status</label>
                <input
                  type="text"
                  value={data.generalConfiguration.mentalStatus}
                  onChange={(e) => handleGeneralConfigChange('mentalStatus', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Hair Configuration</span>
            <div className="input-grid">
              <div className="input-field">
                <label>iv. Axillary hair</label>
                <input
                  type="text"
                  value={data.axillaryHair}
                  onChange={(e) => updateSection('axillaryHair', e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>v. Beard & Mustaches</label>
                <input
                  type="text"
                  value={data.beardMustache}
                  onChange={(e) => updateSection('beardMustache', e.target.value)}
                />
              </div>
              <div className="input-field input-grid-full">
                <label>vi. Pubic hair (including Tanner Staging)</label>
                <input
                  type="text"
                  value={data.pubicHair}
                  onChange={(e) => updateSection('pubicHair', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* TAB 4: DENTITION */}
        <div className={`form-section ${activeTab === 'dentition' ? 'active' : ''}`}>
          <div className="form-group-title"><ClipboardCheck size={16} /> vii. Dentition Chart</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Encircle teeth that are **not erupted** by clicking on the boxes below. (Red/O = Not Erupted, Green/E = Erupted).
          </p>
          <DentitionChart
            value={data.dentition}
            onChange={(val) => updateSection('dentition', val)}
          />
        </div>

        {/* TAB 5: GENITALS */}
        <div className={`form-section ${activeTab === 'genital' ? 'active' : ''}`}>
          <div className="form-group-title"><ShieldAlert size={16} /> viii. Genital Examination & Remarks</div>
          
          <h4 style={{ margin: '0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>a. Regional Attributes (Y / N / DNK)</h4>
          <div className="input-grid">
            <div className="input-field">
              <label>Matted hair (Pubic)</label>
              <input type="text" value={data.genitalTable.mattedHairPubic} onChange={(e) => handleGenitalTableChange('mattedHairPubic', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Matted hair (Thigh)</label>
              <input type="text" value={data.genitalTable.mattedHairThigh} onChange={(e) => handleGenitalTableChange('mattedHairThigh', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Seminal stain (Pubic)</label>
              <input type="text" value={data.genitalTable.seminalStainPubic} onChange={(e) => handleGenitalTableChange('seminalStainPubic', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Seminal stain (Thigh)</label>
              <input type="text" value={data.genitalTable.seminalStainThigh} onChange={(e) => handleGenitalTableChange('seminalStainThigh', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Blood stain (Pubic)</label>
              <input type="text" value={data.genitalTable.bloodPubic} onChange={(e) => handleGenitalTableChange('bloodPubic', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Blood stain (Thigh)</label>
              <input type="text" value={data.genitalTable.bloodThigh} onChange={(e) => handleGenitalTableChange('bloodThigh', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Loose foreign hair (Pubic)</label>
              <input type="text" value={data.genitalTable.looseHairPubic} onChange={(e) => handleGenitalTableChange('looseHairPubic', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Loose foreign hair (Thigh)</label>
              <input type="text" value={data.genitalTable.looseHairThigh} onChange={(e) => handleGenitalTableChange('looseHairThigh', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Injuries (Pubic)</label>
              <input type="text" value={data.genitalTable.injuriesPubic} onChange={(e) => handleGenitalTableChange('injuriesPubic', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Injuries (Thigh)</label>
              <input type="text" value={data.genitalTable.injuriesThigh} onChange={(e) => handleGenitalTableChange('injuriesThigh', e.target.value)} />
            </div>
          </div>

          <h4 style={{ margin: '1rem 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>b. Penis Parameters</h4>
          <div className="input-grid">
            <div className="input-field">
              <label>Development (Tanner Stage)</label>
              <input type="text" value={data.penis.development} onChange={(e) => handlePenisChange('development', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Any defect</label>
              <input type="text" value={data.penis.defect} onChange={(e) => handlePenisChange('defect', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Deformity</label>
              <input type="text" value={data.penis.deformity} onChange={(e) => handlePenisChange('deformity', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Length & Girth (Flaccid)</label>
              <input type="text" value={data.penis.flaccidLengthGirth} onChange={(e) => handlePenisChange('flaccidLengthGirth', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Length & Girth (Erect)</label>
              <input type="text" value={data.penis.erectLengthGirth} onChange={(e) => handlePenisChange('erectLengthGirth', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Glans penis & Frenulum</label>
              <input type="text" value={data.penis.glansFrenulum} onChange={(e) => handlePenisChange('glansFrenulum', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Foreskin Rollability / Circumcised</label>
              <input type="text" value={data.penis.foreskinRoll} onChange={(e) => handlePenisChange('foreskinRoll', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Any injury on frenulum</label>
              <input type="text" value={data.penis.frenulumInjury} onChange={(e) => handlePenisChange('frenulumInjury', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Any injury elsewhere on organ</label>
              <input type="text" value={data.penis.otherInjury} onChange={(e) => handlePenisChange('otherInjury', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Evidence of STD</label>
              <input type="text" value={data.penis.stdEvidence} onChange={(e) => handlePenisChange('stdEvidence', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Presence of Smegma</label>
              <input type="text" value={data.penis.smegma} onChange={(e) => handlePenisChange('smegma', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Hair under prepuce</label>
              <input type="text" value={data.penis.prepucalHair} onChange={(e) => handlePenisChange('prepucalHair', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Stains nearby</label>
              <input type="text" value={data.penis.nearbyStains} onChange={(e) => handlePenisChange('nearbyStains', e.target.value)} />
            </div>
            <div className="input-field input-grid-full">
              <label>Any other remark (Penis)</label>
              <input type="text" value={data.penis.otherRemarks} onChange={(e) => handlePenisChange('otherRemarks', e.target.value)} />
            </div>
          </div>

          <h4 style={{ margin: '1rem 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>c. Scrotum and Testes</h4>
          <div className="input-grid">
            <div className="input-field">
              <label>Development (Tanner Stage)</label>
              <input type="text" value={data.scrotum.development} onChange={(e) => handleScrotumChange('development', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Enlargement</label>
              <input type="text" value={data.scrotum.enlargement} onChange={(e) => handleScrotumChange('enlargement', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Both testes descended?</label>
              <input type="text" value={data.scrotum.testesDescended} onChange={(e) => handleScrotumChange('testesDescended', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Any disease</label>
              <input type="text" value={data.scrotum.disease} onChange={(e) => handleScrotumChange('disease', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Any injury</label>
              <input type="text" value={data.scrotum.injury} onChange={(e) => handleScrotumChange('injury', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Cremasteric Reflex</label>
              <input type="text" value={data.scrotum.cremastericReflex} onChange={(e) => handleScrotumChange('cremastericReflex', e.target.value)} />
            </div>
            <div className="input-field input-grid-full">
              <label>Any other remark (Scrotum/Testes)</label>
              <input type="text" value={data.scrotum.otherRemarks} onChange={(e) => handleScrotumChange('otherRemarks', e.target.value)} />
            </div>
          </div>

          <h4 style={{ margin: '1rem 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>d. Details regarding specific Disease / Injury</h4>
          <div className="input-grid">
            <div className="input-field">
              <label>Vas Deferens</label>
              <input type="text" value={data.diseaseInjury.vasDeferens} onChange={(e) => handleDiseaseInjuryChange('vasDeferens', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Epididymis</label>
              <input type="text" value={data.diseaseInjury.epididymis} onChange={(e) => handleDiseaseInjuryChange('epididymis', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Prostate</label>
              <input type="text" value={data.diseaseInjury.prostate} onChange={(e) => handleDiseaseInjuryChange('prostate', e.target.value)} />
            </div>
            <div className="input-field">
              <label>On the genital</label>
              <input type="text" value={data.diseaseInjury.onGenital} onChange={(e) => handleDiseaseInjuryChange('onGenital', e.target.value)} />
            </div>
            <div className="input-field input-grid-full">
              <label>Anywhere else on the body</label>
              <input type="text" value={data.diseaseInjury.anywhereOnBody} onChange={(e) => handleDiseaseInjuryChange('anywhereOnBody', e.target.value)} />
            </div>
          </div>
        </div>

        {/* TAB 6: BODY MAPPING */}
        <div className={`form-section ${activeTab === 'body_map' ? 'active' : ''}`}>
          <div className="form-group-title"><Activity size={16} /> Interactive Body Mapping Chart</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Select a view tab, then click directly on the body map silhouette to drop a marker. Fill in the code category and exact description of findings.
          </p>
          <BodyMapAnnotator
            value={data.bodyMapMarks}
            onChange={(val) => updateSection('bodyMapMarks', val)}
          />
        </div>

        {/* TAB 7: FORENSICS & POTENCY */}
        <div className={`form-section ${activeTab === 'forensics' ? 'active' : ''}`}>
          <div className="form-group-title"><Heart size={16} /> 6. Collection of Forensic Samples</div>
          
          <div className="input-field" style={{ marginBottom: '1rem' }}>
            <label>a. Clothing, where available (Wrapped details / Notes)</label>
            <input
              type="text"
              value={data.forensicSamples.find(s => s.step === '1')?.reason || ''}
              onChange={(e) => handleForensicSampleChange('1', 'reason', e.target.value)}
              placeholder="e.g. NOT PRODUCED or Garments wrapped in paper bag"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Forensic Evidence Checklist</span>
            {data.forensicSamples.filter(s => s.step !== '1').map((sample) => (
              <div key={sample.step} style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Step {sample.step} - {sample.material}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', cursor: 'pointer' }} htmlFor={`collect-${sample.step}`}>Collected?</label>
                    <input
                      id={`collect-${sample.step}`}
                      type="checkbox"
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      checked={sample.collected}
                      onChange={(e) => handleForensicSampleChange(sample.step, 'collected', e.target.checked)}
                    />
                  </div>
                </div>
                {!sample.collected && (
                  <div className="input-field">
                    <input
                      type="text"
                      placeholder="Reason for not collecting..."
                      value={sample.reason}
                      onChange={(e) => handleForensicSampleChange(sample.step, 'reason', e.target.value)}
                      style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="form-group-title" style={{ marginTop: '1.5rem' }}><Award size={16} /> 8. Potency / Impotency Tests</div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <input
                id="potency-applicable"
                type="checkbox"
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                checked={data.potencyTests.isApplicable}
                onChange={(e) => handlePotencyToggle(e.target.checked)}
              />
              <label htmlFor="potency-applicable" style={{ fontWeight: 600, cursor: 'pointer' }}>Advise Potency Testing for Subject</label>
            </div>

            {data.potencyTests.isApplicable && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>EDTA Blood Sample Tests:</span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.35rem', marginTop: '0.35rem' }}>
                    {POTENCY_BLOOD_OPTIONS.map((opt) => (
                      <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          id={`blood-${opt}`}
                          type="checkbox"
                          checked={data.potencyTests.bloodTests.includes(opt)}
                          onChange={(e) => handlePotencyListChange('bloodTests', opt, e.target.checked)}
                        />
                        <label htmlFor={`blood-${opt}`} style={{ fontSize: '0.8rem', cursor: 'pointer' }}>{opt}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Special Potency Investigations:</span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.35rem', marginTop: '0.35rem' }}>
                    {POTENCY_SPECIAL_OPTIONS.map((opt) => (
                      <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          id={`special-${opt}`}
                          type="checkbox"
                          checked={data.potencyTests.specialInvestigations.includes(opt)}
                          onChange={(e) => handlePotencyListChange('specialInvestigations', opt, e.target.checked)}
                        />
                        <label htmlFor={`special-${opt}`} style={{ fontSize: '0.8rem', cursor: 'pointer' }}>{opt}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {!data.potencyTests.isApplicable && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Currently marked as **NOT APPLICABLE**.
              </p>
            )}
          </div>
        </div>

        {/* TAB 8: OPINION */}
        <div className={`form-section ${activeTab === 'opinion' ? 'active' : ''}`}>
          <div className="form-group-title"><Award size={16} /> 9. Opinion Details (Appendix A Format)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="input-field">
              <label>1. Sexual Intercourse Capability (Physical & Mental)</label>
              <textarea
                value={data.opinion.sexualCapability}
                onChange={(e) => handleOpinionChange('sexualCapability', e.target.value)}
                placeholder="e.g. From examination of the physical & mental development & mental status, there was nothing detected to suggest that the accused is not capable of sexual intercourse."
              />
            </div>
            <div className="input-field">
              <label>2. Bodily Injuries Opinion</label>
              <textarea
                value={data.opinion.bodilyInjuries}
                onChange={(e) => handleOpinionChange('bodilyInjuries', e.target.value)}
                placeholder="e.g. No bodily injuries could be detected on the person of the accused."
              />
            </div>
            <div className="input-field">
              <label>3. Wearing Apparel Opinion</label>
              <textarea
                value={data.opinion.wearingApparel}
                onChange={(e) => handleOpinionChange('wearingApparel', e.target.value)}
                placeholder="e.g. The wearing apparels of the time of the alleged incident were not produced and the wearing apparels of the time of examination do not reveal any physical clue relating to sexual offence."
              />
            </div>
            <div className="input-field">
              <label>4. Physical Findings of Sexual Act</label>
              <textarea
                value={data.opinion.recentSexualAct}
                onChange={(e) => handleOpinionChange('recentSexualAct', e.target.value)}
                placeholder="e.g. There were no physical findings on the body of the subject suggestive of a recent sexual act, however, possibility of the same could not be ruled out completely."
              />
            </div>
            <div className="input-field">
              <label>5. Urethral Swab & Smear Opinion</label>
              <textarea
                value={data.opinion.urethralSwab}
                onChange={(e) => handleOpinionChange('urethralSwab', e.target.value)}
                placeholder="e.g. Urethral swab & smear has been preserved and handed over to accompanying police for onward transmission to SBPL, Cuttack and the report not yet received."
              />
            </div>
            <div className="input-field">
              <label>6. Buccal Saliva & Hair Samples Opinion</label>
              <textarea
                value={data.opinion.forensicSamples}
                onChange={(e) => handleOpinionChange('forensicSamples', e.target.value)}
                placeholder="e.g. Air dried soaked salivary gauze and plucked pubic hair has been preserved and handed over to accompanying police constable in packed & sealed condition for onward transmission to SFSL, BBSR for grouping & cross matching."
              />
            </div>
          </div>

          <div className="form-group-title" style={{ marginTop: '1.5rem' }}><ClipboardCheck size={16} /> Signatures & Station</div>
          <div className="input-grid">
            <div className="input-field">
              <label>Station Location</label>
              <input type="text" value={data.doctorDetails.station} onChange={(e) => handleDoctorChange('station', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Date of Report</label>
              <input type="text" value={data.doctorDetails.date} onChange={(e) => handleDoctorChange('date', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Time of Report</label>
              <input type="text" value={data.doctorDetails.time} onChange={(e) => handleDoctorChange('time', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Doctor Name</label>
              <input type="text" value={data.doctorDetails.name} onChange={(e) => handleDoctorChange('name', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Registration Number</label>
              <input type="text" value={data.doctorDetails.regNo} onChange={(e) => handleDoctorChange('regNo', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Designation / Department</label>
              <input type="text" value={data.doctorDetails.designation} onChange={(e) => handleDoctorChange('designation', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

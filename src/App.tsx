import { useState, useEffect } from 'react';
import type { ReportData } from './types/report';
import { FormPanel } from './components/FormPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { Save, FolderOpen, FilePlus, Trash2, X } from 'lucide-react';

const initialReportData: ReportData = {
  caseParticulars: {
    requisitionFrom: '',
    letterNo: '',
    letterDate: '',
    examinationOf: '',
    broughtBy: ''
  },
  accusedParticulars: {
    name: '',
    fatherName: '',
    address: '',
    age: '',
    occupation: '',
    religion: '',
    consentGiven: true,
    consentText: 'Consent has been given voluntarily in writing in presence of witnesses, after explaining the nature and purpose of the examination.',
    examinedPresenceOf: '',
    placeOfExamination: 'SCB MEDICAL COLLEGE, CUTTACK',
    dateTimeOfExamination: ''
  },
  identificationMarks: {
    mark1: '',
    mark2: ''
  },
  history: {
    policeHistory: 'AS PER INQUEST .',
    statement: '',
    knowsVictim: 'NO',
    struggleInjury: 'NO',
    clothingEvidence: 'NO',
    clothingRecentTear: 'NO',
    stdHistory: 'NO',
    tookBath: 'YES',
    changedClothes: 'YES'
  },
  clothingInfo: 'NO',
  marksOfViolence: {
    biteMarks: 'ABSENT',
    abrasions: 'ABSENT',
    contusions: 'ABSENT',
    other: 'ABSENT'
  },
  generalConfiguration: {
    height: '',
    weight: '',
    bodyBuilt: '',
    bloodPressure: '122/90mmhg',
    pulse: '96 b/min',
    mentalStatus: 'SOUND MIND'
  },
  axillaryHair: 'ADULT TYPE',
  beardMustache: 'PRESENT AND ADULT TYPE',
  pubicHair: 'ADULT TYPE, TANNER STAGE IV.',
  dentition: {
    upperJaw: Array(16).fill(true),
    lowerJaw: Array(16).fill(true),
    totalPermanent: '32',
    totalTemporary: '0',
    artificial: 'NIL',
    spacingBehind2ndMolar: 'NIL'
  },
  genitalTable: {
    mattedHairPubic: 'N',
    mattedHairThigh: 'N',
    seminalStainPubic: 'N',
    seminalStainThigh: 'N',
    bloodPubic: 'N',
    bloodThigh: 'N',
    looseHairPubic: 'N',
    looseHairThigh: 'N',
    injuriesPubic: 'N',
    injuriesThigh: 'N'
  },
  penis: {
    development: 'ADULT TYPE IV',
    defect: 'NIL',
    deformity: 'NIL',
    flaccidLengthGirth: '',
    erectLengthGirth: '-------------------',
    glansFrenulum: 'INTACT',
    foreskinRoll: 'FREELY ROLLED UP',
    frenulumInjury: 'NIL',
    otherInjury: 'NIL',
    stdEvidence: 'NIL',
    smegma: 'ABSENT',
    prepucalHair: 'ABSENT',
    nearbyStains: 'NIL',
    otherRemarks: 'NIL'
  },
  scrotum: {
    development: 'TANNER STAGE IV',
    enlargement: 'NO',
    testesDescended: 'YES',
    disease: 'NO',
    injury: 'NO',
    cremastericReflex: 'PRESENT',
    otherRemarks: 'NIL'
  },
  diseaseInjury: {
    vasDeferens: 'N',
    epididymis: 'N',
    prostate: 'N',
    onGenital: 'N',
    anywhereOnBody: 'N'
  },
  bodyMapMarks: [],
  forensicSamples: [
    { step: '1', material: 'Clothing (step 1A & 1B)', collected: false, reason: 'NOT PRODUCED' },
    { step: '2A', material: 'Plucked Pubic hair', collected: true, reason: '' },
    { step: '2B', material: 'Cut strands of pubic hair', collected: false, reason: 'NOT REQUIRED' },
    { step: '2C', material: 'Cut strands of Matted pubic hair', collected: false, reason: 'NOT REQUIRED' },
    { step: '3A', material: 'Loose foreign pubic hair', collected: false, reason: 'ABSENT' },
    { step: '3B', material: 'Loose fiber of clothing', collected: false, reason: 'ABSENT' },
    { step: '4A', material: 'Two Swabs and two slides from Stains', collected: false, reason: 'ABSENT' },
    { step: '4B', material: 'Two Swabs and two slides for semen', collected: false, reason: 'ABSENT' },
    { step: '4C', material: 'Two Swabs and two slides for blood', collected: false, reason: 'ABSENT' },
    { step: '4D', material: 'Two Swabs from muddy stains, grass', collected: false, reason: 'ABSENT' },
    { step: '5A', material: 'One Urethral swab & two slides (semen)', collected: true, reason: '' },
    { step: '5B', material: 'One Urethral swab (STD)', collected: true, reason: '' },
    { step: '5C', material: 'Two Scrotal Swabs and two slides', collected: false, reason: 'ABSENT' },
    { step: '6A', material: 'Two Penile swabs and two slides', collected: false, reason: 'ABSENT' },
    { step: '6B', material: 'Penile washings', collected: false, reason: 'ABSENT' },
    { step: '7A', material: 'Nail scrapings', collected: false, reason: 'ABSENT' },
    { step: '7B', material: 'Nail Cuttings', collected: true, reason: '' },
    { step: '8', material: 'Buccal Saliva Soaked Gauze', collected: true, reason: '' },
    { step: '9A', material: 'Blood for grouping (gauge cloth)', collected: true, reason: '' },
    { step: '9B', material: 'Blood for DNA analysis on DNA card', collected: false, reason: 'NOT REQUIRED' }
  ],
  potencyTests: {
    isApplicable: false,
    bloodTests: [],
    specialInvestigations: []
  },
  opinion: {
    sexualCapability: 'From examination of the physical & mental development & mental status, there was nothing detected to suggest that the accused is not capable of sexual intercourse.',
    bodilyInjuries: 'No bodily injuries could be detected on the person of the accused.',
    wearingApparel: 'The wearing apparels of the time of the alleged incident were not produced and the wearing apparels of the time of examination do not reveal any physical clue relating to sexual offence.',
    recentSexualAct: 'There were no physical findings on the body of the subject suggestive of a recent sexual act, however, possibility of the same could not be ruled out completely.',
    urethralSwab: 'Urethral swab & smear has been preserved and handed over to accompanying police for onward transmission to SBPL, Cuttack and the report not yet received.',
    forensicSamples: 'Air dried soaked salivary gauze and plucked pubic hair has been preserved and handed over to accompanying police constable in packed & sealed condition for onward transmission to SFSL, BBSR for grouping & cross matching.'
  },
  doctorDetails: {
    station: 'KATAKA',
    date: '',
    time: '',
    name: 'DR Anurag Sree Patra',
    regNo: '27706/2021',
    designation: 'PG DEPT OF FM&T,SCB,KATAKA',
    seal: ''
  }
};

interface DraftRecord {
  id: string;
  patientName: string;
  dateCreated: string;
  data: ReportData;
}

function App() {
  const [reportData, setReportData] = useState<ReportData>(initialReportData);
  const [drafts, setDrafts] = useState<DraftRecord[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Load drafts list on mount
  useEffect(() => {
    const storedDrafts = localStorage.getItem('meler_report_drafts');
    if (storedDrafts) {
      try {
        setDrafts(JSON.parse(storedDrafts));
      } catch (e) {
        console.error('Error parsing stored drafts:', e);
      }
    }
  }, []);

  // Sync dates to current time automatically for a new report
  useEffect(() => {
    if (!reportData.accusedParticulars.dateTimeOfExamination) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      setReportData(prev => ({
        ...prev,
        accusedParticulars: {
          ...prev.accusedParticulars,
          dateTimeOfExamination: `${dateStr} at ${timeStr}`
        },
        doctorDetails: {
          ...prev.doctorDetails,
          date: dateStr,
          time: timeStr
        }
      }));
    }
  }, []);

  const saveCurrentDraft = () => {
    const patientName = reportData.accusedParticulars.name || 'Unnamed Accused';
    const timestamp = new Date().toLocaleString();
    
    // Check if we are overwriting an existing draft or creating a new one
    const newDraft: DraftRecord = {
      id: `draft-${Date.now()}`,
      patientName,
      dateCreated: timestamp,
      data: reportData
    };

    const updatedDrafts = [newDraft, ...drafts];
    setDrafts(updatedDrafts);
    localStorage.setItem('meler_report_drafts', JSON.stringify(updatedDrafts));
    alert(`Draft saved successfully for: ${patientName}`);
  };

  const loadDraft = (draft: DraftRecord) => {
    setReportData(draft.data);
    setShowHistoryModal(false);
    alert(`Loaded draft for: ${draft.patientName}`);
  };

  const deleteDraft = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this draft?')) {
      const updatedDrafts = drafts.filter(d => d.id !== id);
      setDrafts(updatedDrafts);
      localStorage.setItem('meler_report_drafts', JSON.stringify(updatedDrafts));
    }
  };

  const handleNewReport = () => {
    if (confirm('Create a new report? This will reset all active form values.')) {
      setReportData({
        ...initialReportData,
        accusedParticulars: {
          ...initialReportData.accusedParticulars,
          dateTimeOfExamination: '' // triggers date auto-sync
        }
      });
    }
  };

  return (
    <div className="dashboard">
      {/* Left side form controller container */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <FormPanel data={reportData} onChange={setReportData} />
        </div>
        
        {/* Foot draft actions bar */}
        <div className="actions-bar">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={saveCurrentDraft} title="Save to local browser history">
              <Save size={16} /> Save Draft
            </button>
            <button className="btn btn-secondary" onClick={() => setShowHistoryModal(true)} title="Load from local history">
              <FolderOpen size={16} /> Load Draft ({drafts.length})
            </button>
          </div>
          <button className="btn btn-primary" onClick={handleNewReport} title="Reset and start new report form">
            <FilePlus size={16} /> New Report
          </button>
        </div>
      </div>

      {/* Right side live print preview */}
      <PreviewPanel data={reportData} />

      {/* Load Draft Overlay Modal */}
      {showHistoryModal && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="modal-title">Saved Case Records</h3>
              <button className="icon-btn" onClick={() => setShowHistoryModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            {drafts.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '1rem 0', fontStyle: 'italic', textAlign: 'center' }}>
                No saved drafts found in this browser.
              </p>
            ) : (
              <div className="history-list">
                {drafts.map((draft) => (
                  <div key={draft.id} className="history-item" onClick={() => loadDraft(draft)}>
                    <div className="history-item-details">
                      <span className="history-item-name">{draft.patientName}</span>
                      <span className="history-item-date">Saved on: {draft.dateCreated}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => deleteDraft(e, draft.id)}
                      className="icon-btn icon-btn-danger"
                      title="Delete record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button className="btn btn-secondary" onClick={() => setShowHistoryModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

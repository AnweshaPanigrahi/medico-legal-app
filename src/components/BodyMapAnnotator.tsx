import React, { useState, useRef } from 'react';
import type { BodyMapMark } from '../types/report';
import { Plus, Trash2, X } from 'lucide-react';
import { image1Base64, image2Base64, image3Base64 } from '../utils/imageData';

interface BodyMapAnnotatorProps {
  value: BodyMapMark[];
  onChange: (value: BodyMapMark[]) => void;
}

const LEGEND_ITEMS = [
  { code: 'AB', label: 'Abrasion' },
  { code: 'ER', label: 'Erythema (redness)' },
  { code: 'OI', label: 'Other Injury (describe)' },
  { code: 'ALS', label: 'Alternate Light Source' },
  { code: 'F/H', label: 'Fiber/Hair' },
  { code: 'PE', label: 'Petechiae' },
  { code: 'BI', label: 'Bite' },
  { code: 'FB', label: 'Foreign Body' },
  { code: 'PS', label: 'Potential Saliva' },
  { code: 'BU', label: 'Burn' },
  { code: 'IN', label: 'Induration' },
  { code: 'SHX', label: 'Sample Per History' },
  { code: 'DE', label: 'Debris' },
  { code: 'IW', label: 'Incised Wound' },
  { code: 'SI', label: 'Suction Injury' },
  { code: 'DF', label: 'Deformity' },
  { code: 'LA', label: 'Laceration' },
  { code: 'SW', label: 'Swelling' },
  { code: 'DS', label: 'Dry Secretion' },
  { code: 'MS', label: 'Moist Secretion' },
  { code: 'TB', label: 'Toluidine Blue' },
  { code: 'EC', label: 'Ecchymosis (bruise)' },
  { code: 'OF', label: 'Other Foreign Material' },
  { code: 'TE', label: 'Tenderness' },
  { code: 'V/S', label: 'Vegetation/Soil' },
];

export const BodyMapAnnotator: React.FC<BodyMapAnnotatorProps> = ({ value, onChange }) => {
  const [activeTab, setActiveTab] = useState<'anterior_posterior' | 'lateral_inner' | 'genital'>('anterior_posterior');
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingCoords, setPendingCoords] = useState<{ x: number; y: number } | null>(null);
  const [selectedType, setSelectedType] = useState('AB');
  const [description, setDescription] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);

  const saveMark = () => {
    if (!pendingCoords) return;

    const newMark: BodyMapMark = {
      id: `mark-${Date.now()}`,
      view: activeTab,
      x: pendingCoords.x,
      y: pendingCoords.y,
      type: selectedType,
      description: description || LEGEND_ITEMS.find(item => item.code === selectedType)?.label || 'Injury',
    };

    onChange([...value, newMark]);
    setModalOpen(false);
    setPendingCoords(null);
  };

  const deleteMark = (id: string) => {
    onChange(value.filter(mark => mark.id !== id));
  };

  const filteredMarks = value.filter(mark => mark.view === activeTab);

  // Render exact PNG diagrams from the official form with interactive click overlay
  const handleDiagramClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    setPendingCoords({ x, y });
    setSelectedType('AB');
    setDescription('');
    setModalOpen(true);
  };

  const renderDiagramContent = () => {
    switch (activeTab) {
      case 'anterior_posterior':
        return (
          <div
            className="diagram-interactive-wrapper"
            onClick={handleDiagramClick}
            style={{ position: 'relative', display: 'inline-block', cursor: 'crosshair', maxWidth: '100%', userSelect: 'none' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold', fontSize: '11px', marginBottom: '2px' }}>
              <span>RIGHT</span><span>LEFT</span><span>LEFT</span><span>RIGHT</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '10px', marginBottom: '4px', color: 'var(--text-secondary)' }}>
              <span style={{ flex: 1, textAlign: 'center' }}>ANTERIOR</span>
              <span style={{ flex: 1, textAlign: 'center' }}>POSTERIOR</span>
            </div>
            <img
              src={`data:image/png;base64,${image1Base64}`}
              alt="Anterior and Posterior Body Map"
              style={{ maxHeight: '380px', maxWidth: '100%', display: 'block', margin: '0 auto', pointerEvents: 'none', background: '#fff', padding: '4px', borderRadius: '4px' }}
            />
            {filteredMarks.map((mark) => (
              <div
                key={mark.id}
                className="body-mark-pin"
                style={{ left: `${mark.x}%`, top: `${mark.y}%` }}
                title={`${mark.type}: ${mark.description}`}
              >
                {mark.type}
              </div>
            ))}
          </div>
        );
      case 'lateral_inner':
        return (
          <div
            className="diagram-interactive-wrapper"
            onClick={handleDiagramClick}
            style={{ position: 'relative', display: 'inline-block', cursor: 'crosshair', maxWidth: '100%', userSelect: 'none' }}
          >
            <img
              src={`data:image/png;base64,${image2Base64}`}
              alt="Lateral Body Views"
              style={{ maxHeight: '380px', maxWidth: '100%', display: 'block', margin: '0 auto', pointerEvents: 'none', background: '#fff', padding: '4px', borderRadius: '4px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '10.5px', fontWeight: 'bold', marginTop: '4px' }}>
              <span>Inner</span><span>Right<br /><small>Outer</small></span><span>Outer<br /><small>Left</small></span><span>Inner</span>
            </div>
            {filteredMarks.map((mark) => (
              <div
                key={mark.id}
                className="body-mark-pin"
                style={{ left: `${mark.x}%`, top: `${mark.y}%` }}
                title={`${mark.type}: ${mark.description}`}
              >
                {mark.type}
              </div>
            ))}
          </div>
        );
      case 'genital':
        return (
          <div
            className="diagram-interactive-wrapper"
            onClick={handleDiagramClick}
            style={{ position: 'relative', display: 'inline-block', cursor: 'crosshair', maxWidth: '100%', userSelect: 'none' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold', fontSize: '11px', marginBottom: '6px', maxWidth: '280px', margin: '0 auto 6px auto' }}>
              <span>RIGHT</span>
              <span>LEFT</span>
            </div>
            <div style={{ display: 'inline-block', background: '#fff', padding: '4px', borderRadius: '4px' }}>
              <img
                src={`data:image/png;base64,${image3Base64}`}
                alt="Genital Map Regional Views"
                style={{ maxHeight: '380px', maxWidth: '100%', display: 'block', pointerEvents: 'none', margin: '0 auto' }}
              />
            </div>
            {filteredMarks.map((mark) => (
              <div
                key={mark.id}
                className="body-mark-pin"
                style={{ left: `${mark.x}%`, top: `${mark.y}%` }}
                title={`${mark.type}: ${mark.description}`}
              >
                {mark.type}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="body-map-container" ref={containerRef}>
      <div className="view-selector">
        <button
          type="button"
          className={`view-btn ${activeTab === 'anterior_posterior' ? 'active' : ''}`}
          onClick={() => setActiveTab('anterior_posterior')}
        >
          Anterior & Posterior
        </button>
        <button
          type="button"
          className={`view-btn ${activeTab === 'lateral_inner' ? 'active' : ''}`}
          onClick={() => setActiveTab('lateral_inner')}
        >
          Lateral Views
        </button>
        <button
          type="button"
          className={`view-btn ${activeTab === 'genital' ? 'active' : ''}`}
          onClick={() => setActiveTab('genital')}
        >
          Genital View
        </button>
      </div>

      <div className="canvas-wrapper" style={{ minHeight: '430px', textAlign: 'center' }}>
        {renderDiagramContent()}
      </div>

      <div className="input-field">
        <label>Current Markings in this view ({filteredMarks.length})</label>
        {filteredMarks.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic', padding: '0.5rem 0' }}>
            No injuries marked in this view. Will show as "NO INJURIES DETECTED".
          </div>
        ) : (
          <div className="markings-list">
            {filteredMarks.map((mark) => (
              <div key={mark.id} className="marking-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="marking-item-badge">{mark.type}</span>
                  <span>{mark.description} <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>({mark.x}%, {mark.y}%)</span></span>
                </div>
                <button
                  type="button"
                  onClick={() => deleteMark(mark.id)}
                  className="icon-btn icon-btn-danger"
                  title="Delete marking"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Marking Modal */}
      {modalOpen && pendingCoords && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="modal-title">Add Injury Finding</h3>
              <button
                type="button"
                className="icon-btn"
                onClick={() => {
                  setModalOpen(false);
                  setPendingCoords(null);
                }}
              >
                <X size={18} />
              </button>
            </div>
            
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Marking placed at coordinates X: {pendingCoords.x}%, Y: {pendingCoords.y}%
            </p>

            <div className="input-field">
              <label>Finding Code (Legend)</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {LEGEND_ITEMS.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code} - {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-field">
              <label>Specific Description / Details</label>
              <textarea
                placeholder="e.g. 3x2 cm fresh linear abrasion with reddish scab"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setModalOpen(false);
                  setPendingCoords(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveMark}
              >
                <Plus size={16} /> Add Marker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

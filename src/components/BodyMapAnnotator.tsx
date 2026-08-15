import React, { useState, useRef } from 'react';
import type { BodyMapMark } from '../types/report';
import { Plus, Trash2, X } from 'lucide-react';

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

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    setPendingCoords({ x, y });
    setSelectedType('AB');
    setDescription('');
    setModalOpen(true);
  };

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

  // SVG silhouette paths centered in 0-100 coordinate grid
  const renderSilhouettes = () => {
    switch (activeTab) {
      case 'anterior_posterior':
        return (
          <svg viewBox="0 0 200 100" className="svg-body" onClick={handleSvgClick}>
            {/* Background Grid Accent */}
            <rect width="200" height="100" fill="none" />
            
            {/* ANTERIOR VIEW (Left Side: 0 to 100 X) */}
            <g transform="translate(10, 0)">
              <text x="40" y="8" fill="var(--text-secondary)" fontSize="5" fontWeight="bold" textAnchor="middle">ANTERIOR VIEW</text>
              {/* Head & Neck */}
              <circle cx="40" cy="18" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 37,25 L 37,30 M 43,25 L 43,30" stroke="currentColor" strokeWidth="1.5" />
              {/* Torso & Arms */}
              <path d="M 28,33 Q 32,30 40,30 Q 48,30 52,33 L 56,60 Q 57,63 54,63 L 50,62 L 48,38 L 47,80 L 41,80 L 41,50 L 39,50 L 39,80 L 33,80 L 32,38 L 30,62 L 26,63 Q 23,63 24,60 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Feet */}
              <path d="M 33,80 L 31,95 L 34,95 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 47,80 L 49,95 L 46,95 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>

            {/* POSTERIOR VIEW (Right Side: 100 to 200 X) */}
            <g transform="translate(110, 0)">
              <text x="40" y="8" fill="var(--text-secondary)" fontSize="5" fontWeight="bold" textAnchor="middle">POSTERIOR VIEW</text>
              {/* Head & Neck */}
              <circle cx="40" cy="18" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 37,25 L 37,30 M 43,25 L 43,30" stroke="currentColor" strokeWidth="1.5" />
              {/* Spine Line */}
              <path d="M 40,30 L 40,58" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              {/* Torso & Arms */}
              <path d="M 28,33 Q 32,30 40,30 Q 48,30 52,33 L 56,60 Q 57,63 54,63 L 50,62 L 48,38 L 47,80 L 41,80 L 41,50 L 39,50 L 39,80 L 33,80 L 32,38 L 30,62 L 26,63 Q 23,63 24,60 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Feet */}
              <path d="M 33,80 L 31,95 L 34,95 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 47,80 L 49,95 L 46,95 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>
          </svg>
        );
      case 'lateral_inner':
        return (
          <svg viewBox="0 0 200 100" className="svg-body" onClick={handleSvgClick}>
            {/* LATERAL VIEW LEFT */}
            <g transform="translate(10, 0)">
              <text x="40" y="8" fill="var(--text-secondary)" fontSize="5" fontWeight="bold" textAnchor="middle">LATERAL RIGHT</text>
              <path d="M 40,12 C 45,12 47,15 45,18 C 43,21 44,23 42,25 C 41,26 42,28 40,30 L 40,33 L 43,33 L 42,60 C 42,65 39,78 37,95 L 34,95 L 36,65 L 34,35 C 34,30 35,12 40,12 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>
            
            {/* LATERAL VIEW RIGHT */}
            <g transform="translate(110, 0)">
              <text x="40" y="8" fill="var(--text-secondary)" fontSize="5" fontWeight="bold" textAnchor="middle">LATERAL LEFT</text>
              <path d="M 40,12 C 35,12 33,15 35,18 C 37,21 36,23 38,25 C 39,26 38,28 40,30 L 40,33 L 37,33 L 38,60 C 38,65 41,78 43,95 L 46,95 L 44,65 L 46,35 C 46,30 45,12 40,12 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>
          </svg>
        );
      case 'genital':
        return (
          <svg viewBox="0 0 200 100" className="svg-body" onClick={handleSvgClick}>
            {/* GENITAL REGIONAL SCHEMATIC */}
            <text x="100" y="10" fill="var(--text-secondary)" fontSize="5" fontWeight="bold" textAnchor="middle">GENITAL DETAILED REGIONAL VIEW</text>
            <g transform="translate(50, 15)">
              {/* Simplified Pelvis and thigh outlines */}
              <path d="M 10,10 L 40,40 L 40,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 90,10 L 60,40 L 60,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Genital outline center */}
              <ellipse cx="50" cy="45" rx="8" ry="15" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Testes */}
              <circle cx="46" cy="62" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="54" cy="62" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>
          </svg>
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

      <div className="canvas-wrapper">
        {renderSilhouettes()}

        {/* Render Markers */}
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

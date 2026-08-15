import React from 'react';
import type { DentitionState } from '../types/report';

interface DentitionChartProps {
  value: DentitionState;
  onChange: (value: DentitionState) => void;
}

export const DentitionChart: React.FC<DentitionChartProps> = ({ value, onChange }) => {
  const toggleTooth = (jaw: 'upper' | 'lower', index: number) => {
    const newJaw = [...(jaw === 'upper' ? value.upperJaw : value.lowerJaw)];
    newJaw[index] = !newJaw[index];

    const updatedValue = {
      ...value,
      [jaw === 'upper' ? 'upperJaw' : 'lowerJaw']: newJaw,
    };

    // Calculate total permanent teeth automatically
    // Standard is 32. Each 'false' (not erupted) subtracts 1.
    const upperErupted = updatedValue.upperJaw.filter(Boolean).length;
    const lowerErupted = updatedValue.lowerJaw.filter(Boolean).length;
    const computedPermanent = upperErupted + lowerErupted;

    onChange({
      ...updatedValue,
      totalPermanent: computedPermanent.toString(),
    });
  };

  const teethNumbersLeft = [8, 7, 6, 5, 4, 3, 2, 1];
  const teethNumbersRight = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleTextChange = (field: keyof Omit<DentitionState, 'upperJaw' | 'lowerJaw'>, val: string) => {
    onChange({
      ...value,
      [field]: val,
    });
  };

  const renderJawRow = (jaw: 'upper' | 'lower', array: boolean[]) => {
    // array length is 16: index 0..7 are left 8..1, index 8..15 are right 1..8
    return (
      <div className="teeth-list">
        {/* Left Side (8 to 1) */}
        {teethNumbersLeft.map((num, i) => {
          const index = i; // 0 to 7
          const isErupted = array[index];
          return (
            <div
              key={`left-${jaw}-${num}`}
              onClick={() => toggleTooth(jaw, index)}
              className={`tooth-box ${isErupted ? 'erupted' : 'not-erupted'}`}
              title={`Tooth ${num} - Left ${jaw === 'upper' ? 'Upper' : 'Lower'}`}
            >
              <span className="tooth-num">{num}</span>
              <span className="tooth-status" style={{ fontSize: '7px' }}>
                {isErupted ? 'E' : 'O'}
              </span>
            </div>
          );
        })}

        {/* Divider */}
        <div className="tooth-divider" />

        {/* Right Side (1 to 8) */}
        {teethNumbersRight.map((num, i) => {
          const index = i + 8; // 8 to 15
          const isErupted = array[index];
          return (
            <div
              key={`right-${jaw}-${num}`}
              onClick={() => toggleTooth(jaw, index)}
              className={`tooth-box ${isErupted ? 'erupted' : 'not-erupted'}`}
              title={`Tooth ${num} - Right ${jaw === 'upper' ? 'Upper' : 'Lower'}`}
            >
              <span className="tooth-num">{num}</span>
              <span className="tooth-status" style={{ fontSize: '7px' }}>
                {isErupted ? 'E' : 'O'}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="dentition-grid-input">
      <div className="jaw-row">
        <div className="jaw-title">Upper Jaw (8 7 6 5 4 3 2 1 | 1 2 3 4 5 6 7 8)</div>
        {renderJawRow('upper', value.upperJaw)}
      </div>

      <div className="jaw-row">
        <div className="jaw-title">Lower Jaw (8 7 6 5 4 3 2 1 | 1 2 3 4 5 6 7 8)</div>
        {renderJawRow('lower', value.lowerJaw)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
        <div className="input-field">
          <label>Total Permanent Teeth</label>
          <input
            type="text"
            value={value.totalPermanent}
            onChange={(e) => handleTextChange('totalPermanent', e.target.value)}
            placeholder="e.g. 32"
          />
        </div>
        <div className="input-field">
          <label>Total Temporary Teeth</label>
          <input
            type="text"
            value={value.totalTemporary}
            onChange={(e) => handleTextChange('totalTemporary', e.target.value)}
            placeholder="e.g. 0"
          />
        </div>
        <div className="input-field" style={{ gridColumn: 'span 2' }}>
          <label>Artificial Teeth (if any)</label>
          <input
            type="text"
            value={value.artificial}
            onChange={(e) => handleTextChange('artificial', e.target.value)}
            placeholder="e.g. NIL"
          />
        </div>
        <div className="input-field" style={{ gridColumn: 'span 2' }}>
          <label>Spacing behind 2nd permanent molar</label>
          <input
            type="text"
            value={value.spacingBehind2ndMolar}
            onChange={(e) => handleTextChange('spacingBehind2ndMolar', e.target.value)}
            placeholder="e.g. NIL or Describe"
          />
        </div>
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0' }}>
        * Tip: Teeth toggled to 'O' (Absent / Not Erupted) will show as circled numbers in the final document, while 'E' (Erupted) will appear normal.
      </p>
    </div>
  );
};

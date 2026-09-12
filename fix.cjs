const fs = require('fs');
let content = fs.readFileSync('src/components/ReportForm.tsx', 'utf8');
content = content.replace(/rows="(\d+)"/g, 'rows={$1}');
content = content.replace(/export const ReportForm = \(\{ data, onChange \}\) => \{/, 'export const ReportForm = ({ data, onChange }: any) => {');
content = content.replace(/import React from 'react';/, '');
fs.writeFileSync('src/components/ReportForm.tsx', content);

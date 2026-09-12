const fs = require('fs');

let content = fs.readFileSync('d:/Accused_victim_app/index.html', 'utf8');
let bodyMatch = content.match(/<body>([\s\S]*?)<\/body>/);
if (bodyMatch) {
  let body = bodyMatch[1];
  
  // Basic conversions
  body = body.replace(/class=/g, 'className=');
  body = body.replace(/for=/g, 'htmlFor=');
  
  // Style conversions
  body = body.replace(/style="([^"]*)"/g, (match, styles) => {
    let obj = {};
    styles.split(';').forEach(s => {
      let parts = s.split(':');
      if (parts.length === 2) {
        let key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        let val = parts[1].trim();
        obj[key] = val;
      }
    });
    return `style={${JSON.stringify(obj)}}`;
  });
  
  // Self-closing tags
  body = body.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');
  body = body.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
  body = body.replace(/<hr([^>]*?[^\/])>/g, '<hr$1 />');
  body = body.replace(/<br>/g, '<br />');
  
  // Event handlers
  body = body.replace(/onclick="([^"]*)"/g, 'onClick={() => {}}');
  body = body.replace(/onchange="([^"]*)"/g, 'onChange={() => {}}');
  
  // Comments
  body = body.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

  // Value props
  body = body.replace(/value="([^"]*)"/g, 'defaultValue="$1"');

  const component = `import React from 'react';

export const ReportForm = ({ data, onChange }) => {
  return (
    <>
      ${body}
    </>
  );
};
`;

  fs.writeFileSync('d:/Accused_victim_app/repo_clone/src/components/ReportForm.tsx', component);
  console.log('Component generated');
} else {
  console.log('No body tag found');
}

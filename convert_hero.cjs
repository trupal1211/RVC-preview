const fs = require('fs');
let html = fs.readFileSync('public/hero-infographic.html', 'utf-8');

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
let css = styleMatch ? styleMatch[1] : '';
css = css.replace(/\*\{[^}]+\}/g, '').replace(/body\{[^}]+\}/g, '');

const sceneMatch = html.match(/<div class="scene">([\s\S]*?)<\/div>\s*\n\s*<\/body>/);
let jsx = sceneMatch ? '<div className="scene">' + sceneMatch[1] + '</div>' : '';

jsx = jsx.replace(/class=/g, 'className=');

jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
    const rules = p1.split(';').filter(r => r.trim().length > 0);
    const obj = rules.map(rule => {
        let parts = rule.split(':');
        if(parts.length < 2) return '';
        let key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        let val = parts.slice(1).join(':').trim();
        return key + ": '" + val + "'";
    }).filter(x => x).join(', ');
    return 'style={{' + obj + '}}';
});

const svgAttrs = ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset', 'preserveAspectRatio', 'viewBox'];
svgAttrs.forEach(attr => {
    const camel = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const regex = new RegExp(attr + '=', 'g');
    jsx = jsx.replace(regex, camel + '=');
});

jsx = jsx.replace(/readonly>/g, 'readOnly />');
jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

const reactComponent = `import React from 'react';

const HeroInfographic = () => {
  return (
    <div className="hero-anim-root relative w-full h-auto overflow-visible bg-transparent font-sans flex justify-center py-10">
      <style>{\`${css}\`}</style>
      ${jsx}
    </div>
  );
};

export default HeroInfographic;
`;

fs.writeFileSync('src/components/HeroInfographic.tsx', reactComponent);
console.log('Successfully created HeroInfographic.tsx');

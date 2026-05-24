const fs = require('fs');
const files = [
  'src/components/WhatIsSection.tsx',
  'src/components/FAQSection.tsx',
  'src/components/CTASection.tsx',
  'src/components/BenefitsSection.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('ScrollFade')) {
    content = content.replace(/import \{ motion \} from ["']framer-motion["'];/, 'import { ScrollFade } from "./ScrollFade";\nimport { motion } from "framer-motion";');
  }

  // Replace <motion.div whileInView...> blocks
  content = content.replace(/<motion\.div[^>]*whileInView=\{[^}]+\}[^>]*>/gs, (match) => {
     let delay = 0;
     const delayMatch = match.match(/delay:\s*([0-9.]+)/);
     if (delayMatch) delay = parseFloat(delayMatch[1]) * 1000;
     
     const classNameMatch = match.match(/className=(["'][^"']+["']|\{[^}]+\})/);
     const cls = classNameMatch ? ` className=${classNameMatch[1]}` : '';
     
     const delayProp = delay ? ` delay={${delay}}` : '';
     return `<ScrollFade${cls}${delayProp}>`;
  });

  // Then replace the closing tags only IF we know they were for whileInView 
  // (Safe fallback: Since we are stripping scroll animations, let's just make sure it parses by replacing the corresponding closing tag)
  // Actually, wait, replacing all </motion.div> to </ScrollFade> will break other motion.divs (like in FAQSection accordion)
  // Let's do a more careful regex approach by replacing the whole tag block, or just using string split/matching.

  // Let's iterate block by block:
  let idx = 0;
  while ((idx = content.indexOf('<ScrollFade')) !== -1) {
      // Find the next </motion.div> after this ScrollFade
      // Wait, the opening tag is ALREADY ScrollFade.
      // But we need to replace its closing tag.
      const closeIdx = content.indexOf('</motion.div>', idx);
      if (closeIdx !== -1) {
          content = content.substring(0, closeIdx) + '</ScrollFade>' + content.substring(closeIdx + 13);
      } else {
          break; // Stop if no matching closing tag found
      }
  }

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});

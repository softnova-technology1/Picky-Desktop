const fs = require('fs');

const hometwoPage = 'd:/DHARSHIKA-S/PROJECTS/Picky-Desktop/Picky-Desktop/src/app/hometwo/page.js';
const footerJsx = 'd:/DHARSHIKA-S/PROJECTS/Picky-Desktop/Picky-Desktop/src/Components/Footer.jsx';
const footerCss = 'd:/DHARSHIKA-S/PROJECTS/Picky-Desktop/Picky-Desktop/src/Stylesheet/Footer.module.css';
const hometwoCss = 'd:/DHARSHIKA-S/PROJECTS/Picky-Desktop/Picky-Desktop/src/app/hometwo/hometwo.module.css';

// 1. Footer.jsx
let footerContent = fs.readFileSync(footerJsx, 'utf-8');

// Extract JSX sections
const newsSectionStart = footerContent.indexOf('<section className={styles.newsSectionMaster}>');
const footerTagStart = footerContent.indexOf('<footer className={styles.footer}>');

const extractedJsx = footerContent.slice(newsSectionStart, footerTagStart);

// Remove the extracted JSX and the wrapping <> and </> from Footer.jsx
// Also update imports
footerContent = footerContent.replace(
  'import { MapPin, Phone, Mail, ShoppingCart, ArrowRight, Truck, RotateCcw, Lock, Headphones } from "lucide-react";',
  'import { MapPin, Phone, Mail } from "lucide-react";'
);
footerContent = footerContent.replace(extractedJsx, '');
// remove <> and </> if they are wrapping the whole return
footerContent = footerContent.replace('<>\n      <footer', '<footer');
footerContent = footerContent.replace('</footer>\n    </>', '</footer>');

fs.writeFileSync(footerJsx, footerContent);

// 2. hometwo/page.js
let hometwoContent = fs.readFileSync(hometwoPage, 'utf-8');
const insertPos = hometwoContent.indexOf('{/* Auth Popup */}');
if (insertPos !== -1) {
  hometwoContent = hometwoContent.slice(0, insertPos) + extractedJsx + '\n      ' + hometwoContent.slice(insertPos);
  fs.writeFileSync(hometwoPage, hometwoContent);
}

// 3. Footer.module.css
let footerCssContent = fs.readFileSync(footerCss, 'utf-8');
const cssExtractStart = footerCssContent.indexOf('/* Global Newsletter & Trust Badges Sections Extracted from HomeTwo */');
if (cssExtractStart !== -1) {
  const extractedCss = footerCssContent.slice(cssExtractStart);
  
  // Remove from Footer
  footerCssContent = footerCssContent.slice(0, cssExtractStart);
  fs.writeFileSync(footerCss, footerCssContent.trim() + '\n');
  
  // Append to Hometwo
  let hometwoCssContent = fs.readFileSync(hometwoCss, 'utf-8');
  hometwoCssContent += '\n\n' + extractedCss;
  fs.writeFileSync(hometwoCss, hometwoCssContent);
}

console.log('Migration completed successfully.');

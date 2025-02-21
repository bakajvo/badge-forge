import fs from 'fs';
import path from 'path';
import { Logger } from './logger.js';
export const interpolateString = (template, params) => {
    let index = 0;
    return template.replace(/\{}/g, () => (params[index++] ?? '') + '');
};
export const saveSVG = (svg, filePath) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, svg, 'utf8');
    Logger.success(`SVG saved into ${filePath}`);
};
let seq = 1;
export const getFilename = (name) => name ?? `badge_${seq++}`;

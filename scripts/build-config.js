// Cloudflare Pages build: emit browser-visible configuration from build variables.
const fs = require('node:fs');
const path = require('node:path');

const names = ['MAPTILER_KEY', 'GOOGLE_SHEETS_KEY', 'GTAG_ID'];
const missing = names.filter((name) => !process.env[name]);
if (missing.length) {
    console.error(`Missing build variables: ${missing.join(', ')}`);
    process.exit(1);
}

const config = Object.fromEntries(names.map((name) => [name, process.env[name]]));
const destination = path.join(process.cwd(), 'Map', 'js', 'config.js');
fs.writeFileSync(destination, `window.API_KEYS = ${JSON.stringify(config, null, 4)};\n`);
console.log('Browser configuration generated.');

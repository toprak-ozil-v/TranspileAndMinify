
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];

const parsedPath = path.parse(inputFile);
const baseName = path.join(parsedPath.dir, parsedPath.name);

const transpiledFile = `${baseName}.transpiled.js`;
const finalFile = `${baseName}.min.js`;


const babelCmd = `babel "${inputFile}" --out-file "${transpiledFile}"`;
const terserCmd = `terser "${transpiledFile}" --config-file terser.config.json --output "${finalFile}"`;

//build old version
try {

  console.log('Transpiling with Babel...');
  execSync(babelCmd, { stdio: 'inherit' });

  console.log('Minifying with Terser...');
  execSync(terserCmd, { stdio: 'inherit' });

} catch (error) {
  console.error('\nFailed');
  process.exit(1); 
  
}
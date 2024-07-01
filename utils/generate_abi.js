const fs = require('fs');
const path = require('path');

// Get the contract name from the command line arguments
const contractName = process.argv[2];
if (!contractName) {
  console.error('Please provide a contract name.');
  process.exit(1);
}

// Construct the path to the compiled contract artifact
const artifactPath = path.join(__dirname, '../back/out', `${contractName}.sol`, `${contractName}.json`);

// Check if the artifact file exists
if (!fs.existsSync(artifactPath)) {
  console.error(`Artifact for ${contractName} not found.`);
  process.exit(1);
}

// Read the artifact file
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

// Extract the ABI
const abi = artifact.abi;

// Specify the output path for the ABI
const abiOutputPath = path.join(__dirname, `${contractName}ABI.json`);

// Write the ABI to a new file
fs.writeFileSync(abiOutputPath, JSON.stringify(abi, null, 2), 'utf8');

console.log(`ABI extracted to ${abiOutputPath}`);
const { LocalStorage } = require('node-localstorage');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Initialize localStorage
const localStorage = new LocalStorage('./scratch');

// Load ABI from a JSON file
const abiPath = path.resolve(__dirname, '../../utils/TrackABI.json'); // Adjust the path as per your file structure
const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const privateKey = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
const wallet = new ethers.Wallet(privateKey, provider);

// Read form data from localStorage
const formData = JSON.parse(localStorage.getItem('formData'));

const trackId = 2;
const { date, location, quantity, info: value } = formData;
const itemType = "Type A";
const name = "Item A";
const origin = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with the origin address
const owner = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with the owner address
const status = 0; // Status.Disponible
const itemHash = ethers.utils.formatBytes32String("hash1234");

async function addTrackItem() {
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    try {
        const tx = await contract.addTrackItem(trackId, date, location, quantity, itemType, name, origin, owner, status, value, itemHash);
        console.log("Transaction sent:", tx.hash);

        const receipt = await tx.wait();
        console.log("Transaction confirmed:", receipt);
    } catch (error) {
        console.error("Error adding track item:", error);
    }
}

async function getTrackItems() {
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
        const items = await contract.getTrackItems(trackId);
        console.log("Track Items:", items);
    } catch (error) {
        console.error("Error fetching track items:", error);
    }
}

async function main() {
    await addTrackItem();
    await getTrackItems();
}

main().catch(console.error);

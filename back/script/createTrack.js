
const { ethers } = require("ethers");
const fs = require('fs');
const path = require('path');

const abiPath = path.resolve(__dirname, '../../utils/TrackABI.json'); // Adjust the path as per your file structure
const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const privateKey = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
const wallet = new ethers.Wallet(privateKey, provider);

const trackId = 2;
const date = "2023-07-08";
const location = "Location A";
const quantity = "100";
const itemType = "Type A";
const name = "Item A";
const origin = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with the origin address
const owner = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with the owner address
const status = 0; // Status.Disponible
const value = "Value A";
const itemHash = ethers.encodeBytes32String("hash1234");

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

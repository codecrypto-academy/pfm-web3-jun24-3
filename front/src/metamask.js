const ethers = require('ethers');

export async function connectWallet() {
if (window.ethereum) {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        return provider;
    } catch (error) {
        console.error("User denied account access", error);
        return null;
    }
} else {
    console.error("No Ethereum wallet detected");
    return null;
  }
}

export async function getAccount() {
  const provider = await connectWallet();
  if (provider) {
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    return { provider, account };
  } else {
    console.error("Failed to connect to provider");
    return null;
  }
}

export async function getBalance(account, provider) {
  try {
    const balance = await provider.getBalance(account);
    const formattedBalance = ethers.utils.formatEther(balance);
    return formattedBalance; // Format balance in Ether
  } catch (error) {
    console.error("Failed to get balance", error);
    return null;
  }
}
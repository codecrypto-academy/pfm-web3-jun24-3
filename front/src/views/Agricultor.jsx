import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useAppContext  } from '../contexts/AppContext';

const AgricultorTrackingForm = () => {

    const { account, setAccount, balance, setBalance, provider, setProvider, signer, setSigner,
		userManagementContractAddress, userManagementContractABI,
        trackManagementContractAddress, trackManagementContractABI,
		contractUser, setContractUser, users, setUsers,
		currentRole, setCurrentRole, roles, roleList, setTrackId } = useAppContext();

    const [formData, setFormData] = useState({
        date: '',
        location: '',
        quantity: '',
        info: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false); // Estado adicional para el mensaje de confirmación


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        // Proceed with adding track item
        await addTrackItem(formData);

        setIsSubmitted(true); // Mostrar el mensaje de confirmación
    };

    const addTrackItem = async (data) => {
        //const contractAddress = trackManagementContractAddress;
        //const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
        //const privateKey = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
        //const wallet = new ethers.Wallet(privateKey, provider);

        const number = Math.floor(Date.now() / 1000);
        const trackId = number;
        setTrackId(number);
        const { date, location, quantity, info: value } = data;
        const itemType = "Type A";
        const name = "Item A";
        //const origin = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with the origin address
       // const owner = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with the owner address
        const status = 0; // Status.Disponible
        const itemHash = ethers.utils.formatBytes32String("hash1234");

        const contract = new ethers.Contract(trackManagementContractAddress, trackManagementContractABI, signer);

        try {
            const tx = await contract.addTrackItem(trackId, date, location, quantity, itemType, name, account, account, status, value, itemHash);
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction confirmed:", receipt);
        } catch (error) {
            console.error("Error adding track item:", error);
        }
    };

    const labelStyle = {
        display: 'inline-block',
        width: '250px',
        marginRight: '10px'
    };

    return (
        <div>
            {isSubmitted ? (
                <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#000000', marginTop:'24px'}}>🎉 Registro completado 🎉</h1>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}></div>
                    <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#000000', marginBottom: '20px' }}>✍🏻 Añadir Información al Track ✍🏻</h1>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={labelStyle}>Fecha:</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={labelStyle}>Ubicación:</label>
                        <input type="text" name="location" value={formData.location} style={{ width: '300px' }} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={labelStyle}>Cantidad:</label>
                        <input type="number" name="quantity" value={formData.quantity} style={{ width: '75px' }} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={labelStyle}>Información Adicional:</label>
                        <input type="text" name="info" value={formData.info} style={{ width: '600px' }} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '30px', justifyContent: 'center' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="submit">Registrar</button>
                    </div>
                </form>
            )}
        </div>
    );

};

export default AgricultorTrackingForm;

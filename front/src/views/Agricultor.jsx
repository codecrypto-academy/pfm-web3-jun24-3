import React, { useState, useEffect } from 'react';
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
    const [trackIds, setTrackIds] = useState([]);
    const [expandedTracks, setExpandedTracks] = useState({});

    useEffect(() => {
        fetchTracks();
    }, []);

    const fetchTracks = async () => {

        console.log('trackManagementContractAddress: ', trackManagementContractAddress);
        console.log('trackManagementContractABI: ', trackManagementContractABI);
        console.log('signer: ', signer);

        const contract = new ethers.Contract(trackManagementContractAddress, trackManagementContractABI, signer);

        if(contract){
            try {
                console.log('Fetching tracks');

                const tracks  = await contract.getAllTrackIds();

                setTrackIds(tracks.map(id => id.toString())); // Cobert BigNumber to string to be able render in react
                console.log('Retrieved tracks : ', tracks);
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        }
        else{
            console.error('Undefined track contract reference');
        }

    };

    const expandTrack = async (trackId) => {

        const contract = new ethers.Contract(trackManagementContractAddress, trackManagementContractABI, signer);

        if (expandedTracks[trackId]) {
            setExpandedTracks(prev => ({ ...prev, [trackId]: false }));
        } 
        else {
            try {

            const trackItems = await contract.getTrackItems(trackId);

            setExpandedTracks(prev => ({ ...prev, [trackId]: trackItems }));
            } 
            catch (error) {
            console.error(`Error fetching track items for trackId ${trackId}:`, error);
            }
        }
    };


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


        const number = Math.floor(Date.now() / 1000);
        const trackId = number;
        setTrackId(number);
        const { date, location, quantity, info: value } = data;
        const itemType = "Uva";
        const name = "Prueba Piloto";
        const status = 0; // Status.Disponible
        const itemHash = ethers.utils.formatBytes32String("hash");

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
        <div style={{ marginBottom: '50px' }} >
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

<div className='bg-white text-black text-center py-4'>
                <div className='bg-light border p-2'>
                    <h3>Track list</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">TrackId</th>
                                <th scope="col">Track Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trackIds.map((trackId) => (
                                <tr key={trackId}>
                                    <td>{trackId}</td>
                                    <React.Fragment key={trackId}>
                                        <div onClick={() => expandTrack(trackId)}>
                                        Click to show track details
                                        </div>
                                        {expandedTracks[trackId] && (
                                        <div className="text-start">
                                            <ul>
                                                {expandedTracks[trackId].map((item, index) => (
                                                    <li key={index}>
                                                        <p>Date: {item.date}</p>
                                                        <p>Location: {item.location}</p>
                                                        <p>Quantity: {item.quantity}</p>
                                                        <p>Item Type: {item.itemType}</p>
                                                        <p>Name: {item.name}</p>
                                                        <p>Origin: {item.origin}</p>
                                                        <p>Owner: {item.owner}</p>
                                                        <p>Status: {item.status}</p>
                                                        <p>Value: {item.value}</p>
                                                        <p>Item Hash: {item.itemHash}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        )}
                                    </React.Fragment>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );

};

export default AgricultorTrackingForm;

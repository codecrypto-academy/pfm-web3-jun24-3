import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAppContext } from '../contexts/AppContext';

const Bodegero = () => {
    const { account, signer, trackManagementContractAddress, trackManagementContractABI, trackId } = useAppContext();

    const [tracks, setTracks] = useState([]);
    const [isSelected, setIsSelected] = useState(null);
    const [showSelection, setShowSelection] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        date: '',
        location: '',
        quantity: '',
        info: ''
    });

    useEffect(() => {
        fetchTracks();
    }, []);

    const fetchTracks = async () => {
        const contract = new ethers.Contract(trackManagementContractAddress, trackManagementContractABI, signer);
		console.log("signer: ", signer);
        try {
            const tracks = await contract.getTrackItems(trackId);
            setTracks(tracks);
        } catch (error) {
            console.error('Error fetching tracks:', error);
        }
    };

    const handleSelectionChange = (id) => {
        setIsSelected(id);
    };

    const handleTrace = () => {
        if (isSelected !== null) {
            setShowSelection(false);
            setShowForm(true);
        } else {
            alert('Seleccione una opción');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTrackItem(formData);
        setIsSubmitted(true);
        setShowForm(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const addTrackItem = async (data) => {
        const trackId = isSelected;
        const { date, location, quantity, info: value } = data;
        const itemType = "Type B";
        const name = "Item B";
        const status = 0; // Status.Disponible
        const itemHash = ethers.utils.formatBytes32String("hash1234");

        const contract = new ethers.Contract(trackManagementContractAddress, trackManagementContractABI, signer);
		console.log("contract contetn: ", contract);

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

    const selectedData = tracks.find(item => item.id === isSelected);

    return (
        <div>
            {isSubmitted ? (
                <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#000000', marginTop: '24px' }}>🎉 Registro completado 🎉</h1>
            ) : (
                <>
                    {showSelection && (
                        <div className='bg-white text-black text-center py-4'>
                            <div className='bg-light border p-2'>
                                <h3>Seleccione el registro a añadir información</h3>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Seleccion</th>
                                            <th scope="col">Origen</th>
                                            <th scope="col">Información</th>
                                            <th scope="col">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tracks.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="transportistaSelection"
                                                        value={item.id}
                                                        checked={isSelected === item.id}
                                                        onChange={() => handleSelectionChange(item.id)}
                                                    />
                                                </td>
                                                <td>{item.location}</td>
                                                <td>{item.info}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button className='btn btn-dark' onClick={handleTrace}>
                                    Seleccionar Registro
                                </button>
                            </div>
                        </div>
                    )}

                    {showForm && (
                        <div>
                            {selectedData && (
                                <div className='bg-white text-black text-center py-4'>
                                    <div className='bg-light border p-2'>
                                        <h3>Registro Seleccionado</h3>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Origen</th>
                                                    <th scope="col">Información</th>
                                                    <th scope="col">Cantidad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{selectedData.location}</td>
                                                    <td>{selectedData.info}</td>
                                                    <td>{selectedData.quantity}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '20px' }}></div>
                                <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#000000', marginBottom: '20px' }}>✍🏻 Añadir Información al Track ✍🏻</h1>
                                <div style={{ marginBottom: '20px' }}>
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
                                <div style={{ marginBottom: '100px', justifyContent: 'center' }}></div>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Bodegero;

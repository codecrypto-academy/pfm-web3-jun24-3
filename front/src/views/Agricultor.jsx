import React, { useState } from 'react';

const AgricultorTrackingForm = () => {
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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		setIsSubmitted(true); // Mostrar el mensaje de confirmación
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

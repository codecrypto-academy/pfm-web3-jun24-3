import React, { useState } from 'react';

const Transportista = () => {
	const [isSelected, setIsSelected] = useState(null);
	const [showSelection, setShowSelection] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const data = [
		{ id: 1, date: '2023-07-01', location: 'Albacete', info: 'Uvas tipo 1', quantity: '500' },
		{ id: 2, date: '2023-07-02', location: 'Galicia', info: 'Uvas tipo 2', quantity: '300' },
		{ id: 3, date: '2023-07-03', location: 'Andalucía', info: 'Uvas tipo 3', quantity: '400' },
		{ id: 4, date: '2023-07-04', location: 'Murcia', info: 'Uvas tipo 4', quantity: '200' },
		{ id: 5, date: '2023-07-05', location: 'La Rioja', info: 'Uvas tipo 5', quantity: '600' }
	];

	const [formData, setFormData] = useState({
		date: '',
		location: '',
		quantity: '',
		info: ''
	});

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

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitted(true);
		setShowForm(false);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const labelStyle = {
		display: 'inline-block',
		width: '250px',
		marginRight: '10px'
	};

	const selectedData = data.find(item => item.id === isSelected);

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
										{data.map((item) => (
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

export default Transportista;

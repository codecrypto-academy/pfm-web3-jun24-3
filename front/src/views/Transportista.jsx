
function Transportista() {

	return (
		<div className='bg-white text-black text-center py-4 '>
		<div className='bg-light border p-2'>
		<h3>TRANSPORTISTA</h3>
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">Seleccion</th>
						<th scope="col">Origen</th>
						<th scope="col">Información</th>
						<th scope="col">Cantidad</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><input class="form-check-input" type="checkbox" value="" id="flexCheck1"/></td>
						<td>Albacete</td>
						<td>Uvas tipo 1</td>
						<td>500 kg</td>
					</tr>
					<tr>
						<td><input class="form-check-input" type="checkbox" value="" id="flexCheck2"/></td>
						<td>Galicia</td>
						<td>Uvas tipo2</td>
						<td>300 kg</td>
					</tr>
					<tr>
						<td><input class="form-check-input" type="checkbox" value="" id="flexCheck3"/></td>
						<td>Andalucia</td>
						<td>Uvas tipo 3</td>
						<td>400 kg</td>
					</tr>
				</tbody>
			</table>
			<button className='btn btn-dark' id="storeSelected">Trazar</button>
		</div>
		</div>
	);
}
export default Transportista;


function Admin() {

	return (
		<div className='bg-white text-black text-center py-4 '>
		<div className='bg-light border p-2'>
			<h3>ADMIN</h3>
			<table class="table table-bordered">
				<thead>
					<tr >
						<th scope="col">Seleccion</th>
						<th scope="col">Usuario</th>
						<th scope="col">Role</th>
						<th scope="col">Estado</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><input class="form-check-input" type="checkbox" value="" id="flexCheck1"/></td>
						<td>Usuario1</td>
						<td>Rol1</td>
						<td>Registrado</td>
					</tr>
					<tr>
						<td><input class="form-check-input" type="checkbox" value="" id="flexCheck2"/></td>
						<td>Usuario2</td>
						<td>Rol2</td>
						<td>Pendiente</td>
					</tr>
					<tr>
						<td><input class="form-check-input" type="checkbox" value="" id="flexCheck3"/></td>
						<td>Usuario3</td>
						<td>Rol3</td>
						<td>Registrado</td>
					</tr>
				</tbody>
			</table>
			<button className='btn btn-dark' id="storeSelected">Trazar</button>
			
		</div>
		</div>
	);
}
export default Admin;

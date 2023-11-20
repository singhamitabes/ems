import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
	const [data, setData] = useState({
		name: '',
		email: '',
		address: '',
		salary: '',
	})
	const navigate = useNavigate()

	const { id } = useParams();

	useEffect(() => {
		axios.get('http://localhost:4000/ems/getforEdit/' + id)
			.then(res => {
				setData({
					...data, name: res.data.Result.name,
					email: res.data.Result.email,
					address: res.data.Result.address,
					salary: res.data.Result.salary
				})
			})
			.catch(err => console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault()
		axios.put(`http://localhost:4000/ems/update/${id}`,data)
			.then(res => {
				if (res.data.Status === "Success") {
					const id = res.data.user._id;
					navigate('/employeedetail/' + id);
				}
			})
			.catch(err => console.error("Error updating employee:", err));
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Update Employee</h2>
			<form className="row g-3 w-50" onSubmit={handleSubmit}>
				<div className="col-12">
					<label htmlFor="inputName" className="form-label">Name</label>
					<input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
						onChange={e => setData({ ...data, name: e.target.value })} value={data.name} />
				</div>
				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
						onChange={e => setData({ ...data, email: e.target.value })} value={data.email} />
				</div>
				<div className="col-12">
					<label htmlFor="inputSalary" className="form-label">Salary</label>
					<input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
						onChange={e => setData({ ...data, salary: e.target.value })} value={data.salary} />
				</div>
				<div className="col-12">
					<label htmlFor="inputAddress" className="form-label">Address</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
						onChange={e => setData({ ...data, address: e.target.value })} value={data.address} />
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Update</button>
				</div>
			</form>
		</div>
	)
}

export default EditEmployee
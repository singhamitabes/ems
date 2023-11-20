import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EmployeeDetail() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({})
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:4000/ems/get/' + id, { headers: { Authorization: token } })
            .then(res => setEmployee(res.data.Result))
            .catch(err => console.log(err));
    }, [id])
    const handleLogout = () => {
        localStorage.removeItem("token");
        alert('You have logged out successfully!')
        navigate('/start')
    }
    const handleEdit = (id) => {
        navigate('/editemployee/' + id);
    }
    return (
        <div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                {employee.image && (
                    <img src={`http://localhost:4000/${employee.image}`} alt="" className='empImg' />
                )}
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: {employee.salary}</h3>
                </div>
                <div>
                    <button className='btn btn-primary me-2' onClick={() => handleEdit(employee._id)}>Edit</button>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetail
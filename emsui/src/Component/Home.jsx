import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [adminCount, setAdminCount] = useState()
  const [employeeCount, setEmployeeCount] = useState()
  const [salary, setSalary] = useState()
  const [admin, setadmin] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/ems/adminCount')
    // .then(res=>console.log("Admincount",res))
      .then(res => {
        setAdminCount(res.data.admin)
      }).catch(err => console.log(err));

    axios.get('http://localhost:4000/ems/employeeCount')
      .then(res => {
        setEmployeeCount(res.data.totalDocuments)
      }).catch(err => console.log(err));

    axios.get('http://localhost:4000/ems/salary')
      .then(res => {
        setSalary(res.data.totalSalary)
      }).catch(err => console.log(err));

    axios.get('http://localhost:4000/ems/getAdminDetails')
      .then(res => {
        setadmin(res.data.Result)
      })

  }, [])
  const handleDelete =(item)=>{
    axios.delete(`http://localhost:4000/ems/delete/${item}`)
    .then(response => {
      console.log(response.data);
      alert("Employee deleted successfully");
      window.location.reload();
    }).catch(err => console.log(err));
  }
  
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {employeeCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {salary}</h5>
          </div>
        </div>
      </div>

      {/* List of admin  */}
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <div className='mt-3'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admin.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <Link to={`/itemEdit/` + item.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                      <button onClick={e => handleDelete(item._id)} className='btn btn-sm btn-danger'>delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default Home
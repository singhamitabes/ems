import React from 'react'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Profile from './Profile'
import Home from './Home'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import Start from './Start'
import EmployeeDetail from './EmployeeDetail'
import EmployeeLogin from './EmployeeLogin'
import "./style.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route path='' element={<Home />}/>
          <Route path='/employee' element={<Employee />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/create' element={<AddEmployee />}/>
          <Route path='/employeeEdit/:id' element={<EditEmployee />}/>
        </Route>
        <Route path='/login' element={<Login />}/>
        <Route path='/start' element={<Start />}/>
        <Route path='/employeeLogin' element={<EmployeeLogin />}/>
        <Route path='/employeedetail/:id' element={<EmployeeDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
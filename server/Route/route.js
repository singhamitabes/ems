const express = require("express")
const router = express.Router()

const {createEmpData,getEmployee,adminCount,employeeCount,salary,createAdmData,employeeLogin,getEmployeeDetails, logout, adminLogin,dashboard,verifyUser,getEmpDetailsId} = require("../Controller/controller")
const  uploadMiddleware = require('../FileuploadMiddleware/UploadMiddleware')


router.route("/employeeCount").get(employeeCount)
router.route("/salary").get(salary)
router.route("/adminCount").get(adminCount)
router.route("/getEmployee").get(getEmployee)
// router.route("/login").post(login)
router.route("/createemp").post(uploadMiddleware.single('image'),createEmpData)  
router.route("/createadm").post(uploadMiddleware.single('image'),createAdmData)
router.route("/employeelogin").post(employeeLogin)  
router.route("/get/:id'").post(getEmployeeDetails)  
router.route("/logout").get(logout)  
router.route("/adminLogin").post(adminLogin) 
router.route("/dashboard").get(verifyUser, dashboard)  
router.route("/get/:id").get(getEmpDetailsId) 


module.exports = router




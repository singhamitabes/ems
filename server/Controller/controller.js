const adminList = require('../Model/admin')
const EmployeeList = require('../Model/employee')
const jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt");


const createEmpData = async (req, res) => {
  const { name, email, password, address, salary, image } = req.body;
  const imagePath = req.file.path; // Assuming req.file is properly set up

  try {
    // Check if an employee with the same email already exists
    const existingEmp = await EmployeeList.findOne({ email: email });
    if (existingEmp) {
      return res.status(400).json({ error: "Employee Record is Already Present" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee record
    const empRec = await EmployeeList .create({
      name: name,
      email: email,
      password: hashedPassword,
      address: address,
      salary: salary,
      image: imagePath // Using the imagePath
    });

    res.status(201).json(empRec);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}; 

const createAdmData = async (req, res) => {
  const { name, email, password, address, salary, image } = req.body;
  const imagePath = req.file.path; // Assuming req.file is properly set up

  try {
    // Check if an admin with the same email already exists
    const existingAdm = await adminList.findOne({ email: email });
    if (existingAdm) {
      return res.status(400).json({ error: "Admin is Already Present" });
    }

    // Create a new Admin record
    const admRec = await adminList.create({
      name, email, password, address, salary, image: imagePath // Using the imagePath
    });

    res.status(201).json(admRec);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employees = await EmployeeList.find(); // Use the Mongoose model to find all employees
    res.status(200).json({ Status: "Success", Result: employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: "Get employee error in MongoDB" });
  }
};

const adminCount = async (req, res) => {
  // try {
  //   const count = await test.adminlists("users").countDocuments();
  //   res.json({ admin: count });
  // } catch (err) {
  //   console.error("Error in running query:", err);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
};


const employeeCount = async (req, res) => {
  // try {
  //   const count = await db.collection(collectionName).countDocuments();
  //   res.json({ employee: count });
  // } catch (err) {
  //   console.error('Error in running query:', err);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
};

const salary = async (req, res) => {
  // try {
  //   const result = await db.collection(collectionName).aggregate([
  //     { $group: { _id: null, sumOfSalary: { $sum: "$salary" } } }
  //   ]).toArray();

  //   if (result.length === 0) {
  //     return res.json({ sumOfSalary: 0 }); // Return 0 if there are no documents
  //   }

  //   return res.json(result[0]);
  // } catch (err) {
  //   console.error("Error in running query:", err);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
};


const employeeLogin = async (req, res) => {
  try {
    const employee = await EmployeeList.findOne({ email: req.body.email });

    if (!employee) {
      return res.status(401).json({ Status: 'Error', Error: 'Wrong Email or Password' });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password.toString(),
      employee.password
    );

    if (passwordMatch) {
      const id = employee._id.toString();
      const token = jwt.sign({ role: 'employee', d: id }, 'JSONWEBTOKEN', {
        expiresIn: '1d',
      });
      
      // Set the token as a cookie
      res.cookie('token', token, { httpOnly: true });

      return res.json({ Status: 'Success', id });
    } else {
      return res.status(401).json({ Status: 'Error', Error: 'Wrong Email or Password' });
    }
  } catch (err) {
    return res.status(500).json({ Status: 'Error', Error: 'Error in running query' });
  }
}


const getEmployeeDetails = (req, res) => {
  const id = req.params.id;
  const db = client.db(test);

  db.collection(employeelists).findOne({ _id: new ObjectID(id) }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Get employee error in MongoDB" });
    }
    if (!result) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ status: "Success", result });
  });
}
const logout = async (req, res) => {
  console.log(req.cookies)
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Find the user by their token and remove the token from the database
    await User.findOneAndUpdate({ token }, { token: null });

    // Clear the token cookie on the client-side
    res.clearCookie('token');

    return res.json({ Status: 'Success' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const adminLogin = (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  adminList.findOne({ email, password }, (err, result) => {
    if (err) return res.status(500).json({ Status: "Error", Error: "Error in running query" });
    if (result) {
      const id = result._id.toString();
      // Replace 'your-secret-key' with your actual JWT secret key
      const token = jwt.sign({ role: "admin" }, "JSONWEBTOKEN", { expiresIn: '1d' });
      res.cookie('token', token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  })
}
// const login = async (req, res) => {
//   const { email, password } = req.body
//   console.log(email, password)
//   try {
//     const existingUser = await EmployeeList.findOne({ email: email })
//     if (!existingUser) {
//       return res.status(404).json({ status: "error", Error: "Wrong Email or Password" })
//     }
//     if (existingUser && existingUser.password === password) {
//       return res.status(200).json({ status: "Success" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ status: "error", Error: "An error occurred" });
//   }
// }
const dashboard = (req, res) => {
  return res.status(200).json({ Status: "Success", role: req.role, id: req.id });
}
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "JSONWEBTOKEN", (err, decoded) => {
      if (err) return res.status(401).json({ Error: "Token is invalid" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

const getEmpDetailsId = async (req, res) => {
  const id = req.params.id;
  
  try {
    const result = await EmployeeList.findById(id);
    
    if (!result) {
      return res.status(404).json({ Error: 'Employee not found' });
    } 
    return res.json({ Status: 'Success', Result: result });
  } catch (err) {
    return res.status(500).json({ Error: 'Get employee error in MongoDB' });
  }
}

module.exports = {createEmpData, getEmployee, adminCount, employeeCount, salary, createAdmData, employeeLogin, getEmployeeDetails,logout,adminLogin ,dashboard,verifyUser,getEmpDetailsId}



const Employee = require('../models/employeeModel');
const upload = require('../middleware/upload'); // Import the multer config

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};




// exports.createEmployee = async (req, res) => {
//   const { name, email, mobile, designation, gender, course } = req.body;
//   const image = req.file ? req.file.filename : '';

//   try {
//     const employee = await Employee.create({ name, email, mobile, designation, gender, course, image });
//     res.json({ message: 'Employee created successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course } = req.body;
  const image = req.file ? req.file.filename : '';

  try {
    let employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });

    employee.name = name;
    employee.email = email;
    employee.mobile = mobile;
    employee.designation = designation;
    employee.gender = gender;
    employee.course = course;
    if (image) {
      employee.image = image;
    }

    await employee.save();
    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
const mongoose = require('mongoose');

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate that the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Employee ID' });
        }

        // Find the employee by ID and remove
        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json({ msg: 'Employee deleted' });
    } catch (err) {
        console.error('Error deleting employee:', err); // Log the error
        res.status(500).json({ error: 'Server error' });
    }
};


// exports.deleteEmployee = async (req, res) => {
//   try {
//     await Employee.findByIdAndRemove(req.params.id);
//     res.json({ msg: 'Employee deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };



// const Employee = require('../models/employeeModel');

// // Get all employees
// exports.getEmployees = async (req, res) => {
//     try {
//         const employees = await Employee.find();
//         res.json(employees);
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// // Create a new employee
// exports.createEmployee = async (req, res) => {
//     const { name, email, mobileNo, designation, gender, course, image } = req.body;

//     try {
//         // Check if email already exists
//         const existingEmployee = await Employee.findOne({ email });
//         if (existingEmployee) {
//             return res.status(400).json({ message: 'Employee with this email already exists' });
//         }

//         // Create new employee
//         const employee = new Employee({
//             name,
//             email,
//             mobileNo,
//             designation,
//             gender,
//             course,
//             image,
//         });

//         await employee.save();
//         res.status(201).json({ message: 'Employee created successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// // Update an existing employee
// exports.updateEmployee = async (req, res) => {
//     const { id } = req.params;
//     const { name, email, mobileNo, designation, gender, course, image } = req.body;

//     try {
//         let employee = await Employee.findById(id);
//         if (!employee) return res.status(404).json({ message: 'Employee not found' });

//         // Update employee details
//         employee.name = name;
//         employee.email = email;
//         employee.mobileNo = mobileNo;
//         employee.designation = designation;
//         employee.gender = gender;
//         employee.course = course;
//         employee.image = image;
          
//         await employee.save();
//        return res.json({ message: 'Employee updated successfully', employee });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// // Delete an employee
// exports.deleteEmployee = async (req, res) => {
//     try {
//         const employee = await Employee.findById(req.params.id);
//         console.log("employee",employee)
//         if (!employee) return res.status(404).json({ message: 'Employee not found' });

//         await Employee.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Employee deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

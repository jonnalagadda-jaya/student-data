import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import StudentForm from './StudentForm';
import StudentDetailsPopup from './StudentDetailsPopup'; 

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);  
  const [addStudentVisible, setAddStudentVisible] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      let response = await fetch("https://studentmgmtapi.vercel.app/api/allStudents");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      setStudents(data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (student) => {
    try {
      let response = await fetch("/api/createStudent", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchStudents();
      setAddStudentVisible(false);  
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const editStudent = async (student) => {
    try {
      let response = await fetch("/api/editStudent", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchStudents();
      setEditingStudent(null); 
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  const deleteStudent = async (emailId) => {
    try {
      let response = await fetch("/api/deleteStudent", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const filteredStudents = students.filter(
    student => student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               student.emailId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const studentsPerPage = 8;
  const displayedStudents = filteredStudents.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage);

  return (
    <div className={`student-table ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <input 
        type="text" 
        placeholder="Search by First Name, Last Name or Email Id" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <button className='addstudent' onClick={() => setAddStudentVisible(true)}>Add Student</button>

      {editingStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Student</h2>
              <StudentForm 
                student={editingStudent}
                saveStudent={editStudent}
                cancel={() => setEditingStudent(null)}
              />
            </div>
          </div>
        </div>
      )}

      {addStudentVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Student</h2>
              <StudentForm 
                student={{}}
                saveStudent={addStudent}
                cancel={() => setAddStudentVisible(false)}
              />
            </div>
          </div>
        </div>
      )}

      {viewStudent && (
        <StudentDetailsPopup 
          student={viewStudent} 
          onClose={() => setViewStudent(null)}
        />
      )}
       { <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Id</th>
              <th>Mobile Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.map((student, index) => (
              <tr key={student.emailId}>
                <td>{index + 1}</td>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.emailId}</td>
                <td>{student.mobileNumber}</td>
                <td>
                  <button className='view' onClick={() => setViewStudent(student)}>View</button>
                  <button className='edit' onClick={() => setEditingStudent(student)}>Edit</button>
                  <button className='delete' onClick={() => deleteStudent(student.emailId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      <div className="pagination">
        {[...Array(Math.ceil(filteredStudents.length / studentsPerPage)).keys()].map(page => (
          <button key={page + 1} onClick={() => setCurrentPage(page + 1)}>
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentTable;


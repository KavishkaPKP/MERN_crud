import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';


// show data to table
// get data from backend

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const getdata = async (e) => {
    const res = await fetch("api/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log(data)
    if (res.status === 400 || !data) {
      console.log("Error fetching data");
    } else {
      setUserdata(data);
      console.log("get Data", data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  //end for show data to table


  //delete User

  const deleteUser = async (id) => {
    const res = await fetch(`/api/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const deletedData = await res.json();
    console.log(deletedData);

    if (res.status === 400 || !deletedData) {
      console.log("Error deleting user");
      setAlert({ type: "danger", message: "Error deleting user" }); 
    } else {
      setAlert({ type: "success", message: "User deleted successfully" }); 
      getdata();
    }
  };

  //downlaoding user details as PDF
  const downloadPDF = (user) => {
    const doc = new jsPDF();

    try {
      // Optional: Add date/time
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const timeStr = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      const filename = `${user.name}_details_${dateStr}_${timeStr}.pdf`;

      doc.setFontSize(16);
      doc.text("User Details", 10, 10);

      doc.setFontSize(12);
      doc.text(`Name: ${user.name}`, 10, 30);
      doc.text(`Email: ${user.email}`, 10, 40);
      doc.text(`Mobile: ${user.mobile}`, 10, 50);
      doc.text(`Work: ${user.work}`, 10, 60);

      doc.save(filename);
      setAlert({ type: "success", message: "User Details Donloaded successfully" });

    } catch (error) {
      console.error("Error generating PDF:", error);
      setAlert({ type: "danger", message: "Error generating PDF" });
      return;

    }
  };
  return (


    <div className='mt-5'>
      <div className="container overflow-auto">
        <div className="add_btn mt-2 d-flex justify-content-end">
          <NavLink to="/register" className="no-underline"> <button className='btn btn-primary'><AddIcon /> Add Data</button></NavLink>
        </div>

        {/* Alert box */}
        {alert.message && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
        <table className="table mt-3">
          <thead>
            <tr className='table-dark'>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Job</th>
              <th scope="col">Mobile</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
            {
              getuserdata.length > 0 ? (
                getuserdata.map((element, id) => (
                  <tr key={element._id}>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>
                    <td className='d-flex justify-content-between'>

                      <NavLink to={`view/${element._id}`}>
                        <button className='btn btn-success'><RemoveRedEyeIcon /></button>
                      </NavLink>

                      <NavLink to={`edit/${element._id}`}>
                        <button className='btn btn-primary'><EditIcon /></button>
                      </NavLink>

                      <button className='btn btn-danger' onClick={() => deleteUser(element._id)}><DeleteIcon /></button>
                      <button className='btn btn-warning' onClick={() => downloadPDF(element)} >
                        <DownloadIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No data found</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
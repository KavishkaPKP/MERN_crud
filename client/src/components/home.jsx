import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';


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
      setAlert({ type: "danger", message: "User deleted successfully" });

    } else {
      setAlert({ type: "success", message: "Error deleting user" });
      console.log("User deleted successfully", deletedData);
      getdata(); // Refresh the data after deletion

    }
  };





  return (
    <div className='mt-5'>
      <div className="container overflow-auto">
        <div className="add_btn mt-2 d-flex justify-content-end">
          <NavLink to="/register" className="no-underline"> <button className='btn btn-primary'><AddIcon /> Add Data</button></NavLink>
        </div>
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
                      <button className='btn btn-warning' ><DownloadIcon /></button>
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
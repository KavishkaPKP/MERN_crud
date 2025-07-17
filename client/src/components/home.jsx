import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import EditModal from "./edit_modal.jsx";

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" })

  //popup modal state
  const [showModal, setShowModal] = useState(false);
  
  const [selectedUserId, setSelectedUserId] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch("/api/getdata"); // update this URL as needed
      const data = await res.json();
      if (res.ok) {
        setUserdata(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const downloadPDF = (user) => {
    const doc = new jsPDF();

    try {
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      const timeStr = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
      const filename = `${user.name}_details_${dateStr}_${timeStr}.pdf`;

      doc.setFontSize(16);
      doc.text("User Details", 10, 10);

      doc.setFontSize(12);
      doc.text(`Name: ${user.name}`, 10, 30);
      doc.text(`Email: ${user.email}`, 10, 40);
      doc.text(`Mobile: ${user.mobile}`, 10, 50);
      doc.text(`Work: ${user.work}`, 10, 60);

      doc.save(filename);
      setAlert({ type: "success", message: "User details downloaded successfully" });
    } catch (error) {
      console.error("Error generating PDF:", error);
      setAlert({ type: "danger", message: "Error generating PDF" });
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/deleteuser/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setAlert({ type: "success", message: "User deleted successfully" });
        getData();
      } else {
        setAlert({ type: "danger", message: "Failed to delete user" });
      }
    } catch (error) {
      console.error("Delete error:", error);
      setAlert({ type: "danger", message: "Error deleting user" });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Welcome to Pasindu Kavishka</h2>

      {alert.message && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      <div className="add_btn mt-2 mb-2 text-end">
        <NavLink to="/register" className="btn btn-primary">
          <AddIcon /> Add Data
        </NavLink>
      </div>

      <table className="table">
        <thead>
          <tr className="table-dark text-center">
            <th scope="col">ID</th>
            <th scope="col">User</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Job</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {getuserdata.map((element, id) => (
            <tr key={element._id} className="text-center">
              <th scope="row">{id + 1}</th>
              <td>{element.name}</td>
              <td>{element.email}</td>
              <td>{element.mobile}</td>
              <td>{element.work}</td>
              <td>
                <NavLink to={`/view/${element._id}`}>
                  <button className="btn btn-success mx-2">
                    <RemoveRedEyeIcon />
                  </button>
                </NavLink>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => {
                    setSelectedUserId(element._id);
                    setShowModal(true);
                  }}
                >
                  <EditIcon />
                </button>
                <button className="btn btn-danger mx-2" onClick={() => deleteUser(element._id)}>
                  <DeleteIcon />
                </button>
                <button className="btn btn-info mx-2" onClick={() => downloadPDF(element)}>
                  <DownloadIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
  <EditModal
    show={showModal}
    handleClose={() => setShowModal(false)}
    userId={selectedUserId}
    onUserUpdated={() => {
      getData();
      setShowModal(false);
    }}
  />
)}
    </div>
  );
};

export default Home;
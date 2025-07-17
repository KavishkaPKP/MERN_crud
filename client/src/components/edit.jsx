import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [inpval, setInpval] = useState({
    name: "",
    address: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    description: ""
  });

  // Handle input change
  const setdata = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Fetch user data on component mount
  const getuser = async () => {
    try {
      const res = await fetch(`/api/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      setInpval(data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setAlert({ type: "danger", message: "Failed to load user data" });
    }
  };

  useEffect(() => {
    getuser();
  }, [id]);

  // Update user
  const updateuser = async (e) => {
    e.preventDefault();
    const { name, address, email, age, mobile, work, description } = inpval;

    try {
      const res = await fetch(`/api/updateuser/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, address, email, age, mobile, work, description })
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({ type: "danger", message: "SORRY! Failed to update user." });
        console.error("Update failed:", data);
      } else {
        setAlert({ type: "success", message: "User updated successfully" });
        // Optional: navigate back to home after update
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setAlert({ type: "danger", message: "Failed to update user" });
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <NavLink to="/">← Back to Home</NavLink>
      </div>

      {alert.message && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      <form onSubmit={updateuser}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={inpval.name} onChange={setdata} />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" name="address" value={inpval.address} onChange={setdata} />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={inpval.email} onChange={setdata} />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="age" className="form-label">Age</label>
            <input type="number" className="form-control" name="age" value={inpval.age} onChange={setdata} />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input type="tel" className="form-control" name="mobile" value={inpval.mobile} onChange={setdata} />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="work" className="form-label">Work</label>
            <input type="text" className="form-control" name="work" value={inpval.work} onChange={setdata} />
          </div>

          <div className="mb-3 col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" name="description" rows="5" value={inpval.description} onChange={setdata}></textarea>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Update Information</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
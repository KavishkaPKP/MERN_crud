import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [inpval, setInpval] = useState({
    name: "",
    address: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    description: ""
  });

  const [alert, setAlert] = useState({ type: "", message: "" });

  const setdata = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, address, email, age, mobile, work, description } = inpval;

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, address, email, age, mobile, work, description
        })
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        setAlert({ type: "danger", message: data?.message || "Invalid Registration" });
        console.error("Error:", data);

      } else {

        setAlert({ type: "success", message: "Registration Successful" });
        console.log("Registration Successful", data);
// Clear form fields after successful registration
        setInpval({
          name: "",
          address: "",
          email: "",
          age: "",
          mobile: "",
          work: "",
          description: ""
        });
      }

      // Auto-dismiss alert after 5 seconds
      setTimeout(() => setAlert({ type: "", message: "" }), 5000);

    } catch (err) {
      console.error("Network or parsing error:", err);
      setAlert({ type: "danger", message: "Network or parsing error" });
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <NavLink to="/">← Back to Home</NavLink>
      </div>

      {/* Alert box */}
      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <form onSubmit={addinpdata}>
        <div className="row">

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={inpval.name} onChange={setdata} />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name="address" value={inpval.address} onChange={setdata} />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={inpval.email} onChange={setdata} />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="age" className="form-label">Age</label>
            <input type="number" className="form-control" id="age" name="age" value={inpval.age} onChange={setdata} />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input type="tel" className="form-control" id="mobile" name="mobile" value={inpval.mobile} onChange={setdata} />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="work" className="form-label">Work</label>
            <input type="text" className="form-control" id="work" name="work" value={inpval.work} onChange={setdata} />
          </div>

          <div className="mb-3 col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" rows="5" value={inpval.description} onChange={setdata} />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default Register;
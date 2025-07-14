import React, { useState } from 'react'; // ✅ FIXED: imported useState
import { NavLink } from 'react-router-dom';

const Edit = () => { // ✅ Capitalized component name

  const [inpval, setInpval] = useState({
    name: "",
    address: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    description: ""
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inpval);
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <NavLink to="/">← Back to Home</NavLink>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={inpval.name}
              onChange={setdata}
            />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={inpval.address}
              onChange={setdata}
            />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={inpval.email}
              onChange={setdata}
            />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={inpval.age}
              onChange={setdata}
            />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              name="mobile"
              value={inpval.mobile}
              onChange={setdata}
            />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="work" className="form-label">Work</label>
            <input
              type="text"
              className="form-control"
              id="work"
              name="work"
              value={inpval.work}
              onChange={setdata}
            />
          </div>

          <div className="mb-3 col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="5"
              value={inpval.description}
              onChange={setdata}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
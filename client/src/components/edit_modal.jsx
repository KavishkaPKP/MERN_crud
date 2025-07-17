import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';


//crud code start
const EditModal = ({ show, handleClose, userId, onUserUpdated }) => {
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

  // Load user when modal opens
  useEffect(() => {
    if (show && userId) {
      getUser();
    }
  }, [show, userId]);

  const getUser = async () => {
    try {
      const res = await fetch(`/api/getuser/${userId}`);
      const data = await res.json();
      if (res.ok) {
        setInpval(data);
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (err) {
      setAlert({ type: "danger", message: "Failed to load user" });
    }
  };

  const setdata = (e) => {
    const { name, value } = e.target;
    setInpval(prev => ({ ...prev, [name]: value }));
  };

  // Update user
  const updateuser = async (e) => {
    e.preventDefault();
    const { name, address, email, age, mobile, work, description } = inpval;

    try {
      const res = await fetch(`/api/updateuser/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, address, email, age, mobile, work, description })
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({ type: "danger", message: data.message || "Failed to update user" });
      } else {
        setAlert({ type: "success", message: "User updated successfully" });
        onUserUpdated(); // Refresh parent
        setTimeout(() => {
          setAlert({ type: "", message: "" });
          handleClose();
        }, 1000);
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setAlert({ type: "danger", message: "Error updating user" });
    }
  };

  //crud code end

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
        <Form onSubmit={updateuser}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={inpval.name} onChange={setdata} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={inpval.address} onChange={setdata} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={inpval.email} onChange={setdata} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" name="age" value={inpval.age} onChange={setdata} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="tel" name="mobile" value={inpval.mobile} onChange={setdata} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Work</Form.Label>
            <Form.Control type="text" name="work" value={inpval.work} onChange={setdata} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={inpval.description} onChange={setdata} />
          </Form.Group>
          <div className="text-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
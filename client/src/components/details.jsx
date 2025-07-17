import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [getUserdata, setUserdata] = useState({});
    const [alert, setAlert] = useState({ type: "", message: "" });

    const getuser = async () => {
        try {
            const res = await fetch(`/api/getuser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (!res.ok) {
                console.log("Error fetching data");
            } else {
                setUserdata(data);
                console.log("Fetched user data:", data);
            }
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    useEffect(() => {
        getuser();
    }, [id]);

    //delete user
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
        } else {
            setAlert({ type: "success", message: "User deleted successfully" });
            navigate('/');
        }
    };


    //downlaod user details as PDF
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
            doc.text(`Address: ${user.address}`, 10, 70);
            doc.text(`Description: ${user.description}`, 10, 80);

            doc.save(filename);
            setAlert({ type: "success", message: "User Details Donloaded successfully" });

        } catch (error) {
            console.error("Download error:", error);
            setAlert({ type: "danger", message: "Error downloading user details" });

        }


    };




    return (
        <div className="container mt-3">
            <div className="mb-4">
                <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/">← Back to Home</NavLink>
            </div>
            <h1 style={{ fontWeight: 400 }}>{getUserdata.name || 'User'}</h1>

            {/* Alert box */}
            {alert.message && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <div className="row">
                        <div className="col-md-6 d-flex flex-column align-items-start mb-3">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/146/146035.png"
                                alt="profile"
                                style={{
                                    width: 100,
                                    borderRadius: '50%',
                                    marginBottom: '15px',
                                }}
                            />
                            <p>Name: <span className="text-muted">{getUserdata.name}</span></p>
                            <p>Age: <span className="text-muted">{getUserdata.age}</span></p>
                            <p><MailIcon /> Email: <span className="text-muted">{getUserdata.email}</span></p>
                            <p><WorkIcon /> Occupation: <span className="text-muted">{getUserdata.work}</span></p>
                        </div>

                        <div className="col-md-6 d-flex flex-column align-items-start">
                            <div className="mb-3 d-flex gap-2">
                                <NavLink to={`/edit/${getUserdata._id}`}>
                                    <button className="btn btn-primary"><EditIcon /> Edit</button>
                                </NavLink>

                                <button className="btn btn-danger" onClick={() => deleteUser(getUserdata._id)}>
                                    <DeleteIcon /> Delete
                                </button>

                                <button className='btn btn-warning' onClick={() => downloadPDF(getUserdata)}>
                                    <DownloadIcon /> Download Details
                                </button>
                            </div>

                            <p className="mt-3"><PhoneAndroidIcon /> Phone: <span className="text-muted">{getUserdata.mobile}</span></p>
                            <p><LocationOnIcon /> Location: <span className="text-muted">{getUserdata.address}</span></p>
                            <p>Description: <span className="text-muted">{getUserdata.description}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Details;
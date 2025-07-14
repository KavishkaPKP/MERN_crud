import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink } from 'react-router-dom';

const Details = () => {
    return (
        <div className="container mt-3">
            <div className="mb-4">
                <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/">← Back to Home</NavLink>
            </div>
            <h1 style={{ fontWeight: 400 }}>Welcome to Pasindu Kavishka</h1>

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <div className="row">
                        {/* Left View */}
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

                            <p>Name: <span className="text-muted">Pasindu Kavishka</span></p>
                            <p>Age: <span className="text-muted">21</span></p>
                            <p><MailIcon /> Email: <span className="text-muted">pasindu@example.com</span></p>
                            <p><WorkIcon /> Occupation: <span className="text-muted">Web Developer</span></p>
                        </div>

                        {/* Right View */}
                        <div className="col-md-6 d-flex flex-column align-items-start">
                            <div className="mb-3 d-flex gap-2">
                                <button className="btn btn-primary"><EditIcon /> Edit</button>
                                <button className="btn btn-danger"><DeleteIcon /> Delete</button>
                            </div>

                            <p className="mt-3"><PhoneAndroidIcon /> Phone: <span className="text-muted">+94 74148 9971</span></p>
                            <p><LocationOnIcon /> Location: <span className="text-muted">Dekatana</span></p>
                            <p>Description: <span className="text-muted">
                                is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                type and scrambled it to make a type specimen book.
                            </span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Details;
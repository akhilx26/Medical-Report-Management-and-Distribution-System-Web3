import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import ManPatients from "./ManPatients";
import doctor from "../admin-images/doctor.png";
import path from "../admin-images/path.png";
import patient from "../admin-images/patient.png";
import pharm from "../admin-images/pharm.png";

const Admin = () => {
  const handleDoctorClick = () => {
    <NavLink to="/register">Sign Up</NavLink>;
  };

  return (
    <div>
        <div>
            <header className="header1">
                <nav className="navbar">
                    <a href="/doctors">Manage Doctors</a>
                    <a href="/patients">Manage Patients</a>
                    <a href="/pathologists">Manage Pathologists</a>
                    <a href="/pharmacists">Manage Pharmacists</a>
                    <a href="/" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Logout</a>
                </nav>
            </header>
        </div>
        
        <div className="background"></div>

        <div className="container1">
            <div className="content1">
                <div className="card1">
                    <img src={doctor}></img>
                    <div className="intro">
                        <div className="inner-card">
                            <h4>Manage Doctors</h4>
                            <p>Add, Delete and Update the Doctors in the Hospital.</p>
                            <button><NavLink className="link" to="/doctors">Go<i class='bx bxs-right-arrow' ></i></NavLink></button>
                        </div>
                    </div>
                </div>
                <div className="card1">
                    <img src={patient}></img>
                    <div className="intro">
                        <div className="inner-card">
                            <h4>Manage Patients</h4>
                            <p>Add, Delete and Update the Patients in the Hospital.</p>
                            <button><NavLink className="link" to="/patients">Go<i class='bx bxs-right-arrow' ></i></NavLink></button>
                        </div>
                    </div>
                </div>
                <div className="card1">
                    <img src={path}></img>
                    <div className="intro">
                        <div className="inner-card">
                            <h4>Manage Pathologists</h4>
                            <p>Add, Delete and Update the Pathologists in the Hospital.</p>
                            <button><NavLink className="link" to="/pathologists">Go<i class='bx bxs-right-arrow' ></i></NavLink></button>
                        </div>
                    </div>
                </div>  
                <div className="card1">
                    <img src={pharm}></img>
                    <div className="intro">
                        <div className="inner-card">
                            <h4>Manage Pharmacists</h4>
                            <p>Add, Delete and Update the Pharmacists in the Hospital.</p>
                            <button><NavLink className="link" to="/pharmacists">Go<i class='bx bxs-right-arrow' ></i></NavLink></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      {/* <div>
                <h2>Welcome Admin!</h2>
            </div>
            <div>
                <div>
                    <button className="admin-buttons doctor-card"><p><NavLink to="/doctors">Manage Doctors</NavLink></p></button>
                    <button className="admin-buttons patient-card"><p><NavLink to="/patients">Manage Patients</NavLink></p></button>
                    <button className="admin-buttons pharm-card"><p><NavLink to="/pharmacists">Manage Pharmacists</NavLink></p></button>
                    <button className="admin-buttons path-card"><p><NavLink to="/pathologists">Manage Pathologists</NavLink></p></button>
                </div>
            </div>
            <div>
                <p>~"Health is the greatest of Human Blessings"~</p>
            </div> */}
    </div>
  );
};

export default Admin;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { Web3Button } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./address";


const PatientList = ({ handleTreat }) => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoadingData } = useContractRead(contract, "showOurPatients", []);

    useEffect(() => {
        if (data && !isLoadingData) {
            const formattedPatients = data.map((patient) => ({
                address: patient.patientAddress,
                name: patient.name,
                age: patient.age.toString(),
            }));

            setPatients(formattedPatients);
        }
    }, [data, isLoadingData]);

    if (!patients) {
        return <div>Loading...</div>;
    }

    return (
        <div className="patient-list">

            <div>
                <header className="header2">
                    <nav className="navbar">
                        <a href="/doctor" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Home</a>
                        <a href="/" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Logout</a>
                    </nav>
                </header>
            </div>


            <div className="background"></div>


            <div className="container2">
                <div className="welcome-doc-div"><h3 className="welcome-doc">Welcome Doctor!</h3></div>
                <h3 className="patient-list-title">List of Patients</h3>      
                <div className="content2">
                    {patients.map((patient) => (
                        <div className="patient-card" key={patient.address}>
                            <h3>{patient.name}</h3>
                            <p>Address: {patient.address}</p>
                            <p>Age: {patient.age}</p>
                            <button onClick={() => navigate(`/treatpatient`)}>Treat<i class='bx bxs-right-arrow' ></i></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PatientList;
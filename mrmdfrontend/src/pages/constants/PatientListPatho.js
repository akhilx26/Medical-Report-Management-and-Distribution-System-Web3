import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./address";

const Component = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    
    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "getRequestedPatients", []);

    useEffect(() => {
        if (data && !isLoading) {
            const formattedPatients = data.map((patient) => ({
                address: patient.patientAddress,
                name: patient.name,
                age: patient.age.toString(),
                testType: patient.testType
            }));

            setPatients(formattedPatients);
        }
    }, [data, isLoading]);

    if (isLoading) {
        return (
            <div className="background"></div>
        );
    }

    return (
        <div className="patient-list">

            <div>
                <header className="header2">
                    <nav className="navbar">
                        <a href="/path" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Home</a>
                        <a href="/" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Logout</a>
                    </nav>
                </header>
            </div>


            <div className="background"></div>


            <div className="container2">
                <div className="welcome-doc-div"><h3 className="welcome-doc">Welcome Pathologist!</h3></div>
                <h3 className="patient-list-title">Patients with Test Requests</h3>      
                <div className="content2">
                    {patients.map((patient) => (
                        <div className="patient-card" key={patient.address}>
                            <h2>{patient.name}</h2>
                            <p>Address: {patient.address}</p>
                            <p>Age: {patient.age}</p>
                            <p>Test Type: {patient.testType}</p>
                            <button onClick={() => navigate(`/conducttest`)}>Conduct Pathology Test</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>




        // <div>
        //     <h1>List of Patients with Pending Test Requests</h1>
        //     {patients.map((patient) => (
        //         <div key={patient.address}>
        //             <h2>{patient.name}</h2>
        //             <p>Address: {patient.address}</p>
        //             <p>Age: {patient.age}</p>
        //             <p>Test Type: {patient.testType}</p>
        //             <button onClick={() => navigate(`/conducttest`)}>Conduct Pathology Test</button>
        //         </div>
        //     ))}
        // </div>
    );
};

export default Component;
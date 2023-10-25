import React, { useState, useEffect } from "react";
import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address";
import { Web3Button } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "getPatientsWithMedicationNotDelivered", []);
    const { mutateAsync: markMedicationDelivered, isLoading: isMarkingMedication } = useContractWrite(
        contract,
        "markMedicationDelivered"
    );

    const [patientAddress, setPatientAddress] = useState("");

    useEffect(() => {
        if (data && !isLoading) {
            const formattedPatients = data.map((patient) => ({
                address: patient.patientAddress,
                name: patient.name,
                age: patient.age.toString(),
                medicationName: patient.medicationName,
            }));

            setPatients(formattedPatients);
        }
    }, [data, isLoading]);

    const handleMarkMedicationDelivered = async () => {
        try {
            const data = await markMedicationDelivered({ args: [patientAddress] });
            setPatientAddress("");
            console.info("Medication marked as delivered successfully");
        } catch (err) {
            console.error("Failed to mark medication as delivered", err);
        }
    };

    function alertToast(msg){
        toast.success(msg)
    }

    return (

        <div className="patient-list">

            <div>
                <header className="header2">
                    <nav className="navbar">
                        <a href="/" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Logout</a>
                    </nav>
                </header>
            </div>


            <div className="background"></div>


            <div className="container2">
                <div className="welcome-doc-div"><h3 className="welcome-doc">Welcome Pharmacist!</h3></div>
                <h3 className="patient-list-title">List of Patients with Medication Not Delivered</h3>      
                <div className="content2">
                    {patients.map((patient) => (
                        <div className="patient-card" key={patient.address}>
                            <h2>{patient.name}</h2>
                            <p>Address: {patient.address}</p>
                            <p>Age: {patient.age}</p>
                            <p>Medication Name: {patient.medicationName}</p>
                        </div>
                    ))}
                </div>
                <div className="deliver-meds">
                    <input
                        type="text"
                        placeholder="Patient Address"
                        value={patientAddress}
                        onChange={(e) => setPatientAddress(e.target.value)}
                    />
                    <Web3Button
                        className="deliver-button"
                        contractAddress={CONTRACT_ADDRESS}
                        action={handleMarkMedicationDelivered}
                        disabled={isMarkingMedication}
                        onSuccess={()=>{
                            alertToast("Medicines Delivered Successfully!")
                        }}
                    >
                        Proceed to Deliver
                    </Web3Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PatientList;
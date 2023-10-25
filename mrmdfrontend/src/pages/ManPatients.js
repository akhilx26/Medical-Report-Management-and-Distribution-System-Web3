import React from "react";
import { useState, useEffect } from "react";
import { Web3Button } from '@thirdweb-dev/react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address"
import addpatient from "../admin-images/add-patient.png";
import removepatient from "../admin-images/remove-patient.png";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ManagePatients = () => {
    const [addPatientAddress, setAddPatientAddress] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [diseaseName, setDiseaseName] = useState("");
    const [medicationName, setMedicationName] = useState("");
    const [dosage, setDosage] = useState("");
    const [instructions, setInstructions] = useState("");
    const [sampleCollected, setSampleCollected] = useState("");
    const [testType, setTestType] = useState("");
    const [observations, setObservations] = useState("");
    const [patients, setPatients] = useState([]);
    const [removePatientAddress, setRemovePatientAddress] = useState('');

    function resetForm() {
        setPatientName('');
        setAddPatientAddress('');
        setPatientAge('');
        setRemovePatientAddress('');
        setDiseaseName("");
        setMedicationName("");
        setDosage("");
        setInstructions("");
        setSampleCollected("");
        setTestType("");
        setObservations("");
    }

    function alertToast(msg){
        toast.success(msg)
    }

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "showOurPatients", []);
    const { mutateAsync: removePatient, isLoading: removePatientLoading } = useContractWrite(contract, "removePatient");

    useEffect(() => {
        if (data) {
            const formattedPatients = data.map((patient) => ({
                address: patient.patientAddress,
                name: patient.name,
                age: patient.age.toString(),
            }));

            setPatients(formattedPatients);
        }
    }, [data]);

    const handleRemovePatient = async () => {
        await removePatient({ args: [removePatientAddress] });
        resetForm();
    }

    return (
        <div className="admin-page">
            <div>
                <header className="header1">
                    <nav className="navbar">
                        <a href="/admin" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Home</a>
                        <a href="/doctors">Manage Doctors</a>
                        <a href="/pathologists">Manage Pathologists</a>
                        <a href="/pharmacists">Manage Pharmacists</a>
                    </nav>
                </header>
            </div>
        
            <div className="background"></div>

            <div className="container2">
                <div className="content2">
                    <div className="card20">
                        <img className="add-img" src={addpatient}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Add Patient</h4>
                                <br/>
                                <div className="add-patient-details">
                                    <div>
                                        <input
                                            type='text'
                                            placeholder='Wallet Address'
                                            value={addPatientAddress}
                                            onChange={(e) => setAddPatientAddress(e.target.value)}
                                        />
                                        <br/>
                                        <br/>
                                        <input
                                            type='text'
                                            placeholder='Name'
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                        />
                                        <br/><br/>
                                        <input
                                            type='number'
                                            placeholder='Age'
                                            value={patientAge}
                                            onChange={(e) => setPatientAge(e.target.value)}
                                        />
                                        <br/>
                                        <br/>
                                        <input
                                            type="text"
                                            placeholder="Disease Name"
                                            value={diseaseName}
                                            onChange={(e) => setDiseaseName(e.target.value)}
                                        />
                                        <br/>
                                        <br/>
                                        <input
                                            type="text"
                                            placeholder="Medication Name"
                                            value={medicationName}
                                            onChange={(e) => setMedicationName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                    <input
                                        type="text"
                                        placeholder="Dosage"
                                        value={dosage}
                                        onChange={(e) => setDosage(e.target.value)}
                                    />
                                    <br/>
                                    <br/>
                                    <input
                                        type="text"
                                        placeholder="Instructions"
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                    />
                                    <br/><br/>
                                    <input
                                        type="text"
                                        placeholder="Sample Collected"
                                        value={sampleCollected}
                                        onChange={(e) => setSampleCollected(e.target.value)}
                                    />
                                    <br/><br/>
                                    <input
                                        type="text"
                                        placeholder="Test Type"
                                        value={testType}
                                        onChange={(e) => setTestType(e.target.value)}
                                    />
                                    <br/><br/>
                                    <input
                                        type="text"
                                        placeholder="Observations"
                                        value={observations}
                                        onChange={(e) => setObservations(e.target.value)}
                                    />
                                    </div>
                                </div>
                                <br/>
                                <Web3Button
                                    className="submit-button1 submit-add"
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={(contract) => contract.call(
                                        "addPatient",
                                        [
                                            addPatientAddress,
                                            patientName,
                                            patientAge,
                                            diseaseName,
                                            medicationName,
                                            dosage,
                                            instructions,
                                            sampleCollected,
                                            testType,
                                            observations
                                        ]
                                    )}
                                    onSuccess={() => {
                                        resetForm()
                                        alertToast("Patient Added Successfully!")
                                    }}
                                >
                                    Add Patient
                                </Web3Button>
                            </div>
                        </div>
                    </div>
                    <div className="card2">
                        <img src={removepatient}/>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Remove Patient</h4>
                                <br/>
                                <input
                                    type="text"
                                    placeholder="Wallet Address"
                                    value={removePatientAddress}
                                    onChange={(e) => setRemovePatientAddress(e.target.value)}
                                />
                                <br/>
                                <Web3Button
                                    className="submit-button submit-remove"
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={handleRemovePatient}
                                    disabled={removePatientLoading}
                                    onSuccess={()=>{
                                        resetForm()
                                        alertToast("Patient Removed Successfully!")
                                    }}
                                >
                                    Remove Patient
                                </Web3Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {patients.map((patient) => (
                        <div className="list-content" key={patient.address}>
                            <div>
                                <h3 style={{ color: "#222222" }}>{patient.name}</h3>
                            </div>
                            <div>
                                <p style={{ color: "#666666" }}>Address: {patient.address}</p>
                                <p style={{ color: "#666666" }}>Age: {patient.age}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ManagePatients;
import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { CONTRACT_ADDRESS } from "./constants/address";
import Ipfs from "./Ipfs"
import patientreport from "../admin-images/patient-report.png";
import addprescrip from "../admin-images/add-prescrip.png";
import requesttest from "../admin-images/request-test.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Doctor() {
    const [patientAddress, setPatientAddress] = useState("");
    const [medicationName, setMedicationName] = useState("");
    const [dosage, setDosage] = useState("");
    const [instructions, setInstructions] = useState("");
    const [patient, setPatient] = useState(null);
    const [showPatientInfo, setShowPatientInfo] = useState(false);
    const [patients, setPatients] = useState([]);
    const [testName, setTestName] = useState("");

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoadingData } = useContractRead(contract, "showOurPatients", []);
    const { mutateAsync: addPrescription, isLoading } = useContractWrite(contract, "addPrescription");
    const { data: patientData, loading } = useContractRead(contract, "getPatient", [patientAddress]);
    const { mutateAsync: requestTest, isRequestingTest } = useContractWrite(contract, "requestTest");


    function alertToast(msg){
        toast.success(msg)
    }

    const handleAddPrescription = async () => {
        try {
            await addPrescription({ args: [patientAddress, medicationName, dosage, instructions] });
            console.info("contract call success");
            // Reset the form
            setPatientAddress("");
            setMedicationName("");
            setDosage("");
            setInstructions("");
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    const handleRequestTest = async () => {
        try {
            await requestTest({ args: [patientAddress, testName] });
            console.info("contract call successs");
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    const handleGenerateReport = () => {
        setShowPatientInfo(true);
    };

    useEffect(() => {
        if (patientData) {
            const [
                address,
                name,
                age,
                diseaseName,
                prescription,
                medicationDelivered,
                testRequested,
                sampleCollected,
                testType,
                observations,
            ] = patientData;


            const formattedPatient = {
                address,
                name,
                age: age.toString(),
                diseaseName,
                prescription: {
                    medicationName: prescription[0],
                    dosage: prescription[1].toString(),
                    instructions: prescription[2],
                },
                medicationDelivered,
                testRequested,
                sampleCollected,
                testType,
                observations,
            };

            setPatient(formattedPatient);
        }
    }, [patientData]);

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

    return (
        <div>
            <div>
                <header className="header2">
                    <nav className="navbar">
                        <a href="/doctor" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Home</a>
                        <a href="/" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Logout</a>
                    </nav>
                </header>
            </div>

            <div className="background1"></div>

            <div className="container2">
                <div className="content2">

                    <div className="card2">
                        <img src={addprescrip}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Add Prescription</h4>
                                <input
                                    type="text"
                                    placeholder="Patient Address"
                                    value={patientAddress}
                                    onChange={(e) => setPatientAddress(e.target.value)}
                                />
                                <br/>
                                <input
                                    type="text"
                                    placeholder="Medication Name"
                                    value={medicationName}
                                    onChange={(e) => setMedicationName(e.target.value)}
                                />
                                <br/>
                                <input
                                    type="number"
                                    placeholder="Dosage"
                                    value={dosage}
                                    onChange={(e) => setDosage(e.target.value)}
                                />
                                <br/>
                                <input
                                    type="text"
                                    placeholder="Instructions"
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                />
                                <br/>
                                <Web3Button
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={handleAddPrescription}
                                    disabled={isLoading}
                                    onSuccess={()=>{
                                        alertToast("Prescription Added Successfully!")
                                    }}
                                >
                                    Add Prescription
                                </Web3Button>
                            </div>
                        </div>
                    </div>

                    <div className="card2">
                        <img src={requesttest}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Request Test</h4>
                                <input
                                    type="text"
                                    placeholder="Patient Address"
                                    value={patientAddress}
                                    onChange={(e) => setPatientAddress(e.target.value)}
                                />
                                <br/>
                                <input
                                    type="text"
                                    placeholder="Test Name"
                                    value={testName}
                                    onChange={(e) => setTestName(e.target.value)}
                                />
                                <br/>
                                <Web3Button
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={handleRequestTest}
                                    disabled={isRequestingTest}
                                    onSuccess={()=>{
                                        alertToast("Test Requested Successfully!")
                                    }}
                                >
                                    Request Test
                                </Web3Button>
                            </div>
                        </div>
                    </div>

                    <div className="card2">
                        <img src={patientreport}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Patient Report</h4>
                                <input
                                    type="text"
                                    placeholder="Patient Address"
                                    value={patientAddress}
                                    onChange={(e) => setPatientAddress(e.target.value)}
                                />
                                <br/>
                                <Web3Button
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={handleGenerateReport}
                                    disabled={loading}
                                    onSuccess={()=>{
                                        alertToast("Report Generated Successfully!")
                                    }}
                                >
                                    Generate Report
                                </Web3Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background2"></div>
            <div className="container3">
                <Ipfs />
                <div className="content3">
                    {showPatientInfo && patient && (
                        <div className="report-contents">
                            <h2>Patient Information</h2>
                            <p>Address: {patient.address}</p>
                            <p>Name: {patient.name}</p>
                            <p>Age: {patient.age}</p>
                            <p>Disease Name: {patient.diseaseName}</p>
                            <p>Medication Delivered: {patient.medicationDelivered.toString()}</p>
                            <p>Test Requested: {patient.testRequested.toString()}</p>
                            <h2>Prescription</h2>
                            <p>Medication Name: {patient.prescription.medicationName}</p>
                            <p>Dosage: {patient.prescription.dosage}</p>
                            <p>Instructions: {patient.prescription.instructions}</p>
                            <p>Test Type: {patient.testType}</p>
                            <p>Sample Collected: {patient.sampleCollected}</p>
                            <p>Pathologist Observations: {patient.observations}</p>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
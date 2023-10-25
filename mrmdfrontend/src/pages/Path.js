import React, { useState } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address";
import { Web3Button } from "@thirdweb-dev/react";
import pathobv from "../admin-images/path-obv.png";
import Ipfs from "./Ipfs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PathologistPage = () => {
    const [patientAddress, setPatientAddress] = useState("");
    const [sampleCollected, setSampleCollected] = useState("");
    const [observations, setObservations] = useState("");
    const [showObservations, setShowObservations] = useState(false);
    const [sample, setSample] = useState("");
    const [patientAdd, setPatientAdd] = useState("");
    const [obv, setObv] = useState("")

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { mutateAsync: addObservations, isLoading } = useContractWrite(contract, "addObservations");

    const handleAddObservations = async () => {
        try {
            await addObservations({ args: [patientAddress, sampleCollected, observations] });
            console.info("Observations added successfully");
            // Reset form fields

            setPatientAddress("");
            setSampleCollected("");
            setObservations("");
            setShowObservations(true);
        } catch (err) {
            console.error("Error adding observations", err);
        }
    };

    function alertToast(msg){
        toast.success(msg)
    }

    return (

        <div>
            <div>
                <header className="header2">
                    <nav className="navbar">
                        <a href="/path" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Home</a>
                        <a href="/" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Logout</a>
                    </nav>
                </header>
            </div>

            <div className="background1"></div>

            <div className="container2">
                <div className="content2">

                    <div className="card2">
                        <img src={pathobv}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Add Observations</h4>
                                <br/>
                                <input
                                    type="text"
                                    placeholder="Patient Address"
                                    value={patientAddress}
                                    onChange={(e) => {
                                        setPatientAddress(e.target.value)
                                        setPatientAdd(e.target.value)
                                    }}
                                />
                                <br/>
                                <input
                                    type="text"
                                    placeholder="Sample Collected"
                                    value={sampleCollected}
                                    onChange={(e) => {
                                        setSampleCollected(e.target.value)
                                        setSample(e.target.value);
                                    }}
                                />
                                <br/>
                                <input
                                    type="text"
                                    placeholder="Observations"
                                    value={observations}
                                    onChange={(e) => {
                                        setObservations(e.target.value)
                                        setObv(e.target.value)
                                    }}
                                />
                                <br/>
                                <Web3Button
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={handleAddObservations}
                                    disabled={isLoading}
                                    onSuccess={()=>{
                                        alertToast("Pathology Observations Added Successfully!")
                                    }}
                                >
                                    Add
                                </Web3Button>
                            </div>
                        </div>
                    </div>
                    <Ipfs/>
                </div>
            </div>

            {/* <div className="background2"></div> */}
            <div className="container3">
                <div className="content3">
                    {showObservations &&(
                        <div className="report-contents">
                            <h2>Observations</h2>
                            <br/>
                            <p>Patient Address: {patientAdd}</p>
                            <p>Sample Collected: {sample}</p>
                            <p>Pathologist Observations: {obv}</p>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
        
    );
};

export default PathologistPage;




// doctor will first inspect patient, and then he will request test, and then patho 
// writes his observations, and then he will update his report, doc should be able to see
// that report and then write prescription 
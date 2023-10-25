import React from "react";
// import Model from "react-modal"
import { useState, useEffect } from "react";
import { Web3Button } from '@thirdweb-dev/react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address"
import adddoctor from "../admin-images/remove-doctor.png";
import removedoctor from "../admin-images/remove1-doctor.png";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ManDoctors = () => {


    const customStyles = {
        content: {
            position: 'absolute',
            width: "500px",
            height: "500px",
            borderRadius: "5%",
            top: '100px',
            left: '500px',
            right: '500px',
            bottom: '100px',
            overflow: 'auto',
            outline: 'none',
            padding: '40px',
        },
    };

    const [addDoctorAddress, setAddDoctorAddress] = useState(''); 
    const [doctorName, setDoctorName] = useState('');
    const [doctorAge, setDoctorAge] = useState('');
    const [doctors, setDoctors] = useState([])
    const [removeDoctorAddress, setRemoveDoctorAddress] = useState('');

    // const [doctorDetails, setDoctorDetails] = useState(null);

    function resetForm() {
        setDoctorName('');
        setAddDoctorAddress(''); 
        setDoctorAge('');
        setRemoveDoctorAddress('');
        // setAddDoctor(false);
    }

    function alertToast(msg){
        toast.success(msg)
    }

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "showOurDoctors", []);
    const { mutateAsync: removeDoctor, isLoading: removeDoctorLoading } = useContractWrite(contract, "removeDoctor")


    useEffect(() => {
        if (data) {
            const formattedDoctors = data.map((doctor) => ({
                address: doctor.newdocaddress,
                name: doctor.name,
                age: doctor.age.toString(),
            }));

            setDoctors(formattedDoctors);
        }
    }, [data]);

    const handleRemoveDoctor = async () => {
        await removeDoctor({ args: [removeDoctorAddress] });
        resetForm();
    }

    
    return(
        <div className="admin-page">

            <div>
                <header className="header1">
                    <nav className="navbar">
                        <a href="/admin" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Home</a>
                        <a href="/patients">Manage Patients</a>
                        <a href="/pathologists">Manage Pathologists</a>
                        <a href="/pharmacists">Manage Pharmacists</a>
                    </nav>
                </header>
            </div>
        
            <div className="background"></div>

            <div className="container2">
                <div className="content2">
                    <div className="card2">
                        <img src={adddoctor}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Add Doctor</h4>
                                <input
                                    type='text'
                                    placeholder='Wallet Address'
                                    value={addDoctorAddress}
                                    onChange={(e) => setAddDoctorAddress(e.target.value)}
                                />
                                <br/>
                                <input
                                    type='text'
                                    placeholder='Name'
                                    value={doctorName}
                                    onChange={(e) => setDoctorName(e.target.value)}
                                />
                                <br/>
                                <input
                                    type='number'
                                    placeholder='Age'
                                    value={doctorAge}
                                    onChange={(e) => setDoctorAge(e.target.value)}
                                />
                                <br/>
                                <Web3Button
                                    className="submit-button submit-add"
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={(contract) => contract.call(
                                        "addDoctor",
                                        [
                                            addDoctorAddress,
                                            doctorName,
                                            doctorAge
                                        ]
                                    )}
                                    onSuccess={() => {
                                        resetForm()
                                        // setAddDoctor(false)
                                        alertToast("Added Doctor Successfully!")
                                    }}
                                >
                                    Add Doctor
                                </Web3Button>
                            </div>
                        </div>
                    </div>

                    <div className="card2">
                        <img src={removedoctor}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Remove Doctor</h4>
                                <input
                                    type="text"
                                    placeholder="Wallet Address"
                                    value={removeDoctorAddress}
                                    onChange={(e) => setRemoveDoctorAddress(e.target.value)}
                                />
                                <br/>
                                <Web3Button
                                    className="submit-button submit-remove"
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={handleRemoveDoctor}
                                    disabled={removeDoctorLoading}
                                    onSuccess={()=>{
                                        resetForm()
                                        alertToast("Removed Doctor Successfully!")
                                    }}
                                >
                                    Remove Doctor
                                </Web3Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {doctors.map((doctor) => (
                        <div className="list-content" key={doctor.address}>
                            <div>
                                <h3 style={{ color: "#222222" }}>Dr. {doctor.name}</h3>
                            </div>
                            <div>
                                <p style={{ color: "#666666" }}>Address: {doctor.address}</p>
                                <p style={{ color: "#666666" }}>Age: {doctor.age}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ManDoctors;
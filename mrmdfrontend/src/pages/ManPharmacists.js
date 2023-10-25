import React from "react";
import { useState, useEffect } from "react";
import { Web3Button } from '@thirdweb-dev/react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address"
import addpharm from "../admin-images/add-pharm2.jpg"
import removepharm from "../admin-images/remove-pharm.png"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ManagePharmacists = () => {
    const [addPharmacistAddress, setAddPharmacistAddress] = useState('');
    const [pharmacistName, setPharmacistName] = useState('');
    const [pharmacistAge, setPharmacistAge] = useState('');
    const [pharmacists, setPharmacists] = useState([]);
    const [removePharmacistAddress, setRemovePharmacistAddress] = useState('');

    function resetForm() {
        setPharmacistName('');
        setAddPharmacistAddress('');
        setPharmacistAge('');
        setRemovePharmacistAddress('');
    }

    function alertToast(msg){
        toast.success(msg)
    }

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "showOurPharmacists", []);
    const { mutateAsync: removePharmacist, isLoading: removePharmacistLoading } = useContractWrite(contract, "removePharmacist");

    useEffect(() => {
        if (data) {
            const formattedPharmacists = data.map((pharmacist) => ({
                address: pharmacist.pharmacistAddress,
                name: pharmacist.name,
                age: pharmacist.age.toString(),
            }));

            setPharmacists(formattedPharmacists);
        }
    }, [data]);

    const handleRemovePharmacist = async () => {
        await removePharmacist({ args: [removePharmacistAddress] });
        resetForm();
    }

    return (
        <div className="admin-page">
            <div>
                <header className="header1">
                    <nav className="navbar">
                        <a href="/admin" style={{background:"gray", borderRadius:"10px", padding:"5px"}}>Home</a>
                        <a href="/doctors">Manage Doctors</a>
                        <a href="/patients">Manage Patients</a>
                        <a href="/pathologists">Manage Pathologists</a>
                    </nav>
                </header>
            </div>

            <div className="background"></div>

            <div className="container2">
                <div className="content2">
                    <div className="card2">
                        <img src={addpharm}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Add Pharmacist</h4>
                                <input
                                    type='text'
                                    placeholder='Wallet Address'
                                    value={addPharmacistAddress}
                                    onChange={(e) => setAddPharmacistAddress(e.target.value)}
                                />
                                <br/>
                                <input
                                    type='text'
                                    placeholder='Name'
                                    value={pharmacistName}
                                    onChange={(e) => setPharmacistName(e.target.value)}
                                /><br/>
                                <input
                                    type='number'
                                    placeholder='Age'
                                    value={pharmacistAge}
                                    onChange={(e) => setPharmacistAge(e.target.value)}
                                /><br/>
                                <Web3Button
                                    className="submit-button submit-add"
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={(contract) => contract.call(
                                        "addPharmacist",
                                        [
                                            addPharmacistAddress,
                                            pharmacistName,
                                            pharmacistAge
                                        ]
                                    )}
                                    onSuccess={() => {
                                        resetForm()
                                        alertToast("Pharmacist Added Successfully!")
                                    }}
                                >
                                    Add Pharmacist
                                </Web3Button>
                            </div>
                        </div>
                    </div>

                    <div className="card2">
                        <img src={removepharm}/>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Remove Pharmacist</h4>
                                <input
                                    type="text"
                                    placeholder="Wallet Address"
                                    value={removePharmacistAddress}
                                    onChange={(e) => setRemovePharmacistAddress(e.target.value)}
                                /><br/>
                                <Web3Button
                                    className="submit-button submit-remove"
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={handleRemovePharmacist}
                                    disabled={removePharmacistLoading}
                                    onSuccess={()=>{
                                        resetForm()
                                        alertToast("Pharmacist Removed Successfully!")
                                    }}
                                >
                                    Remove Pharmacist
                                </Web3Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                {pharmacists.map((pharmacist) => (
                    <div className="list-content" key={pharmacist.address}>
                        <div>
                            <h3 style={{ color: "#222222" }}>{pharmacist.name}</h3>
                        </div>
                        <div>
                            <p style={{ color: "#666666" }}>Address: {pharmacist.address}</p>
                            <p style={{ color: "#666666" }}>Age: {pharmacist.age}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ManagePharmacists;
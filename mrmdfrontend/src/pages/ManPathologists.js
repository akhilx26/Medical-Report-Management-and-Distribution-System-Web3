import React from "react";
import { useState, useEffect } from "react";
import { Web3Button } from '@thirdweb-dev/react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address"
// import { CONTRACT_ADDRESS } from "./constants/address"
import addpatho from "../admin-images/add-patho.png";
import removepatho from "../admin-images/remove-patho.png";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ManagePathologists = () => {
    const [addPathologistAddress, setAddPathologistAddress] = useState('');
    const [pathologistName, setPathologistName] = useState('');
    const [pathologistAge, setPathologistAge] = useState('');
    const [pathologists, setPathologists] = useState([]);
    const [removePathologistAddress, setRemovePathologistAddress] = useState('');

    function resetForm() {
        setPathologistName('');
        setAddPathologistAddress('');
        setPathologistAge('');
        setRemovePathologistAddress('');
    }

    function alertToast(msg){
        toast.success(msg)
    }

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "showOurPathologists", []);
    const { mutateAsync: removePathologist, isLoading: removePathologistLoading } = useContractWrite(contract, "removePathologist");

    useEffect(() => {
        if (data) {
            const formattedPathologists = data.map((pathologist) => ({
                address: pathologist.pathologistAddress,
                name: pathologist.name,
                age: pathologist.age.toString(),
            }));

            setPathologists(formattedPathologists);
        }
    }, [data]);

    const handleRemovePathologist = async () => {
        await removePathologist({ args: [removePathologistAddress] });
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
                        <a href="/pharmacists">Manage Pharmacists</a>
                    </nav>
                </header>
            </div>
        
            <div className="background"></div>

            <div className="container2">
                <div className="content2">
                    <div className="card2">
                        <img src={addpatho}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Add Pathologist</h4>
                                <input
                                    type='text'
                                    placeholder='Wallet Address'
                                    value={addPathologistAddress}
                                    onChange={(e) => setAddPathologistAddress(e.target.value)}
                                />
                                <br/>
                                <input
                                    type='text'
                                    placeholder='Name'
                                    value={pathologistName}
                                    onChange={(e) => setPathologistName(e.target.value)}
                                />
                                <br/>
                                <input
                                    type='number'
                                    placeholder='Age'
                                    value={pathologistAge}
                                    onChange={(e) => setPathologistAge(e.target.value)}
                                />
                                <br/>
                                <Web3Button
                                    className="submit-button submit-add"
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={(contract) => contract.call(
                                        "addPathologist",
                                        [
                                            addPathologistAddress,
                                            pathologistName,
                                            pathologistAge
                                        ]
                                    )}
                                    onSuccess={() => {
                                        resetForm()
                                        alertToast("Pathologist Added Successfully!")
                                    }}
                                >
                                    Add Pathologist
                                </Web3Button>
                            </div>
                        </div>
                    </div>

                    <div className="card2">
                        <img src={removepatho}/>
                        <div className="intro">
                            <div className="inner-card">
                            <h4>Remove Pathologist</h4>
                            <input
                                type="text"
                                placeholder="Wallet Address"
                                value={removePathologistAddress}
                                onChange={(e) => setRemovePathologistAddress(e.target.value)}
                            />
                            <br/>
                            <Web3Button
                                className="submit-button submit-remove"
                                contractAddress={CONTRACT_ADDRESS}
                                action={handleRemovePathologist}
                                disabled={removePathologistLoading}
                                onSuccess={()=>{
                                    resetForm()
                                    alertToast("Pathologist Removed Successfully!")
                                }}
                            >
                                Remove Pathologist
                            </Web3Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {pathologists.map((pathologist) => (
                        <div className="list-content" key={pathologist.address}>
                            <div>
                                <h3 style={{ color: "#222222" }}>Dr. {pathologist.name}</h3>
                            </div>
                            <div>
                                <p style={{ color: "#666666" }}>Address: {pathologist.address}</p>
                                <p style={{ color: "#666666" }}>Age: {pathologist.age}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ManagePathologists;
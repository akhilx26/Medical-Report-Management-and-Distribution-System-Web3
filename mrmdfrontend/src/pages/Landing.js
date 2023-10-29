import { useState, useEffect } from "react";
import Web3 from "web3";
import React from "react";
import Model from "react-modal"
import {useNavigate, NavLink} from "react-router-dom";
import {ConnectWallet, connectWallet} from "@thirdweb-dev/react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {CONTRACT_ADDRESS} from "./constants/address"

const Landing = () => {
    
    return(
        <div>
            <div>
                <header className="header">
                    <nav className="navbar">
                        <a href="/admin">Admin</a>
                        <a href="/doctor">Doctor</a>
                        <a href="/patient">Patient</a>
                        <a href="/path">Pathologist</a>
                        <a href="/pharm">Pharmacist</a>
                        <a className="address-tag" href="https://goerli.etherscan.io/address/0x47f7d265BdFE63F52187566c10B1eB5fCC3b89A4" target="_blank"><span className="add-con">Contract: {CONTRACT_ADDRESS}</span></a>
                    </nav>

                    {/* <form action="/" className="search-bar"> */}
                        {/* <input type="text" placeholder="Search"/>
                        <button type="submit"><i class='bx bx-search'></i></button> */}
                    {/* <p className="conadd">Contract Address:{CONTRACT_ADDRESS}</p> */}
                    {/* </form> */}

                </header>

                <div className="background"></div>

                <div className="container">
                    <div className="content">
                        <h2 className="logo"><i class='bx bxs-shield-plus' ></i>MRMD</h2>
                        <div className="text-sci">
                            <h2>Welcome!<br/><span>to Our E-Healthcare System</span></h2>
                            <p>Secure - Transparent - Decentralized</p>
                            <div className="social-icons">
                                <a href="/doctor"><i class='bx bx-heart'></i></a>
                                <a href="/patient"><i class='bx bxs-heart' ></i></a>
                                <a href="/path"><i class='bx bx-plus-medical' ></i></a>
                                <a href="/pharm"><i class='bx bxs-capsule' ></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="logreg-box">
                        <div className="form-box login">
                            <form action="#">
                                <div className="input-box1">
                                    {/* <span className="icon"></span> */}
                                    <ConnectWallet className="connect-wallet"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
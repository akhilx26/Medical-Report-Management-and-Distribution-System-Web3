import React from "react";
import Model from "react-modal"
import { useState, useEffect } from "react";

const ManDoctors = () => {

    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [actor, setActor] = useState("")

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

    return(
        <div className="admin-page">
            <div className="title-admin">
                <h2 className="welcome-admin">Manage Doctors</h2>
            </div>
            <div className="parent-admin">
                <div className="mandoc-cards">
                    <button onClick={(e)=>{
                        setVisible1(true)
                        setActor(e.target.innerText)
                    }}>Add Doctor</button>
                    <button onClick={(e)=>{
                        setVisible2(true)
                        setActor(e.target.innerText)
                    }}>Remove Doctor</button>
                    <Model isOpen={visible1} onRequestClose={()=>setVisible1(false)} style={customStyles}>
                        <button className="close-button" onClick={()=>setVisible1(false)}>X</button>
                        <div className="popup-content app">
                            <div className="app-header">
                                <h4>{actor}</h4>
                                <form>
                                    <br/>
                                    <label for="fname">First name:</label><br/>
                                    <input type="text" id="fname" name="fname"/><br/>
                                    <br/>
                                    <label for="lname">Last name:</label><br/>
                                    <input type="text" id="lname" name="lname"/><br/>
                                    <br/>
                                    <label for="address">Wallet address:</label><br/>
                                    <input type="text" id="address" name="address"/>
                                    <br/><br/>
                                    <input type="submit" value="Submit"></input>
                                </form>
                            </div>
                        </div>
                    </Model>
                    <Model isOpen={visible2} onRequestClose={()=>setVisible2(false)} style={customStyles}>
                        <button className="close-button" onClick={()=>setVisible2(false)}>X</button>
                        <div className="popup-content app">
                            <div className="app-header">
                                <h4>{actor}</h4>
                                <form>
                                    <br/>
                                    <label for="address">Wallet address:</label><br/>
                                    <input type="text" id="address" name="address"/>
                                    <br/><br/>
                                    <input type="submit" value="Remove Doctor"></input>
                                </form>
                            </div>
                        </div>
                    </Model>
                </div>
            </div>
            <div className="quote-div">
                <p className="admin-quote">~"Health is the greatest of Human Blessings"~</p>
            </div>
        </div>
    );
}

export default ManDoctors;
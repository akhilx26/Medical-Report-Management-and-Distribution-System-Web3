import React from "react";

const Header = () => {
    return(
        <div>
            <header className="header">
                <nav className="navbar">
                    <a href="#">Admin</a>
                    <a href="#">Doctor</a>
                    <a href="#">Patient</a>
                    <a href="#">Pathologist</a>
                    <a href="#">Pharmacist</a>
                </nav>
            </header>
        </div>
    );
}

export default Header;
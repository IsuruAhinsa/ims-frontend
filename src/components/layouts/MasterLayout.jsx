import Sidebar from "../partials/Sidebar.jsx";
import Nav from "../partials/Nav.jsx";
import Footer from "../partials/Footer.jsx";
import {Outlet} from "react-router-dom";

const MasterLayout = () => {
    return (
        <div id="wrapper">
            <Sidebar />

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Nav />

                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default MasterLayout;

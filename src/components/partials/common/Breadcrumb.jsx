import React from 'react';
import {Helmet, HelmetProvider} from "react-helmet-async";

const Breadcrumb = (props) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{props.title} | IMS Admin</title>
            </Helmet>

            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h4 mb-0 text-gray-800 font-weight-bold">{props.title}</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{props.title}</li>
                    </ol>
                </nav>
            </div>
        </HelmetProvider>
    );
};

export default Breadcrumb;

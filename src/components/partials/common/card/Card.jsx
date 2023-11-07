import React from 'react';
import CardHeader from "./CardHeader.jsx";

const Card = ({title, to, btnText, children}) => {
    return (
        <div className="card">
            <CardHeader title={title} to={to} btnText={btnText} />
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default Card;

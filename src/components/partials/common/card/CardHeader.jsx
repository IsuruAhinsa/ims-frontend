import React from 'react';
import {Link} from "react-router-dom";

const CardHeader = ({title, to, btnText}) => {
    return (
        <div className="card-header">
            <div className="d-flex justify-content-between">
                <div>{title}</div>
                {btnText && (
                    <Link to={to}>
                        <button className="btn btn-sm btn-outline-primary">{btnText}</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CardHeader;

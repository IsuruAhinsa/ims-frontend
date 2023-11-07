import React from 'react';
import {Modal} from "react-bootstrap";

const BrandDetailModal = (props) => {
    const brand = props.brand;
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="card border-0">
                    <img
                        alt={brand.logo}
                        src={brand.logo}
                        className="align-self-center w-25 img-thumbnail"
                    />
                    <div className="card-body">
                        <h5 className="card-title">
              <span className="mr-2">
                {brand.status == "Active" ? (
                    <i className="fas fa-check-circle text-success" />
                ) : (
                    <i className="fas fa-times-circle text-danger" />
                )}
              </span>
                            {brand.name}
                        </h5>
                        <p className="card-text">{brand.description}</p>
                        <p className="card-text">
                            <small className="text-muted">Created by : <span className="text-primary">{brand.created_by}</span> at {brand.created_at}</small>
                            <br/>
                            <small className="text-muted">Last updated : {brand.updated_at}</small>
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default BrandDetailModal;
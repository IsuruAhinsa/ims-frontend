import React from 'react';
import {Modal} from "react-bootstrap";

const ShopDetailModal = (props) => {
    const {shop} = props;
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="card border-0">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <img
                                    alt={shop.logo}
                                    src={shop.logo}
                                    className="img-thumbnail img-fluid"
                                />
                            </div>
                            <div className="col">
                                <h5 className="card-title">
                  <span className="mr-2">
                    {shop.status == "Active" ? (
                        <i className="fas fa-check-circle text-success" />
                    ) : (
                        <i className="fas fa-times-circle text-danger" />
                    )}
                  </span>
                                    {shop.company}
                                </h5>
                                <div>{shop.email}</div>
                                <div>{shop.phone}</div>
                                <div>{shop?.address?.address}</div>
                                <div>{shop?.address?.province} - {shop?.address?.province_si}</div>
                                <div>{shop?.address?.district} - {shop?.address?.district_si}</div>
                                <div>{shop?.address?.city} - {shop?.address?.city_si}</div>
                                <div>{shop?.address?.landmark}</div>
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <div className="col">
                                <p className="card-text font-italic">{shop.description}</p>
                                <p className="card-text">
                                    <small className="text-muted">
                                        Created by :{" "}
                                        <span className="text-primary">{shop.created_by}</span> at{" "}
                                        {shop.created_at}
                                    </small>
                                    <br />
                                    <small className="text-muted">
                                        Last updated : {shop.updated_at}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ShopDetailModal;
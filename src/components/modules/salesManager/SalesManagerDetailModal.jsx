import React from "react";
import { Modal } from "react-bootstrap";

const SalesManagerDetailModal = (props) => {
  const { salesManager } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="card border-0">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 bg-gray-300 p-3 rounded">
                <p>Sales Manager</p>
                <div className="row">
                  <div className="col-md-4">
                    <div className="list-group">
                      <img
                        alt={salesManager.photo}
                        src={salesManager.photo}
                        className="img-thumbnail img-fluid"
                      />
                      <img
                        alt={salesManager.nic_photo}
                        src={salesManager.nic_photo}
                        className="img-thumbnail img-fluid mt-2"
                      />
                      <div className="badge badge-dark mt-2">
                        {salesManager.nic}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h5 className="card-title">
                      <span className="mr-2">
                        {salesManager.status == "Active" ? (
                          <i className="fas fa-check-circle text-success" />
                        ) : (
                          <i className="fas fa-times-circle text-danger" />
                        )}
                      </span>
                      {salesManager.name}
                    </h5>
                    <div>{salesManager.email}</div>
                    <div>{salesManager.phone}</div>
                    <div>{salesManager?.address?.address}</div>
                    <div>
                      {salesManager?.address?.province} -{" "}
                      {salesManager?.address?.province_si}
                    </div>
                    <div>
                      {salesManager?.address?.district} -{" "}
                      {salesManager?.address?.district_si}
                    </div>
                    <div>
                      {salesManager?.address?.city} -{" "}
                      {salesManager?.address?.city_si}
                    </div>
                    <div>{salesManager?.address?.landmark}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 p-3 rounded">
                  <p>Shop</p>
                  <div className="row">
                      <div className="col-md-4">
                          <div className="list-group">
                              <img
                                  alt={salesManager?.shop?.logo}
                                  src={salesManager?.shop?.logo}
                                  className="img-thumbnail img-fluid"
                              />
                          </div>
                      </div>
                      <div className="col-md-8">
                          <h5 className="card-title">
                      <span className="mr-2">
                        {salesManager?.shop?.status == "Active" ? (
                            <i className="fas fa-check-circle text-success" />
                        ) : (
                            <i className="fas fa-times-circle text-danger" />
                        )}
                      </span>
                              {salesManager?.shop?.company}
                          </h5>
                          <div>{salesManager?.shop?.email}</div>
                          <div>{salesManager?.shop?.phone}</div>
                          <div>{salesManager?.shop?.address?.address}</div>
                          <div>
                              {salesManager?.shop?.address?.province} -{" "}
                              {salesManager?.shop?.address?.province_si}
                          </div>
                          <div>
                              {salesManager?.shop?.address?.district} -{" "}
                              {salesManager?.shop?.address?.district_si}
                          </div>
                          <div>
                              {salesManager?.shop?.address?.city} -{" "}
                              {salesManager?.shop?.address?.city_si}
                          </div>
                          <div>{salesManager?.shop?.address?.landmark}</div>
                      </div>
                  </div>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col">
                <p className="card-text font-italic">{salesManager.bio}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Created by :{" "}
                    <span className="text-primary">
                      {salesManager.created_by}
                    </span>{" "}
                    at {salesManager.created_at}
                  </small>
                  <br />
                  <small className="text-muted">
                    Last updated : {salesManager.updated_at}
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

export default SalesManagerDetailModal;

import React from "react";
import { Modal } from "react-bootstrap";

const SupplierDetailModal = (props) => {
  const {supplier} = props;

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
                  alt={supplier.logo}
                  src={supplier.logo}
                  className="img-thumbnail img-fluid"
                />
              </div>
              <div className="col">
                <h5 className="card-title">
                  <span className="mr-2">
                    {supplier.status == "Active" ? (
                      <i className="fas fa-check-circle text-success" />
                    ) : (
                      <i className="fas fa-times-circle text-danger" />
                    )}
                  </span>
                  {supplier.company}
                </h5>
                  <div>{supplier.email}</div>
                  <div>{supplier.phone}</div>
                  <div>{supplier?.address?.address}</div>
                  <div>{supplier?.address?.province} - {supplier?.address?.province_si}</div>
                  <div>{supplier?.address?.district} - {supplier?.address?.district_si}</div>
                  <div>{supplier?.address?.city} - {supplier?.address?.city_si}</div>
                  <div>{supplier?.address?.landmark}</div>
              </div>
            </div>

              <hr/>

            <div className="row">
             <div className="col">
                 <p className="card-text font-italic">{supplier.description}</p>
                 <p className="card-text">
                     <small className="text-muted">
                         Created by :{" "}
                         <span className="text-primary">{supplier.created_by}</span> at{" "}
                         {supplier.created_at}
                     </small>
                     <br />
                     <small className="text-muted">
                         Last updated : {supplier.updated_at}
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

export default SupplierDetailModal;

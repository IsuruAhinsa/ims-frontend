import React from "react";
import { Modal } from "react-bootstrap";

const SubCategoryDetailModal = (props) => {
  const subCategory = props.subCategory;
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
            alt={subCategory.photo}
            src={subCategory.photo_full}
            className="img-fluid"
          />
          <div className="card-body">
            <h5 className="card-title m-0">
              <span className="mr-2">
                {subCategory.status == "Active" ? (
                  <i className="fas fa-check-circle text-success" />
                ) : (
                  <i className="fas fa-times-circle text-danger" />
                )}
              </span>
              {subCategory.name} - {subCategory.serial}
            </h5>
            <p className="card-text text-warning m-0">{subCategory.category}</p>
            <p className="card-text m-0">{subCategory.description}</p>
            <p className="card-text">
              <small className="text-muted">
                Created by :{" "}
                <span className="text-primary">{subCategory.created_by}</span>{" "}
                at {subCategory.created_at}
              </small>
              <br />
              <small className="text-muted">
                Last updated : {subCategory.updated_at}
              </small>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SubCategoryDetailModal;

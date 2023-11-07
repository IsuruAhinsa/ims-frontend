import React from "react";
import { Modal } from "react-bootstrap";

const CategoryDetailModal = (props) => {
  const category = props.category;
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
            alt={category.photo}
            src={category.photo_full}
            className="img-fluid"
          />
          <div className="card-body">
            <h5 className="card-title">
              <span className="mr-2">
                {category.status == "Active" ? (
                  <i className="fas fa-check-circle text-success" />
                ) : (
                  <i className="fas fa-times-circle text-danger" />
                )}
              </span>
              {category.name} - {category.serial}
            </h5>
            <p className="card-text">{category.description}</p>
            <p className="card-text">
                <small className="text-muted">Created by : <span className="text-primary">{category.created_by}</span> at {category.created_at}</small>
                <br/>
                <small className="text-muted">Last updated : {category.updated_at}</small>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryDetailModal;

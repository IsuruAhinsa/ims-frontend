import React from 'react';
import {Modal} from "react-bootstrap";

const SubCategoryPhotoModal = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <img alt={props.photo} src={props.photo} className="img-fluid" />
            </Modal.Body>
        </Modal>
    );
};

export default SubCategoryPhotoModal;

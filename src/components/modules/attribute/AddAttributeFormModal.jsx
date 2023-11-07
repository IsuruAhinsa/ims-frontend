import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import { Notify } from "notiflix";

const AddAttributeFormModal = (props) => {
  const [input, setInput] = useState({status: 1});
  const [errors, setErrors] = useState([]);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateAttribute = (e) => {
    e.preventDefault();

    axios
      .post(`${Constants.BASE_URL}/attribute`, input)
      .then((res) => {
        Notify.success(res.data.msg);
        props.onHide(true);
        props.getAttributes();
        setInput({status: 1});
        setErrors([]);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={"static"}
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title style={{ fontSize: "17px" }}>
          Add Product Attribute
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card border-0">
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="name" className="form-label">
                Attribute Name
              </label>
              <input
                type="text"
                className={
                  errors.name ? "form-control border-danger" : "form-control"
                }
                id="name"
                placeholder={"Enter attribute name"}
                name={"name"}
                value={input.name}
                onChange={handleInput}
              />
              <div className="text-xs text-danger ml-2">
                {errors.name ? errors.name[0] : null}
              </div>
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                name="status"
                value={input.status}
                onChange={handleInput}
                className={
                  errors.status
                    ? "custom-select border-danger"
                    : "custom-select"
                }
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
              <div className="text-xs text-danger ml-2">
                {errors.status ? errors.status[0] : null}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size={"sm"} onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button
          size={"sm"}
          variant="primary"
          onClick={handleCreateAttribute}
        >
          Add Attribute
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAttributeFormModal;

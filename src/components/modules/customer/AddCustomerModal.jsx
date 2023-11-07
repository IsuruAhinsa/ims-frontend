import React, {useState} from 'react';
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import {Notify} from "notiflix";
import {Button, Modal} from "react-bootstrap";

const AddCustomerModal = (props) => {
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState([]);

    const handleInput = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCreateCustomer = (e) => {
        e.preventDefault();

        axios
            .post(`${Constants.BASE_URL}/customers`, input)
            .then((res) => {
                Notify.success(res.data.msg);
                props.onHide(true);
                props.getCustomers();
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
                    Add Customer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card border-0">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="name" className="form-label">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.name ? "form-control border-danger" : "form-control"
                                }
                                id="name"
                                placeholder={"Enter customer name"}
                                name={"name"}
                                value={input.name}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.name ? errors.name[0] : null}
                            </div>
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="email" className="form-label">
                                Customer Email
                            </label>
                            <input
                                type="email"
                                className={
                                    errors.email ? "form-control border-danger" : "form-control"
                                }
                                id="email"
                                placeholder={"Enter customer email"}
                                name={"email"}
                                value={input.email}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.email ? errors.email[0] : null}
                            </div>
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="phone" className="form-label">
                                Customer Phone
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.phone ? "form-control border-danger" : "form-control"
                                }
                                id="phone"
                                placeholder={"Enter customer phone"}
                                name={"phone"}
                                value={input.phone}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.phone ? errors.phone[0] : null}
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
                    onClick={handleCreateCustomer}
                >
                    Add Customer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddCustomerModal;

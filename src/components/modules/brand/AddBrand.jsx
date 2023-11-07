import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import {Notify} from "notiflix";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import SubmitButton from "../../partials/common/SubmitButton.jsx";

const AddBrand = () => {
    const [input, setInput] = useState({ status: 1 });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleInput = (e) => {
        if (e.target.name === "name") {
            let slug = e.target.value;
            slug = slug.toLowerCase();
            slug = slug.replaceAll(" ", "-");
            setInput((prevState) => ({ ...prevState, slug: slug }));
        }

        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogo = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setInput((prevState) => ({ ...prevState, logo: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleCreateBrand = (e) => {
        e.preventDefault();

        setIsLoading(true);

        axios
            .post(`${Constants.BASE_URL}/brand`, input)
            .then((res) => {
                Notify.success(res.data.msg);

                setIsLoading(false);

                navigate("/brand");
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                }

                setIsLoading(false);
            });
    };

    return (
        <>
            <Breadcrumb title={"Create Brand"} />
            <div className="container-fluid">
                <Card to={"/brand"} title={"Create Brand"} btnText={"Brand List"}>
                    <form className="form-row" onSubmit={handleCreateBrand}>
                        <div className="form-group col-md-6">
                            <label htmlFor="name" className="form-label">
                                Brand Name
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.name ? "form-control border-danger" : "form-control"
                                }
                                id="name"
                                placeholder={"Enter brand name"}
                                name={"name"}
                                value={input.name}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.name ? errors.name[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="slug" className="form-label">
                                Brand Slug
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.slug ? "form-control border-danger" : "form-control"
                                }
                                id="slug"
                                placeholder={"Enter brand slug"}
                                name={"slug"}
                                value={input.slug}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.slug ? errors.slug[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="status" className="form-label">
                                Brand Status
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
                        <div className="form-group col-md-6">
                            <label htmlFor="description" className="form-label">
                                Brand Description
                            </label>
                            <textarea
                                className="form-control"
                                name="description"
                                rows="3"
                                placeholder={"Type some description about brand..."}
                                value={input.description}
                                onChange={handleInput}
                            ></textarea>
                            <div className="text-xs text-danger ml-2">
                                {errors.description ? errors.description[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="logo" className="form-label">
                                Brand Logo
                            </label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className={
                                        errors.logo
                                            ? "custom-file-input border-danger"
                                            : "custom-file-input"
                                    }
                                    value={""}
                                    onChange={handleLogo}
                                />
                                <label className="custom-file-label" htmlFor="logo">
                                    Choose file
                                </label>
                            </div>
                            <div className="text-xs text-danger ml-2">
                                {errors.logo ? errors.logo[0] : null}
                            </div>
                            {input.logo !== undefined ? (
                                <div className="logo-preview">
                                    <img
                                        alt={"logo-preview"}
                                        src={input.logo}
                                        className="img-thumbnail w-25 mt-3"
                                    />
                                </div>
                            ) : null}
                        </div>
                        <SubmitButton value={"Create Brand"} isLoading={isLoading} />
                    </form>
                </Card>
            </div>
        </>
    );
};

export default AddBrand;
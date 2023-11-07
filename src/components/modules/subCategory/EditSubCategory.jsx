import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import {Loading, Notify} from "notiflix";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import SubmitButton from "../../partials/common/SubmitButton.jsx";

const EditSubCategory = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState({ status: 1 });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState({});

    const getCategories = () => {
        axios.get(`${Constants.BASE_URL}/get-categories-list`).then((res) => {
            setCategories(res.data);
        });
    };

    const getSubCategory = () => {
        Loading.standard()
        axios.get(`${Constants.BASE_URL}/sub-category/${params.id}`).then(res => {
            setInput(res.data.data);
            Loading.remove()
        }).catch(err => {
            console.log(err)
            Loading.remove()
        })
    }

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

    const handlePhoto = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setInput((prevState) => ({ ...prevState, photo: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateSubCategory = (e) => {
        e.preventDefault();

        Loading.standard()

        axios
            .put(`${Constants.BASE_URL}/sub-category/${params.id}`, input)
            .then((res) => {
                Notify.success(res.data.msg);

                Loading.remove()

                navigate("/sub-category");
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                }

                Loading.remove()
            });
    };

    useEffect(() => {
        getSubCategory()
        getCategories()
    }, [])


    return (
        <>
            <Breadcrumb title={"Edit Sub Category"} />
            <div className="container-fluid">
                <Card to={"/category"} title={"Edit Sub Category"} btnText={"Sub Category List"}>
                    <form className="form-row" onSubmit={handleUpdateSubCategory}>
                        <div className="form-group col-md-6">
                            <label htmlFor="category" className="form-label">
                                Choose Category
                            </label>
                            <select
                                name="category"
                                value={input.category}
                                onChange={handleInput}
                                className={
                                    errors.category
                                        ? "custom-select border-danger"
                                        : "custom-select"
                                }
                            >
                                {Object.keys(categories).length > 0 ? (
                                    categories.map((category, index) => (
                                        <option key={index} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <option>
                                        No Categories
                                    </option>
                                )}
                            </select>
                            <div className="text-xs text-danger ml-2">
                                {errors.category ? errors.category[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="name" className="form-label">
                                Category Name
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.name ? "form-control border-danger" : "form-control"
                                }
                                id="name"
                                placeholder={"Enter category name"}
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
                                Category Slug
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.slug ? "form-control border-danger" : "form-control"
                                }
                                id="slug"
                                placeholder={"Enter category slug"}
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
                                Category Status
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
                            <label htmlFor="serial" className="form-label">
                                Category Serial
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.serial ? "form-control border-danger" : "form-control"
                                }
                                id="serial"
                                placeholder={"Enter Category Serial"}
                                name={"serial"}
                                value={input.serial}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.serial ? errors.serial[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="description" className="form-label">
                                Category Description
                            </label>
                            <textarea
                                className="form-control"
                                name="description"
                                rows="3"
                                placeholder={"Type some description about category..."}
                                value={input.description}
                                onChange={handleInput}
                            ></textarea>
                            <div className="text-xs text-danger ml-2">
                                {errors.description ? errors.description[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="photo" className="form-label">
                                Category Photo
                            </label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className={
                                        errors.photo
                                            ? "custom-file-input border-danger"
                                            : "custom-file-input"
                                    }
                                    value={""}
                                    onChange={handlePhoto}
                                />
                                <label className="custom-file-label" htmlFor="photo">
                                    Choose file
                                </label>
                            </div>
                            <div className="text-xs text-danger ml-2">
                                {errors.photo ? errors.photo[0] : null}
                            </div>
                            {input.photo !== undefined || input.photo_preview !== undefined ? (
                                <div className="photo-preview">
                                    <img
                                        alt={"photo-preview"}
                                        src={input.photo || input.photo_preview}
                                        className="img-thumbnail w-25 mt-3"
                                    />
                                </div>
                            ) : null}
                        </div>
                        <SubmitButton value={"Update Sub Category"} isLoading={isLoading} />
                    </form>
                </Card>
            </div>
        </>
    );
};

export default EditSubCategory;

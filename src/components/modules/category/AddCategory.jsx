import React, { useState } from "react";
import SubmitButton from "../../partials/common/SubmitButton.jsx";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import { Notify } from "notiflix";
import { useNavigate } from "react-router-dom";
import Card from "../../partials/common/card/Card.jsx";

const AddCategory = () => {
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

  const handlePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setInput((prevState) => ({ ...prevState, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios
      .post(`${Constants.BASE_URL}/category`, input)
      .then((res) => {
        Notify.success(res.data.msg);

        setIsLoading(false);

        navigate("/category");
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
      <Breadcrumb title={"Create Category"} />
      <div className="container-fluid">
        <Card to={"/category"} title={"Create Category"} btnText={"List"}>
          <form className="form-row" onSubmit={handleCreateCategory}>
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
              {input.photo !== undefined ? (
                <div className="photo-preview">
                  <img
                    alt={"photo-preview"}
                    src={input.photo}
                    className="img-thumbnail w-25 mt-3"
                  />
                </div>
              ) : null}
            </div>
            <SubmitButton value={"Create Category"} isLoading={isLoading} />
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddCategory;

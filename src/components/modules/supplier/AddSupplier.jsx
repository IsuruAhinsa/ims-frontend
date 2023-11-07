import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import {Loading, Notify} from "notiflix";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import SubmitButton from "../../partials/common/SubmitButton.jsx";

const AddSupplier = () => {

    const [input, setInput] = useState({ status: 1 });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);

    const getProvinces = () => {

        Loading.standard()

        axios.get(`${Constants.BASE_URL}/provinces`).then(res => {
            setProvinces(res.data);
        }).catch(err => {
            console.log(err)
        })

        Loading.remove()
    }

    const getDistricts = (provinceId) => {

        Loading.standard()

        axios.get(`${Constants.BASE_URL}/districts/${provinceId}`).then(res => {
            setDistricts(res.data);
        }).catch(err => {
            console.log(err)
        })

        Loading.remove()
    }

    const getCities = (cityId) => {
        Loading.standard()

        axios.get(`${Constants.BASE_URL}/cities/${cityId}`).then(res => {
            setCities(res.data)
        }).catch(err => {
            console.log(err)
        })

        Loading.remove()
    }

    const handleInput = (e) => {

        if (e.target.name === 'province') {
            setDistricts([])
            setCities([])
            getDistricts(e.target.value)
        }

        if (e.target.name === 'district') {
            setCities([])
            getCities(e.target.value)
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
    }

    const handleCreateSupplier = (e) => {
        e.preventDefault();

        setIsLoading(true);

        axios
            .post(`${Constants.BASE_URL}/supplier`, input)
            .then((res) => {
                Notify.success(res.data.msg);

                setIsLoading(false);

                navigate("/supplier");
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                }

                setIsLoading(false);
            });
    };

    useEffect(() => {
        getProvinces()
    }, []);

    return (
        <>
            <Breadcrumb title={"Create Supplier"} />
            <div className="container-fluid">
                <Card to={"/supplier"} title={"Create Supplier"} btnText={"Supplier List"}>
                    <form className="form-row" onSubmit={handleCreateSupplier}>
                        <div className="form-group col-md-6">
                            <label htmlFor="company" className="form-label">
                                Company Name
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.company ? "form-control border-danger" : "form-control"
                                }
                                id="company"
                                placeholder={"Enter supplier company name"}
                                name={"company"}
                                value={input.company}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.company ? errors.company[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email" className="form-label">
                                Supplier Email
                            </label>
                            <input
                                type="email"
                                className={
                                    errors.email ? "form-control border-danger" : "form-control"
                                }
                                id="email"
                                placeholder={"Enter supplier email"}
                                name={"email"}
                                value={input.email}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.email ? errors.email[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone" className="form-label">
                                Supplier Phone
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.phone ? "form-control border-danger" : "form-control"
                                }
                                id="phone"
                                placeholder={"Enter supplier phone"}
                                name={"phone"}
                                value={input.phone}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.phone ? errors.phone[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="status" className="form-label">
                                Supplier Status
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
                            <label htmlFor="address" className="form-label">
                                Supplier Address
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.address ? "form-control border-danger" : "form-control"
                                }
                                id="address"
                                placeholder={"Enter supplier address"}
                                name={"address"}
                                value={input.address}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.address ? errors.address[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="province" className="form-label">
                                Province
                            </label>
                            <select
                                name="province"
                                value={input.province}
                                onChange={handleInput}
                                className={
                                    errors.province
                                        ? "custom-select border-danger"
                                        : "custom-select"
                                }
                            >
                                <option>Select Province</option>
                                {Object.keys(provinces).length > 0 ? (
                                    provinces.map((province, index) => (
                                        <option key={index} value={province.id}>
                                            {province.name_en}
                                        </option>
                                    ))
                                ) : (
                                    <option>
                                        No Provinces
                                    </option>
                                )}
                            </select>
                            <div className="text-xs text-danger ml-2">
                                {errors.province ? errors.province[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="district" className="form-label">
                                District
                            </label>
                            <select
                                name="district"
                                value={input.district}
                                onChange={handleInput}
                                className={
                                    errors.district
                                        ? "custom-select border-danger"
                                        : "custom-select"
                                }
                                disabled={Object.keys(districts).length < 1}
                            >
                                <option>Select District</option>
                                {Object.keys(districts).length > 0 ? (
                                    districts.map((district, index) => (
                                        <option key={index} value={district.id}>
                                            {district.name_en}
                                        </option>
                                    ))
                                ) : (
                                    <option>
                                        No Districts
                                    </option>
                                )}
                            </select>
                            <div className="text-xs text-danger ml-2">
                                {errors.district ? errors.district[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="city" className="form-label">
                                City
                            </label>
                            <select
                                name="city"
                                value={input.city}
                                onChange={handleInput}
                                className={
                                    errors.city
                                        ? "custom-select border-danger"
                                        : "custom-select"
                                }
                                disabled={Object.keys(cities).length < 1}
                            >
                                <option>Select City</option>
                                {Object.keys(cities).length > 0 ? (
                                    cities.map((city, index) => (
                                        <option key={index} value={city.id}>
                                            {city.name_en}
                                        </option>
                                    ))
                                ) : (
                                    <option>
                                        No Cities
                                    </option>
                                )}
                            </select>
                            <div className="text-xs text-danger ml-2">
                                {errors.city ? errors.city[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="landmark" className="form-label">
                                Supplier Landmark
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.landmark ? "form-control border-danger" : "form-control"
                                }
                                id="landmark"
                                placeholder={"Enter supplier landmark"}
                                name={"landmark"}
                                value={input.landmark}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.landmark ? errors.landmark[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="logo" className="form-label">
                                Company Logo
                            </label>
                            <div className="custom-file" style={{ zIndex: 0 }}>
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
                        <div className="form-group col-md-12">
                            <label htmlFor="description" className="form-label">
                                Supplier Description
                            </label>
                            <textarea
                                className="form-control"
                                name="description"
                                rows="3"
                                placeholder={"Type some description about supplier..."}
                                value={input.description}
                                onChange={handleInput}
                            ></textarea>
                            <div className="text-xs text-danger ml-2">
                                {errors.description ? errors.description[0] : null}
                            </div>
                        </div>
                        <SubmitButton value={"Create Supplier"} isLoading={isLoading} />
                    </form>
                </Card>
            </div>
        </>
    );
};

export default AddSupplier;
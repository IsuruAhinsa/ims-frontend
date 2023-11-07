import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Loading, Notify} from "notiflix";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import SubmitButton from "../../partials/common/SubmitButton.jsx";

const EditSalesManager = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState({ status: 1 });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [shops, setShops] = useState([]);

    const getSalesManager = () => {
        Loading.standard();

        axios
            .get(`${Constants.BASE_URL}/sales-managers/${params.id}`)
            .then((res) => {
                setInput(res.data.data);
                getDistricts(res.data.data.province);
                getCities(res.data.data.district);
                Loading.remove();
            })
            .catch((err) => {
                console.log(err);
                Loading.remove();
            });
    };

    const getProvinces = () => {
        axios
            .get(`${Constants.BASE_URL}/provinces`)
            .then((res) => {
                setProvinces(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getDistricts = (provinceId) => {
        axios
            .get(`${Constants.BASE_URL}/districts/${provinceId}`)
            .then((res) => {
                setDistricts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getCities = (cityId) => {
        axios
            .get(`${Constants.BASE_URL}/cities/${cityId}`)
            .then((res) => {
                setCities(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getShops = () => {
        Loading.standard()

        axios.get(`${Constants.BASE_URL}/get-shops-list`).then(res => {
            setShops(res.data);
        }).catch(err => {
            console.log(err)
        })

        Loading.remove()
    }

    const handleInput = (e) => {
        if (e.target.name === "province") {
            setDistricts([]);
            setCities([]);
            getDistricts(e.target.value);
        }

        if (e.target.name === "district") {
            setCities([]);
            getCities(e.target.value);
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
    }

    const handleNICPhoto = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setInput((prevState) => ({ ...prevState, nic_photo: reader.result }));
        };
        reader.readAsDataURL(file);
    }

    const handleUpdateSalesManager = (e) => {
        e.preventDefault();

        Loading.standard();

        axios
            .put(`${Constants.BASE_URL}/sales-managers/${params.id}`, input)
            .then((res) => {
                Notify.success(res.data.msg);

                Loading.remove();

                navigate("/sales-manager");
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                }

                Loading.remove();
            });
    };

    useEffect(() => {
        getProvinces();
        getSalesManager();
        getShops();
    }, []);

    return (
        <>
            <Breadcrumb title={"Edit Sales Manager"} />
            <div className="container-fluid">
                <Card
                    to={"/supplier"}
                    title={"Edit Sales Manager"}
                    btnText={"Sales Manager List"}
                >
                    <form className="form-row" onSubmit={handleUpdateSalesManager}>
                        <div className="form-group col-md-6">
                            <label htmlFor="name" className="form-label">
                                Sales Manager Name
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.name ? "form-control border-danger" : "form-control"
                                }
                                id="name"
                                placeholder={"Enter sales manager name"}
                                name={"name"}
                                value={input.name}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.name ? errors.name[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email" className="form-label">
                                Sales Manager Email
                            </label>
                            <input
                                type="email"
                                className={
                                    errors.email ? "form-control border-danger" : "form-control"
                                }
                                id="email"
                                placeholder={"Enter sales manager email"}
                                name={"email"}
                                value={input.email}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.email ? errors.email[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className={
                                    errors.password ? "form-control border-danger" : "form-control"
                                }
                                id="password"
                                placeholder={"Enter sales manager password"}
                                name={"password"}
                                value={input.password}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.password ? errors.password[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password_confirmation" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className={
                                    errors.password_confirmation ? "form-control border-danger" : "form-control"
                                }
                                id="password_confirmation"
                                placeholder={"Re enter sales manager password"}
                                name={"password_confirmation"}
                                value={input.password_confirmation}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.password_confirmation ? errors.password_confirmation[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone" className="form-label">
                                Sales Manager Phone
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.phone ? "form-control border-danger" : "form-control"
                                }
                                id="phone"
                                placeholder={"Enter sales manager phone"}
                                name={"phone"}
                                value={input.phone}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.phone ? errors.phone[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="nic" className="form-label">
                                NIC / Driving Licence / Passport Number
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.nic ? "form-control border-danger" : "form-control"
                                }
                                id="nic"
                                placeholder={"Enter sales manager nic / passport / driving licence"}
                                name={"nic"}
                                value={input.nic}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.nic ? errors.nic[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="status" className="form-label">
                                Sales Manager Status
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
                                Sales Manager Address
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.address ? "form-control border-danger" : "form-control"
                                }
                                id="address"
                                placeholder={"Enter sales manager address"}
                                name={"address"}
                                value={input.address}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.address ? errors.address[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="shop" className="form-label">
                                Shop
                            </label>
                            <select
                                name="shop"
                                value={input.shop}
                                onChange={handleInput}
                                className={
                                    errors.shop
                                        ? "custom-select border-danger"
                                        : "custom-select"
                                }
                            >
                                <option>Select Shop</option>
                                {Object.keys(shops).length > 0 ? (
                                    shops.map((shop, index) => (
                                        <option key={index} value={shop.id}>
                                            {shop.company}
                                        </option>
                                    ))
                                ) : (
                                    <option>
                                        No Shops
                                    </option>
                                )}
                            </select>
                            <div className="text-xs text-danger ml-2">
                                {errors.shop ? errors.shop[0] : null}
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
                                Sales Manager Landmark
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.landmark ? "form-control border-danger" : "form-control"
                                }
                                id="landmark"
                                placeholder={"Enter sales manager landmark"}
                                name={"landmark"}
                                value={input.landmark}
                                onChange={handleInput}
                            />
                            <div className="text-xs text-danger ml-2">
                                {errors.landmark ? errors.landmark[0] : null}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="photo" className="form-label">
                                Sales Manager Photo
                            </label>
                            <div className="custom-file" style={{ zIndex: 0 }}>
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
                        <div className="form-group col-md-6">
                            <label htmlFor="nic_photo" className="form-label">
                                Sales Manager NIC / Passport / Licence Photo
                            </label>
                            <div className="custom-file" style={{ zIndex: 0 }}>
                                <input
                                    type="file"
                                    className={
                                        errors.nic_photo
                                            ? "custom-file-input border-danger"
                                            : "custom-file-input"
                                    }
                                    value={""}
                                    onChange={handleNICPhoto}
                                />
                                <label className="custom-file-label" htmlFor="nic_photo">
                                    Choose file
                                </label>
                            </div>
                            <div className="text-xs text-danger ml-2">
                                {errors.nic_photo ? errors.nic_photo[0] : null}
                            </div>
                            {input.nic_photo !== undefined || input.nic_photo_preview !== undefined ? (
                                <div className="photo-preview">
                                    <img
                                        alt={"photo-preview"}
                                        src={input.nic_photo || input.nic_photo_preview}
                                        className="img-thumbnail w-25 mt-3"
                                    />
                                </div>
                            ) : null}
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="bio" className="form-label">
                                Sales Manager Description
                            </label>
                            <textarea
                                className="form-control"
                                name="bio"
                                rows="3"
                                placeholder={"Type some bio about sales manager..."}
                                value={input.bio}
                                onChange={handleInput}
                            ></textarea>
                            <div className="text-xs text-danger ml-2">
                                {errors.bio ? errors.bio[0] : null}
                            </div>
                        </div>
                        <SubmitButton value={"Update Sales Manager"} isLoading={isLoading} />
                    </form>
                </Card>
            </div>
        </>
    );
};

export default EditSalesManager;
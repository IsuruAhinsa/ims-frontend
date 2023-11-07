import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Constants from "../../../constants/Constants.js";
import SubmitButton from "../../partials/common/SubmitButton.jsx";

const Login = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({});
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name]: e.target.value}))

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/login`, input).then(res => {
            localStorage.email = res.data.email
            localStorage.name = res.data.name
            localStorage.phone = res.data.phone
            localStorage.photo = res.data.photo
            localStorage.token = res.data.token
            localStorage.role = res.data.role
            localStorage.branch = JSON.stringify(res.data.branch)
            window.location.reload()
        }).catch(err => {
            if (err.response.status == 422) {
                setErrors(err.response.data.errors)
            }
            setIsLoading(false)
        })
    };

    useEffect(() => {
        if (localStorage.token != undefined) {
            navigate('/');
        }
    }, [])

    return (<div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* Nested Row within Card Body */}
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"/>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form className="user" onSubmit={handleLogin} >
                                        <div className="form-group">
                                            Login as:
                                            <select
                                                className={errors.password ? 'custom-select border-danger' : 'custom-select'}
                                                name={'user_type'}
                                                onChange={handleInput}
                                            >
                                                <option>Select User</option>
                                                <option value="1">Administrator</option>
                                                <option value="2">Sales Manager</option>
                                            </select>
                                            <div className="text-xs text-danger ml-2">
                                                { errors.user_type ? errors.user_type[0] : null }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                className={errors.email ? 'form-control form-control-user border-danger' : 'form-control form-control-user'}
                                                id="email"
                                                aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..."
                                                name={'email'}
                                                value={input.email}
                                                onChange={handleInput}
                                            />
                                            <div className="text-xs text-danger ml-2">
                                                { errors.email ? errors.email[0] : null }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className={errors.password ? 'form-control form-control-user border-danger' : 'form-control form-control-user'}
                                                id="password"
                                                placeholder="Password"
                                                name={'password'}
                                                value={input.password}
                                                onChange={handleInput}
                                            />
                                            <div className="text-xs text-danger ml-2">
                                                { errors.password ? errors.password[0] : null }
                                            </div>
                                        </div>
                                        <SubmitButton value={'Login'} isLoading={isLoading}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Login;

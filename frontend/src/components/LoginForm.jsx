import React, { useRef } from 'react'
import { useFormik } from 'formik'
import * as api from '../api/Api'
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const LoginForm = () => {

    const loginBtnRef = useRef()

    const navigate = useNavigate()

    const loginForm = useFormik({
        initialValues: {
            name: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            password: Yup.string().required("Password is required")
        }),
        onSubmit: async (values) => {
            loginBtnRef.current.disabled = true
            const time = 2000
            const validation = await api.login(values)
            if (validation?.token) {
                localStorage.setItem("adminToken", validation.token)
                toast.success('Login successful', {
                    position: 'bottom-right',
                    autoClose: time,
                });
                setTimeout(() => {
                    navigate('/panel')
                }, time + 500);
            }
            else { // failed        
                toast.error('Name or password not valid!', {
                    position: 'bottom-right',
                    autoClose: time,
                })
                loginBtnRef.current.disabled = false
            }
        }
    })

    return (
        <>
            <ToastContainer />
            <form
                className="login-form m-auto border rounded d-flex flex-column p-5 mt-5 col-lg-6"
                onSubmit={loginForm.handleSubmit}
            >

                <label
                    htmlFor="name"
                    className="form-label"
                >
                    Name
                </label>
                <input
                    id="name" name="name" type="text"
                    className="form-control"
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    value={loginForm.values.name}
                />
                {loginForm.touched.name && loginForm.errors.name && (
                    <div className="error form-text mb-2">{loginForm.errors.name}</div>
                )}

                <label
                    htmlFor="Password"
                    className="form-label mt-3"
                >
                    Password
                </label>
                <input
                    id="password" name="password" type="password"
                    className="form-control"
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    value={loginForm.values.password}
                />
                {loginForm.touched.password && loginForm.errors.password && (
                    <div className="error form-text mb-2">{loginForm.errors.password}</div>
                )}

                <button
                    ref={loginBtnRef}
                    type="submit"
                    className="btn btn-primary mt-4"
                >
                    Submit
                </button>

            </form>
        </>
    )
}

export default LoginForm
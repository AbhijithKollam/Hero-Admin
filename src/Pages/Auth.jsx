import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import authImage from '../Assets/image1.jpg'; // Auth image
import { loginAPI, registerAPI } from '../Services/allApis';

function Auth({ register }) {
    const navigate = useNavigate();
    const registerForm = register ? true : false;
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(userData.email);

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(userData);
        const { username, email, password } = userData;
        if (!username || !email || !password) {
            alert("Please fill the form completely")
        }
        else {
            userData.role = "admin";
            userData.email = email.toLocaleLowerCase();
            const result = await registerAPI(userData);
            console.log(result);

            if (result.status === 200) {
                alert("User registered successfully")
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/')
            }
            else {
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                alert(result.response.data)
            }
        }
    }

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault();
        const { email, password } = userData;
        if (!email || !password) {
            alert("Please fill the form completely")
        }
        else {
            userData.role = "admin";
            userData.email = email.toLocaleLowerCase();
            const result = await loginAPI(userData);
            if (result.status === 200) {
                console.log(result);
                localStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));

                setTimeout(() => {

                    alert("User logged in successfully");
                    setLoading(false)

                    setUserData({
                        username: "",
                        email: "",
                        password: ""
                    });

                    navigate('/home');
                }, 3000);  // 3000 milliseconds = 3 seconds
            }
            else {
                setLoading(false)
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                alert(result.response.data)
            }
        }
    }

    return (
        <>
            <div
                style={{
                    position: 'relative',
                    height: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundImage: `url('https://storage.googleapis.com/a1aa/image/f86vjuwJsqRRG6lyydhSULLbDfQBJBelHYNoUZ8bQbF40hinA.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Applying the blur effect using the ::before pseudo element */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: -1, // Keep it behind content
                        filter: 'blur(2px)', // Blur effect here
                        backgroundImage: `url('https://storage.googleapis.com/a1aa/image/f86vjuwJsqRRG6lyydhSULLbDfQBJBelHYNoUZ8bQbF40hinA.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>

                {/* Content Section */}
                <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', width: '100%' }}>
                    <div className='w-75 container'>


                        <div className='card bg-transparent p-5 mt-3 rounded text-white'>
                            <div className='row align-items-center'>
                                <div className="col-lg-6 col-md-6">
                                    <img src={authImage} alt="auth " style={{ width: '100%', borderRadius: '50%' }} />
                                </div>

                                <div className='col-lg-6 col-md-6 p-3'>
                                    <div className="d-flex flex-column">
                                        <h5>{registerForm ? "Sign Up your account" : "Sign into your account"}</h5>
                                        <Form>
                                            {registerForm && (
                                                <Form.Group className="pt-3" md="4">
                                                    <Form.Label>User name</Form.Label>
                                                    <Form.Control
                                                        value={userData.username}
                                                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                                        type="text"
                                                        placeholder="User name"
                                                    />
                                                </Form.Group>
                                            )}

                                            <Form.Group className="pt-3" md="4">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    value={userData.email}
                                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                    type="email"
                                                    placeholder="Email"
                                                    isInvalid={userData.email && !emailValid}
                                                />
                                                <Form.Control.Feedback type="invalid" className="text-white">
                                                    Please provide a valid email address.
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="pt-3" md="4">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    value={userData.password}
                                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Group>
                                        </Form>

                                        {registerForm ? (
                                            <div>
                                                <button
                                                    className="btn btn-warning rounded mt-3"
                                                    onClick={handleRegister}
                                                    disabled={!emailValid} // Disable if email is invalid or password is empty
                                                >
                                                    Register
                                                </button>
                                                <p className="mt-3">
                                                    Already a user? click here to{' '}
                                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                                        Login
                                                    </Link>
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                {
                                                    loading ?
                                                        <button className="btn btn-warning rounded mt-3"><i className="fa-solid fa-spinner fa-spin"></i></button>
                                                        :
                                                        <button
                                                            className="btn btn-warning rounded mt-3"
                                                            onClick={handleLogin}
                                                            disabled={!emailValid || !userData.password} // Disable if email is invalid or password is empty
                                                        >
                                                            Login
                                                        </button>
                                                }
                                                
                                                <p className="mt-3">
                                                    New here? click here to{' '}
                                                    <Link to="/register" style={{ textDecoration: 'none' }}>
                                                        Register
                                                    </Link>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Auth;

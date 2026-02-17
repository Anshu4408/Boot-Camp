'use client';
import React, { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';

const AuthForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const [signup, setSignup] = useState(true);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };
    const handleSignup = () => {
        console.log('Signup data:', formData);
    };

    const handleLogin = () => {
        console.log('Login data:', formData);
    };

    return (
        <div className="w-1/2 bg-white flex flex-col items-center justify-center px-8 py-14">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-6">
                    <svg width="136" height="23" viewBox="0 0 136 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.72342 4.20672H9.23907V17.7325H26.9275V20H6.72342V4.20672ZM55.5 4.20672C58.5233 4.20672 59.7529 5.43634 59.7529 8.45963V15.7471C59.7529 18.7704 58.5233 20 55.5 20H41.8952C38.8719 20 37.6536 18.7704 37.6536 15.7471V8.45963C37.6536 5.43634 38.8719 4.20672 41.8952 4.20672H55.5ZM40.1354 15.4876C40.1354 17.3941 40.4738 17.7325 42.3803 17.7325H55.0262C56.9214 17.7325 57.2711 17.3941 57.2711 15.4876V8.71909C57.2711 6.81261 56.9214 6.47418 55.0262 6.47418H42.3803C40.4738 6.47418 40.1354 6.81261 40.1354 8.71909V15.4876ZM93.4172 4.20672V6.47418H77.545C75.6385 6.47418 75.3001 6.81261 75.3001 8.71909V15.4876C75.3001 17.3941 75.6385 17.7325 77.545 17.7325H90.9354V13.1976H83.1178V10.9301H93.4172V20H77.0599C74.0366 20 72.8183 18.7704 72.8183 15.7471V8.45963C72.8183 5.43634 74.0366 4.20672 77.0599 4.20672H93.4172ZM124.309 4.20672C127.332 4.20672 128.562 5.43634 128.562 8.45963V15.7471C128.562 18.7704 127.332 20 124.309 20H110.704C107.681 20 106.463 18.7704 106.463 15.7471V8.45963C106.463 5.43634 107.681 4.20672 110.704 4.20672H124.309ZM108.945 15.4876C108.945 17.3941 109.283 17.7325 111.189 17.7325H123.835C125.731 17.7325 126.08 17.3941 126.08 15.4876V8.71909C126.08 6.81261 125.731 6.47418 123.835 6.47418H111.189C109.283 6.47418 108.945 6.81261 108.945 8.71909V15.4876Z" fill="black" />
                    </svg>

                </div>

                {/* Tabs */}
                <div className="flex bg-[#E7E2F3] rounded-xl p-1 mb-8">
                    <button className={`flex-1 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${signup ? 'bg-[#7C4BE7] text-white' : 'text-gray-700'}`} onClick={() => {setSignup(true); setForgotPassword(false); setResetPassword(false)}}>
                        Sign Up
                    </button>
                    <button className={`flex-1 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${!signup ? 'bg-[#7C4BE7] text-white' : 'text-gray-700'}`} onClick={() => {setSignup(false)}}>
                        Sign In
                    </button>
                </div>

                {/* Title */}
                <div className="mb-6">
                    <h3 className="text-2xl text-gray-800">
                        {resetPassword ? "Reset Password" : (forgotPassword ? "Forgot Password" : (signup ? "Create Account" : "Welcome Back"))}
                    </h3>
                    <p className="text-sm mt-2">
                        {resetPassword
                            ? "Ready to create new password? Please type something you'll remember."
                            : (forgotPassword 
                                ? "Enter your email address and we'll send you a link to reset your password." 
                                : (signup ? "Go ahead and sign up, let everyone know how awesome you are!" : "Go ahead and sign in. Get acces to your incredible account!")
                            )
                        }
                    </p>
                </div>


                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {resetPassword ? (
                        <>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C89D9]">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="New Password"
                                    className="w-full pl-12 pr-4 py-3 border border-[#E3D9F7] rounded-xl focus:ring-2 focus:ring-[#7C4BE7] focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C89D9]">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm New Password"
                                    className="w-full pl-12 pr-4 py-3 border border-[#E3D9F7] rounded-xl focus:ring-2 focus:ring-[#7C4BE7] focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-[#8150E8] to-[#758FF0] text-white rounded-xl font-bold text-sm"
                            >
                                Submit
                            </button>
                        </>
                    ) : forgotPassword ? (
                        <>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C89D9]">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full pl-12 pr-4 py-3 border border-[#E3D9F7] rounded-xl focus:ring-2 focus:ring-[#7C4BE7] focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-[#8150E8] to-[#758FF0] text-white rounded-xl font-bold text-sm"
                                onClick={() => setResetPassword(true)}
                            >
                                Send Reset Link
                            </button>
                            <button
                                type="button"
                                className="w-full py-3 bg-[#EEF1FB] text-sm rounded-xl text-gray-700"
                                onClick={() => setForgotPassword(false)}
                            >
                                Back to Sign In
                            </button>
                        </>
                    ) : (
                        <>
                            {signup ? <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C89D9]">
                                    <User size={18} />
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="w-full pl-12 pr-4 py-3 border border-[#E3D9F7] rounded-xl focus:ring-2 focus:ring-[#7C4BE7] focus:border-transparent outline-none"
                                />
                            </div> : null}


                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C89D9]">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full pl-12 pr-4 py-3 border border-[#E3D9F7] rounded-xl focus:ring-2 focus:ring-[#7C4BE7] focus:border-transparent outline-none"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C89D9]">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full pl-12 pr-4 py-3 border border-[#E3D9F7] rounded-xl focus:ring-2 focus:ring-[#7C4BE7] focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                            {signup ? <div className="relative"> <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C89D9]">
                                <Lock size={18} />
                            </span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className="w-full pl-12 pr-4 py-3 border border-[#E3D9F7] rounded-xl focus:ring-2 focus:ring-[#7C4BE7] focus:border-transparent outline-none"
                                    required
                                />
                            </div> : null}



                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-[#8150E8] to-[#758FF0] text-white rounded-xl font-bold text-sm"
                                onClick={() => signup ? handleSignup() : handleLogin()}
                            >
                                {signup ? "Create Account" : "Sign In"}

                            </button>
                            {signup ? <button
                                type="button"
                                className="w-full py-3 bg-[#EEF1FB] text-sm rounded-xl "
                            >
                                I already have an account
                            </button> : <button
                                type="button"
                                className="w-full py-3 bg-[#EEF1FB] text-sm rounded-xl "
                                onClick={() => setForgotPassword(true)}
                            >
                                I forgot my password
                            </button>}
                        </>
                    )}

                </form>



            </div>
        </div>
    );
};

export default AuthForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api.ts';

const SignupForm: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('male');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signupUser({ userName, password, email, gender });

            setMessage(result.message);
        } catch (error) {
            setMessage('Error signing up');
        }
    };



    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <select
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full p-2 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                    {message && <p className="text-red-500 text-center">{message}</p>}
                </form>
                <button
                    onClick={handleLogin}
                    className="mt-4 w-full p-2 border border-teal-500 text-teal-500 font-semibold rounded hover:bg-teal-500 hover:text-white transition duration-200"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default SignupForm;

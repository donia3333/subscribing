import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api.ts';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await loginUser({ email, password });
            setMessage(result.message);

            localStorage.setItem('token', result.token);
            if (result.role === 'admin') {
                navigate('/userslist');
            } else {
                navigate('/user');
            }
        } catch (error) {
            setMessage('Invalid email or password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded p-2 w-full mb-4"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded p-2 w-full mb-4"
                        required
                    />
                    <button type="submit" className="bg-teal-500 text-white p-2 rounded w-full">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;

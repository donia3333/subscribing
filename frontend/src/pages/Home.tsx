import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-4">Welcome</h1>
            <p className="text-lg mb-6">Click the button below to create a new account</p>
            <Link to="/signup">
                <button className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300">
                    Sign Up
                </button>
            </Link>
        </div>
    );
};

export default Home;

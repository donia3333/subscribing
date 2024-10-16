import React from 'react';

const User: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login Successful</h2>
                <p>Welcome! You have successfully logged in.</p>
            </div>
        </div>
    );
};

export default User;

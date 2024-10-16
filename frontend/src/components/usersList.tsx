import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api.ts';

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                setError('Error fetching users');
            }
        };

        getUsers();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Users List</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <ul className="bg-white shadow-md rounded-lg">
                {users.map((user) => (
                    <li key={user._id} className="flex justify-between items-center border-b last:border-b-0 p-4 hover:bg-gray-100">
                        <div className="flex flex-col">
                            <span className="font-semibold">{user.userName}</span>
                            <span className="text-gray-600">{user.email}</span>
                        </div>
                        <span className={`text-sm ${user.role === 'admin' ? 'text-blue-500' : 'text-green-500'}`}>
                            {user.role}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;

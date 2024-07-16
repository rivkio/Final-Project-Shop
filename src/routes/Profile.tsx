import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from '../services/auth';
import { IUser } from '../@types/@types';

const Profile: React.FC = () => {
    const [user, setUser] = useState<IUser>();
    // const { user } = useAuth();
    const { _id } = jwtDecode(localStorage.getItem("token") || "") as any

    useEffect(() => {
        getUserById(_id)
            .then((res) => {
                setUser(res.data)
            })
    }, [])

    if (!user) {
        return <div>No user data found</div>;
    }

    return (
        <div>
            <h2 className="text-xl text-orange-400 bg-slate-800">
                {user.name.first} {user.name.middle} {user.name.last}
            </h2>
            <p className="text-lg text-orange-400 bg-slate-800">{user.email}</p>
            <p className="text-lg text-orange-400 bg-slate-800">{user.phone}</p>
        </div>
    );
};

export default Profile;
'use client'

import { useEffect, useState } from "react";

export default function User({ params }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!error && loading) {
                let resp;
                try {
                    resp = await fetch(`/api/users/${params.uuid}`);
                    if (!resp.ok) {
                        setError(true);
                        return;
                    }
                    const text = await resp.json();
                    setUser(text);
                    setLoading(false);

                }

                catch {
                    setError(true);
                }
            }


        };

        fetchUser();
    });

    if (error) {
        return <p>User not found</p>
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return user && <>
        <p>username: {user.username}</p>
        <p>email: {user.email}</p>
        <b>records:</b>
            <ul>
                <li>high score: {user.high_score}</li>
                <li>games played: {user.games_played}</li>
                <li>average score: {user.avg_score}</li>
            </ul>
    </>
}
'use client'

import { useEffect, useState } from "react";
import "./users.css";

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

    return <>
        <center>
        <h1>{user.username}&apos;s userpage</h1>
        <p>email: {user.email}</p><br></br>
        <h2>Records:</h2>
            <ul>
                <li>High score: {user.high_score}</li>
                <li>Average score: {user.avg_score}</li>
                <li>Games played: {user.games_played}</li>
            </ul>
        </center>
    </>
}
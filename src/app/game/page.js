"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Game() {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/game");
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!error && loading) {
                let resp;
                try {
                    resp = await fetch(`/api/games/start`);
                    if (!resp.ok) {
                        setError(true);
                        return;
                    }
                    const text = await resp.json();
                    setGame(text);
                    setLoading(false);
                } catch {
                    setError(true);
                }
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <p>Error creating game</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {game &&
                game.map((q) => (
                    <>
                        <p>Hi</p>
                        <img src={q.image_file} />
                        <p>
                            {q.lat} {q.long}
                        </p>
                    </>
                ))}
        </>
    );
}

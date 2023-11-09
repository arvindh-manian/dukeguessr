"use client";

import { useEffect, useState } from "react";
import "./users.css";
import {
    HStack,
    Heading,
    StatLabel,
    StatNumber,
    Stat,
    VStack,
} from "@chakra-ui/react";

const ComposedStat = ({ number, label }) => {
    return (
        <Stat
            border="1px"
            borderRadius={5}
            borderColor="black"
            bg="gray.50"
            padding={2}
            alignItems={"center"}>
            <StatLabel>{label}</StatLabel>
            <StatNumber>{number ? number : "-"}</StatNumber>
        </Stat>
    );
};

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
                } catch {
                    setError(true);
                }
            }
        };

        fetchUser();
    });

    if (error) {
        return <p>User not found</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <VStack>
                <Heading>{user.username}</Heading>
                <h1>
                    {user.username}&apos;s userpage | {user.email}
                </h1>
                <br></br>
                <HStack justifyContent={"space-between"} w={"80vw"}>
                    <ComposedStat
                        number={user.games_played || "0"}
                        label="Games played"></ComposedStat>
                    <ComposedStat
                        number={Math.round(user.avg_score)}
                        label="Average score"></ComposedStat>
                    <ComposedStat
                        number={user.high_score}
                        label="High score"></ComposedStat>
                </HStack>
            </VStack>
        </>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Cookies from 'js-cookie';
import "./users.css";
import {
    HStack,
    Heading,
    StatLabel,
    StatNumber,
    Stat,
    VStack,
    Image,
    IconButton,
    Spacer,
    Text,
    Center,
    Box
} from "@chakra-ui/react";
import { RenderedAchievements } from "@/app/components/achievements";

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
    const [selectedMarker, setSelectedMarker] = useState(null);
    const { data: session } = useSession();

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

    const handleMarkerSelection = (marker) => {
        setSelectedMarker(marker);
        Cookies.set("selectedMarker", marker);
        console.log(Cookies.get("selectedMarker"))
      };


    console.log(session.username)
    return (
        <>
        <VStack spacing={100} align='stretch'>
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
                <br></br>
                <RenderedAchievements achievements={["one_game_played", "five_games_played", "ten_games_played", "within_10_feet", "over_1000_miles"].filter((achievement) => user[achievement])} />
            </VStack>
            <><h1></h1></>
        </VStack>
            {user.username === session.user.name ? (
                <VStack>
                <><Text as='b' >Choose Your Marker!</Text>
                <><HStack spacing={20} padding='20px'>
                <IconButton
                    icon={<Image 
                        src="/images/devil.png"
                        width={65}
                        height={95} />}
                    border="1px"
                    background={selectedMarker === "devil" ? "#C3E3FC" : "transparent"}
                    _hover={{ background: "#C3E3FC" }}
                    width={100}
                    height={100}
                    onClick={() => handleMarkerSelection("devil")}
                />
                <IconButton
                    icon={<Image 
                        src="/images/happy.png"
                        width={65}
                        height={85} />}
                    border="1px"
                    background={selectedMarker === "happy" ? "#C3E3FC" : "transparent"}
                    _hover={{ background: "#C3E3FC" }}
                    width={100}
                    height={100}
                    onClick={() => handleMarkerSelection("happy")}
                />
                <IconButton
                    icon={<Image 
                        src="/images/dead.png"
                        width={55}
                        height={79} />}
                    border="1px"
                    background={selectedMarker === "dead" ? "#C3E3FC" : "transparent"}
                    _hover={{ background: "#C3E3FC" }}
                    width={100}
                    height={100}
                    onClick={() => handleMarkerSelection("dead")}
                />
                <IconButton
                    icon={<Image 
                        src="/images/sleep.png"
                        width={55}
                        height={79} />}
                    border="1px"
                    width={100}
                    height={100}
                    _hover={{ background: "#transparent" }}
                    onClick={null}
                    style={{ opacity: 0.35 }}
                />
                </HStack></></>
                </VStack>
            ): null}
        </>
    );
}

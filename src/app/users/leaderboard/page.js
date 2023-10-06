'use client'
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button
  } from '@chakra-ui/react';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Leaderboard({ params }) {
    const [leaderboard, setLeaderboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            if (!error && loading) {
                let resp;
                try {
                    resp = await fetch(`/api/users/leaderboard`);
                    if (!resp.ok) {
                        setError(true);
                        return;
                    }
                    const text = await resp.json();
                    setLeaderboard(text);
                    setLoading(false);

                }

                catch {
                    setError(true);
                }
            }
        };

        fetchLeaderboard();
    });

    if (error) {
        return <p>Error fetching leaderboard</p>
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return <>
        <div>
        <Heading
            size='lg'
            color='darkblue'
            align='center'
            mt={5}>
            Leaderboard</Heading>
            <TableContainer mt={5}>
                <Table variant='striped'>
                <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>High Score</Th>
                        <Th>Average Score</Th>
                        <Th>Games Played</Th>
                        <Th>View Profile</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {leaderboard.map((user) => (
                        <Tr key={user.username}>
                            <Td>{user.username}</Td>
                            <Td>{user.high_score ? user.high_score : "-"}</Td>
                            <Td>{user.avg_score ? user.avg_score : "-"}</Td>
                            <Td>{user.games_played ? user.games_played : "-"}</Td>
                            <Td>
                                <Link href={`/users/${user.username}`} style={{ display: "inline-block" }}>
                                    <Button
                                    colorScheme="black"
                                    fontSize="15"
                                    padding="20px 30px"
                                    _hover={{ bg: "lightgrey" }}
                                    variant="outline">
                                    {"View"}
                                    </Button>
                                </Link>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            </TableContainer>
        </div>
    </>
}
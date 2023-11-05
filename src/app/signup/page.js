"use client";
import { useState } from "react";

import {
    Portal,
    PopoverFooter,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    HStack,
} from "@chakra-ui/react";
import {
    Spacer,
    Button,
    Box,
    Container,
    VStack,
    Icon,
    Space,
    Center,
    Input,
    Image,
    Flex,
    Badge,
    Text,
    Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import Footer from "../components/footer";
import styles from "./page.module.css";

export default function Start() {
    const handleButtonClick = async () => {
        console.log("Trying to insert new account...");
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            window.location.href='/api/auth/signin'
        } catch (error) {
            console.error("There was an error inserting the data!", error);
        }
    };

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Flex
            direction="column"
            align="center"
            justify="flex-start"
            minH="100vh"
            positive="relative">
            <Image
                src="images/dg_logo.png"
                alt="DukeGuessr Logo"
                width="200px"
                height="auto"
                mt={10}
            />
            <VStack spacing="10px">
                <Heading as="h1" size="xl" mt={200}>
                    Sign Up For DukeGuessr!
                </Heading>
                <HStack>
                    <Input
                        placeholder="Enter Username"
                        size="md"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder="Enter Email"
                        size="md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Enter Password"
                        size="md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        onClick={handleButtonClick}
                        colorScheme="blue"
                        fontSize="15"
                        padding="20px 30px"
                        _hover={{ bg: "lightgrey" }}
                        variant="outline">
                        {"Submit!"}
                    </Button>
                </HStack>
            </VStack>
            <Footer></Footer>
        </Flex>
    );
}
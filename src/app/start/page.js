"use client";

import {
    Spacer,
    Button,
    Box,
    Container,
    VStack,
    Icon,
    Space,
    Center,
    Image,
    Flex,
    Badge,
    Text,
    Heading,
    HStack
} from "@chakra-ui/react";
import Link from "next/link";
import Footer from "../components/footer";
import styles from "./page.module.css";

export default function Start() {
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
            <VStack spacing="50px">
                <Heading as="h1" size="xl" mt={100}>
                    Welcome to DukeGuessr!
                </Heading>
                <HStack>
                    <Link href="/gamemode" style={{ display: "inline-block" }}>
                        <Button
                            colorScheme="black"
                            fontSize="15"
                            padding="20px 30px"
                            _hover={{ bg: "lightgrey" }}
                            variant="outline">
                            {"Let's Go!"}
                        </Button>
                    </Link>
                </HStack>
            </VStack>
        </Flex>
    );
}
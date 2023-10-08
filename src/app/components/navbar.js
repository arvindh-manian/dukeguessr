"use client";

import {
    useColorModeValue,
    useDisclosure,
    chakra,
    Flex,
    VisuallyHidden,
    HStack,
    Button,
} from "@chakra-ui/react";
import Link from "next/link";
import Instruct from "../components/instruct";
import React from "react";

export default function Navbar() {
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    return (
        <React.Fragment>
            <chakra.header
                bg={bg}
                w="full"
                px={{
                    base: 2,
                    sm: 4,
                }}
                py={4}
                shadow="md">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mx="auto">
                    <Flex>
                        <chakra.a
                            href="/start"
                            fontSize="xl"
                            fontWeight="medium"
                            color="black"
                            _dark={{
                                color: "white",
                                _hover: {
                                    color: "gray.300",
                                },
                            }}
                            _hover={{
                                color: "gray.700",
                            }}>
                            DukeGuessr
                        </chakra.a>
                    </Flex>
                    <HStack display="flex" alignItems="center" spacing={1}>
                        <HStack
                            spacing={1}
                            mr={1}
                            color="brand.500"
                            display={{
                                base: "none",
                                md: "inline-flex",
                            }}>
                            <Link
                                href="/users/leaderboard"
                                style={{ display: "inline-block" }}>
                                <Button variant="ghost">Leaderboard</Button>
                            </Link>
                            <Button variant="ghost">Contact Us</Button>
                            <Link
                                href="/signup"
                                style={{ display: "inline-block" }}>
                                <Button variant="ghost">Sign in</Button>
                            </Link>
                            <Instruct></Instruct>
                        </HStack>
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    );
}

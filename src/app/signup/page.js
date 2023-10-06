"use client";

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
    Image,
    Flex,
    Badge,
    Text,
    Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import Footer from "../components/footer";
import PasswordInput from "../components/passwordblock.js";
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
            <VStack spacing="10px">
                <Heading as="h1" size="xl" mt={200}>
                    Sign Up for DukeGuessr!
                </Heading>
                <HStack>
                    <Link href="/games" style={{ display: "inline-block" }}>
                        <Button
                            colorScheme="blue"
                            fontSize="15"
                            padding="20px 30px"
                            _hover={{ bg: "lightgrey" }}
                            variant="outline">
                            {"Sign Up!"}
                        </Button>
                    </Link>
                    <Input placeholder='Enter Username' size='md' />
                    <Input placeholder='Enter Email' size='md' />
                    <PasswordInput/>
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                size="xs"
                                colorScheme="red"
                                variant="outline"
                                _hover={{ bg: "lightgrey" }}>
                                {"?"}
                            </Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>{"Instructions"}</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    {"Input game instructions here"}
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </HStack>
            </VStack>
            <Footer></Footer>
        </Flex>
    );
}

/*import { Button, Box, Center, Image, Flex, Badge, Text } from "@chakra-ui/react";

export default function Start() {
  return (
    <div>
      <Center>Welcome to DukeGuessr!</Center>
      <Button>Start Game</Button>

    </div>
  )
}*/

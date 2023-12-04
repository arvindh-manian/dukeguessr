import {
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Modal,
    HStack,
    Text,
    Spacer,
    Heading,
    Center,
    VStack,
    Box,
    StatLabel,
    StatNumber,
    Stat,
    Link,
    Button
} from "@chakra-ui/react";

import { Carousel } from "./carousel";

import { useState } from "react";
import { RenderedAchievements } from "./achievements";


const AchievementDisplay = ({achievements, isOpen, onClose}) => {
  console.log("Modal achievements", achievements);
  console.log("Is open", isOpen);
    return <> {isOpen && <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Achievements</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
            <RenderedAchievements achievements={achievements}/>
        </ModalBody>
    </ModalContent>
    </Modal>}
            </>
}

export const ResultDisplay = ({achievements, score, guesses, isOpen, setIsOpen, game}) => {
    const sum = guesses.reduce((total, guess) => total + guess.distance, 0);
    const average_distance = Math.round(sum / guesses.length * 100) / 100;
    return <Box minH={"80vh"} maxH={"80vh"}>
    <AchievementDisplay achievements={achievements} isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    <Center><Heading>Results</Heading></Center>
    <Carousel slides={game.map((item) => item.image_file)}></Carousel>
    <Spacer></Spacer>
    <Center>
    <VStack>
    <HStack justifyContent={"space-between"} w={"72.5vw"}>
    
      
    <Stat bg="gray.50" border="1px"
            borderRadius={5}
            borderColor="black"
            alignItems={"center"}
            padding={2} maxW="35vw">
      <StatLabel>Score</StatLabel>
      <StatNumber>{score}</StatNumber>
    </Stat>    
    

    <Stat bg="gray.50" border="1px"
            borderRadius={5}
            borderColor="black"
            alignItems={"center"}
            padding={2} maxW="35vw">
      <StatLabel>Average Distance</StatLabel>
      <StatNumber>{average_distance}</StatNumber>
    </Stat></HStack>
    <Spacer></Spacer>
    <Link href="/gamemode" style={{ display: "inline-block" }}>
      <Button
        colorScheme="black"
        fontSize="15"
        padding="20px 30px"
        _hover={{ bg: "lightgrey" }}
        variant="outline">
        {"Play Again"}
      </Button>
    </Link>
    </VStack>
    </Center>
    </Box>
} 
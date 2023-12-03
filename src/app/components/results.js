import {
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Modal,
    List,
    ListItem,
} from "@chakra-ui/react";

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

export const ResultDisplay = ({achievements, score, isOpen, setIsOpen}) => {
    console.log("Result display achievements", achievements);
    console.log("Is open result", isOpen);
    console.log(achievements && achievements.length > 0);
    return <>
    <AchievementDisplay achievements={achievements} isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    <h1>good job you did 5 guesses your score was {score}</h1>
    </>
}
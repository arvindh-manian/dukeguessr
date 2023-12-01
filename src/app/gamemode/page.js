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
    Link,
    Badge,
    Text,
    Heading,
    HStack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function GameMode(){
    const [mode, setMode] = useState("all");
    const [sliderValue, setSliderValue] = useState(5);
    const [showTooltip, setShowTooltip] = useState(false);
    const [allLink, setAllLink] = useState("/game?mode=all&num_images=5");
    const [westLink, setWestLink] = useState("/game?mode=west&num_images=5");
    const [eastLink, setEastLink] = useState("/game?mode=east&num_images=5");
    const [gardensLink, setGardensLink] = useState("/game?mode=gardens&num_images=5");

    const handleChangeSlider = (val) => {
        console.log(val);
        setAllLink("/game?mode=all&num_images=" + val);
        setWestLink("/game?mode=west&num_images=" + val);
        setEastLink("/game?mode=east&num_images=" + val);
        setGardensLink("/game?mode=gardens&num_images=" + val);
    }

    return(
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
                <Heading as="h1" size="2xl" mt={100}>
                    Choose Your Mode!
                </Heading>
                <HStack>
                    <Link href={allLink} style={{ display: "inline-block" }}>
                        <Button
                            colorScheme="black"
                            fontSize="15"
                            padding="20px 30px"
                            _hover={{ bg: "lightgrey" }}
                            variant="outline">
                            {"All"}
                        </Button>
                    </Link>
                    <Link href={westLink} style={{ display: "inline-block" }}>
                        <Button
                            colorScheme="black"
                            fontSize="15"
                            padding="20px 30px"
                            _hover={{ bg: "lightgrey" }}
                            variant="outline">
                            {"West"}
                        </Button>
                    </Link>
                    <Link href={eastLink} style={{ display: "inline-block" }}>
                        <Button
                            colorScheme="black"
                            fontSize="15"
                            padding="20px 30px"
                            _hover={{ bg: "lightgrey" }}
                            variant="outline">
                            {"East"}
                        </Button>
                    </Link>
                    <Link href={gardensLink} style={{ display: "inline-block" }}>
                        <Button
                            colorScheme="black"
                            fontSize="15"
                            padding="20px 30px"
                            _hover={{ bg: "lightgrey" }}
                            variant="outline">
                            {"Gardens"}
                        </Button>
                    </Link>
                </HStack>
                <Slider 
                    aria-label='slider-ex-5' 
                    onChangeEnd={(val) => handleChangeSlider(val)}
                    id='slider'
                    defaultValue={5}
                    min={0}
                    max={20}
                    colorScheme='blue'
                    onChange={(v) => setSliderValue(v)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <SliderMark value={5} mt='1' ml='-2.5' fontSize='md'>
                        5
                    </SliderMark>
                    <SliderMark value={10} mt='1' ml='-2.5' fontSize='md'>
                        10
                    </SliderMark>
                    <SliderMark value={15} mt='1' ml='-2.5' fontSize='md'>
                        15
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg='blue.500'
                      color='white'
                      placement='top'
                      isOpen={showTooltip}
                      label={`${sliderValue}`}
                    >
                        <SliderThumb boxSize={4}/>
                    </Tooltip>
                </Slider>
            </VStack>
        </Flex>
    );
}


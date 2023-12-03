import { useState, useEffect } from "react";
import { Flex, Image, Box, Text, Button} from "@chakra-ui/react";

export const Carousel = ({slides}) => {
    // slides = [
    //   {
    //     img: "https://images.pexels.com/photos/2599537/pexels-photo-2599537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    //   },
    //   {
    //     img: "https://images.pexels.com/photos/2714581/pexels-photo-2714581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    //   },
    //   {
    //     img: "https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    //   },
    //   {
    //     img: "https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    //   },
    //   {
    //     img: "https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    //   },
    // ];
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = slides.length - 2;
    const carouselStyle = {
      transition: "all .5s",
      ml: `-${currentSlide * 33.3}%`,
    };
    const SLIDES_INTERVAL_TIME = 3000;
    const ANIMATION_DIRECTION = "right";
    useEffect(() => {
      const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
      };
  
      const nextSlide = () => {
        setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
      };
  
      const automatedSlide = setInterval(() => {
        ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
      }, SLIDES_INTERVAL_TIME);
      return () => clearInterval(automatedSlide);
    }, [slidesCount]);
    return (
      <Flex
        w="full"
        p={10}
        alignItems="center"
        justifyContent="center"
      >
        <Flex w="full" overflow="hidden" borderRadius={10}>
          <Flex pos="relative" h="300px" w="33.3%" {...carouselStyle}>
            {slides.map((slide, sid) => (
              <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
                <Text
                  color="white"
                  fontSize="xs"
                  p="8px 12px"
                  pos="absolute"
                  top="0"
                  whiteSpace="nowrap"
                >
                  {sid + 1} / {slidesCount + 2}
                </Text>
                <Image
                  src={slide}
                  alt="carousel image"
                  boxSize="full"
                  backgroundSize="cover"
                />
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
    );
  };
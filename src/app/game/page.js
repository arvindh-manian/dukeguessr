"use client";

import {
  Button,
  Input,
  HStack,
  VStack,
  Image,
  AspectRatio,
  Box
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Map from "../components/map";
import { useSession } from "next-auth/react";
import haversine from "haversine-distance";

export default function Game() {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [score, setScore] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const [resultPage, setResultPage] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [lastGuess, setLastGuess] = useState(0);
    const [newCenter, setNewCenter] = useState(null)
    const [guesses, setGuesses] = useState([]);

    const handleMarkerPositionChange = (position) => {
      console.log("resultPage: ",resultPage);
      if(!resultPage){
          setMarkerPosition(position);
        }
    };

    const handleNewCenter = (center) => {
      setNewCenter(center);
    }
    
    useEffect(() => {
        const fetchData = async () => {
          if (!error && loading) {
            let resp;
            try {
              resp = await fetch(`/api/games/start`, {method: "POST"})
              if (!resp.ok) {
                setError(true);
                return;
              }
              const text = await resp.json();        
              setGame(text);
              setLoading(false);
            } catch {
              setError(true);
            }
          }
        };
        
        fetchData();
      }, []);
      
    if (error) {
      return <p>Error creating game</p>;
    }

    if (loading) {
      return <p>Loading...</p>;
    }
    
    if (imageIndex <= 4 && !resultPage) {
    return <>
      <VStack spacing="30px" paddingTop="30px">
      <HStack spacing="10px">
        <Box boxSize="sm">
          <AspectRatio maxW='400px' ratio={9 / 9}>
            <Image
              src={game[imageIndex].image_file}
            ></Image>
          </AspectRatio>
        </Box>
          <Map 
            onMarkerPositionChange={handleMarkerPositionChange}
            onNewCenter={handleNewCenter}
            pauseMarker={false}
          ></Map>
        </HStack>
        {/*{markerPosition && (
          <div>
              <p>Latitude: {markerPosition.lat}</p>
              <p>Longitude: {markerPosition.lng}</p>
          </div>
        )} */}
        <Button
          onClick={() => {
            // compute distance from right answer using haversine
            const distance_from_right_answer = haversine(
              { lat: game[imageIndex].lat, lng: game[imageIndex].long },
              { lat: markerPosition.lat, lng: markerPosition.lng }
            );

            const feet_per_meter = 3.28084;
            const new_guess = {
              "distance": distance_from_right_answer * feet_per_meter
            }
            setGuesses([...guesses, new_guess])
            setScore(score + 1 / (10 * Math.sqrt((markerPosition.lat - game[imageIndex].lat) * (markerPosition.lat - game[imageIndex].lat) + (markerPosition.lng - game[imageIndex].long) * (markerPosition.lng - game[imageIndex].long))))
            setResultPage(true)}
          }
          colorScheme="black"
          fontSize="15"
          padding="20px 30px"
          _hover={{ bg: "lightgrey" }}
          variant="outline">
          {"Submit Guess"}
        </Button>
      <h1>
        Current Score: {score}
      </h1>
      </VStack>
    </>
    }

    if (imageIndex <= 4 && resultPage) {
      return <>
        <p></p>
        <VStack spacing="30px" style={{ paddingTop: "30px" }}>
        <HStack spacing="10px">
        <Box boxSize="sm">
          <AspectRatio maxW='400px' ratio={9 / 9.4}>
            <Image
              src={game[imageIndex].image_file}
            ></Image>
          </AspectRatio>
        </Box>
          <Map 
            onMarkerPositionChange={handleMarkerPositionChange}
            onNewCenter={handleNewCenter}
            imageMarkerPosition={{lat: parseFloat(game[imageIndex].lat), lng: parseFloat(game[imageIndex].long)}}
            userMarkerPosition={{lat: markerPosition.lat, lng: markerPosition.lng}}
            pauseMarker={true}
            >
          </Map>
          </HStack>
          <h1>
            current score: {score}
          </h1>
          <p>Your last guess was {guesses[guesses.length - 1].distance} feet away</p>
          <Button
            onClick={() => {
              setResultPage(false)
              setImageIndex(imageIndex + 1)
              setMarkerPosition(null)}
            }
            colorScheme="black"
            fontSize="15"
            padding="20px 30px"
            _hover={{ bg: "lightgrey" }}
            variant="outline">
            {"Next Location"}
          </Button>
          <h1>
            Current Score: {score}
          </h1>
        </VStack>
      </>
    }

    fetch(`/api/games/end`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "guesses": guesses,
        "score": Math.round(score),
        "uuid": session.user.name
      }),
    })

    return <><h1>good job you did 5 guesses your score was {score}</h1></>
}
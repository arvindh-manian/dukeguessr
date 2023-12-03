"use client";

import {
  Button,
  HStack,
  VStack,
  Image,
  AspectRatio,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Map from "../components/map";
import { useSession } from "next-auth/react";
import haversine from "haversine-distance";
import { useSearchParams } from 'next/navigation';
import { ResultDisplay } from "../components/results";

export default function Game() {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tempScore, setTempScore] = useState(0);
    const [score, setScore] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const [resultPage, setResultPage] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);
    const { data: session } = useSession();
    const [guesses, setGuesses] = useState([]);

    const centers = {all: { lat: 36.0014, lng: -78.9382 }, 
                    west: { lat: 36.0014, lng: -78.9382 }, 
                    east: { lat: 36.0070, lng: -78.9156 },
                    gardens: { lat: 36.0022, lng: -78.9331 }
                  }

    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    const num_images = searchParams.get('num_images');

    const [center, setCenter] = useState(centers[mode]);
    const [achievements, setAchievements] = useState(null);
    const [fetchingAchievements, setFetchingAchievements] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleMarkerPositionChange = (position) => {
      console.log("resultPage: ",resultPage);
      if(!resultPage){
          setMarkerPosition(position);
        }
    };

    const handleNewCenter = (newCenter) => {setCenter(newCenter)};
    
    useEffect(() => {
        const fetchData = async () => {
          if (!error && loading) {
            let resp;
            try {
              resp = await fetch(`/api/games/start`, {method: "POST", body: JSON.stringify({mode: mode, num_images: num_images})})
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
    
    if (imageIndex < num_images && !resultPage) {
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
            center={center}
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
            const new_temp_score = Math.min(1 / (10 * Math.sqrt((markerPosition.lat - game[imageIndex].lat) * (markerPosition.lat - game[imageIndex].lat) + (markerPosition.lng - game[imageIndex].long) * (markerPosition.lng - game[imageIndex].long))), 1500)
            setTempScore(new_temp_score)
            setScore(score + new_temp_score)
            setCenter({lat: parseFloat(game[imageIndex].lat), lng: parseFloat(game[imageIndex].long)})
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

    if (imageIndex < num_images && resultPage) {
      return <>
        <p></p>
        <VStack spacing="30px" style={{ paddingTop: "30px" }}>
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
            center={center}
            imageMarkerPosition={{lat: parseFloat(game[imageIndex].lat), lng: parseFloat(game[imageIndex].long)}}
            userMarkerPosition={{lat: markerPosition.lat, lng: markerPosition.lng}}
            pauseMarker={true}
            >
          </Map>
          </HStack>
          <h1>
          Score this guess: {tempScore}
          </h1>
          <p>Your last guess was {guesses[guesses.length - 1].distance} feet away</p>
          <Button
            onClick={() => {
              setResultPage(false)
              setImageIndex(imageIndex + 1)
              setMarkerPosition(null)
              setCenter(centers[mode])}
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

    if (achievements === null && !fetchingAchievements) {
      setFetchingAchievements(true);
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
      }).then(
        response => response.json()
      ).then(
        data => {
          setAchievements(data)
          setIsOpen(data && data.length > 0)
        }
      )
      return <h1>good job you did 5 guesses your score was {score}</h1>
    }



    return <ResultDisplay achievements={achievements} score={Math.round(score) } isOpen={isOpen} setIsOpen={setIsOpen} />
}
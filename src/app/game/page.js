
"use client";

import {
  Button,
  Input,
  HStack,
  VStack
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Map from "../components/map";

export default function Game() {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [score, setScore] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const [resultPage, setResultPage] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [newCenter, setNewCenter] = useState(null)

    const handleMarkerPositionChange = (position) => {
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
      <VStack spacing="10px">
        <img src={game[imageIndex].image_file}/>
        <Map 
          onMarkerPositionChange={handleMarkerPositionChange}
          onNewCenter={handleNewCenter}
          pauseMarker={false}
        ></Map>
        {markerPosition && (
                <div>
                    <p>Latitude: {markerPosition.lat}</p>
                    <p>Longitude: {markerPosition.lng}</p>
                </div>
            )}
        <Button
          onClick={() => {
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
        {game[imageIndex].lat}, {game[imageIndex].long}, score: {score}
      </h1>
      </VStack>
    </>
    }

    if (imageIndex <= 4 && resultPage) {
      return <>
        <VStack spacing="10px">
          <Map 
            onMarkerPositionChange={handleMarkerPositionChange}
            onNewCenter={handleNewCenter}
            imageMarkerPosition={{lat: parseFloat(game[imageIndex].lat), lng: parseFloat(game[imageIndex].long)}}
            userMarkerPosition={{lat: markerPosition.lat, lng: markerPosition.lng}}
            pauseMarker={true}
            >
          </Map>
          <h1>
            current score: {score}
          </h1>
          <Button
            onClick={() => {
              setResultPage(false)
              setImageIndex(imageIndex + 1)}
            }
            colorScheme="black"
            fontSize="15"
            padding="20px 30px"
            _hover={{ bg: "lightgrey" }}
            variant="outline">
            {"Next Location"}
          </Button>
        </VStack>
      </>
    }

    return <><h1>good job you did 5 guesses your score was {score}</h1></>
}

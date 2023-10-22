"use client";

import {
  Button,
  Input,
  HStack,
  VStack
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Game() {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [score, setScore] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    
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
    
    return <>
    <VStack spacing="10px">
        <img src={game[imageIndex].image_file}/>
        <HStack>
          <Input
            placeholder="Latitude"
            type="number"
            id="latIn"
          />
          <Input
            placeholder="Longitude"
            type="number"
            id="longIn"
          />
        </HStack>
        <Button
          onClick={() => {
            var in1 = document.getElementById("latIn")
            var in2 = document.getElementById("longIn")
            if (imageIndex < 4) {
              setScore(score + (in1.value - game[imageIndex].lat) + (in2.value - game[imageIndex].long))
              setImageIndex(imageIndex + 1)
              in1.value = ''
              in2.value = ''
            }}
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
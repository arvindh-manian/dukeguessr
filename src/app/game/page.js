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
    const [imageIndex, setImageIndex] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
          if (!error && loading) {
            let resp;
            try {
              resp = await fetch(`/api/games/start`)
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
          />
          <Input
            placeholder="Longitude"
            type="number"
          />
        </HStack>
        <Button
          onClick={() => setImageIndex(imageIndex >= 4 ? imageIndex : imageIndex + 1)}
          colorScheme="black"
          fontSize="15"
          padding="20px 30px"
          _hover={{ bg: "lightgrey" }}
          variant="outline">
          {"Next location"}
        </Button>
      </VStack>
    </>
}
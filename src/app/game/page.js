"use client"
import { createGame } from "@/utils/game";
import { useState, useEffect } from "react";

export default function Game() {
    const uuid = 5;
    const [game, setGame] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await createGame();
                        
            setGame(response);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
        fetchData();
      }, []);
      
    
    return <>
        {game && game.questions.map((q) => <>
            <p>Hi</p>
            <img src={q.url}/>
            <p>{q.lat} {q.lon}</p>
        </>)}
    </>
}
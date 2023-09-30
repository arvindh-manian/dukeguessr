"use client"
import { createGame } from "@/utils/game";

// export async function getServerSideProps() {
//     const uuid = 5; // add authentication later;
//     const res = await createGame(uuid);
//     return {props: res};    
// }

export default async function Game() {
    const uuid = 5;
    
    const game = await createGame();

    return <>
        {game.questions.map((q) => <>
            <p>Hi</p>
            <img src={q.url}/>
            <p>{q.lat} {q.lon}</p>
        </>)}
    </>
}
import { NextResponse } from "next/server";
import { endGame } from "@/utils/game";

/**
 * Returns a list of all of the games
 * Only for debugging purposes -- remove later
 */
export async function GET() {
    return NextResponse.json({
        
    })
}

export async function POST() {
    const guesses = request.body.guesses;
    const score = request.body.score;
    const uuid = request.body.uuid;
    const resp = await endGame(guesses, score, uuid);
    return NextResponse.json(resp);
}
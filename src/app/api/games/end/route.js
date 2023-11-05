import { endGame } from "@/utils/game";
import { NextResponse } from "next/server";


export async function POST() {
    const guesses = request.body.guesses;
    const score = request.body.score;
    const uuid = request.body.uuid;
    const resp = await endGame(guesses, score, uuid);
    return NextResponse.json(resp);
}
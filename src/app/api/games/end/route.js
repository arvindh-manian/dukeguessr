import { endGame } from "@/utils/game";
import { NextResponse } from "next/server";


export async function POST(request) {
    const body = await request.json();
    const uuid = body.uuid;
    const guesses = body.guesses;
    const score = body.score;

    const resp = await endGame(guesses, score, uuid);
    return NextResponse.json(resp);
}
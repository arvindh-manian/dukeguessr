import { NextResponse } from "next/server";
import { createGame } from "@/utils/game";

export async function GET(request, {params}) {
    const resp = await createGame('amanian');
    if (resp) {
        return NextResponse.json(resp);
    }

    else {
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}
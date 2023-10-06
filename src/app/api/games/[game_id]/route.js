import { NextResponse } from "next/server";
import { createGame } from "@/utils/game";

export async function GET(request, {params}) {
    const uuid = params.uuid;
    const resp = await createGame(uuid);
    if (resp) {
        return NextResponse.json(resp);
    }
    else {
        return NextResponse.json({error: "Something went wrong"}, {status:500});
    }
}
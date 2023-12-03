import { NextResponse } from "next/server";
import { createGame } from "@/utils/game";

export async function POST(request, {params}) {
    const data = await request.json();
    const mode = data.mode;
    const num_images = data.num_images;
    const resp = await createGame('amanian', mode, num_images);
    if (resp) {
        return NextResponse.json(resp);
    }

    else {
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}
import { NextResponse } from "next/server";
import { getLeaderboard } from "@/utils/user";
export async function GET(request, {params}) {
    const resp = await getLeaderboard();
    if (resp) {
        return NextResponse.json(resp);
    }

    else {
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}
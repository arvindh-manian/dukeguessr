import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    return NextResponse.json({
        "location_id": params.location_id
    });
}
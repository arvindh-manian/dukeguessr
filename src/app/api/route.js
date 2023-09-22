import { NextResponse } from "next/server";

export async function GET(request) {
    return NextResponse.json({
        error: "Malformed request URL"
    }, {status: 404});
}
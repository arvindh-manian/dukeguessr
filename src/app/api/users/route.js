import { NextResponse } from "next/server";
import {addUser} from "@/utils/user.js";

/**
 * 
 * Returns a list of all of the users
 * Only used for debugging purposes -- remove later
 */
export async function GET(request) {
    return NextResponse.json({
        
    })
}

export async function POST(request) {
    const body = await request.json();
    const username = body.username;
    const password = body.password;
    const email = body.email;
    addUser(username, email, password);
    return NextResponse.json({
        "status": "good."
    })
}
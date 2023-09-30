import { NextResponse } from "next/server";
import { getUser } from "@/utils/user";
export async function GET(request, {params}) {
    const uuid = params.uuid;
    return NextResponse.json(getUser(uuid));
}
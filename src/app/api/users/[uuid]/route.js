import { NextResponse } from "next/server";
import { getUser } from "@/utils/user";
export async function GET(request, {params}) {
    const uuid = params.uuid;
    const resp = await getUser(uuid);
    if (resp) {
        return NextResponse.json(resp);
    }

    else {
        return NextResponse.error("User not found");
    }
}
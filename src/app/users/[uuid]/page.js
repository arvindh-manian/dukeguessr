import { getUser } from "@/utils/user";
import { NextResponse } from "next/server";

export default async function User({ params }) {
    const user = await getUser(params.uuid);
    return <>
        <p>username: {user.username}</p>
        <p>email: {user.email}</p>
        <b>records:</b>
            <ul>
                <li>high score: {user.records.high_score}</li>
                <li>games played: {user.records.games_played}</li>
                <li>average score: {user.records.avg_score}</li>
            </ul>
    </>
}
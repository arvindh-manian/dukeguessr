import { getUser } from "@/utils/user";
import "./users.css";

export default async function User({ params }) {
    const user = await getUser(params.uuid);
    return <>
        <center>
        <h1>{user.username}&apos;s userpage</h1>
        <p>email: {user.email}</p><br></br>
        <img src={user.avatar}></img>
        <h2>Records:</h2>
            <ul>
                <li>High score: {user.records.high_score}</li>
                <li>Average score: {user.records.avg_score}</li>
                <li>Games played: {user.records.games_played}</li>
            </ul>
        </center>
    </>
}
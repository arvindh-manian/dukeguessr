export async function getUser(uuid) {
    return {
        "uuid": uuid,
        "username": "abcdefgh",
        "email": "a.b@example.com",
        "records": {
            "high_score": 10,
            "games_played": 6,
            "avg_score": 3
        }
    }
}
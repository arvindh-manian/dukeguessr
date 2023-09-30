export async function getUser(uuid) {
    return {
        "uuid": uuid,
        "username": "abcdefgh",
        "email": "a.b@example.com",
        "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        "records": {
            "high_score": 10,
            "games_played": 6,
            "avg_score": 3
        }
    }
}
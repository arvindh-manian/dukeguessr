export async function createGame(uuid) {
    return {
        "game_id": 1,
        "questions": [
            {
                "url": "https://dukeguessr.s3.amazonaws.com/feature-img.jpg",
                "lat": 10,
                "lon": 30
            },
            {
                "url": "https://dukeguessr.s3.amazonaws.com/Monkey-Featured.jpg",
                "lat": 25,
                "lon": 15
            },
            {
                "url": "https://dukeguessr.s3.amazonaws.com/qrtpmldg_baby-monkey-generic_625x300_28_July_23.jpg",
                "lat": 35,
                "lon": 20
            }
        ]
    }
}
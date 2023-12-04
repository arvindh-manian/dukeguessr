import { Card, CardBody, Image, Stack, Heading, Text, HStack, Center } from "@chakra-ui/react"

const RenderedAchievement = ({name, description, image}) => {
    console.log(description, name);
    return <Card maxW='xs' minW='xs' maxH='sm' minH='sm'>
        <CardBody>
            <Center>
            <Image src={image}></Image>
            </Center>
            <Stack mt='6' spacing='3'>
                <Heading size='sm'>{name}</Heading>
                <Text fontSize='14px'>
                    {description}
                </Text>
            </Stack>
        </CardBody>
    </Card>
}

export const RenderedAchievements = ({achievements}) => {

    if (achievements.some((achievement) => !achievement_descriptions.hasOwnProperty(achievement))) {
        return <div>
            <p>Invalid achievement array</p>
        </div>
    }
    return <HStack justifyContent={"space-evenly"} w={"100%"}>
        <Center>
        {achievements.map((achievement) => {
            return <RenderedAchievement key={achievement} name={achievement} description={achievement_descriptions[achievement]} image={achievement_images[achievement]}/>
        })}
        </Center>
    </HStack>
}

const achievement_descriptions = {
    "within_10_feet": "Place a guess within 10 feet of the location!",
    "over_1000_miles": "Place a guess over 1000 miles away!",
    "one_game_played": "Play your first game!",
    "five_games_played": "Play five games!",
    "ten_games_played": "Play ten games!"
}

// TODO: Add more images


const achievement_images = {
    "within_10_feet": "/images/within_10_feet.jpg",
    "over_1000_miles": "/images/over_1000_miles.jpg",
    "one_game_played": "/images/one_game_played.jpg",
    "five_games_played": "/images/five_games_played.jpg",
    "ten_games_played": "/images/ten_games_played.jpg"
}
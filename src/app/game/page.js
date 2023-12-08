'use client'

import {
  Button,
  HStack,
  VStack,
  Image,
  AspectRatio,
  Box
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Map from '../components/map'
import { useSession } from 'next-auth/react'
import haversine from 'haversine-distance'
import { useSearchParams } from 'next/navigation'
import { ResultDisplay } from '../components/results'

const GameContainer = ({
  game,
  imageIndex,
  handleMarkerPositionChange,
  handleNewCenter,
  center,
  markerPosition,
  resultPage
}) => {
  return (
    <HStack spacing='10px'>
      <Box boxSize='sm'>
        <AspectRatio maxW='400px' ratio={9 / 9}>
          <Image src={game[imageIndex].image_file}></Image>
        </AspectRatio>
      </Box>
      <Map
        onMarkerPositionChange={handleMarkerPositionChange}
        onNewCenter={handleNewCenter}
        center={center}
        pauseMarker={resultPage}
        imageMarkerPosition={
          resultPage
            ? {
                lat: parseFloat(game[imageIndex].lat),
                lng: parseFloat(game[imageIndex].long)
              }
            : null
        }
        userMarkerPosition={markerPosition}
      ></Map>
    </HStack>
  )
}

export default function Game () {
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [scores, setScores] = useState([])
  const [imageIndex, setImageIndex] = useState(0)
  const [resultPage, setResultPage] = useState(false)
  const [markerPosition, setMarkerPosition] = useState(null)
  const { data: session } = useSession()
  const [guesses, setGuesses] = useState([])

  const centers = {
    all: { lat: 36.0014, lng: -78.9382 },
    west: { lat: 36.0014, lng: -78.9382 },
    east: { lat: 36.007, lng: -78.9156 },
    gardens: { lat: 36.0022, lng: -78.9331 }
  }

  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const num_images = searchParams.get('num_images')
  const num_images_ratio = 5 / num_images

  const [center, setCenter] = useState(centers[mode])
  const [achievements, setAchievements] = useState(null)
  const [fetchingAchievements, setFetchingAchievements] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const getScore = () => {
    return Math.round(scores.reduce((a, b) => a + b, 0) * 10) / 10
  }

  console.log(markerPosition)

  const submitGuess = () => {
    if (!resultPage) {
      if (markerPosition === null) {
        return
      }
      const distance_from_right_answer = haversine(
        { lat: game[imageIndex].lat, lng: game[imageIndex].long },
        { lat: markerPosition.lat, lng: markerPosition.lng }
      )

      const feet_per_meter = 3.28084
      const new_guess = {
        distance: distance_from_right_answer * feet_per_meter
      }
      setGuesses([...guesses, new_guess])
      let new_score =
        (1 /
          (10 *
            Math.sqrt(
              (markerPosition.lat - game[imageIndex].lat) *
                (markerPosition.lat - game[imageIndex].lat) +
                (markerPosition.lng - game[imageIndex].long) *
                  (markerPosition.lng - game[imageIndex].long)
            ))) *
        num_images_ratio
      new_score = Math.min(new_score, 1500 * num_images_ratio)
      setScores([...scores, new_score])
      setCenter({
        lat: parseFloat(game[imageIndex].lat),
        lng: parseFloat(game[imageIndex].long)
      })
      setResultPage(true)
    }
  }

  const endResultsPage = () => {
    setResultPage(false)
    setImageIndex(imageIndex + 1)
    setMarkerPosition(null)
    setCenter(centers[mode])
  }

  const handleMarkerPositionChange = position => {
    console.log('resultPage: ', resultPage)
    if (!resultPage) {
      setMarkerPosition(position)
    }
  }

  const handleNewCenter = newCenter => {
    setCenter(newCenter)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!error && loading) {
        let resp
        try {
          resp = await fetch(`/api/games/start`, {
            method: 'POST',
            body: JSON.stringify({ mode: mode, num_images: num_images })
          })
          if (!resp.ok) {
            setError(true)
            return
          }
          const text = await resp.json()
          setGame(text)
          setLoading(false)
        } catch {
          setError(true)
        }
      }
    }

    fetchData()
  }, [])

  if (error) {
    return <p>Error creating game</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (imageIndex < game.length) {
    return (
      <>
        <VStack spacing='30px' paddingTop='30px'>
          <GameContainer
            imageIndex={imageIndex}
            game={game}
            handleMarkerPositionChange={handleMarkerPositionChange}
            handleNewCenter={handleNewCenter}
            center={center}
            markerPosition={markerPosition}
            resultPage={resultPage}
          />
          {resultPage && (
            <>
              <h1>Score {Math.round(scores[imageIndex] * 100) / 100}</h1>
              <p>
                Your last guess was{' '}
                {Math.round(guesses[guesses.length - 1].distance * 100) / 100}{' '}
                feet away
              </p>
            </>
          )}
          <Button
            onClick={resultPage ? endResultsPage : submitGuess}
            colorScheme='black'
            fontSize='15'
            padding='20px 30px'
            _hover={{ bg: 'lightgrey' }}
            variant='outline'
          >
            {resultPage
              ? imageIndex < game.length - 1
                ? 'Next Location'
                : 'Finish game'
              : 'Submit Guess'}
          </Button>
          <h1>Current Score: {getScore()}</h1>
        </VStack>
      </>
    )
  }

  if (achievements === null && !fetchingAchievements) {
    setFetchingAchievements(true)
    fetch(`/api/games/end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guesses: guesses,
        score: getScore(),
        uuid: session.user.name
      })
    })
      .then(response => response.json())
      .then(data => {
        setAchievements(data)
        setIsOpen(data && data.length > 0)
      })
    return <h1>good job you did 5 guesses your score was {getScore()}</h1>
  }

  return (
    <ResultDisplay
      achievements={achievements}
      score={getScore()}
      guesses={guesses}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      game={game}
    />
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Cookies from 'js-cookie'
import './users.css'
import {
  HStack,
  Heading,
  StatLabel,
  StatNumber,
  Stat,
  VStack,
  Image,
  IconButton,
  Spacer,
  Text,
  Center,
  Divider,
  AbsoluteCenter,
  Box
} from '@chakra-ui/react'
import { RenderedAchievements } from '@/app/components/achievements'

/**
 * Renders a composed statistic component.
 *
 * @param {Object} props - The props object containing the `number` and `label` properties.
 * @param {number} props.number - The number value to be displayed in the statistic component.
 * @param {string} props.label - The label to be displayed in the statistic component.
 * @return {JSX.Element} The rendered composed statistic component.
 */
const ComposedStat = ({ number, label }) => {
  return (
    <Stat
      border='1px'
      borderRadius={5}
      borderColor='black'
      bg='gray.50'
      padding={2}
      alignItems={'center'}
    >
      <StatLabel>{label}</StatLabel>
      <StatNumber>{number ? number : '-'}</StatNumber>
    </Stat>
  )
}

/**
 * Renders the User component.
 *
 * @param {Object} params - The parameters for the User component.
 * @param {string} params.uuid - The UUID of the queried user.
 * @return {JSX.Element} The rendered User component.
 */
export default function User ({ params }) {
  const [user, setUser] = useState(null)
  const [achievements, setAchievements] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState(null)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchUser = async () => {
      if (!error && loading) {
        let resp
        try {
          resp = await fetch(`/api/users/${params.uuid}`)
          if (!resp.ok) {
            setError(true)
            return
          }
          const text = await resp.json()
          setUser(text)
          setLoading(false)
        } catch {
          setError(true)
        }
      }
    }
    fetchUser()
  })

  if (error) {
    return <p>User not found</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  const handleMarkerSelection = marker => {
    setSelectedMarker(marker)
    Cookies.set('selectedMarker', marker)
    console.log(Cookies.get('selectedMarker'))
  }

  return (
    <>
      <VStack spacing={10} align='stretch'>
        <VStack>
          <Heading>{user.username}</Heading>
          <h1>
            {user.username}&apos;s userpage | {user.email}
          </h1>
          <br></br>
          <HStack justifyContent={'space-between'} w={'80vw'}>
            <ComposedStat
              number={user.games_played || '0'}
              label='Games played'
            ></ComposedStat>
            <ComposedStat
              number={Math.round(user.avg_score)}
              label='Average score'
            ></ComposedStat>
            <ComposedStat
              number={user.high_score}
              label='High score'
            ></ComposedStat>
          </HStack>
        </VStack>
        <>
          <h1></h1>
        </>
      </VStack>

      {session && session.user && user.username === session.user.name ? (
        <>
          <Box position='relative' padding='5'>
            <Divider borderColor='darkgray' />
            <AbsoluteCenter bg='white' px='4' as='b'>
              Choose Your Marker
            </AbsoluteCenter>
          </Box>
          <Center>
            <HStack spacing={20} padding='20px'>
              <VStack>
                <br></br>
                <IconButton
                  icon={
                    <Image src='/images/devil.png' width={65} height={95} />
                  }
                  border='1px'
                  background={
                    (selectedMarker || Cookies.get('selectedMarker')) ===
                    'devil'
                      ? '#C3E3FC'
                      : 'transparent'
                  }
                  _hover={{ background: '#C3E3FC' }}
                  width={100}
                  height={100}
                  onClick={() => handleMarkerSelection('devil')}
                />
              </VStack>
              <VStack>
                <br></br>
                <IconButton
                  icon={
                    <Image src='/images/happy.png' width={65} height={85} />
                  }
                  border='1px'
                  background={
                    (selectedMarker || Cookies.get('selectedMarker')) ===
                    'happy'
                      ? '#C3E3FC'
                      : 'transparent'
                  }
                  _hover={{ background: '#C3E3FC' }}
                  width={100}
                  height={100}
                  onClick={() => handleMarkerSelection('happy')}
                />
              </VStack>
              <VStack>
                <Text fontSize='12px'>Play 5 Games</Text>
                <IconButton
                  icon={<Image src='/images/dead.png' width={55} height={79} />}
                  border='1px'
                  background={
                    (selectedMarker || Cookies.get('selectedMarker')) === 'dead'
                      ? '#C3E3FC'
                      : 'transparent'
                  }
                  _hover={
                    user.five_games_played ? { background: 'transparent' } : {}
                  }
                  width={100}
                  height={100}
                  onClick={
                    user.five_games_played
                      ? () => handleMarkerSelection('dead')
                      : null
                  }
                  style={{
                    cursor: user.five_games_played ? 'pointer' : 'not-allowed',
                    opacity: user.five_games_played ? 1 : 0.35
                  }}
                />
              </VStack>
              <VStack>
                <Text fontSize='12px'>Hidden Task</Text>
                <IconButton
                  icon={
                    <Image src='/images/sleep.png' width={55} height={79} />
                  }
                  border='1px'
                  background={
                    (selectedMarker || Cookies.get('selectedMarker')) ===
                    'sleep'
                      ? '#C3E3FC'
                      : 'transparent'
                  }
                  _hover={
                    user.over_1000_miles ? { background: 'transparent' } : {}
                  }
                  width={100}
                  height={100}
                  onClick={
                    user.over_1000_miles
                      ? () => handleMarkerSelection('sleep')
                      : null
                  }
                  style={{
                    cursor: user.over_1000_miles ? 'pointer' : 'not-allowed',
                    opacity: user.over_1000_miles ? 1 : 0.35
                  }}
                />
              </VStack>
            </HStack>
          </Center>
        </>
      ) : null}

      <Box position='relative' padding='10'>
        <Divider borderColor='darkgray' />
        <AbsoluteCenter bg='white' px='4' as='b'>
          Achievements
        </AbsoluteCenter>
      </Box>
      <Center>
        <RenderedAchievements
          achievements={[
            'one_game_played',
            'five_games_played',
            'ten_games_played',
            'within_10_feet',
            'over_1000_miles'
          ].filter(achievement => user[achievement])}
        />
      </Center>
      <br></br>
    </>
  )
}

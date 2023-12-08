'use client'
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button
} from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

/**
 * Renders the Leaderboard component.
 *
 * @return {JSX.Element} The rendered Leaderboard component.
 */
export default function Leaderboard () {
  const [leaderboard, setLeaderboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!error && loading) {
        let resp
        try {
          resp = await fetch(`/api/users/leaderboard`) //, {next: { revalidate: 0 }});
          if (!resp.ok) {
            setError(true)
            return
          }
          const text = await resp.json()
          setLeaderboard(text)
          setLoading(false)
        } catch {
          setError(true)
        }
      }
    }

    fetchLeaderboard()
  })

  if (error) {
    return <p>Error fetching leaderboard</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div>
        <Heading size='lg' color='darkblue' align='center' mt={5}>
          Leaderboard
        </Heading>
        <TableContainer
          mt={5}
          mb={10}
          border={'1px'}
          borderRadius={'xl'}
          borderColor={'gray.200'}
        >
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>High Score</Th>
                <Th>Average Score</Th>
                <Th>Games Played</Th>
                <Th>View Profile</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboard.map(user => (
                <Tr key={user.username}>
                  {session && user.username === session.user.name && (
                    <Td>
                      <b>{user.username}</b>
                    </Td>
                  )}
                  {(!session || user.username !== session.user.name) && (
                    <Td>{user.username}</Td>
                  )}
                  <Td>{user.high_score ? user.high_score : '-'}</Td>
                  <Td>{user.avg_score ? Math.round(user.avg_score) : '-'}</Td>
                  <Td>{user.games_played ? user.games_played : '0'}</Td>
                  <Td>
                    <Link
                      href={`/users/${user.username}`}
                      style={{ display: 'inline-block' }}
                    >
                      <Button
                        colorScheme='black'
                        fontSize='15'
                        padding='20px 30px'
                        _hover={{ bg: 'lightgrey' }}
                        variant='outline'
                      >
                        {'View'}
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

'use client'

import {
  useColorModeValue,
  useDisclosure,
  chakra,
  Flex,
  HStack,
  Button
} from '@chakra-ui/react'
import Link from 'next/link'
import Instruct from '../components/instruct'
import React from 'react'
import { useSession } from 'next-auth/react'
import Cookies from 'js-cookie';

export default function Navbar () {
  const bg = useColorModeValue('white', 'gray.800')
  const mobileNav = useDisclosure()
  const { data: session } = useSession()
  
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w='full'
        px={{
          base: 2,
          sm: 4
        }}
        py={4}
        shadow='md'
      >
        <Flex alignItems='center' justifyContent='space-between' mx='auto'>
          <Flex>
            <chakra.a
              href='/start'
              fontSize='xl'
              fontWeight='medium'
              color='black'
              _dark={{
                color: 'white',
                _hover: {
                  color: 'gray.300'
                }
              }}
              _hover={{
                color: 'gray.700'
              }}
            >
              DukeGuessr
            </chakra.a>
          </Flex>
          <HStack display='flex' alignItems='center' spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color='brand.500'
              display={{
                base: 'none',
                md: 'inline-flex'
              }}
            >
              <Link
                href='/users/leaderboard'
                style={{ display: 'inline-block' }}
              >
                <Button variant='ghost'>Leaderboard</Button>
              </Link>
              <Link href='/contact' style={{ display: 'inline-block' }}>
                <Button variant='ghost'>Contact Us</Button>
              </Link>
              <Link href='/upload_images' style={{ display: 'inline-block' }}>
                <Button variant='ghost'>Upload Images</Button>
              </Link>
              {session ? (
                <>
                  {' '}
                  <Link
                    href='/api/auth/signout?callbackUrl=/start'
                    style={{ display: 'inline-block' }}
                  >
                    <Button variant='ghost'
                            onClick={() => Cookies.remove('selectedMarker')}
                            >Logout</Button>

                  </Link>
                  <Link
                    href={`/users/${session.user.name}`}
                    style={{ display: 'inline-block' }}
                  >
                    <Button variant='ghost'>{session.user.name}</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href='/api/auth/signin'
                    style={{ display: 'inline-block' }}
                  >
                    <Button variant='ghost'>Login</Button>
                  </Link>
                  <Link href='/signup' style={{ display: 'inline-block' }}>
                    <Button variant='ghost'>Sign Up</Button>
                  </Link>
                </>
              )}
              <Instruct></Instruct>
            </HStack>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  )
}

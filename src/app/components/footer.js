'use client'

import React from 'react'
import { Flex, chakra, Icon } from '@chakra-ui/react'
import { AiFillGithub } from 'react-icons/ai'

/**
 * Renders the Footer component.
 *
 * @return {JSX.Element} The rendered Footer component.
 */
export default function Footer () {
  return (
    <Flex
      w='full'
      p={3}
      alignItems='center'
      justifyContent='center'
      marginTop={'auto'}
      bg='#edf3f8'
      _dark={{
        bg: '#3e3e3e'
      }}
      roundedTop={5}
    >
      <Flex
        w='full'
        as='footer'
        flexDir={{
          base: 'column',
          sm: 'row'
        }}
        align='center'
        justify='space-between'
        px='6'
        py='4'
        bg='white'
        rounded={5}
        _dark={{
          bg: 'gray.800'
        }}
      >
        <chakra.a
          href='#'
          fontSize='xl'
          fontWeight='medium'
          color='gray.600'
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

        <chakra.p
          py={{
            base: '2',
            sm: '0'
          }}
          color='gray.800'
          _dark={{
            color: 'white'
          }}
        >
          Made with ❤️ by Eric Song, Bella Tang, Kevin Huang, and Arvindh Manian
        </chakra.p>

        <chakra.a
          href='https://github.com/arvindh-manian/dukeguessr'
          mx='2'
          color='gray.600'
          _dark={{
            color: 'gray.300',
            _hover: {
              color: 'gray.400'
            }
          }}
          _hover={{
            color: 'gray.500'
          }}
          aria-label='Github'
        >
          <Icon as={AiFillGithub} boxSize={6} />
        </chakra.a>
      </Flex>
    </Flex>
  )
}

'use client';

import { Spacer, Button, Box, Container, VStack, Icon, Space, Center, Image, Flex, Badge, Text, Heading } from "@chakra-ui/react";
import Link from 'next/link';
import Footer from '../components/footer';
import styles from './page.module.css';


export default function Start() {
  return (
   <Flex
      direction="column"
      align="center"
      justify="flex-start"
      minH="100vh"
    >
      <Image
        src="images/dg_logo.png"
        alt="DukeGuessr Logo"
        width="200px"
        height="auto"
        mt={10}
      />
      <VStack spacing="50px">
        <Heading as="h1" size="xl" mt={200}>
        Welcome to DukeGuessr!
        </Heading>
        <Link href="/games" style={{ display: 'inline-block' }}>
        <Button
            colorScheme='blue'
            fontSize='15'
            padding='20px 30px'
            _hover={{ bg: 'lightgrey'}}
            variant='outline'
          >
            {"Let's Go!"}
          </Button>
        </Link>
      </VStack>
      <Footer></Footer>
    </Flex>
  );
}


/*import { Button, Box, Center, Image, Flex, Badge, Text } from "@chakra-ui/react";

export default function Start() {
  return (
    <div>
      <Center>Welcome to DukeGuessr!</Center>
      <Button>Start Game</Button>

    </div>
  )
}*/

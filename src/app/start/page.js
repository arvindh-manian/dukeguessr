'use client';

import { Button, Box, Container, Stack, Icon, Space, Center, Image, Flex, Badge, Text, Heading } from "@chakra-ui/react";
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
        mt={20}
      />
      <Heading as="h1" size="xl" mt={200}>
        Welcome to DukeGuessr!
      </Heading>
      <Link href="/games" style={{ display: 'inline-block' }}>
      <Button
          mt={20}
          fontSize='15'
          padding='20px 30px'
          _hover={{ bg: 'lightgrey'}}
        >
          {"Let's Go!"}
        </Button>
      </Link>
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

'use client'

import React, { useState } from 'react'
import { Heading, VStack, Flex, Image, Button } from '@chakra-ui/react'

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('image', selectedFile)
    try {
      const resp = await fetch('/api/locations', {
        method: 'POST',
        body: formData
      })
      if (!resp.ok) {
        setError(true);
        return
      } else {
        setError(false);
      }
    } catch {
      setError(true);
    } finally {
      setUploaded(true);
    }
  }

  if (!error && uploaded) {
    return (
      <Flex
        direction='column'
        align='center'
        justify='flex-start'
        minH='100vh'
        positive='relative'
      >
        <Image
          src='/images/dg_logo.png'
          alt='DukeGuessr Logo'
          width='200px'
          height='auto'
          mt={10}
        />
        <VStack>
          <Heading as='h2' size='2xl' mt={100}>
            Your Image Was Submitted!
          </Heading>
          <form onSubmit={handleSubmit}>
            <input type='file' onChange={handleFileChange} />
            <button type='submit'>Upload</button>
          </form>
        </VStack>
      </Flex>
    )
  }

  if (uploaded && error) {
    return (
      <Flex
        direction='column'
        align='center'
        justify='flex-start'
        minH='100vh'
        positive='relative'
      >
        <Image
          src='/images/dg_logo.png'
          alt='DukeGuessr Logo'
          width='200px'
          height='auto'
          mt={10}
        />
        <VStack>
          <Heading as='h2' size='2xl' mt={100}>
            There Was An Error! Try Again!
          </Heading>
          <form onSubmit={handleSubmit}>
            <input type='file' onChange={handleFileChange} />
            <button type='submit'>Upload</button>
          </form>
        </VStack>
      </Flex>
    )
  }

  return (
    <Flex
      direction='column'
      align='center'
      justify='flex-start'
      minH='100vh'
      positive='relative'
    >
      <Image
        src='/images/dg_logo.png'
        alt='DukeGuessr Logo'
        width='200px'
        height='auto'
        mt={10}
      />
      <VStack>
        <Heading as='h2' size='2xl' mt={100}>
          Submit Your Own Image!
        </Heading>
        <form onSubmit={handleSubmit}>
          <input type='file' onChange={handleFileChange} />
          <button type='submit'>Upload</button>
        </form>
      </VStack>
    </Flex>
  )
}

export default ImageUpload

'use client'

import {
  Button,
  HStack,
  VStack,
  Image,
  AspectRatio,
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react'

import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { useState, useEffect } from 'react'

const CONTACT_API_ENDPOINT = '/api/contact'

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async data => {
    const response = await fetch(CONTACT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      alert('Message sent!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '60%' }}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <input
            id='name'
            type='text'
            style={{
              border: '1px solid black',
              borderRadius: '5px',
              width: '100%'
            }}
            {...register('name', { required: true })}
          />
          {errors.name && <FormErrorMessage>Name is required</FormErrorMessage>}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <input
            id='email'
            type='email'
            style={{
              border: '1px solid black',
              borderRadius: '5px',
              width: '100%'
            }}
            {...register('email', { required: true })}
          />
          {errors.email && (
            <FormErrorMessage>Email is required</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='message'>Message</FormLabel>
          <textarea
            id='message'
            style={{
              border: '1px solid black',
              borderRadius: '5px',
              width: '100%'
            }}
            {...register('message', { required: true })}
          />
          {errors.message && (
            <FormErrorMessage>Message is required</FormErrorMessage>
          )}
        </FormControl>
        <Button type='submit'>Submit</Button>
      </VStack>
    </form>
  )
}

export default function ContactUsPage () {
  return (
    <VStack>
      <Heading>Contact Us</Heading>
      <ContactForm />
    </VStack>
  )
}

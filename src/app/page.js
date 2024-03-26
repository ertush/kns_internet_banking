"use client"

import {useEffect, useState} from 'react'
import { Container, Flex } from '@radix-ui/themes'

export default function Home() {


  const [balance, setBalance] = useState(null)
  

  useEffect(() => {

   async function fetchBalance() {
        try {
          return await fetch('/api/balance')
        } catch (e) {
          console.error('Error :', e.message)
        }
    }

    fetchBalance()
    .then(resp => resp.json())
    .then(balance => {
      setBalance(balance)
    })

    
 
  }, [])

  return (
    <Container size="4">
    <Flex m="4" direction={"column"} >
      <pre>
        {
          JSON.stringify(balance, null, 2)
        }
      </pre>
    </Flex>
    </Container>

  );
}

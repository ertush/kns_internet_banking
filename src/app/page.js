"use client"

import { useEffect, useState } from 'react'
import { Card, Flex, Text, Avatar, Badge, Callout, Separator, TextField, Button } from '@radix-ui/themes'
import { InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'




export default function Home() {


  const [balance, setBalance] = useState(0)
  const [error, setError] = useState(null)
  const [depositSubmitting, setDepositSubmitting] = useState(false)
  const [withdrawSubmitting, setWithdrawSubmitting] = useState(false)
  const [checkbalanceSubmitting, setCheckbalanceSubmitting] = useState(false)



  useEffect(() => {

    async function getBalance() {
      try {
        return await fetch('/api/deposit?amount=0')
      } catch (e) {
        console.error('Error :', e.message)
      }
    }


    getBalance()
      .then(resp => resp?.json())
      .then((resp) => {
        setBalance(resp?.balance)
      })


  }, [])



  async function handleSubmit(ev) {

    ev.preventDefault();

    const formDataEntries = new FormData(ev.target);

    const formData = Object.fromEntries(formDataEntries);

    switch (window.event.submitter.name) {
      case "deposit":

        setDepositSubmitting(true)

        fetch(`/api/deposit?amount=${formData?.amount}`)
          .then(resp => resp.json())
          .then(dBalance => {
            setBalance(dBalance?.balance)
            setError(dBalance?.exception)
          })
          .catch(e => console.error(e.message))
          .finally(() => {
            setDepositSubmitting(false)
          })

        break;
      case "withdraw":

        setWithdrawSubmitting(true)

        fetch(`/api/withdraw?amount=${formData?.amount}`)
          .then(resp => resp.json())
          .then(wBalance => {
            setBalance(wBalance?.balance)
            setError(wBalance?.exception)
          })
          .catch(e => console.error(e.message))
          .finally(() => {
            setWithdrawSubmitting(false)
          })

        break;

      case "check_balance":

        setCheckbalanceSubmitting(true)

        fetch('/api/deposit?amount=0')
          .then(resp => resp.json())
          .then(balance => {
            setBalance(balance?.balance)
            setError(balance?.exception)
          })
          .catch(e => console.error(e.message))
          .finally(() => {
            setCheckbalanceSubmitting(false)
          })


    }


  }

  return (
    <>
      {
        error !== null &&
        typeof error == "string" &&
        error !== "" &&
        <Flex justify="center" className='h-auto absolute top-[10%] inset-x-0'>
          <Callout.Root>
            <Callout.Icon>
              <ExclamationTriangleIcon className="w-6 aspect-square" />
            </Callout.Icon>
            <Callout.Text>
              {error}
            </Callout.Text>
          </Callout.Root>

        </Flex>
      }


      <Card size={6} p="12" className='w-2/5 h-auto gap-y-4 flex flex-col'>

        <Flex direction={"column"} className='max-h-min text-center'>
          <Text className='text-2xl font-semibold'>Kns Bank App</Text>
        </Flex>
        {/* <Text className='text-xl font-semibold'>Customer Details</Text> */}
        <Flex direction={"row"} mt="5" align="end" justify="between" className='max-h-min text-start'>
          <Flex gapX="3">
            <Avatar size="4" fallback="U"></Avatar>
            <Flex direction={"column"}>
              <Text className='text-lg font-semibold'>User</Text>
              <Text className='text-base'>user@mail.com</Text>
            </Flex>
          </Flex>


          <Flex direction="column" align="start" className='max-w-min'>
            <Flex gapX="5" justify="end">
              <Text weight="light">Account:</Text>
              <Badge color="jade" variant="soft" radius="full">
                Active
              </Badge>
            </Flex>

            <Flex direction="row" gapX="3">
              <Text size="5" weight="medium">Balance:</Text>
              <Text mr="3" size="4" weight="bold">Ksh</Text>
              <Text size="4" weight="bold">{balance}</Text>

            </Flex>
          </Flex>



        </Flex>

        <Flex mt="6" direction="row" gapX="4" className='w-full'>
          <Callout.Root size="3" className='w-full' variant="surface">
            <Callout.Icon>
              <InformationCircleIcon className="w-6 aspect-square" />
            </Callout.Icon>
            <Callout.Text>
              Deposit limits:
            </Callout.Text>
            <Callout.Text>
              Max per transaction: Kes. 40K
            </Callout.Text>
            <Callout.Text>
              Max frequency: 4 transactions/day
            </Callout.Text>
            <Callout.Text>
              Max for the day: Kes. 150K
            </Callout.Text>

          </Callout.Root>

          <Callout.Root size="3" className='w-full' variant="surface">
            <Callout.Icon>
              <InformationCircleIcon className="w-6 aspect-square" />
            </Callout.Icon>
            <Callout.Text>
              Withdrawal limits:
            </Callout.Text>
            <Callout.Text>
              Max per transaction: Kes. 20K
            </Callout.Text>
            <Callout.Text>
              Max frequency: 3 transactions/day
            </Callout.Text>
            <Callout.Text>
              Max for the day: Kes. 50K
            </Callout.Text>

          </Callout.Root>

        </Flex>

        <Separator orientation="horizontal" size="4" my="5" />

        <form onSubmit={handleSubmit}>
          <Flex justify="between" align="end">

            <Flex direction="column" className='gap-y-2'>
              <Text weight="medium" size="4">Amount</Text>
              <TextField.Root name="amount" variant="surface" size="3" className='w-full' placeholder="Enter Amount to Transact" />

            </Flex>

            <Flex direction="column" className='gap-y-2'>
              <Text weight="medium" size="4">Transact</Text>
              <Flex gapX="2" >
                <Button loading={depositSubmitting} disabled={depositSubmitting} name="deposit" type="submit" size="3" variant="soft" className='cursor-pointer'>Deposit</Button>
                <Button loading={withdrawSubmitting} disabled={withdrawSubmitting} name="withdraw" type="submit" size="3" variant="soft" className='cursor-pointer'>Withdraw</Button>
                <Button loading={checkbalanceSubmitting} disabled={checkbalanceSubmitting} name="check_balance" type="submit" size="3" variant="soft" className='cursor-pointer'>Check Balance</Button>
              </Flex>
            </Flex>
          </Flex>

        </form>


      </Card>

    </>

  );
}

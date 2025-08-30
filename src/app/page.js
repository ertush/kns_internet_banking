"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Box,
  Flex,
  Text,
  Avatar,
  Badge,
  Callout,
  Separator,
  TextField,
  Button,
} from "@radix-ui/themes";
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const [depositSubmitting, setDepositSubmitting] = useState(false);
  const [withdrawSubmitting, setWithdrawSubmitting] = useState(false);
  const [checkbalanceSubmitting, setCheckbalanceSubmitting] = useState(false);
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [checkBalanceSubmit, setCheckBalanceSubmit] = useState(false);

  useEffect(() => {
    async function getBalance() {
      try {
        return await fetch("/api/balance");
      } catch (e) {
        console.error("Error :", e.message);
      }
    }

    getBalance()
      .then((resp) => resp?.json())
      .then((resp) => {
        setBalance(resp?.balance);
      });
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();

    const formDataEntries = new FormData(ev.target);

    const formData = Object.fromEntries(formDataEntries);

    switch (window.event.submitter.name) {
      case "deposit":
        setDepositSubmitting(true);

        fetch(`/api/deposit?amount=${formData?.amount}`)
          .then((resp) => resp.json())
          .then((dBalance) => {
            setBalance(dBalance?.balance);
            setError(dBalance?.exception);
          })
          .catch((e) => console.error(e.message))
          .finally(() => {
            setDepositSubmitting(false);
          });

        break;
      case "withdraw":
        setWithdrawSubmitting(true);

        fetch(`/api/withdraw?amount=${formData?.amount}`)
          .then((resp) => resp.json())
          .then((wBalance) => {
            setBalance(wBalance?.balance);
            setError(wBalance?.exception);
          })
          .catch((e) => console.error(e.message))
          .finally(() => {
            setWithdrawSubmitting(false);
          });

        break;

      case "reset_account":
        setResetSubmitting(true);
        setError(null);

        try {
          const response = await fetch("/api/reset", {
            method: "POST",
          });

          const data = await response.json();

          if (response.ok) {
            setBalance(data.balance);
            // setTransactionSummary(data);
            setError(null);
          } else {
            setError(data.error);
          }
        } catch (e) {
          console.error(e.message);
          setError("Failed to reset account");
        } finally {
          setResetSubmitting(false);
        }
        break;

      case "check_balance":
        setCheckBalanceSubmit(true);

        fetch(`/api/balance`)
          .then((resp) => resp.json())
          .then((cBalance) => {
            setBalance(cBalance?.balance);
            setError(cBalance?.exception);
          })
          .catch((e) => console.error(e.message))
          .finally(() => {
            setCheckBalanceSubmit(false);
          });

        break;
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 h-full">
      {error !== null && typeof error === "string" && error !== "" && (
        <Flex
          justify="center"
          className={`h-auto md:h-min absolute md:top-[10%] md:bottom-0 ${error ? "bottom-[12%]" : ""} inset-x-0 md:z-0 z-10 md:mx-0 mx-7`}
        >
          <Callout.Root
            color={error.includes("balance") ? "green" : "gold"}
            className="backdrop-blur-md"
          >
            <Callout.Icon>
              {error.includes("balance") ? (
                <CheckCircleIcon className="w-6 aspect-square" />
              ) : (
                <ExclamationTriangleIcon className="w-6 aspect-square" />
              )}
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        </Flex>
      )}

      <Card className="w-full md:mt-56">
        {/* Header */}
        <Flex direction="column" className="text-center">
          <Text className="text-2xl font-semibold">Kns Bank App</Text>
        </Flex>

        {/* User Info + Balance */}
        <Flex
          justify="between"
          className="flex-col md:flex-row md:justify-between mt-5 items-start text-start gap-4 w-full"
        >
          <Flex gap="3" className="items-center">
            <Avatar size="4" fallback="U" />
            <Flex direction="column">
              <Text className="text-lg font-semibold">User</Text>
              <Text className="text-base">user@mail.com</Text>
            </Flex>
          </Flex>

          <Flex direction="column" className="w-full md:w-auto" align="start">
            <Flex justify="between" className="gap-6 w-full md:w-auto flex">
              <Text weight="light">Account:</Text>
              <Badge color="jade" variant="soft" radius="full">
                Active
              </Badge>
            </Flex>
            <Flex direction="row" gap="3" className="w-full md:w-auto">
              <Text size="5" weight="medium">
                Balance:
              </Text>
              <Text
                className="md:mr-3 text-end w-full md:w-auto"
                size="4"
                weight="bold"
              >
                Ksh
              </Text>
              <Text size="4" weight="bold">
                {parseFloat(balance).toFixed(2)}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Limits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full">
          <Callout.Root size="3" className="w-full" variant="surface">
            <Callout.Icon>
              <InformationCircleIcon className="w-6 aspect-square" />
            </Callout.Icon>
            <Callout.Text>Deposit limits:</Callout.Text>
            <Callout.Text>Max per transaction: Kes. 40K</Callout.Text>
            <Callout.Text>Max frequency: 4 transactions/day</Callout.Text>
            <Callout.Text>Max for the day: Kes. 150K</Callout.Text>
          </Callout.Root>

          <Callout.Root size="3" className="w-full" variant="surface">
            <Callout.Icon>
              <InformationCircleIcon className="w-6 aspect-square" />
            </Callout.Icon>
            <Callout.Text>Withdrawal limits:</Callout.Text>
            <Callout.Text>Max per transaction: Kes. 20K</Callout.Text>
            <Callout.Text>Max frequency: 3 transactions/day</Callout.Text>
            <Callout.Text>Max for the day: Kes. 50K</Callout.Text>
          </Callout.Root>
        </div>

        <Separator orientation="horizontal" size="4" my="5" />

        {/* Transaction Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-8 w-full"
        >
          <Flex
            direction="column"
            className={`gap-y-2 w-full md:w-1/2 ${error ? "mt-12 md:mt-0" : ""}`}
          >
            <Text weight="medium" size="4">
              Amount
            </Text>
            <TextField.Root
              name="amount"
              variant="surface"
              size="3"
              className="w-full"
              placeholder="Enter Amount to Transact"
            />
          </Flex>

          <Flex direction="column" className="gap-y-2 w-full md:w-1/2">
            <Text weight="medium" size="4">
              Transact
            </Text>
            <Flex
              gap="2"
              wrap="wrap"
              className="md:flex-row md:flex grid grid-cols-1"
            >
              <Button
                loading={depositSubmitting}
                disabled={depositSubmitting}
                name="deposit"
                type="submit"
                size="3"
                variant="soft"
              >
                Deposit
              </Button>
              <Button
                loading={withdrawSubmitting}
                disabled={withdrawSubmitting}
                name="withdraw"
                type="submit"
                size="3"
                variant="soft"
              >
                Withdraw
              </Button>
              <Button
                loading={checkbalanceSubmitting}
                disabled={checkbalanceSubmitting}
                name="check_balance"
                type="submit"
                size="3"
                variant="soft"
              >
                Check Balance
              </Button>
              <Button
                loading={resetSubmitting}
                disabled={resetSubmitting}
                name="reset_account"
                type="submit"
                size="3"
                variant="soft"
              >
                Reset Account
              </Button>
            </Flex>
          </Flex>
        </form>
      </Card>
    </div>
  );
}

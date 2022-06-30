import React from "react";
import Navbar from "../components/Navbar";
import { Input, Text, Box, Heading, Button } from "@chakra-ui/react";
import styles from "../styles/Wallet.module.css";
import { ethers, utils } from "ethers";

async function getBalance() {
  // get balance of account 0x927f214aAdF56f24Ab5bC02BfEA75Dcf5F802366 then console.log it
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const wallet = provider.getSigner();
  const balance = await wallet.getBalance();
  console.log(ethers.utils.formatEther(balance));
  document.getElementById("output").innerHTML =
    ethers.utils.formatEther(balance) + " ETH";
}

const wallet = () => {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Comforter&family=Poppins:wght@300&family=Supermercado+One&display=swap"
        rel="stylesheet"
      />
      <title>Wallet</title>
      <Navbar />
      <div className={styles.main}>
        <Box as="article" maxW="sm" p="10" borderWidth="4px" rounded="md">
          <Text fontSize="xl" fontWeight="bold" className="py-2">
            Wallet Dashboard
          </Text>
          <Button onClick={getBalance}>Get Balance</Button>
        </Box>
        <Box as="article" maxW="sm" p="10" rounded="md">
          <Text fontSize="xl" fontWeight="bold" className="py-2"></Text>
        </Box>

        <Box as="article" maxW="sm" p="10" rounded="md">
          <Text fontSize="xl" fontWeight="bold" className="py-2" id="output">
            {" "}
          </Text>
        </Box>
        <article class="flex items-end justify-between p-6 bg-gray-900 border border-gray-800 rounded-lg">
          <div class="flex items-center gap-4">
            <span class="hidden p-2 text-gray-300 bg-gray-800 rounded-full sm:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p class="text-sm text-gray-400">Profit</p>

              <p class="text-2xl font-medium text-white">$240.94</p>
            </div>
          </div>

          <div class="inline-flex gap-2 p-1 bg-green-700 rounded text-green-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span class="text-xs font-medium"> 67.81% </span>
          </div>
        </article>

        <article class="flex items-end justify-between p-6 bg-gray-900 border border-gray-800 rounded-lg">
          <div class="flex items-center gap-4">
            <span class="hidden p-2 text-gray-300 bg-gray-800 rounded-full sm:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p class="text-sm text-gray-400">Profit</p>

              <p class="text-2xl font-medium text-white">$240.94</p>
            </div>
          </div>

          <div class="inline-flex gap-2 p-1 bg-red-700 rounded text-red-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span class="text-xs font-medium"> 67.81% </span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default wallet;

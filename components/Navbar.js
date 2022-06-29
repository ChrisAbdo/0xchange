import Link from "next/link";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

import { Button } from "@chakra-ui/react";

import { ethers } from "ethers";

function Navbar() {
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log("Requesting account...");

    // Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  return (
    <div className="flex w-full justify-between items-center px-4 py-2 border-b">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-4xl  cursor-pointer font-bold">0xchange</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <ThemeSwitcher />
        &nbsp;&nbsp;
        <Button colorScheme="purple" onClick={requestAccount}>
          {walletAddress.length > 0 &&
            walletAddress.substring(0, 5) +
              "..." +
              walletAddress.substring(walletAddress.length - 4)}
          {walletAddress.length === 0 && "Connect Wallet"}
        </Button>
      </div>
    </div>
  );
}

export default Navbar;

import Link from "next/link";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import styles from "../styles/Navbar.module.css";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ethers } from "ethers";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        provider.on("network", (newNetwork, oldNetwork) => {
          // When a Provider makes its initial connection, it emits a "network"
          // event with a null oldNetwork along with the newNetwork. So, if the
          // oldNetwork exists, it represents a changing network
          if (oldNetwork) {
            window.location.reload();
          }
        });
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

  async function changeWallet() {
    const accounts = await window.ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then(() =>
        ethereum.request({
          method: "eth_requestAccounts",
        })
      );
    setWalletAddress(accounts[0]);
    const account = accounts[0];
  }

  return (
    <div className="flex w-full justify-between px-4 py-2 border-b bg-gray-500">
      <Link href="/">
        <h1 className={styles.navbarText}>0xChange</h1>
      </Link>
      <div className={styles.navbarHeader}>
        <Link href="/transfer">
          <Button variant="ghost">Transfer</Button>
        </Link>
        <Link href="/exchange">
          <Button variant="ghost">Exchange</Button>
        </Link>
        <Link href="/wallet">
          <Button variant="ghost">Wallet</Button>
        </Link>
        <Link href="/messages">
          <Button variant="ghost">Messages</Button>
        </Link>
      </div>
      <div className="flex items-center">
        &nbsp;&nbsp;
        <ThemeSwitcher />
        &nbsp;&nbsp;
        {walletAddress ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              colorScheme="purple"
              onClick={requestAccount}
            >
              {walletAddress.length > 0 &&
                walletAddress.substring(0, 5) +
                  "..." +
                  walletAddress.substring(walletAddress.length - 4)}
              {walletAddress.length === 0 && "Connect Wallet"}
            </MenuButton>
            <MenuList>
              <MenuItem>View Profile</MenuItem>
              <MenuItem onClick={changeWallet}>Change Wallet</MenuItem>
              <MenuItem>Disconnect</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button onClick={connectWallet} colorScheme="purple" className="mr-2">
            Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;

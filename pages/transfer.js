import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Transfer.module.css";
import { ethers, utils } from "ethers";
import { Input, Text, Box, Heading, Button } from "@chakra-ui/react";

async function transferEth(sender, receiver, strEther) {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // get a signer wallet!
  const signer = provider.getSigner();

  const DefaultAccount = await signer.getAddress();
  const recipient = document.getElementById("input").value;
  const amount = document.getElementById("amount").value;

  const tx = {
    from: DefaultAccount,
    to: recipient,
    value: ethers.utils.parseEther(amount),
    nonce: await provider.getTransactionCount(DefaultAccount, "latest"),
    gasLimit: ethers.utils.hexlify(21000),
    gasPrice: ethers.utils.hexlify(parseInt(await provider.getGasPrice())),
  };

  signer.sendTransaction(tx).then((transaction) => {
    console.dir(transaction);
    // replace id='output with 'amount' send to 'recipient'
    document.getElementById("output").innerHTML =
      amount +
      " ETH was sent to " +
      recipient.substring(0, 5) +
      "..." +
      recipient.substring(recipient.length - 4) +
      " successfully!";
  });
}

const transfer = () => {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Comforter&family=Poppins:wght@300&family=Supermercado+One&display=swap"
        rel="stylesheet"
      />

      <Navbar />

      <div className={styles.main}>
        <Box as="article" maxW="sm" p="10" borderWidth="4px" rounded="md">
          <Text fontSize="xl" fontWeight="bold" className="py-2">
            Transfer ETH
          </Text>
          <Box>
            <Input placeholder="Address of Recipient" id="input" />
          </Box>
          <Heading size="md" my="2">
            <Input placeholder="# of ETH" id="amount"></Input>
          </Heading>

          <Box as="a" color="teal.400" href="#" fontWeight="bold">
            <Button type="submit" onClick={transferEth}>
              Transfer
            </Button>

            <h1 id="output"></h1>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default transfer;

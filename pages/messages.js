import { useState, useRef } from "react";
import { ethers } from "ethers";
import Navbar from "../components/Navbar";
import { Button } from "@chakra-ui/react";

const signMessage = async ({ setError, message }) => {
  try {
    console.log({ message });
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);

    const address = await signer.getAddress();

    return {
      message,
      signature,
      address,
    };
  } catch (err) {
    setError(err.message);
  }
};

export default function SignMessage() {
  const resultBox = useRef();
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState();

  const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get("message"),
    });
    if (sig) {
      setSignatures([...signatures, sig]);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="m-4" onSubmit={handleSign}>
        <div className="w-full shadow-lg mx-auto rounded-xl">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold  text-center">Send Message</h1>
            <div className="">
              <div className="my-3">
                <textarea
                  required
                  type="text"
                  name="message"
                  className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                  placeholder="Message"
                />
                <input placeholder="Address" id="input" />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <Button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Sign message
            </Button>
          </footer>
          {signatures.map((sig, idx) => {
            return (
              <div className="p-2" key={sig}>
                <div className="my-3">
                  <p>
                    Message {idx + 1}: {sig.message}
                  </p>
                  <p>Signer: {sig.address}</p>
                  <textarea
                    type="text"
                    readOnly
                    ref={resultBox}
                    className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                    placeholder="Generated signature"
                    value={sig.signature}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}

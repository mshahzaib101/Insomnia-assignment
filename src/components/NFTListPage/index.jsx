"use client";

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Alchemy, Network } from "alchemy-sdk";
import NFTCard from "@/components/NFTListPage/nftCard";
import { ToastContainer, toast } from "react-toastify";

// Retrieving the Alchemy API key and network information from environment variables
const apiKey = process.env.ALCHEMY_API_KEY;
const network = Network.ETH_SEPOLIA;
const alchemy = new Alchemy({ apiKey, network });

// NFTListPage component
const NFTListPage = () => {
  const [nfts, setNFTs] = useState([]); // State variable to store the NFTs
  const [loading, setLoading] = useState(true); // State variable to track loading state
  const [walletErr, setWalletErr] = useState(false);

  useEffect(() => {
    connectWallet(); // Connect the wallet on component mount
  }, []);

  // Function to connect the wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        getNfts(userAddress); // Retrieve the NFTs for the connected wallet
      } catch (error) {
        console.log("error while connecting wallet", error);
      }
    } else {
      toast.error("Wallet not found");
      setLoading(false);
      setWalletErr(true);
    }
  };

  // Function to retrieve the NFTs for a wallet address
  const getNfts = async (walletAddress) => {
    try {
      const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
      setNFTs(nfts.ownedNfts); // Update the state variable with the retrieved NFTs
      setLoading(false); // Set loading state to false
    } catch (err) {
      console.log("err while getting nfts", err);
    }
  };

  return (
    <div className="relative isolate pt-14">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              My Digital Collectibles
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Browse through the NFTs owned by your connected wallet. Discover
              unique digital assets and explore their details, including name,
              description, token ID, image, and smart contract address.
            </p>
          </div>
          <div className="py-4 sm:py-12">
            <div className="px-6 lg:px-8">
              {!loading && !walletErr && nfts.length === 0 && (
                <div className="flex justify-center items-center my-20">
                  <p>No NFTs found</p>
                </div>
              )}

              {walletErr && (
                <div className="flex justify-center items-center my-20">
                  <p>Wallet not found</p>
                </div>
              )}

              {loading && (
                <div className="flex justify-center items-center my-20">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}

              {nfts.length > 0 && !loading && (
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {nfts.map((ele, index) => (
                    <NFTCard key={"token_" + index} ele={ele} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default NFTListPage;

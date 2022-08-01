import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState();

  const checkIfMetamaskInstalled = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not installed...");
        return;
      } else {
        console.log("Metamask installed: ", ethereum);
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Got this authorized account: ", account);
          setCurrentAccount(account);
        } else {
          console.log("No account found!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected Account: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfMetamaskInstalled();
  });

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          I am Hamza and I worked on self-driving cars so that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={connectWallet}>
          {currentAccount ? "Connected" : "Connect Metamask"}
        </button>

        {currentAccount && <div className="bio">{currentAccount}</div>}
      </div>
    </div>
  );
}

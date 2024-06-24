import { useState, useEffect } from "react";
import { ethers } from "ethers";
import counter_abi from "../artifacts/contracts/Counter.sol/Counter.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [counter, setCounter] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [details, setDetails] = useState(undefined);

  const contractAddress = "0xEf9f1ACE83dfbB8f559Da621f4aEA72C6EB10eBf";
  const counterABI = counter_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(new ethers.providers.Web3Provider(window.ethereum));
    }
  };

  const handleAccount = async () => {
    if (ethWallet) {
      const accounts = await ethWallet.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(undefined);
      }
    }
  };

  const connectAccount = async () => {
    try {
      if (!ethWallet) {
        alert('MetaMask wallet is required to connect');
        return;
      }

      const accounts = await ethWallet.send("eth_requestAccounts");
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Failed to connect MetaMask:", error);
    }
  };

  const getCounterContract = () => {
    if (ethWallet && account) {
      const signer = ethWallet.getSigner();
      const counterContract = new ethers.Contract(contractAddress, counterABI, signer);
      setCounter(counterContract);
    }
  };

  const getBalance = async () => {
    try {
      if (counter) {
        const currentBalance = await counter.getBalance();
        setBalance(ethers.utils.formatEther(currentBalance));
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const deposit = async (amount) => {
    try {
      if (counter) {
        const tx = await counter.deposit({ value: ethers.utils.parseEther(amount.toString()) });
        await tx.wait();
        getBalance();
      }
    } catch (error) {
      console.error("Error depositing funds:", error);
    }
  };

  const withdraw = async (amount) => {
    try {
      if (counter) {
        const tx = await counter.withdraw(ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        getBalance();
      }
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  };

  const viewDetails = async () => {
    try {
      if (counter) {
        const details = await counter.viewDetails();
        setDetails(details);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this application.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Contract Balance: {balance} ETH</p>
        <button onClick={() => deposit(0.1)}>Deposit 0.1 ETH</button>
        <button onClick={() => withdraw(0.05)}>Withdraw 0.05 ETH</button>
        <button onClick={viewDetails}>View Contract Details</button>
        {details && (
          <div>
            <p>Owner: {details[0]}</p>
            <p>Contract Balance: {ethers.utils.formatEther(details[1])} ETH</p>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    handleAccount();
  }, [ethWallet]);

  useEffect(() => {
    getCounterContract();
  }, [account]);

  return (
    <main className="container">
      <header><h1>Welcome to the Counter App!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}
      </style>
    </main>
  );
}

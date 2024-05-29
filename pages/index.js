import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);


  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({
      method: "eth_requestAccounts",
    });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(
      contractAddress,
      atmABI,
      signer
    );

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balanceInWei = await atm.getBalance();
      const balanceInEther = parseFloat(ethers.utils.formatEther(balanceInWei));
      const roundedBalance = Math.abs(balanceInEther) < 0.000001 ? 0 : balanceInEther;
      setBalance(roundedBalance);
    }
  };
  
  const store = async () => {
    if (atm) {
      const confirmed = window.confirm("Depositing Runes are you sure?");
      if(confirmed){
        let tx = await atm.storeRunes(ethers.utils.parseEther(amount));
        await tx.wait();
        getBalance();
        updateTransactionHistory("Deposited Runes", amount);
      }
    }
  };

  const consume = async () => {
    if (atm) {
      const confirmed = window.confirm("Using Runes are you sure?");
      if(confirmed){
        let tx = await atm.consumeRunes(ethers.utils.parseEther(amount));
        await tx.wait();
        getBalance();
        updateTransactionHistory("Used Runes", amount);
      }
    }
  };

  const updateTransactionHistory = (type, amount) => {
    const newTransaction = {
      type: type,
      amount: amount,
      timestamp: new Date().toLocaleString()
    };
    setTransactions([...transactions, newTransaction]);
  }

  const renderTransactions = () => {
    return transactions.map((transaction, index) => (
      <li key={index}>
        {transaction.type}: {transaction.amount} ETH ({transaction.timestamp})
      </li>
    ));
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p className="account">Your Account: {account}</p>
        <p className="balance">Your Balance: {balance}</p>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
        />
        <button onClick={store}>Store</button>
        <button onClick={consume}>Consume</button>
        <h2>Rune Transaction History</h2>
        <ul>{renderTransactions()}</ul>
        <style jsx>{`
        .account{
          color: white;
        }

        .balance{
          color: white;
        }

        h2{
          color: white;
        }

        ul{
          color: white;
        }
    `}</style>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header className="header">
        <h1>Welcome to Elden Ring Rune ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          background-color: #ADD8E6;
          text-align: center;
          margin: 50px auto;
          padding: 20px;
          max-width: 600px;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          background-image: url('https://c4.wallpaperflare.com/wallpaper/114/191/745/elden-ring-fromsoftware-dark-souls-hd-wallpaper-preview.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .header{
          color: white;
        }
      `}</style>
    </main>
  );
}

import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <>
        <div className="connect">
        <header className="header">
          <h1>Welcome to the Money Inc. ATM!</h1>
        </header>
          <button className="button button-tertiary" onClick={connectAccount}>Please connect your Metamask wallet</button>
          <style jsx>{`
            .connect{
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              display: grid;
              place-content: center;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0, 0 ,0 ,0.1);
            }

            .button{
              padding: 10px 20px;
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              text-decoration: none;
              border-radius: 5px;
              border: 2px solid transparent;
              cursor: pointer;
              transition: background-color 0.3s, color 0.3s, border-color 0.3s;
            }

            .button-tertiary {
              background-color: #007bff;
              color: white;
              border-color: #007bff;
            }
          
            .button-tertiary:hover {
              background-color: #0056b3;
              border-color: #0056b3;
            }
          
            .button-tertiary:active {
              background-color: #004085;
              border-color: #004085;
            }
          
            .button-tertiary:disabled {
              background-color: #007bff;
              color: rgba(255, 255, 255, 0.7);
              border-color: #007bff;
              cursor: not-allowed;
            }

            .header {
              text-align: center;
              color: #911391;
              padding: 20px;
            }
          
          `}
          </style>
        </div>
        </>)
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div className="details">
        <p className="account-info">Your Account: {account}</p>
        <p className="balance-info">Your Balance: {balance}</p>
        <button className="button button-primary" onClick={deposit}>Deposit 1 ETH</button>
        <button className="button button-secondary" onClick={withdraw}>Withdraw 1 ETH</button>
        <style jsx>{`
          .details {
            font-family: Arial, sans-serif;
            text-align: center;
            font-weight: bold;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0 ,0 ,0.1);
          }

          .account-info{
            padding: 20px;
            margin-top: 0 auto;
           }

          .account-info p {
            margin: 10px 0;
            font-size: 18px;
            word-wrap: break-word;
          }
        
          .account-info p:first-child {
            font-weight: bold;
            color: #007bff;
          }
        
          .account-info p:last-child {
            font-size: 20px;
            color: #28a745;
          }

          .button{
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            border: 2px solid transparent;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s, border-color 0.3s;
            margin-right: 10px;
          }

          .button:last-child {
            margin-right: 0;
          }

          .button-primary {
            background-color: #a223ad;
            color: white;
            border-color: #a223ad;
          }
        
          .button-primary:hover {
            background-color: #541259;
            border-color: #541259;
          }
        
          .button-primary:active {
            background-color: #801b87;
            border-color: #801b87;
          }
        
          .button-primary:disabled {
            background-color: #007bff;
            color: rgba(255, 255, 255, 0.7);
            border-color: #007bff;
            cursor: not-allowed;
          }

          .button-secondary {
            background-color: #624963;
            color: white;
            border-color: #624963;
          }
        
          .button-secondary:hover {
            background-color: #382a38;
            border-color: #382a38;
          }
        
          .button-secondary:active {
            background-color: #5c445c;
            border-color: #5c445c;
          }
        
          .button-secondary:disabled {
            background-color: #6c757d;
            color: rgba(255, 255, 255, 0.7);
            border-color: #6c757d;
            cursor: not-allowed;
          }
        
          .button-small {
            padding: 5px 10px;
            font-size: 14px;
          }
        
          .button-large {
            padding: 15px 30px;
            font-size: 18px;
          }
        `}  
        </style>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      {initUser()}
      <style jsx>{`
        .container {
          font-family: Arial, sans-serif;
          color: #333;
          margin: 0 auto;
          padding: 0;
          height: 96vh;
          display: grid;
          place-content: center;
          background-image: url('https://wallpapers.com/images/hd/aesthetic-anime-scene-desktop-4k-0pnb65qudf5plsju.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}
      </style>
    </main>
  )
}

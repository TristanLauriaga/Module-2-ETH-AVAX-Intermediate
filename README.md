## Module 2 ETH + AVAX Intermediate 

The Metacrafters team gave us and assessment on our module 2 about smart contracts and it's functionalities, they gave us an starter template to play around with. They also explained how the code will works.

## Description

The code that the metacrafters team gave us is for a ATM website. We can deposit ETH and also withdraw ETH from it. They have also gave is a step by step on the nodes that is needed to download. The commands NPX, NPM and Hardhat functions helped Metamask and the frontend to communicate.

## Getting Started

### Installing

The things that needed to download is the node directory or the "NODE.JS" which can be downloaded here "https://nodejs.org/en/download/package-manager" and "VSCODE" the IDE we need that can be downloaded here "https://code.visualstudio.com/download". The last thing that is needed is the template that is given to us by Mr.Chris from the metacrafters team. We cloned his starter-template code to get started and saved us a lot a time so thank you to Mr.Chris. Lastly the Extension "METAMASK WALLET" on chrome.

### Executing program

Here is the steps that is needed to run the program.
```
* First step is to clone the starter template code on github
* Second step is to open a terminal and install Node.js to the main directory file using: npm i
* Third step is to add another terminal and direct it again to the main directory and run this command: npx hardhat node
* Fourth step is to add the last terminal, direct it to the main directory and run this command: npx hardhat run --network localhost scripts/deploy.js
* Last step is to run the front end, to do that go to the first directory where you have installed the Node.js then run this command: npx run dev
```
if done successfully it will put a URL most likely: http://localhost:3000/ this is the front end of your system, open the metamask wallet and make a account, after that click the "Please connect to a metamask wallet" button then if you do not see the account go back to the terminal you have run the command npx hardhat note and copy the private key of the account named "Account #0" then import it by clicking the account in the metamask interface then add account or hardware wallet then import account. There you can paste the private key in the field named "Private Key" then there you go you can withraw and deposit ETH to it. It needs to be at 10000ETH to see if its correct. 

## About the frontend

When you run the command npm run dev it will fire up the front end. Now in the front end in the templace it has a block of code:

```
  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
```

this is the front end code of the template it's quite basic because the team wants us to play with it, add fuctions etc. they just want to see effort.

===============================

Now what I did is using my knowledge on front end web development I came up with my own front end here is my code for it:

```
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
```

this is for the "Please connect your metamask wallet" page.

![image](https://github.com/TristanLauriaga/Module-2-ETH-AVAX-Intermediate/assets/137780534/26b23fd7-440f-4cab-88e2-88ccc1b75287)

===============================

```
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
```

this is for the Account and balance details also the buttons of withdraw and deposit ETH.

![image](https://github.com/TristanLauriaga/Module-2-ETH-AVAX-Intermediate/assets/137780534/0e94ceca-0923-466c-9faf-c12bbdd503e8)

===============================

```
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
```

lastly this is the css file for the whole page

![image](https://github.com/TristanLauriaga/Module-2-ETH-AVAX-Intermediate/assets/137780534/df3bf2bd-1e8e-40d0-ac24-3890e90b8db3)

## Authors

Lauriaga, Lancetristan B. 
3.1 BSIT
@tristanaenaeee in Instagram

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

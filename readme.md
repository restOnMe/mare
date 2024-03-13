# Automated Transaction Monitoring System

## Overview
This system is designed to automate the monitoring of transactions for specified tokens on the Solana blockchain, with a focus on preventing unwanted bot activity. Utilizing Solscan and other Solana explorers, the system identifies transactions made by addresses not included in a predefined "Maker Address List" (whitelist) and takes action to freeze those accounts.

## Features
- **Transaction Monitoring**: Automatically monitors transactions for a set of specified SPL tokens.
- **Whitelist Checking**: Compares the maker address of each transaction against the Maker Address List to determine if it is whitelisted.
- **Automated Freezing**: For addresses not found on the whitelist, the system automatically freezes their account to prevent further transactions.
- **Excel Logging**: Records details of each freeze action, including the account address, transaction amount, and transaction signature, in an Excel sheet for audit and review purposes.
  

## requirements
1. **Dependencies**: Ensure Node.js and npm are installed on your system.
2. **Installation**: Clone this repository and run `npm install` to install required packages.
3. **Configuration**: Update the `data/constants.js` file with the appropriate SPL token addresses and network RPC URL. Set the freeze authority's secret key in `utils/readFile.js`.

## Usage
Before starting the monitoring system, configure your environment and system settings:

1. **Set Environmental Variables**: For security purposes, sensitive information including the freeze authority's secret key should be stored in environmental variables.

```javascript
const RPC_URL = "http://127.0.0.1:8899";
const WebSocket_URL = "ws://localhost:8900/";

const MINT_ADDRESS = "9yn1uMMbQzcFiGVTGz19t3QK9zBSfTamzxAGd2mjhuVV";

const TOKEN_ACCOUNT_ADDRESS = "FKJDnQ2zFYE7USJzAgt22EKZiWAgbArtAnjSxHTusCAn";

const FREEZE_AUTHORITY_SECRET_KEY = new Uint8Array([
  143, 155, 66, 148, 220, 166, 73, 204, 41, 140, 252, 140, 65, 59, 89, 251, 36,
  241, 21, 197, 161, 116, 104, 203, 52, 126, 73, 136, 96, 235, 83, 62, 219, 25,
  29, 174, 231, 104, 136, 218, 176, 149, 127, 196, 117, 129, 96, 150, 234, 5,
  143, 70, 135, 60, 245, 77, 41, 40, 153, 13, 83, 250, 155, 231,
]);

module.exports = {
  RPC_URL,
  WebSocket_URL,
  MINT_ADDRESS,
  TOKEN_ACCOUNT_ADDRESS,
};
```


## Security
This system involves operations that can freeze Solana accounts. Ensure you have the appropriate authority and understand the implications of these actions. Always keep the freeze authority's secret key secure and consider environmental variables or secure secret management solutions for production environments.

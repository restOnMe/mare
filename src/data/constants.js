/** SETUP FOR LOCALHOST(solana-test-validator)

const RPC_URL = "http://127.0.0.1:8899";
const WebSocket_URL = "ws://localhost:8900/";

const MINT_ADDRESS = "9yn1uMMbQzcFiGVTGz19t3QK9zBSfTamzxAGd2mjhuVV";

const TOKEN_ACCOUNT_ADDRESS = "FKJDnQ2zFYE7USJzAgt22EKZiWAgbArtAnjSxHTusCAn";
*/

/** SETUP FOR DEVNET 
const RPC_URL = "https://api.devnet.solana.com";
const WebSocket_URL = "wss://api.devnet.solana.com/";

const MINT_ADDRESS = "DU9as9fLQz23tXfnwa4YYLjdscaYCvnuqKubQAb91wCD";

const TOKEN_ACCOUNT_ADDRESS = "CEeoDRFPQBH2RNZXWiWyKuGii4H55SJiX6T1aMcXUYgf";
*/

/** SETUP FOR MAINNET */
const RPC_URL = "https://api.mainnet-beta.solana.com";
const WebSocket_URL = "wss://api.mainnet-beta.solana.com/";

const MINT_ADDRESS = "DU9as9fLQz23tXfnwa4YYLjdscaYCvnuqKubQAb91wCD";

const TOKEN_ACCOUNT_ADDRESS = "CEeoDRFPQBH2RNZXWiWyKuGii4H55SJiX6T1aMcXUYgf";

const FREEZE_AUTHORITY_SECRET_KEY = new Uint8Array();

module.exports = {
  RPC_URL,
  WebSocket_URL,
  MINT_ADDRESS,
  TOKEN_ACCOUNT_ADDRESS,
  FREEZE_AUTHORITY_SECRET_KEY,
};

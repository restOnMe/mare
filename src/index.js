const {
  subscribeToAccount,
  accountUpdateEmitter,
} = require("./services/webSocketSubscribeAccount");
const { getSignaturesForAddress } = require("./services/solanaGetSignature");
const { getTransaction } = require("./services/testGetTransaction");
const { checkAddressAgainstWhiteList } = require("./utils/readFile");
const { TOKEN_ACCOUNT_ADDRESS } = require("./data/constants");
const {
  recursiveTracingAndFreezing,
} = require("./recursive_freezing_logic/traceAndFreeze");

function startObul() {
  console.log("Obul starting... 🤖");
  subscribeToAccount(TOKEN_ACCOUNT_ADDRESS);
  accountUpdateEmitter.on("update", handleAccountUpdate);
}

// Function to handle account updates
async function handleAccountUpdate() {
  console.log(
    "[Account Update Detected] Fetching signatures and transactions..."
  );

  try {
    console.log("------------------------------------------------");
    const signatures = await getSignaturesForAddress(TOKEN_ACCOUNT_ADDRESS);

    // Process if there are any signatures
    if (signatures.length > 0) {
      const latestSignature = signatures[0];
      const transactionDetails = await getTransaction(latestSignature);

      // Process the transaction if details are available
      if (transactionDetails) {
        processTransactionDetails(transactionDetails);
      }
    }
    console.log("====================================================");
  } catch (error) {
    console.error("Error processing account update:", error);
  }
}

// Function to process transaction details
async function processTransactionDetails(transactionDetails) {
  switch (transactionDetails.type) {
    case "transferChecked":
      // Handle transferChecked transactions
      await checkAddressAgainstWhiteList(
        transactionDetails.sender,
        transactionDetails.balance,
        transactionDetails.transactionHash
      );
      await checkAddressAgainstWhiteList(
        transactionDetails.receiver,
        transactionDetails.balance,
        transactionDetails.transactionHash
      );
      await recursiveTracingAndFreezing(
        transactionDetails.transactionHash[0],
        transactionDetails.amount
      );
      break;
    case "freezeAccount":
    case "thawAccount":
      await checkAddressAgainstWhiteList(transactionDetails.account);
      break;
    default:
      console.log(`Unhandled transaction type: ${transactionDetails.type}`);
      break;
  }
}

startObul();

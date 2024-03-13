const { rpcRequest } = require("../utils/rpcClient");

async function getTransaction(transactionHash) {
  const logPrefix = "[Get Transaction] ";
  try {
    const transactionDetails = await rpcRequest(
      "getTransaction",
      [transactionHash, "jsonParsed"],
      logPrefix
    );

    const instruction =
      transactionDetails.transaction.message.instructions[0].parsed;
    const type = instruction.type;
    let result = { type: type };

    switch (type) {
      case "transferChecked":
        result.sender = instruction.info.source;
        result.receiver = instruction.info.destination;
        result.balance = instruction.info.tokenAmount.uiAmountString;
        result.mint = instruction.info.mint;
        result.transactionHash = transactionDetails.transaction.signatures;
        result.amount = instruction.info.tokenAmount.amount / Math.pow(10, 9);
        break;
      case "freezeAccount":
      case "thawAccount":
        result.account = instruction.info.account;
        result.freezeAuthority = instruction.info.freezeAuthority;
        result.mint = instruction.info.mint;
        result.transactionHash = transactionDetails.transaction.signatures;
        result.amount = instruction.info.tokenAmount.amount / Math.pow(10, 9);
        break;
      default:
        console.log("Unknown transaction type:", type);
        result.info = instruction.info;
        result.transactionHash = transactionDetails.transaction.signatures;
        break;
    }

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { getTransaction };

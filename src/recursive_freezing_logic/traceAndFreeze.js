const { getSignaturesForAddress } = require("../services/solanaGetSignature");
const { getTransaction } = require("../services/testGetTransaction");
const { freezeNonWhitelistedAccount } = require("../utils/readFile");

async function recursiveTracingAndFreezing(transactionHash, balance) {
  console.log("Entering recursive tracing: ");
  const transactionDetails = await getTransaction(transactionHash);
  const receivingAddress = transactionDetails.receiver;

  const currentBalance = transactionDetails.amount;
  if (currentBalance !== balance) {
    const newTransactionHashes = await getSignaturesForAddress(
      receivingAddress,
      10
    );

    for (const newTransactionHash of newTransactionHashes) {
      const newTransactionDetails = await getTransaction(newTransactionHash);
      const newReceivingAddress = newTransactionDetails.receiver;
      await freezeNonWhitelistedAccount(
        newReceivingAddress,
        newTransactionDetails.amount
      );
      await recursiveTracingAndFreezing(
        newTransactionHash,
        newTransactionDetails.balance
      );
    }
  }
}

module.exports = { recursiveTracingAndFreezing };

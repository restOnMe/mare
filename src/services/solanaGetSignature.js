const { rpcRequest } = require("../utils/rpcClient");

async function getSignaturesForAddress(address, limit) {
  const logPrefix = "[Get Signatures] ";
  try {
    const signatures = await rpcRequest(
      "getSignaturesForAddress",
      [address, { limit: limit }],
      logPrefix
    );

    const signatureValues = signatures.map((sig) => sig.signature);

    return signatureValues;
  } catch (error) {
    console.error(
      `${logPrefix}Error fetching signatures for address: ${address}`,
      error
    );
    return [];
  }
}

module.exports = {
  getSignaturesForAddress,
};

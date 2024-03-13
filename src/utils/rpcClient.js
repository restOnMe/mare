const axios = require("axios");
const { RPC_URL } = require("../data/constants");

async function rpcRequest(method, params = [], logPrefix = "") {
  const data = {
    jsonrpc: "2.0",
    id: 1,
    method: method,
    params: params,
  };

  try {
    const response = await axios.post(RPC_URL, data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data && response.data.result) {
      console.log(`${logPrefix}Success.`);
      return response.data.result;
    } else {
      console.error(`${logPrefix}RPC Error:`, response.data.error);
      return null;
    }
  } catch (error) {
    console.error(`${logPrefix}Request Error:`, error);
    return null;
  }
}

module.exports = { rpcRequest };

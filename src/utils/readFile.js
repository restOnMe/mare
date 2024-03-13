const fs = require("fs");
const path = require("path");
const { PublicKey, Connection, Keypair } = require("@solana/web3.js");
const { freezeAccount } = require("@solana/spl-token");

const {
  RPC_URL,
  MINT_ADDRESS,
  FREEZE_AUTHORITY_SECRET_KEY,
} = require("../data/constants");
const { storeFrozenAccount } = require("./frozenAccount");

const connection = new Connection(RPC_URL, "confirmed");
const mintPublicKey = new PublicKey(MINT_ADDRESS);

/**
 * Freezes an account that is not on the whitelist.
 * @param {PublicKey} accountPublicKey - The public key of the account to freeze.
 */
async function freezeNonWhitelistedAccount(accountPublicKey, balance) {
  try {
    const freezeAuthorityKeypair = Keypair.fromSecretKey(
      FREEZE_AUTHORITY_SECRET_KEY
    );

    const signature = await freezeAccount(
      connection,
      freezeAuthorityKeypair,
      accountPublicKey,
      mintPublicKey,
      freezeAuthorityKeypair
    );
    console.log(
      `  ⚠️  🥶  Success ${accountPublicKey.toString()} has been frozen. Transaction signature: ${signature}`
    );
    await storeFrozenAccount(accountPublicKey.toString(), balance, signature);
  } catch (error) {
    console.error(
      `  ❌  Error while freezing account ${accountPublicKey.toString()}. Possible that the account is already frozen. Error details: ${
        error.message
      }`
    );
  }
}

/**
 * Reads whitelisted addresses from a given file.
 * @param {string} filePath - The path to the file containing whitelisted addresses.
 * @returns {Promise<string[]>} A promise that resolves with the list of addresses.
 */
async function readWhiteListedAddresses(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(
          `Error: Failed to read white-listed addresses from ${filePath}. Ensure the file exists and has the correct permissions. Error details: ${err.message}`
        );
      } else {
        resolve(data.split("\n").filter((line) => line.trim() !== ""));
      }
    });
  });
}

/**
 * Checks if an address is on the whitelist and freezes it if not.
 * @param {string} address - The address to check.
 */
async function checkAddressAgainstWhiteList(address, balance) {
  try {
    const whiteListedAddresses = await readWhiteListedAddresses(
      path.join(__dirname, "whitelistAddress.txt")
    );
    const addressPublicKey = new PublicKey(address);

    if (whiteListedAddresses.includes(address)) {
      console.log(`Success:  ✅  Address ${address} is in the white list.`);
    } else {
      console.log(
        `Warning:  ⚠️  Address ${address} is not in the white list. Initiating freeze process.`
      );
      await freezeNonWhitelistedAccount(addressPublicKey, balance);
    }
  } catch (error) {
    console.error(
      `Error: Failed to check if address ${address} is whitelisted due to an error. Please ensure the whitelist file exists and is formatted correctly. Error details: ${error.message}`
    );
  }
}

module.exports = {
  checkAddressAgainstWhiteList,
  FREEZE_AUTHORITY_SECRET_KEY,
  freezeNonWhitelistedAccount,
};

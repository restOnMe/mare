const XLSX = require("xlsx");
const path = require("path");

/**
 * Stores the account address, balance, and transaction hash in an Excel sheet.
 * @param {string} address - The frozen account address.
 * @param {number} balance - The balance of the frozen account.
 * @param {string} transactionHash - The transaction hash related to the account freezing.
 */
async function storeFrozenAccount(address, balance, transactionHash) {
  const filePath = path.join(__dirname, "frozenAccounts.xlsx");
  let workbook;

  try {
    workbook = XLSX.readFile(filePath);
  } catch (error) {
    console.warn("Creating a new excel for frozen accounts.");
    workbook = XLSX.utils.book_new();
  }

  let worksheet;
  if (!workbook.Sheets["FrozenAccounts"]) {
    worksheet = XLSX.utils.aoa_to_sheet([
      ["Address", "Balance", "TransactionHash"],
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "FrozenAccounts");
    console.info("New sheet 'FrozenAccounts' created.");
  } else {
    worksheet = workbook.Sheets["FrozenAccounts"];
  }

  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  const nextRow = range.e.r + 2;

  XLSX.utils.sheet_add_json(
    worksheet,
    [{ Address: address, Balance: balance, TransactionHash: transactionHash }],
    { origin: -1, skipHeader: true }
  );

  XLSX.writeFile(workbook, filePath);
  console.info(
    `Account ${address} with balance ${balance} and transaction hash ${transactionHash} stored successfully`
  );
}

module.exports = { storeFrozenAccount };

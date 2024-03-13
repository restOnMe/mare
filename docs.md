# SPL-Token Transaction Monitor and Freezer

## Overview

This script provides a real-time monitoring and action system for SPL-token transactions involving specified wallet accounts on the Solana blockchain. It is designed to subscribe to events indicating changes in these wallet accounts, with a particular focus on identifying and responding to transactions involving non-whitelisted addresses.

## How It Works

1. **Subscription to Wallet Activity**: Upon deployment, the script initiates a WebSocket subscription to monitor changes in the targeted SPL-token wallet account(s), triggering events for any detected activity.

2. **Transaction Detection and Details Fetching**:
    - Upon detecting a change in the wallet account, the script uses `getSignaturesForAddress()` to fetch the most recent transaction hash associated with the account.
    - Subsequently, `getTransaction()` is called with the fetched hash to retrieve detailed transaction information.

3. **Whitelist Verification**:
    - The script examines the transaction details to identify the associated token address, checking against a list of whitelisted addresses.
    - If the address is found within the whitelist, no further action is taken.
    - If the address is not whitelisted, the script proceeds to freeze the associated token account.

4. **Freezing Process**:
    - The script freezes the non-whitelisted associated token account.
    - It then records the associated token account (ATA), the amount involved, and the transaction hash for further action.

5. **Recursive Tracing and Freezing**:
    - For each non-whitelisted transaction, the script checks the SPL-token balance of the receiving address to determine if it matches the received amount. This helps in identifying whether the assets have been moved to another address.
    - If the balance does not match, indicating further transactions, `getSignaturesForAddress()` is called for the receiving address to fetch new transaction hashes.
    - Using `getTransaction()`, the script retrieves details of subsequent transactions to identify where the SPL tokens have been sent.
    - The process of freezing is then applied to these new addresses, with their ATAs, amounts, and transaction hashes recorded.
    - This recursive tracing and freezing process continues until all associated movements of the initially detected assets have been addressed.

## Conclusion

This system is a powerful tool for managing the security and authorized distribution of SPL-tokens on the Solana blockchain. It ensures that only whitelisted addresses can hold or transact with the monitored tokens, providing an automated mechanism to prevent and mitigate unauthorized transfers.




const { createWebSocketConnection } = require("../utils/webSocketClient");
const EventEmitter = require("events");

class AccountUpdateEmitter extends EventEmitter {}
const accountUpdateEmitter = new AccountUpdateEmitter();

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

function subscribeToAccount(accountPublicKey) {
  const ws = createWebSocketConnection();

  ws.on("open", () => {
    const subscriptionRequest = {
      jsonrpc: "2.0",
      id: 1,
      method: "accountSubscribe",
      params: [
        accountPublicKey,
        {
          encoding: "jsonParsed",
          commitment: "finalized",
        },
      ],
    };
    ws.send(JSON.stringify(subscriptionRequest));
    console.log(`[WebSocket] Subscribing to account: ${accountPublicKey}`);
  });

  ws.on(
    "message",
    debounce((data) => {
      const notification = JSON.parse(data);
      if (notification.method === "accountNotification") {
        console.log("[WebSocket] Account update notification received.");
        const accountInfo = notification.params.result.value;
        accountUpdateEmitter.emit("update", accountInfo);
      }
    }, 1000)
  );
  ws.on("close", () => {
    console.log("[WebSocket] Connection Closed");
  });

  ws.on("error", (error) => {
    console.error("[WebSocket] Error:", error);
  });
}

module.exports = { subscribeToAccount, accountUpdateEmitter };

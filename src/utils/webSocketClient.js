const WebSocket = require("ws");
const { WebSocket_URL } = require("../data/constants");

function createWebSocketConnection() {
  const ws = new WebSocket(WebSocket_URL);

  ws.on("open", () => {
    console.log("[WebSocket] Connection opened.");
  });

  ws.on("error", (error) => {
    console.error("[WebSocket] Error:", error);
  });

  return ws;
}

module.exports = { createWebSocketConnection };

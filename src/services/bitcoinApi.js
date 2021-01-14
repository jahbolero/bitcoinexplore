if (localStorage.getItem("walletAddressList") == null) {
  localStorage.setItem("walletAddressList", "[]");
}

if (localStorage.getItem("storedBlockCount") == null) {
  localStorage.setItem("storedBlockCount", 0);
}

export function validateAddress(address) {
  return fetch(`http://localhost:4000/validateAddress?address=${address}`);
}

export function getReceivedByAddress(address) {
  return fetch(`http://localhost:4000/getReceivedByAddress?address=${address}`);
}

export function getNewAddress() {
  return fetch(`http://localhost:4000/getNewAddress`);
}

export function sendBtc(address, amount) {
  return fetch(
    `http://localhost:4000/sendToAddress?address=${address}&amount=${amount}`
  );
}
export function getTransaction(transactionHash) {
  return fetch(
    `http://localhost:4000/getTransaction?transactionHash=${transactionHash}`
  );
}
export function getBlock(blockHash) {
  return fetch(`http://localhost:4000/getBlock?blockHash=${blockHash}`);
}
export function getBlockUpdate() {
  return fetch(`http://localhost:4000/getBlockCount`);
}

export function getBestBlock() {
  return fetch(`http://localhost:4000/getBestBlockHash`);
}

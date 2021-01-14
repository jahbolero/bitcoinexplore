import React from "react";
import AddressInfo from "./components/address/AddressInfo";
import TransactionInfo from "./components/transaction/TransactionInfo";
import BlockInfo from "./components/block/BlockInfo";

function Bitcoin() {
  return (
    <div>
      <AddressInfo></AddressInfo>
      <TransactionInfo></TransactionInfo>
      <BlockInfo></BlockInfo>
    </div>
  );
}

export default Bitcoin;

import React, { useState } from "react";
import * as bitcoinApi from "../../services/bitcoinApi";
import Input from "../common/Input";
import { toast } from "react-toastify";
import Wallet from "./../wallet/Wallet";
import TransactionList from "./../transaction/TransactionList";

function AddressInfo() {
  const [addressQuery, setAddressQuery] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [amount, setAmount] = useState(0);
  function handleAddressQueryChange({ target }) {
    setAddressQuery(target.value);
  }
  function handleAmountChange({ target }) {
    setAmount(target.value);
  }
  function validateAddress() {
    bitcoinApi
      .validateAddress(addressQuery)
      .then((response) => response.json())
      .then((data) => {
        if (data.isvalid === true) {
          toast.success("Address is valid");
        } else {
          toast.error("Address is not valid");
        }
      });
  }
  function getAddressBalance() {
    bitcoinApi
      .getReceivedByAddress(addressQuery)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          toast.success(`Address balance is:${data}(BTC)`);
        } else {
          toast.error("Address is not valid");
        }
      });
  }
  function generateAddress() {
    bitcoinApi
      .getNewAddress()
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setAddressList((oldList) => [...oldList].concat(data));
          toast.success(`Address added to wallet`);
        } else {
          toast.error("Address is not valid");
        }
      });
  }
  function sendAmount() {
    bitcoinApi
      .sendBtc(addressQuery, amount)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error === undefined) {
          setTransactionList((oldList) => [...oldList].concat(data));
          toast.success(`Address added to wallet`);
        } else {
          toast.error("Address is not valid");
        }
      });
  }
  return (
    <div>
      <h2>Address Explorer</h2>
      <Input
        type="text"
        label="Address"
        name="address"
        value={addressQuery}
        id="address"
        onChange={handleAddressQueryChange}
      ></Input>
      <Input
        type="text"
        label="Amount"
        name="amount"
        value={amount}
        id="amount"
        onChange={handleAmountChange}
      ></Input>
      <input
        type="button"
        className="btn btn-info"
        value="Validate Address"
        onClick={validateAddress}
      ></input>
      <input
        type="button"
        className="btn btn-info"
        value="Get Address Balance"
        onClick={getAddressBalance}
      ></input>
      <input
        type="button"
        className="btn btn-info"
        value="Generate Address"
        onClick={generateAddress}
      ></input>
      <input
        type="button"
        className="btn btn-info"
        value="Send Btc"
        onClick={sendAmount}
      ></input>

      <Wallet addressList={addressList}></Wallet>
      <TransactionList transactionList={transactionList}></TransactionList>
    </div>
  );
}

export default AddressInfo;

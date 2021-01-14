import React, { useState } from "react";
import * as bitcoinApi from "../../services/bitcoinApi";
import { toast } from "react-toastify";
import Input from "./../common/Input";
function TransactionInfo() {
  const [transactionHash, setTransactionHash] = useState("");
  const [transaction, setTransaction] = useState({});
  function handleTransactionHashChange({ target }) {
    setTransactionHash(target.value);
  }
  function getTransaction() {
    bitcoinApi
      .getTransaction(transactionHash)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          console.log(data);
          setTransaction(data);
        } else {
          toast.error(data.error);
        }
      });
  }

  return (
    <div>
      <h3>Transactions</h3>
      <Input
        type="text"
        label="Address"
        name="address"
        value={transactionHash}
        id="address"
        onChange={handleTransactionHashChange}
      ></Input>
      <input
        type="button"
        value="Get Transaction"
        className="btn btn-info"
        onClick={getTransaction}
      />
      {transaction.txid == null ? (
        ""
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Transaction Id</th>
              <th>Address</th>
              <th>Fee</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{transaction.txid}</td>
              <td>{transaction.details[1].address}</td>
              <td>{transaction.fee}</td>
              <td>{transaction.details[1].amount}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionInfo;

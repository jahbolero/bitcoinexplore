import React from "react";

function TransactionList({ transactionList }) {
  console.log(transactionList);
  return (
    <div>
      <h3>Transaction History</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Transaction Hash</th>
          </tr>
        </thead>
        {transactionList.length === 0 ? (
          ""
        ) : (
          <tbody>
            {transactionList.map((transaction) => {
              return (
                <tr key={transaction}>
                  <td>{transaction}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default TransactionList;

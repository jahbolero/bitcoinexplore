import React from "react";

function Wallet({ addressList }) {
  console.log(addressList);
  return (
    <div>
      <h3>Wallet Address</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Address</th>
          </tr>
        </thead>
        {addressList.length === 0 ? (
          ""
        ) : (
          <tbody>
            {addressList.map((address) => {
              return (
                <tr key={address}>
                  <td>{address}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Wallet;

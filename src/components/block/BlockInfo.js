import React, { useState, useEffect } from "react";
import * as bitcoinApi from "../../services/bitcoinApi";
import { toast } from "react-toastify";
import Input from "./../common/Input";
function BlockInfo() {
  const [blockHash, setBlockHash] = useState("");
  const [block, setBlock] = useState({});
  const [bestBlockHash, setBestBlockHash] = useState("");
  function handleBlockHashChange({ target }) {
    setBlockHash(target.value);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      getBlockUpdate();
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  function getBlockUpdate() {
    bitcoinApi
      .getBlockUpdate()
      .then((response) => response.json())
      .then((data) => {
        var storedBlock = localStorage.getItem("storedBlockCount");
        if (storedBlock != data) {
          toast.info(`${data - storedBlock} blocks has been added`);
          localStorage.setItem("storedBlockCount", data);
        }
        updateBestBlockHash();
      });
  }
  function updateBestBlockHash() {
    console.log("Update");
    bitcoinApi
      .getBestBlock()
      .then((response) => response.json())
      .then((data) => {
        setBestBlockHash(data);
      });
  }
  function getBlock() {
    bitcoinApi
      .getBlock(blockHash)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          console.log(data);
          setBlock(data);
        } else {
          toast.error(data.error);
        }
      });
  }

  return (
    <div>
      <h3>Blocks</h3>
      <h5>Best Block Hash:{bestBlockHash}</h5>
      <Input
        type="text"
        label="Address"
        name="address"
        value={blockHash}
        id="address"
        onChange={handleBlockHashChange}
      ></Input>
      <input
        type="button"
        value="Get Block"
        className="btn btn-info"
        onClick={getBlock}
      />
      {block.hash == null ? (
        ""
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Block Hash</th>
              <th>Height</th>
              <th>Previous Block Hash</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{block.hash}</td>
              <td>{block.height}</td>
              <td>{block.previousblockhash}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BlockInfo;

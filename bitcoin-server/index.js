const Client = require("bitcoin-core");
const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
const port = 4000;

const client = new Client({
  network: "regtest",
  username: "a",
  password: "b",
  port: 18443,
});

client
  .getNewAddress()
  .then((result) => {
    client.generateToAddress(101, result).then((data) => {
      console.log("Initial address assigned wallet.");
    });
  })
  .catch((err) => {});

app.get("/validateAddress", (req, res) => {
  client
    .validateAddress(req.query.address)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      res.send(
        JSON.stringify({ error: "Address not valid or it doesn't exist" })
      );
    });
});

app.get("/getReceivedByAddress", (req, res) => {
  client
    .getReceivedByAddress(req.query.address)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      res.send(
        JSON.stringify({ error: "Address not valid or it doesn't exist" })
      );
    });
});

app.get("/getBlock", (req, res) => {
  const promise = client
    .getBlock(req.query.blockHash)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      res.send(
        JSON.stringify({ error: "Block hash not valid or it doesn't exist" })
      );
    });
});
app.get("/getTransaction", (req, res) => {
  const promise = client
    .getTransaction(req.query.transactionHash)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.send(
        JSON.stringify({
          error: "Transaction hash not valid or it doesn't exist",
        })
      );
    });
});

app.get("/getNewAddress", (req, res) => {
  const promise = client
    .getNewAddress()
    .then((result) => {
      client.generateToAddress(5, result).then((data) => {});
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      res.send(JSON.stringify({ error: "Something went wrong." }));
    });
});

app.get("/sendToAddress", (req, res) => {
  const promise = client
    .sendToAddress(req.query.address, `${req.query.amount}`)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ error: "Something went wrong." }));
    });
});
app.get("/listAddressGroupings", (req, res) => {
  const promise = client
    .listAddressGroupings()
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ error: "Something went wrong." }));
    });
});

app.get("/getBalance", (req, res) => {
  client.getBalance().then((result) => {
    res.send(JSON.stringify(result));
  });
});

app.get("/getBlockCount", (req, res) => {
  client.getBlockCount().then((result) => {
    res.send(JSON.stringify(result));
  });
});
app.get("/getBestBlockHash", (req, res) => {
  console.log("GetBestBlock");
  client.getBestBlockHash().then((result) => {
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

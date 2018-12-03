const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const port = process.argv[2];
const rp = require('request-promise');

const nodeAddress = uuid().split('-').join('');
const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//return all the entire blockchain
app.get('/blockchain', (req, res) => {
    res.send(bitcoin);
});

//create new transaction
app.post('/transaction', (req, res) => {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({
        note: `transaction will be added in block ${blockIndex}`
    });
});

//mine or create  a new block
app.get('/mine', (req, res) => {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    }
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockhash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    bitcoin.createNewTransaction(12.5, "00", nodeAddress);
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockhash);
    res.json({
        note: "New Block Mined Successfully",
        block: newBlock
    });
});

//register a node and broadcast that to entire network
app.post('/register-and-broadcast-node', (req, res) => {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.netWorkNodes.indexOf(newNodeUrl) == -1) {
        bitcoin.netWorkNodes.push(newNodeUrl);
    }
    const regNodesPromises=[];
    bitcoin.netWorkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: {
                newNodeUrl: newNodeUrl
            },
            json: true
        }
        regNodesPromises.push(rp(requestOptions));
    });
    Promise.all(regNodesPromises).then(data=>{
        console.log(data);
    })
});

//register a node with network
app.post('/register-node', (req, res) => {

});

app.post('/register-nodes-bulk', (req, res) => {

});

//server running
app.listen(port, () => {
    console.log(`server running on ${port}`);
});


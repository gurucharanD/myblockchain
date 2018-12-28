const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

const bc1 = {
    "chain": [
        {
            "index": 1,
            "timestamp": 1544949651428,
            "transactions": [],
            "nonce": "100",
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1544949671799,
            "transactions": [
                {
                    "amount": 300,
                    "sender": "guru",
                    "recipient": "charan",
                    "transactionId": "550dabc0010e11e99e1f833b84716d46"
                }
            ],
            "nonce": 18183,
            "hash": "000012656de0f0257486066f210044b54144f01d6d2c537bc668d4859ed0b8e",
            "previousBlockHash": "0"
        }
    ],
    "pendingTransactions": [
        {
            "amount": 12.5,
            "sender": "00",
            "recipient": "4b322c20010e11e99e1f833b84716d46",
            "transactionId": "5758ad30010e11e99e1f833b84716d46"
        }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "netWorkNodes": []
}

const isValid = bitcoin.chainIsValid(bc1.chain);
console.log('isValid', isValid);
// console.log(bitcoin);
// const previousBlockHash = 'abcd'; 
// const currentBlockData = [{
//     amount: 10,
//     sender: 'gopichinna',
//     recipient: 'charan'
// }, {
//     amount: 20,
//     sender: 'guru1',
//     recipient: 'charan1'
// }, {
//     amount: 30,
//     sender: 'guru2',
//     recipient: 'charan2'
// }];
// const nonce=100;
// const 

// bitcoin.createNewBlock(2839, '1234567', '09876');

// bitcoin.createNewTransaction(100,'abc','def');
// bitcoin.createNewBlock(2840, '76543', '8765');


// console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce));

//console.log(bitcoin.proofOfWork(currentBlockData,previousBlockHash));
// /'00008398c41666c917155cb7a5053c83fae8eecab754 
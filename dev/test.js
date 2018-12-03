const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
console.log(bitcoin);
const previousBlockHash = 'abcd';
const currentBlockData = [{
    amount: 10,
    sender: 'gopichinna',
    recipient: 'charan'
}, {
    amount: 20,
    sender: 'guru1',
    recipient: 'charan1'
}, {
    amount: 30,
    sender: 'guru2',
    recipient: 'charan2'
}];
const nonce=100;


// bitcoin.createNewBlock(2839, '1234567', '09876');

// bitcoin.createNewTransaction(100,'abc','def');
// bitcoin.createNewBlock(2840, '76543', '8765');

 
// console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce));

//console.log(bitcoin.proofOfWork(currentBlockData,previousBlockHash));
// /'00008398c41666c917155cb7a5053c83fae8eecab754 
const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1');
function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];
    this.currentNodeUrl = currentNodeUrl;
    this.netWorkNodes = [];
    this.createNewBlock('100', '0', '0');
}

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
}

Blockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
        transactionId: uuid().split('-').join('')
    }
    // this.pendingTransactions.push(newTransaction);
    // return this.getLastBlock()['index'] + 1;
    return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransactions = function (transactionObj) {
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
}

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
    //makes sure that every block is legitemate
    //repeatedly hash block until it finds correct hash (starting with 0000)
    //uses current block data for the hash,but also the previous hash
    //continously changes nonce value until correct hash
    //returns to us the nonce value that creates the correct hash
    let nonce = 0;

    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== '0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        // console.log(nonce,'+',hash)
    }
    return nonce;
}
/*
consensus alogrith is a way to agree upon data in the blockchain is valid
 longest chain rule is a consensus algorithm

this algorithm takes the length of the current blockchain and compares it with the length of bc on all other blockchains
if it finds a longer chain than the current block chain it replaces the bc eith the longest bc
the longest chain
 */

Blockchain.prototype.chainIsValid = function (blockchain) {
    let validChain = true;
    for (let i = 1; i < blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i - 1];
        const blockHash = this.hashBlock(prevBlock.hash,
            {
                transactions: currentBlock.transactions,
                index: currentBlock.index
            },
            currentBlock.nonce
        );
        if (blockHash.substring(0, 4) !== '0000') {
            validChain = false;
        }
        if (currentBlock.previousBlockHash !== prevBlock.hash) {
            //chain is invalid  
            validChain = false;
        }
    }
    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock.nonce === '100';
    const correctPreviousHash = genesisBlock.previousBlockHash === '0';
    const correctHash = genesisBlock.hash === '0';
    const correctTransaction = genesisBlock.transactions.length === 0;
    if (!correctNonce || !correctPreviousHash || !correctHash || !correctTransaction) {
        // console.log('correctNonce', correctNonce);
        // console.log('correctPreviousHash', correctPreviousHash);
        // console.log('correctHash', correctHash);
        // console.log('correctTransaction', correctTransaction);

        validChain = false;
    }
    return validChain;
}

Blockchain.prototype.getBlock = function (blockHash) {
    let correctBlock = null;
    this.chain.forEach(block => {
        if (block.hash === blockHash) {
            correctBlock = block;
        }
    });
    return correctBlock;
}

Blockchain.prototype.getTransaction = function (transactionId) {
    let correctTransaction = null;
    let correctBlock = null;
    this.chain.forEach(block => {
        block.transactions.forEach(transaction => {
            if (transaction.transactionId === transactionId) {
                correctTransaction = transaction;
                correctBlock = block;
            }
        })
    })
    return {
        transaction: correctTransaction,
        block: correctBlock
    }
}

Blockchain.prototype.getAddressData = function (address) {
    const addressTransactions = [];
    this.chain.forEach(block => {
        block.transactions.forEach(transaction => {
            if (transaction.sender === address || transaction.recipient === address) {
                addressTransactions.push(transaction);
            }
        })
    })
    let balance = 0;
    addressTransactions.forEach(transaction => {
        if (transaction.recipient === address) {
            balance += transaction.amount;
        }
        else if (transaction.sender === address) {
            balance -= transaction.amount;
        }
    })

    return {
        addressTransactions,
        addressBalance: balance
    }

}

module.exports = Blockchain;  
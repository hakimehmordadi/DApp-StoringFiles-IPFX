# Project Description

This is a simple implementation of backend integration with blockchain. 
I'm trying to build a simple decentralized file store app, It uploads files and every others can access files.
Also i store file data in IPFS, get the address and write functions to store 
this address and retrieve this address from a blockchain by smart contract with the 
Solidity programming language.

I create a test function for testing the process.

## Steps to run

- ```npm install```
- In another terminal of same directory, run ```ganache-cli```
- Go back to the previous terminal and run ```truffle compile```
- Then run ```truffle migrate```
- Then run ```truffle test```
- Then run ```npm run start```


# IPFS
For saving i'm using IPFS, which is powerfull way for files. File and every block within file is given a unique
cryptographic hash. Each public node stors only what is inserted in. When i look up the file, there is no need to
hash, with IPSN name we are asking the network to find the nodes that are storing the content.

# Web3
Using Web3 libraries we can allows to interact with an Ethereum node through HTTP, IPC or Web Sockets

# Smart Contract
I'm using Truffle for contract development and testing environment and asset pipeline for Ethereum blockchain.
- In another terminal of same directory, run ```npm install -g truffle```
Deploy a contract in an emulator without using actual money for transaction cost
- In another terminal of same directory, run ```npm i ganache-cli```

#  Remix IDE
Using this IDE i could test my contract




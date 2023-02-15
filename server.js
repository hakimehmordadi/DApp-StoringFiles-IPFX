require('dotenv').config();
const express= require('express')
const app =express()
const routes = require('./routes')
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient
const contract = require('truffle-contract');
const artifacts = require('./build/Inbox.json');

// a middleware that allows us usin JSON in API
app.use(express.json())

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

// Initialize created contract
const LMS = contract(artifacts)
LMS.setProvider(web3.currentProvider)

// connect to our MongoDB database
mongodb.connect(process.env.DB,{ useUnifiedTopology: true }, async(err,client)=>{
    const db =client.db('Cluster0')
    const accounts = await web3.eth.getAccounts();
    const lms = await LMS.deployed();
    routes(app,db, lms, accounts)
    app.listen(process.env.PORT || 8082, () => {
        console.log('listening on port '+ (process.env.PORT || 8082));
     })
})

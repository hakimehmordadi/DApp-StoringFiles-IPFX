var Inbox = artifacts.require("./Inbox.sol");

// I'm getting contract and deploy it to Json with truffle compile & truffle migrate
module.exports = function(deployer) {
    deployer.deploy(Inbox);
};
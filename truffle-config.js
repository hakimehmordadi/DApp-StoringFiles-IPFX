const path = require("path");

  // Truffle configuration!
module.exports = {
  // Path of build directiory which the contract convert to json
  contracts_build_directory: path.join(__dirname, "/build"), 
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  }
};

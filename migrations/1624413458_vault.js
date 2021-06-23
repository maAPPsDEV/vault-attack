const Vault = artifacts.require("Vault");

module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(Vault, web3.utils.randomHex(32));
};

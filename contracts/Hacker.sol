// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;

import "./Vault.sol";

contract Hacker {
  address public hacker;

  modifier onlyHacker {
    require(msg.sender == hacker, "caller is not the hacker");
    _;
  }

  constructor() {
    hacker = payable(msg.sender);
  }

  /// @dev The part of guessing password is inside the front-end web3, so see the test file.
  function attack(address _target, bytes32 _password) public onlyHacker {
    Vault(_target).unlock(_password);
  }
}

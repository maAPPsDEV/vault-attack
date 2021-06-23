# Solidity Game - Valut Attack

_Inspired by OpenZeppelin's [Ethernaut](https://ethernaut.openzeppelin.com), Valut Level_

⚠️Do not try on mainnet!

## Task

_Can you believe, if I say "I can guess your password saved in your contract, even if it's defined as private"?_

Unlock the vault.

_Hint:_

1. Is `private` variable actually **private**?

## What will you learn?

1. `private` doesn't actually mean that the data is hidden/safe & unaccessible.
2. Do not store sensitive data inside contracts.

## What is the most difficult challenge?

1. How to convert JavaScript string to `byte32`?
   
   Use [utils.asciiToHex](https://web3js.readthedocs.io/en/v1.2.0/web3-utils.html#asciitohex)

```
web3.utils.asciiToHex('I have 100!');
> "0x4920686176652031303021"
```

2. Can I read the storage of a contract?
   
   Use [eth.getStorageAt](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#getstorageat)

```
web3.eth.getStorageAt("0x407d73d8a49eeb85d32cf465507dd71d507100c1", 0)
.then(console.log);
> "0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"
```

## Source Code

⚠️This contract contains a bug or risk. Do not use on mainnet!

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;

contract Vault {
  bool public locked;
  bytes32 private password;

  constructor(bytes32 _password) {
    locked = true;
    password = _password;
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}

```

## Configuration

### Install Truffle cli

_Skip if you have already installed._

```
npm install -g truffle
```

### Install Dependencies

```
yarn install
```

## Test and Attack!💥

### Run Tests

```
truffle develop
test
```

You should take ownership of the target contract successfully.

```
truffle(develop)> test
Using network 'develop'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: Hacker
    √ should unlock vault (399ms)


  1 passing (440ms)

```

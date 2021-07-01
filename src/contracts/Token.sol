// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token is ERC20 {
  constructor (uint256 initialToken) ERC20('AnakAgung Token', "AAT") {
    _mint(msg.sender, initialToken);
  }
}

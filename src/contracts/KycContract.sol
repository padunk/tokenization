// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract KycContract is Ownable{
  mapping (address=>bool) allowed;

  function setAllowed(address _address) public onlyOwner {
    allowed[_address] = true;
  }

  function setRevoked(address _address) public onlyOwner{
    allowed[_address] = false;
  }

  function getAllowed(address _address) public view returns(bool) {
    return allowed[_address];
  }
}
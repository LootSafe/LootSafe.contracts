pragma solidity ^0.4.8;

// This should house standard information about the contract stack
// It should aslo house shared modifiers

contract Meta {
  address owner;
  uint256 created;

  function Meta () {
    owner = msg.sender;
    created = now;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }
}
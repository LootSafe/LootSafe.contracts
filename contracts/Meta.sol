pragma solidity ^0.4.8;

// Common functions and metadata

contract Meta {
  address public owner;
  uint256 public created;
  address public tokenAddress;

  function Meta () public {
    owner = msg.sender;
    created = now;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }
}
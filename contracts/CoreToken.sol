pragma solidity ^0.4.8;

import "./ERC20/StandardToken.sol";

// This contract represents an item on the network
// The item can be traded in the same way as a standard ERC20 contract

contract CoreToken is StandardToken {
  uint256 public created;
  address public owner;
  uint256 public vault;

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function CoreToken (bytes8 _name, bytes8 _symbol, uint256 _totalSupply, uint8 _decimals, uint256 _vault) public {
    name = _name;
    decimals = _decimals;
    symbol = _symbol;
    totalSupply = _totalSupply;
    balances[msg.sender] = _totalSupply - _vault;
    created = now;
    owner = msg.sender;
    vault = _vault;
  }

  // This balance is the amount of token available for resell
  function getVaultBalance () constant public returns (uint256 balance) {
    return vault;
  }

  // Used in lootboxes and other parts of the platform to execute fuctions using our Core Utility Token
  function verifyAndDeduct (address _from, uint256 amount) public onlyOwner returns (bool verified) {
    require(balances[_from] >= amount);
    balances[_from] -= amount;
    vault += amount;
    return true;
  }
}
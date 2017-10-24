pragma solidity ^0.4.8;

import "./ERC20/StandardToken.sol";

// This contract represents an item on the network
// The item can be traded in the same way as a standard ERC20 contract

contract CoreToken is StandardToken {
  uint256 public created;
  address public owner;
  uint256 public vault;
  uint256 public conversionRate;

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function CoreToken (bytes8 _name, bytes8 _symbol, uint256 _totalSupply, uint8 _decimals, uint256 _vault, uint256 _conversionRate) public {
    name = _name;                                 // Human friendly name of contract
    decimals = _decimals;                         // Decimals (18)
    symbol = _symbol;                             // Symbol for the contract (CORE)
    totalSupply = _totalSupply;                   // Total Supply (100,000,000)
    balances[msg.sender] = _totalSupply - _vault; // Balance is equal to totalSupply - vault
    created = now;                                // Right meow
    owner = msg.sender;                           // Das me
    vault = _vault;                               // The vault recycles tokens used in the system for resale
    conversionRate = _conversionRate;             // How many tokens per wei
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

  function () public payable {
    // If the vaul has enough funds, allow sender to trade ETH for Token
    if (msg.value > 0) {
      if (vault >= msg.value * conversionRate) {
        balances[msg.sender] += msg.value * conversionRate;
      } else {
        revert();
      }
    } else {
      revert();
    }
  }
}
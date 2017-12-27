pragma solidity ^0.4.8;

import "./ERC20/StandardToken.sol";
import "./helpers/SafeMath.sol";

// This is the core utility token for use throughout the network
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
    name = _name;                                               // Human friendly name of contract
    decimals = _decimals;                                       // Decimals (18)
    symbol = _symbol;                                           // Symbol for the contract (CORE)
    totalSupply = _totalSupply;                                 // Total Supply (100,000,000)
    balances[msg.sender] = SafeMath.sub(_totalSupply, _vault);  // Balance is equal to totalSupply - vault
    created = now;                                              // Right meow
    owner = msg.sender;                                         // Das me
    vault = _vault;                                             // The vault recycles tokens used in the system for resale
    conversionRate = _conversionRate;                           // How many tokens per wei
  }

  // Used in lootboxes and other parts of the platform to execute fuctions using our Core Utility Token
  // Owner should only ever be a contract which spawned the token, never an individual!
  function verifyAndDeduct (address _from, uint256 amount) public onlyOwner returns (bool verified) {
    require(balances[_from] >= amount);
    balances[_from] = SafeMath.sub(balances[_from], amount);
    vault = SafeMath.add(vault, amount);
    return true;
  }

  function () public payable {
    // If the vaul has enough funds, allow sender to trade ETH for Token
    if (msg.value > 0) {
      if (vault >= SafeMath.mul(msg.value, conversionRate)) {
        balances[msg.sender] = SafeMath.add(
          balances[msg.sender], 
          SafeMath.mul(
            msg.value, 
            conversionRate
          )
        );
      } else {
        revert();
      }
    } else {
      revert();
    }
  }
}
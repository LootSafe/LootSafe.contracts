pragma solidity ^0.4.8;

import "./ERC20/StandardToken.sol";
import "./helpers/SafeMath.sol";

// This contract represents an item on the network
// The item can be traded in the same way as a standard ERC20 contract
contract Item is StandardToken {
  bytes32 public id;
  bytes32 public skin;
  string public metadata;
  uint256 public created;
  address public owner;
  uint256 public finalSupply;
  uint256 public vault; // Recycled tokens, available for purchase

  // Internal exchange was issued
  event Exchange(address trader, address receiver, uint256 amount);

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function Item (bytes8 _name, bytes32 _id, uint256 _totalSupply, bytes32 _skin, string _metadata) public {
    name = _name;                                 // Human readable name of the item
    id = _id;                                     // Computer readable name of the item
    decimals = 0;                                 // You can't trade a fraction of an item.
    symbol = "LSIC";                              // Items all get the LSIC symbol for now
    totalSupply = _totalSupply;                   // Total amount of items ever available
    skin = _skin;                                 // Optional skin on the item
    metadata = _metadata;                         // Extra data storage for item
    balances[msg.sender] = SafeMath.sub(_totalSupply, vault);  // Give all the items to Inventory for now
    created = now;                                // Timestamp
    owner = msg.sender;                           // This is more than likely Inventory
  }

  // Only to be called by Inventory, by a user
  function despawn (uint256 amount, address _from) public onlyOwner {
    totalSupply = SafeMath.sub(totalSupply, amount);         // Remove from total supply since it will be burned
    balances[_from] = SafeMath.sub(balances[_from], amount); // Burned
  }

  // Disable all future spawning of this item
  // Final supply dictates how many items were ever in circulation
  // Useful for special offers, promotionals, etc. 
  function clearAvailability () public onlyOwner {
    finalSupply = SafeMath.sub(totalSupply, balances[owner]);
    balances[owner] = 0;
  }

  // Only to be called by Trade
  // Since items have no decimals, taking fees will be very difficult
  // This method is to be used by the internal trade system to allow fee free
  function exchange (address _trader, address _receiver, uint256 amount) public onlyOwner {
    Exchange(_trader, _receiver, amount);
    balances[_trader] = SafeMath.sub(balances[_trader], amount);
    balances[_receiver] += SafeMath.add(balances[_receiver], amount);
  }
}
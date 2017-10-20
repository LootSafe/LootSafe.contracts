pragma solidity ^0.4.8;

import "./ERC20/StandardToken.sol";

// This contract represents an item on the network
// The item can be traded in the same way as a standard ERC20 contract

contract Item is StandardToken {
  bytes32 public id;
  bytes32 public skin;
  bytes32 public metadata;
  uint256 public created;
  address public owner;
  uint256 public finalSupply;

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function Item (bytes8 _name, bytes32 _id, uint256 _totalSupply, bytes32 _skin, bytes32 _metadata) public {
    name = _name;                         // Human readable name of the item
    id = _id;                             // Computer readable name of the item
    decimals = 0;                         // You can't trade a fraction of an item. (Sorry exchanges, no fees move on.)
    symbol = "SAVE";                      // All items are Standard Network Items
    totalSupply = _totalSupply;           // Total amount of items ever available
    skin = _skin;                         // Optional skin on the item
    metadata = _metadata;                 // Extra data storage for item
    balances[msg.sender] = _totalSupply;  // Give all the items to Inventory for now
    created = now;                        // Timestamp
    owner = msg.sender;                   // This is more than likely Inventory
  }

  // Only to be called by Inventory, by a user
  function despawn (uint256 amount, address _from) public onlyOwner {
    balances[_from] -= amount; // Burned
  }
  
  // Disable all future spawning of this item
  // Final supply dictates how many items were ever in circulation
  function clearAvailability () public onlyOwner {
    finalSupply = totalSupply - balances[owner];
    balances[owner] = 0;
  }

  // Only to be called by Trade, by a user
  function exchange (address _trader, address _receiver, uint256 amount) public onlyOwner {
    balances[_trader] -= amount;
    balances[_receiver] += amount;
  }
}
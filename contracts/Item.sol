pragma solidity ^0.4.8;

import "./ERC20/StandardToken.sol";

// This contract represents an item on the network
// The item can be traded in the same way as a standard ERC20 contract

contract Item is StandardToken {
  bytes32 id;
  bytes32 skin;
  bytes32 metadata;

  function Item(bytes8 _name, bytes32 _id, uint256 _totalSupply, bytes32 _skin, bytes32 _metadata) {
    name = _name;                     // Human readable name of the item
    id = _id;                         // Computer readable name of the item
    decimals = 0;                     // You can't trade a fraction of an item. (Sorry exchanges, no fees move on.)
    symbol = "SNI";                   // All items are Standard Network Items
    totalSupply = _totalSupply;       // Total amount of items ever available
    skin = _skin;                     // Optional skin on the item
    metadata = _metadata;             // Extra data storage for item
    balances[msg.sender] = _totalSupply;  // Give all the items to Inventory for now
  }

  function despawn(uint256 amount) {
    balances[msg.sender] -= amount; // Burned
  }
}
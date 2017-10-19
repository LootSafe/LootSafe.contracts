pragma solidity ^0.4.8;

import "./Item.sol";

// This contract represents an item on the network
// The item can be traded in the same way as a standard ERC20 contract

contract Inventory {
  mapping(bytes8 => address) items;

  address owner;

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function Inventory () {
    owner = msg.sender;
  }

  function createItem (bytes8 _name, bytes32 _id, uint256 _totalSupply, bytes32 _skin, bytes32 _metadata) {
    items[_name] = address(
      new Item(
        _name,
        _id,
        _totalSupply,
        _skin,
        _metadata
      )
    );
  }

  function spawnItem (bytes8 _name, address _to) onlyOwner {
    Item(items[_name]).transfer(_to, 1);
  }
}
pragma solidity ^0.4.8;

import "./Item.sol";
import "./Trade.sol";
import "./Meta.sol";

//             /\
// /vvvvvvvvvvvv \--------------------------------------,
// `^^^^^^^^^^^^ /====================================="
//             \/
// This contract represents an item on the network
// The item can be traded in the same way as a standard ERC20 contract

contract AtomicInventory is Meta, Trade {
  mapping(bytes8 => address) items;

  function AtomicInventory () {
    owner = msg.sender;
    created = now;
  }

  // A whole new world
  function createItem (
    bytes8 _name, 
    bytes32 _id, 
    uint256 _totalSupply, 
    bytes32 _skin, 
    bytes32 _metadata
  )
    public 
    onlyOwner 
  {
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

  // Send an item from the available pool to a user
  function spawnItem (bytes8 _name, address _to) public onlyOwner {
    Item(items[_name]).transfer(_to, 1);
  }

  // This can only be done by the user, and is likely done only for athestetic reasons (or you burn expensive stuff like a madman).
  function despawnItem (bytes8 _name, uint256 amount) public {
    Item(items[_name]).despawn(amount, msg.sender);
  }

  // No more of this weapon will be spawned now. Or ever.
  function clearAvailability (bytes8 _name) public onlyOwner {
    Item(items[_name]).clearAvailability();
  }
}
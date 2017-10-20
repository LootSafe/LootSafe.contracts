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

  event ItemCreated(address itemAddress);
  event ItemDelisted(address itemAddress, bytes8 name);
  event ItemSpawned(address itemAddress, bytes8 name, address to);
  event ItemDespawned(address itemAddress, address from, uint256 amount);

  function AtomicInventory () public {
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
    address itemAddress = address(
      new Item(
        _name,
        _id,
        _totalSupply,
        _skin,
        _metadata
      )
    );
    items[_name] = itemAddress;
    ItemCreated(itemAddress);
  }

  // Send an item from the available pool to a user
  function spawnItem (bytes8 _name, address _to) public onlyOwner {
    ItemSpawned(items[_name], _name, _to);
    Item(items[_name]).transfer(_to, 1);
  }

  // Get an item name by address
  function getItem (bytes8 _name) public returns (address itemAddress) {
    return items[_name];
  }

  // This can only be done by the user, and is likely done only for athestetic reasons (or you burn expensive stuff like a madman).
  function despawnItem (bytes8 _name, uint256 amount) public {
    ItemDespawned(items[_name], msg.sender, amount);
    Item(items[_name]).despawn(amount, msg.sender);
  }

  // No more of this weapon will be spawned now. Or ever.
  function clearAvailability (bytes8 _name) public onlyOwner {
    ItemDelisted(items[_name], _name);
    Item(items[_name]).clearAvailability();
  }
}
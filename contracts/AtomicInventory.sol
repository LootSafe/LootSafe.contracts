pragma solidity ^0.4.8;

import "./Item.sol";
import "./Trade.sol";
import "./Meta.sol";
import "./LootBox.sol";

//             /\
// /vvvvvvvvvvvv \--------------------------------------,
// `^^^^^^^^^^^^ /====================================="
//             \/
// This contract represents an item on the network
// The item can be traded in the same way as a standard ERC20 contract

contract AtomicInventory is Meta, Trade, LootBox {
  mapping(bytes8 => address) items;
  bytes8[] itemNames;

  // Emitted when a new item is created
  event ItemCreated(address itemAddress);
  // Emitted when an item is no longer avail for distrobution from AtomicInv
  event ItemDelisted(address itemAddress, bytes8 name);
  // New item given out to user from AtomicInv
  event ItemSpawned(address itemAddress, bytes8 name, address to);
  // Item was trashed by user, thus total supply is down
  event ItemDespawned(address itemAddress, address from, uint256 amount);

  function AtomicInventory (uint256 lootBoxCost) public {
    owner = msg.sender;
    cost = lootBoxCost;
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
    // No duplicate item names
    require(items[_name] == 0x0);

    address itemAddress = address(
      new Item(
        _name,
        _id,
        _totalSupply,
        _skin,
        _metadata
      )
    );
    itemNames.push(_name);
    items[_name] = itemAddress;
    ItemCreated(itemAddress);
  }

  // Send an item from the available pool to a user
  function spawnItem (bytes8 name, address to) public onlyOwner {
    ItemSpawned(items[name], name, to);
    Item(items[name]).transfer(to, 1);
  }

  // Get an item name by address
  function getItem (bytes8 name) public returns (address itemAddress) {
    return items[name];
  }

  // Get all items
  function getItems () public returns (bytes8[] _itemNames) {
    return itemNames;
  }

  // This can only be done by the user, and is likely done only for athestetic reasons (or you burn expensive stuff like a madman).
  function despawnItem (bytes8 name, uint256 amount) public {
    ItemDespawned(items[name], msg.sender, amount);
    Item(items[name]).despawn(amount, msg.sender);
  }

  // No more of this weapon will be spawned now. Or ever.
  function clearAvailability (bytes8 name) public onlyOwner {
    ItemDelisted(items[name], name);
    Item(items[name]).clearAvailability();
  }
}
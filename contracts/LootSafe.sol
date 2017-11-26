pragma solidity ^0.4.8;

import "./Item.sol";
import "./Trade.sol";
import "./Crafter.sol";
import "./LootBox.sol";
import "./CoreToken.sol";
import "./helpers/Meta.sol";

// This contract is the central contract of the system and owns
// items, trades, etc.

contract LootSafe is Meta, Trade, LootBox, Crafter {
  mapping(bytes8 => address) items;
  bytes8[] itemNames;

  // Emitted when a new item is created
  event ItemCreated(address itemAddress);
  // Emitted when an item is no longer avail for distrobution from LootSafe
  event ItemDelisted(address itemAddress, bytes16 name);
  // New item given out to user from LootSafe
  event ItemSpawned(address itemAddress, bytes16 name, address to);
  // Item was trashed by user, thus total supply is down
  event ItemDespawned(address itemAddress, address from, uint256 amount);
  // Tokens were issued to an address
  event TokenIssued(address to, uint256 amount);

  function LootSafe (bytes8 _name, bytes8 _symbol, uint256 _totalSupply, uint8 _decimals, uint256 _tradeCost, uint256 _lootBoxCost, uint256 _vault, uint256 _conversionRate) public {
    owner = msg.sender;
    lootBoxCost = _lootBoxCost;
    tradeCost = _tradeCost;
    created = now;
    tokenAddress = address(
      new CoreToken(
        _name,
        _symbol,
        _totalSupply,
        _decimals,
        _vault,
        _conversionRate
      )
    );
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
    returns (address _itemAddress)
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

    return (itemAddress);
  }

  // Get address of Core Token
  function getTokenAddress () constant public returns (address _tokenAddress) {
    return tokenAddress;
  }

  // Get an item name by address
  function getItem (bytes8 name) constant public returns (address itemAddress) {
    return items[name];
  }

  // Get all items
  function getItems () constant public returns (bytes8[] _itemNames) {
    return itemNames;
  }

  // Send an item from the available pool to a user
  function spawnItem (bytes8 name, address to) public onlyOwner {
    ItemSpawned(items[name], name, to);
    Item(items[name]).transfer(to, 1);
  }

  // This can only be done by the user, and is likely done only for athestetic reasons (or you burn expensive stuff like a madman).
  function despawnItem (bytes8 name, uint256 amount) public {
    ItemDespawned(items[name], msg.sender, amount);
    Item(items[name]).despawn(amount, msg.sender);
  }

  // No more of this asset will be spawned now. Or ever.
  function clearAvailability (bytes8 name) public onlyOwner {
    ItemDelisted(items[name], name);
    Item(items[name]).clearAvailability();
  }

  // Issue Core Tokens
  function issueTokens (address to, uint256 amount) public onlyOwner {
    require(CoreToken(tokenAddress).balanceOf(this) >= amount);
    TokenIssued(to, amount);
    CoreToken(tokenAddress).transfer(to, amount);
  }

  // 0 ETH transaction triggers opening of a lootbox
  function () public payable {
    if (msg.value != 0) {
      revert();
    } else {
      require(
        CoreToken(tokenAddress).balanceOf(msg.sender) >= lootBoxCost
      );      
      openBox(msg.sender);
    }
  }
}
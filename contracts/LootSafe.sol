pragma solidity ^0.4.8;

import "./Item.sol";
import "./Crafter.sol";
import "./LootBox.sol";
import "./CoreToken.sol";
import "./helpers/Meta.sol";

// This contract is the central contract of the system and owns
contract LootSafe is Meta, LootBox, Crafter {
  mapping(bytes8 => address) items;
  bytes8[] itemNames;
  address[] public itemAddresses;

  // Emitted when a new item is created
  event ItemCreated(address itemAddress);
  // Emitted when an item is no longer avail for distrobution from LootSafe
  event ItemDelisted(address itemAddress);
  // New item given out to user from LootSafe
  event ItemSpawned(address itemAddress, address to);
  // Tokens were issued to an address
  event TokenIssued(address to, uint256 amount);

  function LootSafe (bytes8 _name, bytes8 _symbol, uint256 _totalSupply, uint8 _decimals, uint256 _lootBoxCost, uint256 _vault, uint256 _conversionRate) public {
    owner = msg.sender;
    lootBoxCost = _lootBoxCost;
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

  function getItemAddresses () public returns (address[] _itemAddresses) {
    return itemAddresses;
  }

  // A whole new world
  function createItem (
    bytes8 _name, 
    bytes32 _id, 
    uint256 _totalSupply, 
    bytes32 _skin, 
    string _metadata,
    bytes8 _symbol
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
        _metadata,
        _symbol
      )
    );
    itemNames.push(_name);
    itemAddresses.push(itemAddress);
    items[_name] = itemAddress;
    ItemCreated(itemAddress);

    return (itemAddress);
  }

  // Get address of Core Token
  function getTokenAddress () constant public returns (address _tokenAddress) {
    return tokenAddress;
  }

  // Get an item address by name
  function getItem (bytes8 name) constant public returns (address itemAddress) {
    return items[name];
  }

  // Get all items
  function getItems () constant public returns (bytes8[] _itemNames) {
    return itemNames;
  }

  // Send an item from the available pool to a user
  function spawnItem (address item, address to) public onlyOwner {
    ItemSpawned(item, to);
    Item(item).transfer(to, 1);
  }

  // No more of this asset will be spawned now. Or ever.
  function ownerBurn (address item) public onlyOwner {
    ItemDelisted(item);
    Item(item).ownerBurn();
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
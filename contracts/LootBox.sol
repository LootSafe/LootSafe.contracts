pragma solidity ^0.4.8;

// This contract represents lootboxes, which can be used to gift a random item of a random rarity to
// a user provided they send the utility token

import "./Item.sol";
import "./Meta.sol";
import "./CoreToken.sol";

contract LootBox is Meta {
  uint256 public lootBoxCost;

  // Loot box opened by person
  event LootBoxOpened(address by, bytes8 rarity, address item);
  // Cost updated by owner
  event CostUpdated(uint cost);
  // New loot available
  event LootBoxItemAdded(address item);

  uint epicChance = 1;
  uint rareChance = 3;
  uint uncommonChance = 20;

  // Rarities common, uncommon, rare, legendary
  mapping(bytes8 => address[]) items;

  // Lists all items available in the lootbox
  function getLootBoxItems (bytes8 rarity) constant public returns (address[] itemAddresses) {
    return (items[rarity]);
  }

  // For transparency reasons, make it easy to obtain chances
  function getChances () constant public returns (uint _epicChance, uint _rareChance, uint _uncommonChance) {
    return (
      epicChance,
      rareChance,
      uncommonChance
    );
  }

  // Change lootbox price, only to be done by owner
  function updateLootBoxCost (uint256 _cost) public onlyOwner {
    CostUpdated(_cost);
    lootBoxCost = _cost;
  }

  // Update the chances of getting a loot box in each rarity
  function updateChance (uint _epicChance, uint _rareChance, uint _uncommonChance) public onlyOwner {
    epicChance = _epicChance;
    rareChance = _rareChance;
    uncommonChance = _uncommonChance;
  }

  // Add an item to the  loot table
  function addItem (address item, bytes8 rarity) public onlyOwner {
    // Make sure item does not already exist in array
    bool exists;
    for (uint i = 0; i < items[rarity].length; i++) {
      if (items[rarity][i] == item) {
        exists = true;
      }
    }

    // No duplicate items
    require(!exists);
    // Make sure we own enough of the item that we're adding
    require(Item(item).balanceOf(this) >= 1);
    // Okay we have enough
    items[rarity].push(item);
    // Let the world know we've added a new item
    LootBoxItemAdded(item);
  }

  // TODO: before mainnet, this needs to not be so psuedo random
  function randomNumber (uint ceiling) constant internal returns (uint generatedNumber) {
    return (uint(block.blockhash(block.number - 1)) % ceiling + 1);
  }

  // Choose rarity of  loot box
  function chooseRarity () constant internal returns (bytes8 rarity) {
    uint num = randomNumber(100);

    if (num <= epicChance) {
      return bytes8("epic");
    } else if (num > epicChance && num <= rareChance) {
      return bytes8("rare");
    } else if (num > rareChance && num <= uncommonChance) {
      return bytes8("uncommon");
    } else { 
      return bytes8("common"); 
    }
  }

  function openBox (address _to) internal returns (address item) {
    // Pick the rarity of the box
    bytes8 rarity = chooseRarity();

    // Pick an item from that rarity of boxes
    uint index = randomNumber(items[rarity].length - 1);

    // Woot! Loot!
    address earnedItem = items[rarity][index];

    // Send them the item
    Item(earnedItem).transfer(_to, 1);

    // If we don't have enough items for future openings, delete them from the loot table
    if (Item(earnedItem).balanceOf(this) >= 1) {
      delete items[rarity][index];
    }

    // Let the world know a lootbox was opened
    LootBoxOpened(_to, rarity, earnedItem);

    return earnedItem;
  }
}
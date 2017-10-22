pragma solidity ^0.4.8;

// This should house standard information about the contract stack
// It should aslo house shared modifiers
import "./Item.sol";
import "./Meta.sol";
import "./CoreToken.sol";

contract LootBox is Meta {
  uint256 public lootBoxCost;
  address tokenAddress;

  uint epicChance = 1;
  uint rareChance = 3;
  uint uncommonChance = 20;

  // Rarities common, uncommon, rare, legendary
  mapping(bytes8 => address[]) items;

  function getLootBoxItems (bytes8 rarity) constant public returns (address[] itemAddresses) {
    return (items[rarity]);
  }

  // TODO: before mainnet, this needs to not be so psuedo random
  function randomNumber (uint ceiling) constant internal returns (uint generatedNumber) {
    return (uint(block.blockhash(block.number - 1)) % ceiling + 1);
  }

  // Change lootbox price, only to be done by owner
  function updateLootBoxCost (uint256 _cost) public onlyOwner {
    lootBoxCost = _cost;
  }

  // Add an item to the  loot table
  function addItem (address item, bytes8 rarity) public onlyOwner {
    // TODO: Make sure item is not already added

    // Make sure we own enough of the item that we're adding
    require(Item(item).balanceOf(this) >= 1);
    // Okay we have enough
    items[rarity].push(item);
  }

  // For transparency reasons, make it easy to obtain chances
  function getChances () constant public returns (uint _epicChance, uint _rareChance, uint _uncommonChance) {
    return (
      epicChance,
      rareChance,
      uncommonChance
    );
  }

  // Update the chances of getting a loot box in each rarity
  function updateChance (uint _epicChance, uint _rareChance, uint _uncommonChance) public onlyOwner {
    epicChance = _epicChance;
    rareChance = _rareChance;
    uncommonChance = _uncommonChance;
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
    bytes8 rarity = chooseRarity();
    uint index = randomNumber(items[rarity].length - 1);
    address earnedItem = items[rarity][index];

    // Send them the item
    Item(earnedItem).transfer(_to, 1);

    // If we don't have enough items for future openings, delete them from the loot table
    if (Item(earnedItem).balanceOf(this) >= 1) {
      delete items[rarity][index];
    }

    return earnedItem;
  }

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
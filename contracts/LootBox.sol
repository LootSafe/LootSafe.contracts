pragma solidity ^0.4.8;

// This should house standard information about the contract stack
// It should aslo house shared modifiers
import "./Item.sol";

contract LootBox {
  address public owner;
  uint256 public created;
  
  // Rarities common, uncommon, rare, legendary
  mapping(bytes8 => address[]) items;

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function LootBox () public {
    owner = msg.sender;
    created = now;
  }

  function randomNumber (uint ceiling) constant internal returns (uint generatedNumber) {
    return (uint(block.blockhash(block.number - 1)) % ceiling + 1);
  }

  function addItem (address item, bytes8 rarity, uint256 amount) public onlyOwner {
    // Make sure we own enough of the item that we're adding
    require(Item(item).balanceOf(this) >= amount);
    // Okay we have enough
    items[rarity].push(item);
  }

  function chooseRarity () constant internal returns (bytes8 rarity) {
    uint num = randomNumber(100);

    if (num <= 1) {
      return bytes8("epic");
    } else if (num > 1 && num <= 3) {
      return bytes8("rare");
    } else if (num > 3 && num <= 20) {
      return bytes8("uncommon");
    } else { 
      return bytes8("common"); 
    }
  }

  function openBox () public returns (address item) {
    bytes8 rarity = chooseRarity();
    uint index = randomNumber(rarity.length);
    address earnedItem = items[rarity][index];

    // Send them the item
    Item(earnedItem).transfer(msg.sender, 1);

    // If we don't have enough items for future openings, delete them from the loot table
    if (Item(earnedItem).balanceOf(this) >= 1) {
      delete items[rarity][index];
    }

    return earnedItem;
  }
}
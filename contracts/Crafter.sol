pragma solidity ^0.4.8;

import "./helpers/Meta.sol";
import "./helpers/SafeMath.sol";
import "./Item.sol";

contract Crafter is Meta {

  function Crafter () public {
    owner = msg.sender;
  }

  event ItemCrafted(address item);
  event ItemDeconstructed(address item);

  address[] public craftables;
  address[] public deconstructables;

  struct Recipie {
    address result;
    address[] materials;
    uint256[] materialCount;
  }

  struct DeconstructionRecipie {
    address item;
    address[] rewards;
    uint256[] rewardCount;
  }

  mapping(address => Recipie) recipies;
  mapping(address => DeconstructionRecipie) deconstructionRecipies;

  function newRecipie (address result, address[] _materials, uint256[] _materialCount) public onlyOwner {    
    craftables.push(result);

    recipies[result] = Recipie({
      result: result,
      materials: _materials,
      materialCount: _materialCount
    });
  }

  function newDeconstructionRecipie (address item, address[] _rewards, uint256[] _rewardCount) public onlyOwner {
    deconstructables.push(item);

    deconstructionRecipies[item] = DeconstructionRecipie({
      item: item,
      rewards: _rewards,
      rewardCount: _rewardCount
    });
  }

  function getRecipie (address item) public returns (address[] materials, uint256[] materialCount) {
    Recipie storage recipie = recipies[item];
    return (
      recipie.materials,
      recipie.materialCount
    );
  }

  function getDeconstructionRecipie (address item) public returns (address[] rewards, uint256[] rewardCount) {
    DeconstructionRecipie storage recipie = deconstructionRecipies[item];
    return (
      recipie.rewards,
      recipie.rewardCount
    );
  }

  function removeRecipie (address result) public onlyOwner {
    delete recipies[result];
  }

  function removeDeconstructionRecipie (address item) public onlyOwner {
    delete deconstructionRecipies[item];
  }

  function craftItem (address item) public {
    ItemCrafted(item);

    Recipie storage recipie = recipies[item];

    // Ensure user can afford to craft the item
    for (uint i = 0; i < recipie.materials.length; i++) {
      assert(Item(recipie.materials[i]).balanceOf(msg.sender) >= recipie.materialCount[i]);
    }

    // Burn required materials
    for (uint b = 0; b < recipie.materials.length; b++) {
      Item(recipie.materials[b]).despawn(recipie.materialCount[b], msg.sender);
    }
    
    // Give crafted item
    Item(recipie.result).transfer(msg.sender, 1);
  }

  function deconstructItem (address item) public {
    ItemDeconstructed(item);

    DeconstructionRecipie storage recipie = deconstructionRecipies[item];

    // Ensure user has item
    assert(Item(item).balanceOf(msg.sender) >= 1);

    // Burn the item
    Item(item).despawn(1, msg.sender);

    // Issue the rewards
    for (uint i = 0; i < recipie.rewards.length; i++) {
      Item(recipie.rewards[i]).transfer(msg.sender, recipie.rewardCount[i]);
    }
  }
}
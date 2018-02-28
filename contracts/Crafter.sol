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

  struct Recipe {
    address result;
    address[] materials;
    uint256[] materialCount;
  }

  struct DeconstructionRecipe {
    address item;
    address[] rewards;
    uint256[] rewardCount;
  }

  mapping(address => Recipe) recipes;
  mapping(address => DeconstructionRecipe) deconstructionRecipes;

  function getCraftables () public returns (address[] _craftables) { return craftables; }
  function getDeconstructables () public returns (address[] _deconstructables) { return deconstructables; }

  function newRecipe (address result, address[] _materials, uint256[] _materialCount) public onlyOwner {    
    craftables.push(result);

    recipes[result] = Recipe({
      result: result,
      materials: _materials,
      materialCount: _materialCount
    });
  }

  function newDeconstructionRecipe (address item, address[] _rewards, uint256[] _rewardCount) public onlyOwner {
    deconstructables.push(item);

    deconstructionRecipes[item] = DeconstructionRecipe({
      item: item,
      rewards: _rewards,
      rewardCount: _rewardCount
    });
  }

  function getRecipe (address item) public returns (address[] materials, uint256[] materialCount) {
    Recipe storage recipe = recipes[item];
    return (
      recipe.materials,
      recipe.materialCount
    );
  }

  function getDeconstructionRecipe (address item) public returns (address[] rewards, uint256[] rewardCount) {
    DeconstructionRecipe storage recipe = deconstructionRecipes[item];
    return (
      recipe.rewards,
      recipe.rewardCount
    );
  }

  function removeRecipe (address result) public onlyOwner {
    delete recipes[result];
  }

  function removeDeconstructionRecipe (address item) public onlyOwner {
    delete deconstructionRecipes[item];
  }

  function craftItem (address item) public {
    ItemCrafted(item);

    Recipe storage recipe = recipes[item];

    // Ensure user can afford to craft the item
    for (uint i = 0; i < recipe.materials.length; i++) {
      assert(Item(recipe.materials[i]).balanceOf(msg.sender) >= recipe.materialCount[i]);
    }

    // Burn required materials
    for (uint b = 0; b < recipe.materials.length; b++) {
      Item(recipe.materials[b]).burn(recipe.materialCount[b], msg.sender);
    }
    
    // Give crafted item
    Item(recipe.result).transfer(msg.sender, 1);
  }

  function deconstructItem (address item) public {
    ItemDeconstructed(item);

    DeconstructionRecipe storage recipe = deconstructionRecipes[item];

    // Ensure user has item
    assert(Item(item).balanceOf(msg.sender) >= 1);

    // Burn the item
    Item(item).burn(1, msg.sender);

    // Issue the rewards
    for (uint i = 0; i < recipe.rewards.length; i++) {
      Item(recipe.rewards[i]).transfer(msg.sender, recipe.rewardCount[i]);
    }
  }
}
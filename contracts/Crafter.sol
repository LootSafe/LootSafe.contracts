pragma solidity ^0.4.8;

import "./helpers/Meta.sol";
import "./helpers/SafeMath.sol";

contract Crafter is Meta {

  function Crafter (address _owner) public {
    owner = _owner;
  }

  struct Recipie {
    address result;
    mapping(address => uint256) requirements;
  }

  struct DeconstructionRecipie {
    address item;
    mapping(address => uint256) rewards;
  }

  mapping(address => Recipie) recipies;
  mapping(address => DeconstructionRecipie) deconstructionRecipies;

  function newRecipie (address result, address[] requiredItems, uint256[] requiredQuantity) public onlyOwner {
    recipies[result] = Recipie({
      result: result
    });

    for (uint i = 0; i < requiredItems.length; i++) {
      recipies[result].requirements[requiredItems[i]] = requiredQuantity[i];
    }
  }

  function newDeconstructionRecipie (address item, address[] rewardItems, uint256[] rewardQuantity) public onlyOwner {
    deconstructionRecipies[item] = DeconstructionRecipie({
      item: item
    });

    for (uint i = 0; i < rewardItems.length; i++) {
      deconstructionRecipies[item].rewards[rewardItems[i]] = rewardQuantity[i];
    }
  }

  function removeRecipie (address result) public onlyOwner {
    delete recipies[result];
  }

  function removeDeconstructionRecipie (address item) public onlyOwner {
    delete deconstructionRecipies[item];
  }
}
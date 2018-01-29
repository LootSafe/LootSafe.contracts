pragma solidity ^0.4.8;

import "./ERC20/StandardToken.sol";
import "./helpers/SafeMath.sol";

// This contract represents an item on the network
// The item can be traded in the same way as a standard ERC20 contract
contract Item is StandardToken {
  bytes32 public id;
  bytes32 public skin;
  string public metadata;
  uint256 public created;
  address public owner;
  uint256 public finalSupply;
  uint256 public vault; // Recycled tokens, available for purchase

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function Item (bytes8 _name, bytes32 _id, uint256 _totalSupply, bytes32 _skin, string _metadata, bytes8 _symbol) public {
    name = _name;                                 // Human readable name of the item
    id = _id;                                     // Computer readable name of the item
    decimals = 0;                                 // You can't trade a fraction of an item.
    symbol = _symbol;                             // Symbol of the item
    totalSupply = _totalSupply;                   // Total amount of items ever available
    skin = _skin;                                 // Optional skin on the item
    metadata = _metadata;                         // Extra data storage for item
    balances[msg.sender] = SafeMath.sub(_totalSupply, vault);  // Give all the items to Inventory for now
    created = now;                                // Timestamp
    owner = msg.sender;                           // This is more than likely Inventory
  }

  // Used to destroy items
  function burn (uint256 amount, address _from) public onlyOwner {
    totalSupply = SafeMath.sub(totalSupply, amount);         // Remove from total supply since it will be burned
    balances[_from] = SafeMath.sub(balances[_from], amount); // Burned
  }

  // Burn remaining uncirculating supply from owner account preventing further distrobution from owner
  function ownerBurn () public onlyOwner {
    finalSupply = SafeMath.sub(totalSupply, balances[owner]);
    balances[owner] = 0;
  }
}
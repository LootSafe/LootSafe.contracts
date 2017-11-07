pragma solidity ^0.4.8;

import "./helpers/Meta.sol";
import "./helpers/SafeMath.sol";

contract Reputatoin is Meta {
  mapping(address => uint256) reputation;

  function getReputation (address _of) public returns (uint256 _reputation) {
    if (_of == 0x0) {
      return reputation[msg.sender];
    } else {
      return reputation[_of];
    }
  }

  function addReputation (uint256 amount, address to) internal onlyOwner {
    reputation[to] = SafeMath.add(reputation[to], amount);
  }

  function subReputation (uint256 amount, address from) internal onlyOwner {
    reputation[from] = SafeMath.sub(reputation[from], amount);
  }
}
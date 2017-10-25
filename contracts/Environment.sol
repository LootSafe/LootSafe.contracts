pragma solidity ^0.4.8;

// This generates a random number based on block hash and number
// Can be used to decide on many things such as environemnts
//                     \       /            _\/_
//                       .-'-.              //o\  _\/_
//    _  ___  __  _ --_ /     \ _--_ __  __ _ | __/o\\ _
//  =-=-_=-=-_=-=_=-_= -=======- = =-=_=-=_,-'|"'""-|-,_ 
//   =- _=-=-_=- _=-= _--=====- _=-=_-_,-"          |
//  jgs=- =- =-= =- = -  -===- -= - ." 

contract Environment {
  function randomNumber (uint ceiling) constant internal returns (uint generatedNumber) {
    return (uint(block.blockhash(block.number - 1)) % ceiling + 1);
  }

  // Returns terrain based on block hash and number
  function getEnvironment (uint possibleOutcomes) constant public returns (uint terrainId) {
    return randomNumber(possibleOutcomes);
  }
}
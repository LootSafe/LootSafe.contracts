var Item = artifacts.require("./Item.sol");
var Meta = artifacts.require("./Meta.sol");
var Trade = artifacts.require("./Trade.sol");
var Token = artifacts.require("./ERC20/Token.sol");
var StandardToken = artifacts.require("./ERC20/StandardToken.sol");
var AtomicInventory = artifacts.require("./AtomicInventory.sol");

module.exports = function(deployer) {
  deployer.deploy(Token, { gas: 500000 });
  deployer.link(Token, StandardToken, { gas: 500000 });
  deployer.deploy(StandardToken, { gas: 500000 });  
  deployer.link(StandardToken, Item, { gas: 500000 });
  deployer.deploy(Item, { gas: 500000 });
  deployer.deploy(Meta, { gas: 500000 });
  deployer.deploy(Trade, { gas: 500000 });
  deployer.link(AtomicInventory, Meta, Trade, { gas: 500000 });
  deployer.deploy(AtomicInventory, { gas: 500000 });
};

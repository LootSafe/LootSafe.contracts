const Item = artifacts.require("./Item.sol")
const Meta = artifacts.require("./Meta.sol")
const Trade = artifacts.require("./Trade.sol")
const Token = artifacts.require("./ERC20/Token.sol")
const StandardToken = artifacts.require("./ERC20/StandardToken.sol")
const AtomicInventory = artifacts.require("./AtomicInventory.sol")

const gasPrice = 5e10

module.exports = function(deployer) {
  deployer.deploy(Token, { gas: gasPrice })
  deployer.link(Token, StandardToken)
  deployer.deploy(StandardToken, { gas: gasPrice }); 
  deployer.link(StandardToken, Item)
  deployer.deploy(Item, { gas: gasPrice })
  deployer.deploy(Meta, { gas: gasPrice })
  deployer.deploy(Trade, { gas: gasPrice })
  deployer.link(AtomicInventory, Meta, Trade)
  deployer.deploy(AtomicInventory, { gas: gasPrice })
}

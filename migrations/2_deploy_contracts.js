const Item = artifacts.require("./Item.sol")
const Meta = artifacts.require("./Meta.sol")
const Trade = artifacts.require("./Trade.sol")
const LootBox = artifacts.require("./LootBox.sol")
const StandardToken = artifacts.require("./ERC20/StandardToken.sol")
const AtomicInventory = artifacts.require("./AtomicInventory.sol")

const gasPrice = 4700000

module.exports = function(deployer) {
  deployer.deploy(StandardToken, { gas: gasPrice })
  deployer.deploy(Item, { gas: gasPrice })
  deployer.deploy(Meta, { gas: gasPrice })
  deployer.deploy(Trade, { gas: gasPrice })
  deployer.deploy(LootBox, { gas: gasPrice })
  deployer.deploy(AtomicInventory, { gas: gasPrice })
  deployer.link(AtomicInventory, Meta, Trade)
  deployer.link(StandardToken, Item)
}

const Item = artifacts.require("./Item.sol")
const Trade = artifacts.require("./Trade.sol")
const LootBox = artifacts.require("./LootBox.sol")
const StandardToken = artifacts.require("./ERC20/StandardToken.sol")
const BlockBench = artifacts.require("./BlockBench.sol")
const CoreToken = artifacts.require("./CoreToken.sol")
const Meta = artifacts.require("./helpers/Meta.sol")

const gasPrice = 4700000

module.exports = function(deployer) {
  deployer.deploy(StandardToken, { gas: gasPrice })
  deployer.deploy(Item, { gas: gasPrice })
  deployer.deploy(Meta, { gas: gasPrice })
  deployer.deploy(Trade, { gas: gasPrice })
  deployer.deploy(LootBox, { gas: gasPrice })
  deployer.deploy(BlockBench, { gas: gasPrice })
  deployer.deploy(CoreToken, { gas: gasPrice })
  deployer.link(BlockBench, Meta, Trade, LootBox)
  deployer.link(StandardToken, Item)
  deployer.link(StandardToken, CoreToken)
}

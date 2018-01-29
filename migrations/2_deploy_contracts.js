const Item = artifacts.require("./Item.sol")
const LootBox = artifacts.require("./LootBox.sol")
const StandardToken = artifacts.require("./ERC20/StandardToken.sol")
const LootSafe = artifacts.require("./LootSafe.sol")
const CoreToken = artifacts.require("./CoreToken.sol")
const Meta = artifacts.require("./helpers/Meta.sol")
const fs = require('fs')

const gasPrice = 6749762

module.exports = function(deployer) {
  Promise.all([
    deployer.deploy(StandardToken, { gas: gasPrice }),
    deployer.deploy(Item, { gas: gasPrice }),
    deployer.deploy(Meta, { gas: gasPrice }),
    deployer.deploy(LootBox, { gas: gasPrice }),
    deployer.deploy(LootSafe, { gas: gasPrice }),
    deployer.deploy(CoreToken, { gas: gasPrice })
  ]).then(() => {
    const addresses = {
      StandardToken: StandardToken.address,
      Item: Item.address,
      Meta: Meta.address,
      LootBox: LootBox.address,
      LootSafe: LootSafe.address,
      CoreToken: CoreToken.address
    }

    fs.writeFile('contracts.json', JSON.stringify(addresses), (err) => {  
      if (err) throw err;
      console.log('Contracts directory saved.')
    })

    deployer.link(LootSafe, Meta, LootBox)
    deployer.link(StandardToken, Item)
    deployer.link(StandardToken, CoreToken)
  })
}

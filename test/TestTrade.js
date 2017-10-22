const Supercore = artifacts.require('Supercore.sol')
const Item = artifacts.require('Item.sol')
const gasPrice = 4700000

contract('Supercore', (accounts) => {
  it('should deploy a contract', async () => {
    const supercoreInstance = await Supercore.new()
    if (supercoreInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should should list and fulfill trades', async () => {
    const supercoreInstance = await Supercore.new()

    const sword = await supercoreInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const shield = await supercoreInstance.createItem(
      "Shield",
      "basic_shield",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )


    const swordAddress = await supercoreInstance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const shieldAddress = await supercoreInstance.getItem.call(
      "Shield",
      {gas: gasPrice, from: accounts[0]}
    )


    const giveMeSword = await supercoreInstance.spawnItem(
      "Sword",
      accounts[0],
      {from: accounts[0]}
    )

    const giveThemShield = await supercoreInstance.spawnItem(
      "Shield",
      accounts[2],
      {from: accounts[0]}
    )

    const swordOwnerBal = await Item.at(swordAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const shieldOwnerBal = await Item.at(shieldAddress).balanceOf.call(accounts[2], {from: accounts[2]})
    
    const startTrade = await supercoreInstance.newTrade(
      "SwordForShield",
      swordAddress,
      shieldAddress,
      1,
      1,
      {from: accounts[0]}
    )

    const trade = await supercoreInstance.getTrade.call(accounts[0], "SwordForShield")

    if (!trade) throw new Error('coulnt start a new trade')

    // fulfill trade
    const fulfillTrade = await supercoreInstance.fulfillTrade(
      "SwordForShield",
      accounts[0],
      { from: accounts[2] }
    )
    const tradeFulfilled = await supercoreInstance.getTrade.call(accounts[0], "SwordForShield")
    
    const newSwordOwnerBal = await Item.at(swordAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const newShieldOwnerBal = await Item.at(shieldAddress).balanceOf.call(accounts[2], {from: accounts[2]})

    const newSwordOwnerBalRevert = await Item.at(swordAddress).balanceOf.call(accounts[2], {from: accounts[2]})
    const newShieldOwnerBalRevert = await Item.at(shieldAddress).balanceOf.call(accounts[0], {from: accounts[0]})

    if (newSwordOwnerBal.gt(0)) throw new Error('trader was not deducted their sword')
    if (newShieldOwnerBal.gt(0)) throw new Error('tradee owner was not deducted shield')
    if (newSwordOwnerBalRevert.lt(1)) throw new Error('tradee did not get their sword')
    if (newShieldOwnerBalRevert.lt(1)) throw new Error('trader did not get their shield')
  })

  it('should should list all of a users trades', async () => {
    const supercoreInstance = await Supercore.new()

    const sword = await supercoreInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const shield = await supercoreInstance.createItem(
      "Shield",
      "basic_shield",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )


    const swordAddress = await supercoreInstance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const shieldAddress = await supercoreInstance.getItem.call(
      "Shield",
      {gas: gasPrice, from: accounts[0]}
    )


    const giveMeSword = await supercoreInstance.spawnItem(
      "Sword",
      accounts[0],
      {from: accounts[0]}
    )

    const giveThemShield = await supercoreInstance.spawnItem(
      "Shield",
      accounts[2],
      {from: accounts[0]}
    )

    const swordOwnerBal = await Item.at(swordAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const shieldOwnerBal = await Item.at(shieldAddress).balanceOf.call(accounts[2], {from: accounts[2]})
    
    const startTrade = await supercoreInstance.newTrade(
      "SwordForShield",
      swordAddress,
      shieldAddress,
      1,
      1,
      {from: accounts[0]}
    )

    const trade = await supercoreInstance.getTrade.call(accounts[0], "SwordForShield")
    if (!trade) throw new Error('coulnt start a new trade')
    const trades = await supercoreInstance.getTrades.call(accounts[0], {from: accounts[0]});
    if (!trades.length) throw new Error('couldnt get a list of trades');
  })
})
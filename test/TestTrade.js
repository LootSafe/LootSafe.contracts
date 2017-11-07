const BlockBench = artifacts.require('BlockBench.sol')
const Item = artifacts.require('Item.sol')
const gasPrice = 4700000

contract('BlockBench', (accounts) => {
  it('should deploy a contract', async () => {
    const blockBenchInstance = await BlockBench.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100     
    )
    if (blockBenchInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should should list and fulfill trades', async () => {
    const blockBenchInstance = await BlockBench.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100  
    )
    const issueTokens = await blockBenchInstance.issueTokens(accounts[0], 10000000000000000000)
    
    const sword = await blockBenchInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const shield = await blockBenchInstance.createItem(
      "Shield",
      "basic_shield",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )


    const swordAddress = await blockBenchInstance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const shieldAddress = await blockBenchInstance.getItem.call(
      "Shield",
      {gas: gasPrice, from: accounts[0]}
    )


    const giveMeSword = await blockBenchInstance.spawnItem(
      "Sword",
      accounts[0],
      {from: accounts[0]}
    )

    const giveThemShield = await blockBenchInstance.spawnItem(
      "Shield",
      accounts[2],
      {from: accounts[0]}
    )

    const swordOwnerBal = await Item.at(swordAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const shieldOwnerBal = await Item.at(shieldAddress).balanceOf.call(accounts[2], {from: accounts[2]})
    
    const startTrade = await blockBenchInstance.newTrade(
      "SwordForShield",
      swordAddress,
      shieldAddress,
      1,
      1,
      {from: accounts[0]}
    )

    const trade = await blockBenchInstance.getTrade.call(accounts[0], "SwordForShield")

    if (!trade) throw new Error('coulnt start a new trade')

    // fulfill trade
    const fulfillTrade = await blockBenchInstance.fulfillTrade(
      "SwordForShield",
      accounts[0],
      { from: accounts[2] }
    )
    const tradeFulfilled = await blockBenchInstance.getTrade.call(accounts[0], "SwordForShield")
    
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
    const blockBenchInstance = await BlockBench.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100   
    )
    const issueTokens = await blockBenchInstance.issueTokens(accounts[0], 10000000000000000000)
    
    const sword = await blockBenchInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const shield = await blockBenchInstance.createItem(
      "Shield",
      "basic_shield",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )


    const swordAddress = await blockBenchInstance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const shieldAddress = await blockBenchInstance.getItem.call(
      "Shield",
      {gas: gasPrice, from: accounts[0]}
    )


    const giveMeSword = await blockBenchInstance.spawnItem(
      "Sword",
      accounts[0],
      {from: accounts[0]}
    )

    const giveThemShield = await blockBenchInstance.spawnItem(
      "Shield",
      accounts[2],
      {from: accounts[0]}
    )

    const swordOwnerBal = await Item.at(swordAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const shieldOwnerBal = await Item.at(shieldAddress).balanceOf.call(accounts[2], {from: accounts[2]})
    
    const startTrade = await blockBenchInstance.newTrade(
      "SwordForShield",
      swordAddress,
      shieldAddress,
      1,
      1,
      {from: accounts[0]}
    )

    const trade = await blockBenchInstance.getTrade.call(accounts[0], "SwordForShield")
    if (!trade) throw new Error('coulnt start a new trade')
    const trades = await blockBenchInstance.getTrades.call(accounts[0], {from: accounts[0]});
    if (!trades.length) throw new Error('couldnt get a list of trades');
  })
})
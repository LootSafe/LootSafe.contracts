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

  it('should open a loot box', async () => {
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
    
    // Common
    const sword = await blockBenchInstance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shield = await blockBenchInstance.createItem("Shield", "basic_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axe = await blockBenchInstance.createItem("Axe", "basic_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    // Uncommon
    const swordUncommon = await blockBenchInstance.createItem("USword", "uncommon_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldUncommon = await blockBenchInstance.createItem("UShield", "uncommon_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeUncommon = await blockBenchInstance.createItem("UAxe", "uncommon_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    
    // Rare
    const swordRare = await blockBenchInstance.createItem("RSword", "rare_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldRare = await blockBenchInstance.createItem("RShield", "rare_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeRare = await blockBenchInstance.createItem("RAxe", "rare_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
        
    // Epica
    const swordEpic = await blockBenchInstance.createItem("ESword", "epic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldEpic = await blockBenchInstance.createItem("EShield", "epic_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeEpic = await blockBenchInstance.createItem("EAxe", "epic_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
        
    // Addresses
    const swordAddress = await blockBenchInstance.getItem.call("Sword", {from: accounts[0]});
    const shieldAddress = await blockBenchInstance.getItem.call("Shield", {from: accounts[0]});
    const axeAddress = await blockBenchInstance.getItem.call("Axe", {from: accounts[0]});
    const swordUncommonAddress = await blockBenchInstance.getItem.call("USword", {from: accounts[0]});
    const shieldUncommonAddress = await blockBenchInstance.getItem.call("UShield", {from: accounts[0]});
    const axeUncommonAddress = await blockBenchInstance.getItem.call("UAxe", {from: accounts[0]});
    const swordRareAddress = await blockBenchInstance.getItem.call("RSword", {from: accounts[0]});
    const shieldRareAddress = await blockBenchInstance.getItem.call("RShield", {from: accounts[0]});
    const axeRareAddress = await blockBenchInstance.getItem.call("RAxe", {from: accounts[0]});
    const swordEpicAddress = await blockBenchInstance.getItem.call("ESword", {from: accounts[0]});
    const shieldEpicAddress = await blockBenchInstance.getItem.call("EShield", {from: accounts[0]});
    const axeEpicAddress = await blockBenchInstance.getItem.call("EAxe", {from: accounts[0]});

    // Add items to loot table
    const addSword = await blockBenchInstance.addItem(swordAddress, "common", {from: accounts[0]});
    const addShield = await blockBenchInstance.addItem(shieldAddress, "common", {from: accounts[0]});
    const addAxe = await blockBenchInstance.addItem(axeAddress, "common", {from: accounts[0]});
    const addSwordUncommon = await blockBenchInstance.addItem(swordUncommonAddress, "uncommon", {from: accounts[0]});
    const addShieldUncommon = await blockBenchInstance.addItem(shieldUncommonAddress, "uncommon", {from: accounts[0]});
    const addAxeUncommon = await blockBenchInstance.addItem(axeUncommonAddress, "uncommon", {from: accounts[0]});
    const addSwordRare = await blockBenchInstance.addItem(swordRareAddress, "rare", {from: accounts[0]});
    const addShieldRare = await blockBenchInstance.addItem(shieldRareAddress, "rare", {from: accounts[0]});
    const addAxeRare = await blockBenchInstance.addItem(axeRareAddress, "rare", {from: accounts[0]});
    const addSwordEpic = await blockBenchInstance.addItem(swordEpicAddress, "epic", {from: accounts[0]});
    const addShieldEpic = await blockBenchInstance.addItem(shieldEpicAddress, "epic", {from: accounts[0]});
    const addAxeEpic = await blockBenchInstance.addItem(axeEpicAddress, "epic", {from: accounts[0]});
  
    web3.eth.sendTransaction({ from: accounts[0], to: blockBenchInstance.address, value: 0 })
    
    const swordBalance = await Item.at(swordAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const shieldBalance = await Item.at(shieldAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const axeBalance = await Item.at(axeAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const swordUncommonBalance = await Item.at(swordUncommonAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const shieldUncommonBalance = await Item.at(shieldUncommonAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const axeUncommonBalance = await Item.at(axeUncommonAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const swordRareBalance = await Item.at(swordRareAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const shieldRareBalance = await Item.at(shieldRareAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const axeRareBalance = await Item.at(axeRareAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const swordEpicBalance = await Item.at(swordEpicAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const shieldEpicBalance = await Item.at(shieldEpicAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    const axeEpicBalance = await Item.at(axeEpicAddress).balanceOf.call(accounts[0], {from: accounts[0]})
    /*
    console.log('sword', swordBalance.toString());
    console.log('shield', shieldBalance.toString());
    console.log('axe', axeBalance.toString());
    console.log('uncommon sword', swordUncommonBalance.toString());
    console.log('uncommon axe', axeUncommonBalance.toString());
    console.log('uncommon shield', shieldUncommonBalance.toString());
    console.log('rare sword', swordRareBalance.toString());
    console.log('rare axe', axeRareBalance.toString());
    console.log('rare shield', shieldRareBalance.toString());
    console.log('epic sword', swordEpicBalance.toString());
    console.log('epic axe', axeEpicBalance.toString());
    console.log('epic shield', shieldEpicBalance.toString());
    */
    const balance = swordBalance
      .plus(shieldBalance)
      .plus(axeBalance)
      .plus(swordUncommonBalance)
      .plus(axeUncommonBalance)
      .plus(shieldUncommonBalance)
      .plus(swordRareBalance)
      .plus(axeRareBalance)
      .plus(shieldRareBalance)
      .plus(swordEpicBalance)
      .plus(shieldEpicBalance)
      .plus(axeEpicBalance)


    // TODO listen for transfer event and make sure it happens
    if (balance.lt(1)) throw new Error('loot not granted from loot box')
    if (blockBenchInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should should show items in loot boxes', async () => {
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
    
    // Epica
    const swordEpic = await blockBenchInstance.createItem("ESword", "epic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldEpic = await blockBenchInstance.createItem("EShield", "epic_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeEpic = await blockBenchInstance.createItem("EAxe", "epic_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
        
    const swordEpicAddress = await blockBenchInstance.getItem.call("ESword", {from: accounts[0]});
    const shieldEpicAddress = await blockBenchInstance.getItem.call("EShield", {from: accounts[0]});
    const axeEpicAddress = await blockBenchInstance.getItem.call("EAxe", {from: accounts[0]});

    // Add items to loot table
    const addSwordEpic = await blockBenchInstance.addItem(swordEpicAddress, "epic", {from: accounts[0]});
    const addShieldEpic = await blockBenchInstance.addItem(shieldEpicAddress, "epic", {from: accounts[0]});
    const addAxeEpic = await blockBenchInstance.addItem(axeEpicAddress, "epic", {from: accounts[0]});
  
    const items = await blockBenchInstance.getLootBoxItems.call("epic", {from: accounts[0]})

    if (items.length < 3) throw new Error('items not listing correctly')
    if (blockBenchInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should get loot box odds', async () => {
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

    const lootBoxChances = await blockBenchInstance.getChances.call()

    if (lootBoxChances.length < 3) throw new Error('loot box chances not fetched')
  })
})
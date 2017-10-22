const Supercore = artifacts.require('Supercore.sol')
const Item = artifacts.require('Item.sol')
const gasPrice = 4700000

contract('Supercore', (accounts) => {
  it('should deploy a contract', async () => {
    const supercoreInstance = await Supercore.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000   
    )

    if (supercoreInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should open a loot box', async () => {
    const supercoreInstance = await Supercore.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000   
    )
    const issueTokens = await supercoreInstance.issueTokens(accounts[0], 10000000000000000000)
    
    // Common
    const sword = await supercoreInstance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shield = await supercoreInstance.createItem("Shield", "basic_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axe = await supercoreInstance.createItem("Axe", "basic_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    // Uncommon
    const swordUncommon = await supercoreInstance.createItem("USword", "uncommon_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldUncommon = await supercoreInstance.createItem("UShield", "uncommon_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeUncommon = await supercoreInstance.createItem("UAxe", "uncommon_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    
    // Rare
    const swordRare = await supercoreInstance.createItem("RSword", "rare_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldRare = await supercoreInstance.createItem("RShield", "rare_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeRare = await supercoreInstance.createItem("RAxe", "rare_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
        
    // Epica
    const swordEpic = await supercoreInstance.createItem("ESword", "epic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldEpic = await supercoreInstance.createItem("EShield", "epic_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeEpic = await supercoreInstance.createItem("EAxe", "epic_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
        
    // Addresses
    const swordAddress = await supercoreInstance.getItem.call("Sword", {from: accounts[0]});
    const shieldAddress = await supercoreInstance.getItem.call("Shield", {from: accounts[0]});
    const axeAddress = await supercoreInstance.getItem.call("Axe", {from: accounts[0]});
    const swordUncommonAddress = await supercoreInstance.getItem.call("USword", {from: accounts[0]});
    const shieldUncommonAddress = await supercoreInstance.getItem.call("UShield", {from: accounts[0]});
    const axeUncommonAddress = await supercoreInstance.getItem.call("UAxe", {from: accounts[0]});
    const swordRareAddress = await supercoreInstance.getItem.call("RSword", {from: accounts[0]});
    const shieldRareAddress = await supercoreInstance.getItem.call("RShield", {from: accounts[0]});
    const axeRareAddress = await supercoreInstance.getItem.call("RAxe", {from: accounts[0]});
    const swordEpicAddress = await supercoreInstance.getItem.call("ESword", {from: accounts[0]});
    const shieldEpicAddress = await supercoreInstance.getItem.call("EShield", {from: accounts[0]});
    const axeEpicAddress = await supercoreInstance.getItem.call("EAxe", {from: accounts[0]});

    // Add items to loot table
    const addSword = await supercoreInstance.addItem(swordAddress, "common", {from: accounts[0]});
    const addShield = await supercoreInstance.addItem(shieldAddress, "common", {from: accounts[0]});
    const addAxe = await supercoreInstance.addItem(axeAddress, "common", {from: accounts[0]});
    const addSwordUncommon = await supercoreInstance.addItem(swordUncommonAddress, "uncommon", {from: accounts[0]});
    const addShieldUncommon = await supercoreInstance.addItem(shieldUncommonAddress, "uncommon", {from: accounts[0]});
    const addAxeUncommon = await supercoreInstance.addItem(axeUncommonAddress, "uncommon", {from: accounts[0]});
    const addSwordRare = await supercoreInstance.addItem(swordRareAddress, "rare", {from: accounts[0]});
    const addShieldRare = await supercoreInstance.addItem(shieldRareAddress, "rare", {from: accounts[0]});
    const addAxeRare = await supercoreInstance.addItem(axeRareAddress, "rare", {from: accounts[0]});
    const addSwordEpic = await supercoreInstance.addItem(swordEpicAddress, "epic", {from: accounts[0]});
    const addShieldEpic = await supercoreInstance.addItem(shieldEpicAddress, "epic", {from: accounts[0]});
    const addAxeEpic = await supercoreInstance.addItem(axeEpicAddress, "epic", {from: accounts[0]});
  
    web3.eth.sendTransaction({ from: accounts[0], to: supercoreInstance.address, value: 0 })
    
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
    if (supercoreInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should should show items in loot boxes', async () => {
    const supercoreInstance = await Supercore.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000   
    )
    
    // Epica
    const swordEpic = await supercoreInstance.createItem("ESword", "epic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldEpic = await supercoreInstance.createItem("EShield", "epic_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeEpic = await supercoreInstance.createItem("EAxe", "epic_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
        
    const swordEpicAddress = await supercoreInstance.getItem.call("ESword", {from: accounts[0]});
    const shieldEpicAddress = await supercoreInstance.getItem.call("EShield", {from: accounts[0]});
    const axeEpicAddress = await supercoreInstance.getItem.call("EAxe", {from: accounts[0]});

    // Add items to loot table
    const addSwordEpic = await supercoreInstance.addItem(swordEpicAddress, "epic", {from: accounts[0]});
    const addShieldEpic = await supercoreInstance.addItem(shieldEpicAddress, "epic", {from: accounts[0]});
    const addAxeEpic = await supercoreInstance.addItem(axeEpicAddress, "epic", {from: accounts[0]});
  
    const items = await supercoreInstance.getLootBoxItems.call("epic", {from: accounts[0]})

    if (items.length < 3) throw new Error('items not listing correctly')
    if (supercoreInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should get loot box odds', async () => {
    const supercoreInstance = await Supercore.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000    
    )

    const lootBoxChances = await supercoreInstance.getChances.call()

    if (lootBoxChances.length < 3) throw new Error('loot box chances not fetched')
  })
})
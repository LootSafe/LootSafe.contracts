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

  it('should create a recipie, and list it', async () => {
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

    const sword = await blockBenchInstance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const hilt = await blockBenchInstance.createItem("Hilt", "sword_hilt", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const blade = await blockBenchInstance.createItem("Blade", "sword_blade", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const leather = await blockBenchInstance.createItem("LScrap", "leather_scrap", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    const swordAddress = await blockBenchInstance.getItem.call("Sword", {from: accounts[0]})
    const hiltAddress = await blockBenchInstance.getItem.call("Hilt", {from: accounts[0]})
    const bladeAddress = await blockBenchInstance.getItem.call("Blade", {from: accounts[0]})
    const leatherAddress = await blockBenchInstance.getItem.call("LScrap", {from: accounts[0]})

    const swordRecipieCreation = await blockBenchInstance.newRecipie(
      swordAddress, 
      [hiltAddress, bladeAddress, leatherAddress], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )


    const getRecipie = await blockBenchInstance.getRecipie.call(swordAddress)

    if (blockBenchInstance.address === undefined) throw new Error('deployment failed')
    if (getRecipie[0].length < 3) throw new Error('didn\'t create recipie')
  })

  it('should create a destructing recipie, and list it', async () => {
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

    const sword = await blockBenchInstance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const hilt = await blockBenchInstance.createItem("Hilt", "sword_hilt", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const blade = await blockBenchInstance.createItem("Blade", "sword_blade", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const leather = await blockBenchInstance.createItem("LScrap", "leather_scrap", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    const swordAddress = await blockBenchInstance.getItem.call("Sword", {from: accounts[0]})
    const hiltAddress = await blockBenchInstance.getItem.call("Hilt", {from: accounts[0]})
    const bladeAddress = await blockBenchInstance.getItem.call("Blade", {from: accounts[0]})
    const leatherAddress = await blockBenchInstance.getItem.call("LScrap", {from: accounts[0]})

    const swordRecipieCreation = await blockBenchInstance.newDeconstructionRecipie(
      swordAddress, 
      [hiltAddress, bladeAddress, leatherAddress], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )

    const getRecipie = await blockBenchInstance.getDeconstructionRecipie.call(swordAddress)

    if (blockBenchInstance.address === undefined) throw new Error('deployment failed')
    if (getRecipie[0].length < 3) throw new Error('destruction recipie not created')
  })

  it('should allow user to craft recipie', async () => {
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

    const sword = await blockBenchInstance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const hilt = await blockBenchInstance.createItem("Hilt", "sword_hilt", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const blade = await blockBenchInstance.createItem("Blade", "sword_blade", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const leather = await blockBenchInstance.createItem("LScrap", "leather_scrap", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    const swordAddress = await blockBenchInstance.getItem.call("Sword", {from: accounts[0]})
    const hiltAddress = await blockBenchInstance.getItem.call("Hilt", {from: accounts[0]})
    const bladeAddress = await blockBenchInstance.getItem.call("Blade", {from: accounts[0]})
    const leatherAddress = await blockBenchInstance.getItem.call("LScrap", {from: accounts[0]})

    const swordRecipieCreation = await blockBenchInstance.newRecipie(
      swordAddress, 
      [hiltAddress, bladeAddress, leatherAddress], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )

    const getRecipie = await blockBenchInstance.getRecipie.call(swordAddress)

    const giveHilt = await blockBenchInstance.spawnItem("Hilt", accounts[1], {from: accounts[0]})
    const giveBlade = await blockBenchInstance.spawnItem("Blade", accounts[1], {from: accounts[0]})
    const giveLeather1 = await blockBenchInstance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    const giveLeather2 = await blockBenchInstance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    const giveLeather3 = await blockBenchInstance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    
    const craftSword = await blockBenchInstance.craftItem(swordAddress, { from: accounts[1] })

    const swordBalance = await Item.at(swordAddress).balanceOf.call(accounts[1], {from: accounts[0]})

    if (swordBalance.toString() !== '1') throw new Error('didn\'t craft sword')
  })

  it('should allow user to deconstruct recipie', async () => {
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

    const sword = await blockBenchInstance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const hilt = await blockBenchInstance.createItem("Hilt", "sword_hilt", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const blade = await blockBenchInstance.createItem("Blade", "sword_blade", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const leather = await blockBenchInstance.createItem("LScrap", "leather_scrap", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    const swordAddress = await blockBenchInstance.getItem.call("Sword", {from: accounts[0]})
    const hiltAddress = await blockBenchInstance.getItem.call("Hilt", {from: accounts[0]})
    const bladeAddress = await blockBenchInstance.getItem.call("Blade", {from: accounts[0]})
    const leatherAddress = await blockBenchInstance.getItem.call("LScrap", {from: accounts[0]})

    const swordRecipieCreation = await blockBenchInstance.newRecipie(
      swordAddress, 
      [hiltAddress, bladeAddress, leatherAddress], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )

    const swordDeconstructionCreation = await blockBenchInstance.newDeconstructionRecipie(
      swordAddress, 
      [hiltAddress, bladeAddress, leatherAddress], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )

    const getRecipie = await blockBenchInstance.getRecipie.call(swordAddress)

    const giveHilt = await blockBenchInstance.spawnItem("Hilt", accounts[1], {from: accounts[0]})
    const giveBlade = await blockBenchInstance.spawnItem("Blade", accounts[1], {from: accounts[0]})
    const giveLeather1 = await blockBenchInstance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    const giveLeather2 = await blockBenchInstance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    const giveLeather3 = await blockBenchInstance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    
    const craftSword = await blockBenchInstance.craftItem(swordAddress, { from: accounts[1] })

    const swordBalance = await Item.at(swordAddress).balanceOf.call(accounts[1], {from: accounts[0]})
    
    // Ensure we crafted
    if (swordBalance.toString() !== '1') throw new Error('didn\'t craft sword')

    const uncraftSword = await blockBenchInstance.deconstructItem(swordAddress, { from: accounts[1] })
    
    const leatherBalance = await Item.at(leatherAddress).balanceOf.call(accounts[1], {from: accounts[0]})


    if (leatherBalance.toString() !== '3') throw new Error('didn\'t get leather scraps')    
  })
})
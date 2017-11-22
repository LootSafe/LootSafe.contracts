const LootSafe = artifacts.require('LootSafe.sol')
const Item = artifacts.require('Item.sol')
const gasPrice = 6716388

contract('LootSafe', (accounts) => {
  it('should deploy a contract', async () => {
    const instance = await LootSafe.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100
    )
    if (instance.address === undefined) throw new Error('deployment failed')
  })

  it('should create a recipie, and list it', async () => {
    const instance = await LootSafe.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100
    )

    const sword = await instance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const hilt = await instance.createItem("Hilt", "sword_hilt", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const blade = await instance.createItem("Blade", "sword_blade", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const leather = await instance.createItem("LScrap", "leather_scrap", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    const swordAddress = await instance.getItem.call("Sword", {from: accounts[0]})
    const hiltAddress = await instance.getItem.call("Hilt", {from: accounts[0]})
    const bladeAddress = await instance.getItem.call("Blade", {from: accounts[0]})
    const leatherAddress = await instance.getItem.call("LScrap", {from: accounts[0]})

    const swordRecipieCreation = await instance.newRecipie(
      swordAddress, 
      [hiltAddress, bladeAddress, leatherAddress], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )


    const getRecipie = await instance.getRecipie.call(swordAddress)

    if (instance.address === undefined) throw new Error('deployment failed')
    if (getRecipie[0].length < 3) throw new Error('didn\'t create recipie')
  })

  it('should create a destructing recipie, and list it', async () => {
    const instance = await LootSafe.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100
    )

    const sword = await instance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const hilt = await instance.createItem("Hilt", "sword_hilt", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const blade = await instance.createItem("Blade", "sword_blade", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const leather = await instance.createItem("LScrap", "leather_scrap", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    const swordAddress = await instance.getItem.call("Sword", {from: accounts[0]})
    const hiltAddress = await instance.getItem.call("Hilt", {from: accounts[0]})
    const bladeAddress = await instance.getItem.call("Blade", {from: accounts[0]})
    const leatherAddress = await instance.getItem.call("LScrap", {from: accounts[0]})

    const swordRecipieCreation = await instance.newDeconstructionRecipie(
      swordAddress, 
      [hiltAddress, bladeAddress, leatherAddress], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )

    const getRecipie = await instance.getDeconstructionRecipie.call(swordAddress)

    if (instance.address === undefined) throw new Error('deployment failed')
    if (getRecipie[0].length < 3) throw new Error('destruction recipie not created')
  })

  it('should allow user to craft recipie', async () => {
    const instance = await LootSafe.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100
    )

    const sword = await instance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const hilt = await instance.createItem("Hilt", "sword_hilt", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const blade = await instance.createItem("Blade", "sword_blade", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const leather = await instance.createItem("LScrap", "leather_scrap", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    const swordAddress = await instance.getItem.call("Sword", {from: accounts[0]})
    const hiltAddress = await instance.getItem.call("Hilt", {from: accounts[0]})
    const bladeAddress = await instance.getItem.call("Blade", {from: accounts[0]})
    const leatherAddress = await instance.getItem.call("LScrap", {from: accounts[0]})

    const swordRecipieCreation = await instance.newRecipie(
      swordAddress, 
      [hiltAddress, bladeAddress, leatherAddress], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )

    const getRecipie = await instance.getRecipie.call(swordAddress)

    const giveHilt = await instance.spawnItem("Hilt", accounts[1], {from: accounts[0]})
    const giveBlade = await instance.spawnItem("Blade", accounts[1], {from: accounts[0]})
    const giveLeather1 = await instance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    const giveLeather2 = await instance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    const giveLeather3 = await instance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    
    const craftSword = await instance.craftItem(swordAddress, { from: accounts[1] })

    const swordBalance = await Item.at(swordAddress).balanceOf.call(accounts[1], {from: accounts[0]})

    if (swordBalance.toString() !== '1') throw new Error('didn\'t craft sword')
  })

  it('should allow user to deconstruct recipie', async () => {
    const instance = await LootSafe.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100
    )

    const sword = await instance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const hilt = await instance.createItem("Hilt", "sword_hilt", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const blade = await instance.createItem("Blade", "sword_blade", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const leather = await instance.createItem("LScrap", "leather_scrap", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    const swordAddress = await instance.getItem.call("Sword", {from: accounts[0]})
    const hiltAddress = await instance.getItem.call("Hilt", {from: accounts[0]})
    const bladeAddress = await instance.getItem.call("Blade", {from: accounts[0]})
    const leatherAddress = await instance.getItem.call("LScrap", {from: accounts[0]})

    const swordRecipieCreation = await instance.newRecipie(
      swordAddress, 
      [hiltAddress, bladeAddress, leatherAddress], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )

    const swordDeconstructionCreation = await instance.newDeconstructionRecipie(
      swordAddress, 
      [hiltAddress, bladeAddress, leatherAddress], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )

    const getRecipie = await instance.getRecipie.call(swordAddress)

    const giveHilt = await instance.spawnItem("Hilt", accounts[1], {from: accounts[0]})
    const giveBlade = await instance.spawnItem("Blade", accounts[1], {from: accounts[0]})
    const giveLeather1 = await instance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    const giveLeather2 = await instance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    const giveLeather3 = await instance.spawnItem("LScrap", accounts[1], {from: accounts[0]})
    
    const craftSword = await instance.craftItem(swordAddress, { from: accounts[1] })

    const swordBalance = await Item.at(swordAddress).balanceOf.call(accounts[1], {from: accounts[0]})
    
    // Ensure we crafted
    if (swordBalance.toString() !== '1') throw new Error('didn\'t craft sword')

    const uncraftSword = await instance.deconstructItem(swordAddress, { from: accounts[1] })
    
    const leatherBalance = await Item.at(leatherAddress).balanceOf.call(accounts[1], {from: accounts[0]})


    if (leatherBalance.toString() !== '3') throw new Error('didn\'t get leather scraps')    
  })
})
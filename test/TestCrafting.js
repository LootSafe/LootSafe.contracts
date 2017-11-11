const BlockBench = artifacts.require('BlockBench.sol')
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

  it('should create a recipie', async () => {
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

    const swordRecipieCreation = await blockBenchInstance.newRecipie(
      sword.address, 
      [hilt.address, blade.address, leather.address], 
      [1,1,3], 
      {gas: gasPrice, from: accounts[0]}
    )

    if (blockBenchInstance.address === undefined) throw new Error('deployment failed')
  })

})
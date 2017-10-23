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
      40000000000000000000000000,
      100
    )
    if (supercoreInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should deploy items', async () => {
    const supercoreInstance = await Supercore.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100
    )
    
    supercoreInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    ).then(itemAddress => {
      if (!itemAddress) throw new Error('item not created')
    })
  })

  it('should send items', async () => {
    const supercoreInstance = await Supercore.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100
    )

    const createItem = await supercoreInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const spawnItem = await supercoreInstance.spawnItem(
      "Sword",
      accounts[1],
      {gas: gasPrice, from: accounts[0]}
    )

    const itemAddress = await supercoreInstance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const receiverBalance = await Item.at(itemAddress).balanceOf(accounts[1])

    if (!itemAddress) throw new Error('item address not returned')
    if (!receiverBalance.gt(0)) throw new Error('item not received')
  })

  it('should despawn items', async () => {
    const supercoreInstance = await Supercore.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100
    )

    const createItem = await supercoreInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const spawnItem = await supercoreInstance.spawnItem(
      "Sword",
      accounts[1],
      {gas: gasPrice, from: accounts[0]}
    )

    const itemAddress = await supercoreInstance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const receiverBalance = await Item.at(itemAddress).balanceOf(accounts[1])

    const despawnTx = await supercoreInstance.despawnItem(
      "Sword",
      1,
      {gas: gasPrice, from: accounts[1]}
    )

    const receiverBalanceAfterDespawn = await Item.at(itemAddress).balanceOf.call(accounts[1])
    
    if (!itemAddress) throw new Error('item address not returned')
    if (!receiverBalance.gt(0)) throw new Error('item not received')
    if (!receiverBalanceAfterDespawn.equals(0)) throw new Error('item not despawned')
  })

  it('should clear availability of items', async () => {
    const supercoreInstance = await Supercore.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      3310000000000000,
      40000000000000000000000000,
      100  
    )

    const createItem = await supercoreInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const itemAddress = await supercoreInstance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const inventoryBalance = await Item.at(itemAddress).balanceOf.call(supercoreInstance.address)
    const despawnTx = await supercoreInstance.clearAvailability(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const inventoryBalanceAfterClear = await Item.at(itemAddress).balanceOf.call(supercoreInstance.address)
    
    if (!itemAddress) throw new Error('item address not returned')
    if (!inventoryBalance.gt(0)) throw new Error('item not registered correctly')
    if (!inventoryBalanceAfterClear.equals(0)) throw new Error('item not cleared')
  })
})
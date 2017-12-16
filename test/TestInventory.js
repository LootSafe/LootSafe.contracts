const LootSafe = artifacts.require('LootSafe.sol')
const Item = artifacts.require('Item.sol')
const gasPrice = 6000029

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

  it('should deploy items', async () => {
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
    
    instance.createItem(
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

    const createItem = await instance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const spawnItem = await instance.spawnItem(
      "Sword",
      accounts[1],
      {gas: gasPrice, from: accounts[0]}
    )

    const itemAddress = await instance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const receiverBalance = await Item.at(itemAddress).balanceOf(accounts[1])

    if (!itemAddress) throw new Error('item address not returned')
    if (!receiverBalance.gt(0)) throw new Error('item not received')
  })

  it('should despawn items', async () => {
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

    const createItem = await instance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const spawnItem = await instance.spawnItem(
      "Sword",
      accounts[1],
      {gas: gasPrice, from: accounts[0]}
    )

    const itemAddress = await instance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const receiverBalance = await Item.at(itemAddress).balanceOf(accounts[1])

    const despawnTx = await instance.despawnItem(
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

    const createItem = await instance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const itemAddress = await instance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const inventoryBalance = await Item.at(itemAddress).balanceOf.call(instance.address)
    const despawnTx = await instance.clearAvailability(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const inventoryBalanceAfterClear = await Item.at(itemAddress).balanceOf.call(instance.address)
    
    if (!itemAddress) throw new Error('item address not returned')
    if (!inventoryBalance.gt(0)) throw new Error('item not registered correctly')
    if (!inventoryBalanceAfterClear.equals(0)) throw new Error('item not cleared')
  })
})
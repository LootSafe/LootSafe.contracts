const AtomicInventory = artifacts.require('AtomicInventory.sol')
const Item = artifacts.require('Item.sol')
const gasPrice = 4700000

contract('AtomicInventory', (accounts) => {
  it('should deploy a contract', async () => {
    const atomicInventoryInstance = await AtomicInventory.new(3310000000000000)
    if (atomicInventoryInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should deploy items', async () => {
    const atomicInventoryInstance = await AtomicInventory.new(3310000000000000)
    
    atomicInventoryInstance.createItem(
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
    const atomicInventoryInstance = await AtomicInventory.new(3310000000000000)

    const createItem = await atomicInventoryInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const spawnItem = await atomicInventoryInstance.spawnItem(
      "Sword",
      accounts[1],
      {gas: gasPrice, from: accounts[0]}
    )

    const itemAddress = await atomicInventoryInstance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const receiverBalance = await Item.at(itemAddress).balanceOf(accounts[1])

    if (!itemAddress) throw new Error('item address not returned')
    if (!receiverBalance.gt(0)) throw new Error('item not received')
  })

  it('should despawn items', async () => {
    const atomicInventoryInstance = await AtomicInventory.new(3310000000000000)

    const createItem = await atomicInventoryInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const spawnItem = await atomicInventoryInstance.spawnItem(
      "Sword",
      accounts[1],
      {gas: gasPrice, from: accounts[0]}
    )

    const itemAddress = await atomicInventoryInstance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const receiverBalance = await Item.at(itemAddress).balanceOf(accounts[1])

    const despawnTx = await atomicInventoryInstance.despawnItem(
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
    const atomicInventoryInstance = await AtomicInventory.new(3310000000000000)

    const createItem = await atomicInventoryInstance.createItem(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice, from: accounts[0]}
    )

    const itemAddress = await atomicInventoryInstance.getItem.call(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const inventoryBalance = await Item.at(itemAddress).balanceOf.call(atomicInventoryInstance.address)
    const despawnTx = await atomicInventoryInstance.clearAvailability(
      "Sword",
      {gas: gasPrice, from: accounts[0]}
    )

    const inventoryBalanceAfterClear = await Item.at(itemAddress).balanceOf.call(atomicInventoryInstance.address)
    
    if (!itemAddress) throw new Error('item address not returned')
    if (!inventoryBalance.gt(0)) throw new Error('item not registered correctly')
    if (!inventoryBalanceAfterClear.equals(0)) throw new Error('item not cleared')
  })
})
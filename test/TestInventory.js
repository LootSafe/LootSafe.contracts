const AtomicInventory = artifacts.require('AtomicInventory.sol')
const Item = artifacts.require('Item.sol')
const gasPrice = 4700000

contract('AtomicInventory', (accounts) => {
  it('should deploy a contract', async () => {
    const atomicInventoryInstance = await AtomicInventory.new()
    if (atomicInventoryInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should deploy items', async () => {
    const atomicInventoryInstance = await AtomicInventory.new()
    
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
    const atomicInventoryInstance = await AtomicInventory.new()

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

    const getItem = await atomicInventoryInstance.getItem(
      "sword",
      {gas: gasPrice, from: accounts[0]}
    )
    console.log('addy', getItem)
    const receiverBalance = await Item.at(getItem).balanceOf(accounts[1])
    console.log(receiverBalance)
    if (!getItem) throw new Error('item address not returned')
  })
})
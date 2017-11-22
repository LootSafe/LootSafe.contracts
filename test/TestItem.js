const Item = artifacts.require('Item.sol')
const gasPrice = 6749762

contract('Item', (accounts) => {
  it('should deploy a contract', async () => {
    const itemInstance = await Item.new(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice}
    )
    if (itemInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should give owner balance', async () => {
    const itemInstance = await Item.new(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice}
    )

    itemInstance.balanceOf(accounts[0]).then(balance => {
      if (balance.lt(10000)) throw new Error('balance missing')        
    })
  })

  it('should exchange balances', async () => {
    const itemInstance = await Item.new(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: gasPrice}
    )


    const transfer = await itemInstance.transfer(accounts[1], 100, { from: accounts[0] })
    const balanceOfOwner = await itemInstance.balanceOf(accounts[0])
    const balanceOfReceiver = await itemInstance.balanceOf(accounts[1])

    if (balanceOfReceiver.lt(100)) throw new Error('sent balance not received')      
    if (balanceOfOwner.gt(9900)) throw new Error('owner balance not deducted')   
  
  })
})
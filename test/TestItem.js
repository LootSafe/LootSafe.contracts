const Item = artifacts.require('Item.sol')

contract('Item', () => {
  it('should deploy a contract', async () => {
    const itemInstance = await Item.new(
      "Sword",
      "basic_sword",
      10000,
      "basic",
      "",
      {gas: 9000000000}
    )
    if (itemInstance.address === undefined) throw new Error('deployment failed')
  })
})
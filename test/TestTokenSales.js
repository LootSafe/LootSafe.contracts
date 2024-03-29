const LootSafe = artifacts.require('LootSafe.sol')
const Item = artifacts.require('Item.sol')
const CoreToken = artifacts.require('CoreToken.sol')
const gasPrice = 6000029

contract('LootSafe', (accounts) => {
  it('should deploy a contract', async () => {
    const instance = await LootSafe.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      40000000000000000000000000,
      100
    )
    if (instance.address === undefined) throw new Error('deployment failed')
  })

  it('should deploy a allow token purchases from vault', async () => {
    const instance = await LootSafe.new(
      "Core",
      "CORE",
      80000000000000000000000000,
      18,
      3310000000000000,
      40000000000000000000000000,
      100
    )

    const tokenAddress = await instance.getTokenAddress.call({from: accounts[0]})
    const sendEth = await web3.eth.sendTransaction({ from: accounts[0], to: tokenAddress, value: 1 })
    const mahBalance = await CoreToken.at(tokenAddress).balanceOf.call(accounts[0], {from: accounts[0]})

    if (mahBalance.lt(100)) throw new Error('Can\'t buy tokens from the vault')
  })
})
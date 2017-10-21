const AtomicInventory = artifacts.require('AtomicInventory.sol')
const gasPrice = 4700000

contract('AtomicInventory', (accounts) => {
  it('should deploy a contract', async () => {
    const atomicInventoryInstance = await AtomicInventory.new(3310000000000000)
    if (atomicInventoryInstance.address === undefined) throw new Error('deployment failed')
  })

  it('should open a loot box', async () => {
    const atomicInventoryInstance = await AtomicInventory.new(3310000000000000)

    // Common
    const sword = await atomicInventoryInstance.createItem("Sword", "basic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shield = await atomicInventoryInstance.createItem("Shield", "basic_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axe = await atomicInventoryInstance.createItem("Axe", "basic_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})

    // Uncommon
    const swordUncommon = await atomicInventoryInstance.createItem("USword", "uncommon_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldUncommon = await atomicInventoryInstance.createItem("UShield", "uncommon_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeUncommon = await atomicInventoryInstance.createItem("UAxe", "uncommon_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    
    // Rare
    const swordRare = await atomicInventoryInstance.createItem("RSword", "rare_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldRare = await atomicInventoryInstance.createItem("RShield", "rare_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeRare = await atomicInventoryInstance.createItem("RAxe", "rare_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
        
    // Epica
    const swordEpic = await atomicInventoryInstance.createItem("ESword", "epic_sword", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const shieldEpic = await atomicInventoryInstance.createItem("EShield", "epic_shield", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
    const axeEpic = await atomicInventoryInstance.createItem("EAxe", "epic_axe", 10000, "basic", "", {gas: gasPrice, from: accounts[0]})
        
    // Addresses
    const swordAddress = await atomicInventoryInstance.getItem.call("Sword", {from: accounts[0]});
    const shieldAddress = await atomicInventoryInstance.getItem.call("Shield", {from: accounts[0]});
    const axeAddress = await atomicInventoryInstance.getItem.call("Axe", {from: accounts[0]});
    const swordUncommonAddress = await atomicInventoryInstance.getItem.call("USword", {from: accounts[0]});
    const shieldUncommonAddress = await atomicInventoryInstance.getItem.call("UShield", {from: accounts[0]});
    const axeUncommonAddress = await atomicInventoryInstance.getItem.call("UAxe", {from: accounts[0]});
    const swordRareAddress = await atomicInventoryInstance.getItem.call("RSword", {from: accounts[0]});
    const shieldRareAddress = await atomicInventoryInstance.getItem.call("RShield", {from: accounts[0]});
    const axeRareAddress = await atomicInventoryInstance.getItem.call("RAxe", {from: accounts[0]});
    const swordEpicAddress = await atomicInventoryInstance.getItem.call("ESword", {from: accounts[0]});
    const shieldEpicAddress = await atomicInventoryInstance.getItem.call("EShield", {from: accounts[0]});
    const axeEpicAddress = await atomicInventoryInstance.getItem.call("EAxe", {from: accounts[0]});

    // Add items to loot table
    const addSword = await atomicInventoryInstance.addItem(swordAddress, "common", {from: accounts[0]});
    const addShield = await atomicInventoryInstance.addItem(shieldAddress, "common", {from: accounts[0]});
    const addAxe = await atomicInventoryInstance.addItem(axeAddress, "common", {from: accounts[0]});
    const addSwordUncommon = await atomicInventoryInstance.addItem(swordUncommonAddress, "uncommon", {from: accounts[0]});
    const addShieldUncommon = await atomicInventoryInstance.addItem(shieldUncommonAddress, "uncommon", {from: accounts[0]});
    const addAxeUncommon = await atomicInventoryInstance.addItem(axeUncommonAddress, "uncommon", {from: accounts[0]});
    const addSwordRare = await atomicInventoryInstance.addItem(swordRareAddress, "rare", {from: accounts[0]});
    const addShieldRare = await atomicInventoryInstance.addItem(shieldRareAddress, "rare", {from: accounts[0]});
    const addAxeRare = await atomicInventoryInstance.addItem(axeRareAddress, "rare", {from: accounts[0]});
    const addSwordEpic = await atomicInventoryInstance.addItem(swordEpicAddress, "epic", {from: accounts[0]});
    const addShieldEpic = await atomicInventoryInstance.addItem(shieldEpicAddress, "epic", {from: accounts[0]});
    const addAxeEpic = await atomicInventoryInstance.addItem(axeEpicAddress, "epic", {from: accounts[0]});
  
    web3.eth.sendTransaction({ from: accounts[0], to: atomicInventoryInstance.address, value: 3310000000000000 })
    

    // TODO listen for transfer event and make sure it happens
    if (atomicInventoryInstance.address === undefined) throw new Error('deployment failed')
  })

})
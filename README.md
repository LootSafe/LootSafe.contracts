
# BlockBench.io
### (http://blockben.ch)
### AIOT for building blockchain backed games and assets
------

# About BlockBench

## What is BlockBench?
BlockBench makes it easy to create, and extend games on the Blockchain. From trading card games to cross platform inventories, achievements and more! Our system utilizes simple but powerful smart contracts to build a trustless management system for assets. We then wrap this smart contract system in an easy to use, intuitive, game development environment. This makes building your next game, in decentralized way, a cakewalk. 🍰

- [x] Secure Smart Contracts
- [x] Responsible token distribution system
- [x] Built in asset exchange
- [x] Loot Box / Random Item solution
- [x] ERC 20 compliant assets
- [x] Easy to use creation platform
- [x] Trustless matchmaking 
- [x] Reputation based community network


### Why Decentralized?

Decentralizing your game means that players can obtain items in your game and hold them as a pseudo physical store of value, lock them up and keep them safe until they are ready for use. This also means that future versions of your game can maintain the same items and prove ownership of those items. Furthermore others can build games based on your items! Should you ever stop maintaining your game players do not lose access to all of their hard work. The list of benefits goes on and on and most arguments for why you should decentralize currencies hold value here as well.

## The Stack


### Items

Items are ERC20 contracts, what this means is your favorite wallets can hold your actual in game items, yeah... boom. So continuing the example above you might have a contract address 0x01245 which is the Stone Pickaxe. This item is tradable just like any other ERC20 token (which can be done internally explained below). Some items may not directly relate to a game and may be limited release items such as enchantments which enhance your character on the server, or benefits on the network. Depending on the game vendor items, in addition to being honored across platform, have the option to to be crafting supplies which can be used to craft other items. (Or be deconstructed for supplies)
### Auction House

Trading is built into the platform and an on chain "auction house" style method of trading can be created, and exchanges will happen fast and cheaply, no need to deal with traditional exchanges. Simply place the item you'd like to trade into the auction house, specify how many of that item you're looking to trade, and what item(s) you'd like for it! Then another player that owns the item you want can fulfill this trade. Secure trading costs a very small amount of BNCH Token to discourage listing trades and then trading the item elsewhere thus potentially wasting another user's gas.

### Loot Box

The loot box contract is funded by the BlockBench contract owner for possible rewards of different rarity to be given out on chain. Opening a loot box essentially just triggers the loot box contract to transfer it's balance of items that were chosen in that box, to you on the ERC20 Item contract. Loot Boxes can be opened by sending BNCH Tokens to the contract, which can be earned by playing on our servers, or bought with ETH.


### Match Verify

Match Verify takes a list of assets in a specific game, as well as a moves list which is expected to have the same hash from both parties and then verifies the outcome of a given match based on the data sent. Verification of the match should be handled off chain to be determined by the ruleset established by the vendor but then agreed upon and signed by the vendor to write the outcome in stone.


### BNCH Token

The BNCH Token can be used for many things across our network from opening Loot Boxes, Listing items on the auction house, and more. They can also be purchased (if a supply is available) by sending ETH to the BlockBench contract. There will only be a fixed amount of tokens available for sale this way, tokens used to open loot boxes, pay auction house fees, etc will be recycled into this balance.


### The Vault

The vault houses all available tokens for sale, this is a fixed amount that once gone, will not be replenished until users use the Auction House or open Loot Boxes.

### Crafter

The Crafter accepts recipies, recipies are a list of required addresses (and amount of tokens in that address) in order to craft a new asset. If the owner calls craft and has the required items it will destroy their assets required for crafting and issue them the crafted asset.



### Test Coverage
```
  Contract: Supercore
    ✓ should deploy a contract (79ms)
    ✓ should deploy items (80ms)
    ✓ should send items (259ms)
    ✓ should despawn items (304ms)
    ✓ should clear availability of items (246ms)

  Contract: Item
    ✓ should deploy a contract (52ms)
    ✓ should give owner balance (46ms)
    ✓ should exchange balances (126ms)

  Contract: Supercore
    ✓ should deploy a contract (95ms)
    ✓ should open a loot box (1869ms)
    ✓ should should show items in loot boxes (463ms)
    ✓ should get loot box odds (107ms)

  Contract: Supercore
    ✓ should deploy a contract (77ms)
    ✓ should deploy a allow token purchases from vault (280ms)

  Contract: Supercore
    ✓ should deploy a contract (72ms)
    ✓ should should list and fulfill trades (663ms)
    ✓ should should list all of a users trades (526ms)
```


Copyright LootSafe, LLC

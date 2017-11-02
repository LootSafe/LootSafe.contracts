<img src="https://i.imgur.com/aEHA4mY.png" data-canonical-src="https://i.imgur.com/aEHA4mY.png" width="220" align="left" />

# Supercore

### What is Super Core?

Super Core makes it easy to create, and extend games on the Blockchain. From trading card games to cross platform inventories, achievements and more! Our system utilizes simple but powerful smart contracts to build a trustless management system for assets. We then wrap this smart contract system in an easy to use, intuitive, game development environment. This makes building your next game, in decentralized way, a cakewalk. 🍰

- [x] Secure Smart Contracts
- [x] Responsible token distribution system
- [x] Built in asset exchange
- [x] Loot Box / Random Item solution
- [x] ERC 20 compliant assets
- [x] Easy to use creation platform


### Why Decentralized?

Decentralizing your game means that players can obtain items in your game and hold them as a psuedo physical store of value, lock them up and keep them safe until they are ready for use. This also means that future versions of your game can maintain the same items and prove ownership of those items. Furthermore others can build games based on your items! Should you ever stop maintaining your game players do not lose access to all of their hard work. The list of benefits goes on and on and most arguments for why you should decentralize currencies hold value here as well.

<img src="https://wiki.teamfortress.com/w/images/thumb/0/00/Group_of_Bundles.png/300px-Group_of_Bundles.png?t=20110605085123" data-canonical-src="https://wiki.teamfortress.com/w/images/thumb/0/00/Group_of_Bundles.png/300px-Group_of_Bundles.png?t=20110605085123" width="60" align="right" />

## Items

Items are ERC20 contracts, what this means is your favorite wallets can hold your actual in game items, yeah... boom. So continuing the example above you might have a contract address 0x01245 which is the Stone Pickaxe. This item is tradable just like any other ERC20 token (which can be done internally explained below). Some items may not directly relate to a game and may be limited release items such as enchantments which enhance your character on the server, or benefits on the network. 




<img src="http://icons.iconarchive.com/icons/aha-soft/large-home/512/Retail-shop-icon.png" data-canonical-src="http://icons.iconarchive.com/icons/aha-soft/large-home/512/Retail-shop-icon.png" width="60" align="right" />

## Auction House

Trading is built into the platform and an on chain "auction house" style method of trading can be created, and exchanges will happen fast and cheaply, no need to deal with traditional exchanges. Simply place the item you'd like to trade into the auction house, specify how many of that item you're looking to trade, and what item(s) you'd like for it! Then another player that owns the item you want can fulfill this trade. Secure trading costs a very small amount of Core Token to decentivise listing trades and then trading the item elsewhere thus potentially wasting another users gas.



<img src="https://netdna.webdesignerdepot.com/uploads6/creative-app-icons/03-app.jpg" data-canonical-src="https://netdna.webdesignerdepot.com/uploads6/creative-app-icons/03-app.jpg" width="60" align="right" />

## Loot Box

The lootbox contract is funded by the Supercore owner for possible rewards of diferent rarity to be given out on chain. Opening a loot box essentially just  triggers the lootbox contract to transfer it's balance of items that were chosen in that box, to you on the ERC20 Item contract. LootBoxes can be opened by sending Core Tokens to the contract, which can be earned by playing on our servers, or bought with ETH.


<img src="https://i.imgur.com/aEHA4mY.png" data-canonical-src="https://i.imgur.com/aEHA4mY.png" width="60" align="right" />

## Core Token

Core can be earned by plaing on servers supported by our network, you will received a fixed amount of Core for every minute played on our servers. The Core Utility Token can be used for many things across our network from opening Loot Boxes, Listing items on the auction house, and more. They can also be purchased (if a supply is available) by sending ETH to Supercore. There will only be a fix amount of tokens available for sale this way, tokens used to open loot boxes, pay auction house fees, etc will be recycled into this balance.


<img src="http://socaluncensored.com/wp/wp-content/uploads/2016/05/vault.jpg" data-canonical-src="http://socaluncensored.com/wp/wp-content/uploads/2016/05/vault.jpg" width="60" align="right" />

## Match Verify

Match Verify takes a list of assets and a moveset from two or more parties, the parties then agree on a winner. Agreeing with concensus is incentivised by building reputation for truthful matches, if you submit false matches you will be deducted reputation and could be barred from competing. THis creates a trust network of gamers and "ranked" matches can only be played by those with good reputation. Matches events are emitted and vendors should watch these events to reward match wins.

## The Vault

The vault houses all available tokens for sale, this is a fixed amount that once gone, will not be replenished until users use the Auction House or open Loot Boxes.


## Notice

The project is still under heavy development and more updates will come, for now the platform is being fleshed out on https://8bit.network


## Events 

### Item.sol
#### `event Exchange(address trader, address receiver, uint256 amount);`
Emitted when an iternal exchange happenes


### LootBox.sol
#### `event LootBoxOpened(address by, bytes8 rarity, address item);`
Emitted when a loot box is opened

#### `event CostUpdated(uint cost);`
Cost to open loot box updated by owner

#### `event LootBoxItemAdded(address item);`
New loot is added to the loot boxes


### Supercore.sol
#### `event ItemCreated(address itemAddress);`
Emitted when a new item is created

#### `event ItemDelisted(address itemAddress, bytes16 name);`
Emitted when an item is no longer avail

#### `event ItemSpawned(address itemAddress, bytes16 name, address to);`
Item given out to user by core

#### `event ItemDespawned(address itemAddress, address from, uint256 amount);`
Item was burned by a user

#### `TokenIssued(address to, uint256 amount);`
Token issued to address

### Trade.sol
```
  event TradeEvent(
    address merchant,
    bytes8 tradeId,
    address offer,
    address desired,
    uint256 offerAmount,
    uint256 desiredAmount,
    bool fulfilled
  );
```
Emitted when a trade is listed, and when it's fulfilled


## Test Settings

```js
Supercore.new(
  "Core",
  "CORE",
  100000000000000000000000000,
  18,
  25000000000000000000,
  500000000000000000,
  75000000000000000000000000    
)
```

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

### Pending Tests
- Test buying tokens when vault is empty
- Test starting a trade and then trying to fulfill it after spending the item or burning
- Ensure all ownly owner functions are not accessable outside of preffered ownership scope

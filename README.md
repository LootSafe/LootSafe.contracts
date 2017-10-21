<img src="https://i.imgur.com/FGdJ7Av.png" data-canonical-src="https://i.imgur.com/FGdJ7Av.png" width="150" align="left" />

# AtomicInventory

Atomic Inventory, in short, stores your in game inventory on the blockchain. Great, why? Well what this allows us to do is sync your inventory across multiple games. This task would be easy, swapping item for item, if all game developers supported this platform, but expecting that right away is unrealistic. Thus, we're building off-chain methods to swap these items for close equivleants in each game, for instance a Stone Pickaxe in Minecraft, will be a Stone Pickaxe in Rust, and a Stone Pickaxe in Ark, etc. But items like Diamond swords might become Steel Swords in Ark, or a mele weapon in Rust. 

The benifit to using this platform is to reward players for interaction with the network of servers we run, building a strong inventory (redeemable once per server, per wipe) will incentivize sticking around on our network vs leaving for another server. Although the benifit is not just within the network, the player also gets to hold on to their hours of grinding for items in game, in the form of cryptocurrencies, more on that below.




<img src="https://wiki.teamfortress.com/w/images/thumb/0/00/Group_of_Bundles.png/300px-Group_of_Bundles.png?t=20110605085123" data-canonical-src="https://wiki.teamfortress.com/w/images/thumb/0/00/Group_of_Bundles.png/300px-Group_of_Bundles.png?t=20110605085123" width="60" align="left" />

## Items

Items are ERC20 contracts, what this means in in your favorite wallets can hold your actual in game items, yeah... boom. So continuing the example above you might have a contract address 0x01245 which is the Stone Pickaxe. This item is tradable just like any other ERC20 token (which can be done internally expalined below). Some items may not directly relate to a game and may be limited release items such as enchantments which enhance your character on the server, or benifits on the network. 




<img src="http://icons.iconarchive.com/icons/aha-soft/large-home/512/Retail-shop-icon.png" data-canonical-src="http://icons.iconarchive.com/icons/aha-soft/large-home/512/Retail-shop-icon.png" width="60" align="left" />

## Trading

Trading is built into the platform and an on chain "auction house" stlye method of trading can be created, and exchanges will happen fast and cheaply, no need to deal with traditional exchanges. Simply place the item you'd like to trade into the auction house, specify how many of that item you're looking to trade, and what item(s) you'd like for it! Then another player that owns the item you want can fulfill this trade.



<img src="https://netdna.webdesignerdepot.com/uploads6/creative-app-icons/03-app.jpg" data-canonical-src="https://netdna.webdesignerdepot.com/uploads6/creative-app-icons/03-app.jpg" width="60" align="left" />

## Loot Box

The lootbox contract is funded by the AtomicInventory owner for possible rewards of diferent rarity to be given out on chain. Opening a loot box essentially just  triggers the lootbox contract to transfer it's balance of items that were chosen in that box, to you on the ERC20 Item contract. LootBoxes can be opened by one of two methods (yet to be determined), Sending ETH to the Loot Box contract, or sending our Atomi Utility Token which can be earned by playing on our servers!


<img src="https://i.imgur.com/FGdJ7Av.png" data-canonical-src="https://i.imgur.com/FGdJ7Av.png" width="60" align="left" />

## Atomi Token

Atomi can be earned by plaing on servers supported by our network, you will received a fixed amount of Atomi for every minute played on our servers. The Atomi Utility Token can be used for many things across our network from opening Loot Boxes to purchasing items from our Seller contract (TBD).


## Notice

The project is still under heavy development and more updates will come, for now the platform is being fleshed out on https://8bit.network


### Test Coverage
```
  Contract: AtomicInventory
    ✓ should deploy a contract
    ✓ should deploy items (44ms)
    ✓ should send items (174ms)
    ✓ should despawn items (203ms)
    ✓ should clear availability of items (160ms)

  Contract: Item
    ✓ should deploy a contract (43ms)
    ✓ should give owner balance
    ✓ should exchange balances (101ms)

  Contract: AtomicInventory (Trade)
    ✓ should deploy a contract (43ms)
    ✓ should should list and fulfill trades (459ms)
    ✓ should should list all of a users trades (321ms)


  11 passing (2s)
```

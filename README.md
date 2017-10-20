<img src="https://i.imgur.com/FGdJ7Av.png" data-canonical-src="https://i.imgur.com/FGdJ7Av.png" width="150" />

# AtomicInventory

Atomic Inventory, in short, stores your in game inventory on the blockchain. Great, why? Well what this allows us to do is sync your inventory across multiple games. This task would be easy, swapping item for item, if all game developers supported this platform, but expecting that right away is unrealistic. Thus, we're building off-chain methods to swap these items for close equivleants in each game, for instance a Stone Pickaxe in Minecraft, will be a Stone Pickaxe in Rust, and a Stone Pickaxe in Ark, etc. But items like Diamond swords might become Steel Swords in Ark, or a mele weapon in Rust. 

The benifit to using this platform is to reward players for interaction with the network of servers we run, building a strong inventory (redeemable once per server, per wipe) will incentivize sticking around on our network vs leaving for another server. Although the benifit is not just within the network, the player also gets to hold on to their hours of grinding for items in game, in the form of cryptocurrencies, more on that below.

## Items

Items are ERC20 contracts, what this means in in your favorite wallets can hold your actual in game items, yeah... boom. So continuing the example above you might have a contract address 0x01245 which is the Stone Pickaxe. This item is tradable just like any other ERC20 token (which can be done internally expalined below). Some items may not directly relate to a game and may be limited release items such as enchantments which enhance your character on the server. 

## Trading

Trading is built into the platform and an on chain "auction house" stlye method of trading can be created, and exchanges will happen fast and cheaply, no need to deal with traditional exchanges. 

## Notice

The project is still under heavy development and more updates will come, for now the platform is being fleshed out on https://8bit.network

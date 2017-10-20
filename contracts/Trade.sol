pragma solidity ^0.4.8;

import "./Item.sol";

// This contract represents trade methods available for Items

contract Trade {
  // This struct represents a trade transaction
  struct Handshake {
    address trader;           // This is the creator of the trade
    address tradee;           // This is the person the creator expects to take the other side
    address traderItem;       // This is the item the trader is offering
    address desiredItem;      // This is the item the tradee is offering
    uint traderItemCount;     // This is how many of item the trader is offering
    uint desiredItemCount;    // This is how many of the item the tradee is offering
    uint256 created;          // This is the creation date of the trade proposal
    bool fulfilled;           // Have both parties agreed, aka if so the order has been fulfilled
  }

  mapping(address => mapping(bytes8 => Handshake)) trades;

  // Initalize a new handshake trade
  function newTrade (
    bytes8 _tradeId,
    address _traderItem,
    address _desiredItem,
    uint256 _traderItemCount,
    uint256 _desiredItemCount
  )
    public 
  {
    require(
      Item(_traderItem).balanceOf(msg.sender) >= _traderItemCount
    );

    trades[msg.sender][_tradeId] = Handshake({
      trader: msg.sender,
      tradee: 0x0,
      traderItem: _traderItem,
      traderItemCount: _traderItemCount,
      desiredItem: _desiredItem,
      desiredItemCount: _desiredItemCount,
      created: now,
      fulfilled: false
    });
  }

  function exchange (address _item, address _from, address _to, uint _count) internal {
    Item(_item).exchange(
      _from,
      _to, 
      _count
    );
  }

  function fulfillTrade (bytes8 _tradeId, address _trader) public {
    Handshake storage trade = trades[_trader][_tradeId];
    // Check that the trader still has the items they wish to sell
    if (Item(trade.traderItem).balanceOf(trade.trader) >= trade.traderItemCount) {
      // Check that the person trying to fulfill the trade can actually do so
      require(
        Item(trade.desiredItem).balanceOf(msg.sender) >= trade.desiredItemCount
      );

      // Give the tradee their items, remove from trader
      exchange(
        trade.traderItem,
        trade.trader,
        msg.sender, 
        trade.traderItemCount
      );

      // Give the trader their items, remove from tradee
      exchange(
        trade.desiredItem, 
        msg.sender, 
        trade.trader, 
        trade.desiredItemCount
      );

      // Trade fulfilled
      trade.fulfilled = true;
    } else {
      // The trader can not fulfill this trade at this time
      revert();
    }
  }
}
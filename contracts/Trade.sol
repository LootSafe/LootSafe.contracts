pragma solidity ^0.4.8;

import "./Item.sol";

// This contract represents trade methods available for Items

contract Trade {
  // This struct represents a trade transaction
  struct Handshake {
    address merchant;           // This is the creator of the trade
    address customer;           // This is the person the creator expects to take the other side
    address offer;              // This is the item the trader is offering
    address desired;            // This is the item the tradee is offering
    uint offerAmount;           // This is how many of item the trader is offering
    uint desiredAmount;         // This is how many of the item the tradee is offering
    uint256 created;            // This is the creation date of the trade proposal
    bool fulfilled;             // Have both parties agreed, aka if so the order has been fulfilled
  }

  event TradeEvent(
    address merchant,
    bytes8 tradeId,
    address offer,
    address desired,
    uint256 offerAmount,
    uint256 desiredAmount,
    bool fulfilled
  );
  

  mapping(address => mapping(bytes8 => Handshake)) trades;
  mapping(address => bytes8[]) tradeIds;

  // Initalize a new handshake trade
  function newTrade (
    bytes8 _tradeId,
    address _offer,
    address _desired,
    uint256 _offerAmount,
    uint256 _desiredAmount
  )
    public 
  {
    require(
      Item(_offer).balanceOf(msg.sender) >= _offerAmount
    );

    TradeEvent(
      msg.sender,
      _tradeId,
      _offer,
      _desired,
      _offerAmount,
      _desiredAmount,
      false
    );

    tradeIds[msg.sender].push(_tradeId);

    trades[msg.sender][_tradeId] = Handshake({
      merchant: msg.sender,
      customer: 0x0,
      offer: _offer,
      offerAmount: _offerAmount,
      desired: _desired,
      desiredAmount: _desiredAmount,
      created: now,
      fulfilled: false
    });
  }


  // Exchange items between merchant and customer
  function exchange (address item, address merchant, address customer, uint amount) internal {
    Item(item).exchange(
      merchant,
      customer, 
      amount
    );
  }

  // Get a trade that a merchant has listed
  function getTrade (address merchant, bytes8 tradeId) public returns (
    bytes8 _tradeId,
    address offer,
    address desiredItem,
    uint256 offerAmount,
    uint256 desiredAmmount,
    bool fulfilled
  ) {
    Handshake storage trade = trades[merchant][tradeId];
    return (
      tradeId,
      trade.offer,
      trade.desired,
      trade.offerAmount,
      trade.desiredAmount,
      trade.fulfilled
    );
  }

  // Get a list of trade id's a merchant has
  function getTrades (address merchant) public returns (bytes8[] ids) {
    return (
      tradeIds[merchant]
    );
  }

  function fulfillTrade (bytes8 id, address merchant) public {
    Handshake storage trade = trades[merchant][id];
    // Check that the merchant still has the items they wish to sell
    if (Item(trade.offer).balanceOf(trade.merchant) >= trade.offerAmount) {
      // Check that the person trying to fulfill the trade can actually do so
      require(
        Item(trade.desired).balanceOf(msg.sender) >= trade.desiredAmount
      );

      // Give the customer their items, remove from merchant
      exchange(
        trade.offer,
        trade.merchant,
        msg.sender, 
        trade.offerAmount
      );

      // Give the merchant their items, remove from customer
      exchange(
        trade.desired, 
        msg.sender, 
        trade.merchant, 
        trade.desiredAmount
      );

      TradeEvent(
        msg.sender,
        id,
        trade.offer,
        trade.desired,
        trade.offerAmount,
        trade.desiredAmount,
        true
      );

      // Trade fulfilled
      trade.fulfilled = true;
    } else {
      // The merchant can not fulfill this trade at this time
      revert();
    }
  }
}
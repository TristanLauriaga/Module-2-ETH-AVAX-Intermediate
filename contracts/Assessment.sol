// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event StoreRunes(uint256 amount);
    event UseRunes(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function storeRunes(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit StoreRunes(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 consumeAmount);

    function consumeRunes(uint256 _consumeAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _consumeAmount) {
            revert InsufficientBalance({
                balance: balance,
                consumeAmount: _consumeAmount
            });
        }

        // withdraw the given amount
        balance -= _consumeAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _consumeAmount));

        // emit the event
        emit UseRunes(_consumeAmount);
    }
}

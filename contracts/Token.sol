// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

import "../lukso-contracts/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupply.sol";

uint256 constant WCD_TOKEN_SUPPLY_CAP = 100000000000000000000000000;

contract WeCodeToken is LSP7CappedSupply {
    uint256 public awardAmount = 10000000000000000;
    
    event Awarded(address contributor, address student, uint256 amount);
    event Redeemed(address awardee, uint256 amount);
    
    constructor(
        string memory name,
        string memory symbol,
        address contributor
    ) LSP7DigitalAsset(name, symbol, contributor, false) LSP7CappedSupply(WCD_TOKEN_SUPPLY_CAP) {}

    function award(address student) public {
        require(owner() == msg.sender, "unauthorized");
        _mint(owner(), awardAmount, true, "award");
        _mint(student, awardAmount, true, "award");
        emit Awarded(owner(), student, awardAmount);
    }
    
    function redeem(address awardee, uint256 amount) public {
        _burn(awardee, amount, "redeem");
        emit Redeemed(awardee, amount);
    }
    
    function redeemAll(address from) public {
        redeem(from, balanceOf(from));
    }

    function setAwardAmount(uint256 amount) public {
        require(owner() == msg.sender, "unauthorized");
        awardAmount = amount;
    }
    
    function name() public view returns(string memory) {
        return string(_getData(_LSP4_METADATA_TOKEN_NAME_KEY));
    }
    
    function symbol() public view returns(string memory) {
        return string(_getData(_LSP4_METADATA_TOKEN_SYMBOL_KEY));
    }
}

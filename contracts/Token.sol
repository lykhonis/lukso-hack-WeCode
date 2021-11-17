// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

import "../lukso-contracts/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupply.sol";
import "../lukso-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Compatibility.sol";

uint256 constant WCD_TOKEN_SUPPLY_CAP = 100000000000000000000000000;

contract WeCodeToken is LSP7CappedSupply, LSP4Compatibility {
    uint256 public awardAmount = 10000000000000000;
    address public admin;
    address public contributor;

    event Awarded(address contributor, address student, uint256 amount);
    event Redeemed(address awardee, uint256 amount);
    
    constructor(
        address admin_,
        string memory name,
        string memory symbol,
        address contributor_
    ) LSP7DigitalAsset(name, symbol, admin_, false) LSP7CappedSupply(WCD_TOKEN_SUPPLY_CAP) {
        admin = admin_;
        contributor = contributor_;
    }

    function award(address student) external {
        require(admin == msg.sender, "unauthorized");
        _mint(contributor, awardAmount, true, "award");
        _mint(student, awardAmount, true, "award");
        emit Awarded(contributor, student, awardAmount);
    }

    function redeem(address awardee, uint256 amount) external {
        require(admin == msg.sender, "unauthorized");
        _burn(awardee, amount, "redeem");
        emit Redeemed(awardee, amount);
    }

    function redeemAll(address from) external {
        require(admin == msg.sender, "unauthorized");
        uint256 amount = balanceOf(from);
        _burn(from, amount, "redeem");
        emit Redeemed(from, amount);
    }

    function setAwardAmount(uint256 amount) external {
        require(admin == msg.sender, "unauthorized");
        awardAmount = amount;
    }
}

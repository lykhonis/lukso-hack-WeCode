// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

import "./Token.sol";

contract WeCodeTokenFactory {
    WeCodeToken[] public tokenAddresses;
    address owner;
    
    event WeCodeTokenCreated(WeCodeToken tokenAddress, address indexed contributor);
    
    constructor() public {
        owner = msg.sender;
    }

    function createToken(
        string memory name,
        string memory symbol,
        address contributor
    ) external {
        WeCodeToken token = new WeCodeToken(msg.sender, name, symbol, contributor);
        tokenAddresses.push(token);
        emit WeCodeTokenCreated(token, contributor);
    }
    
    function tokens() external view returns (WeCodeToken[] memory) {
        return tokenAddresses;
    }
}

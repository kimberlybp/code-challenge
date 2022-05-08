// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.7;

interface ERC20Basic {
    function balanceOf(address tokenOwner) external view returns (uint256);
}

contract Utility {
    struct TokenBalance {
        address token;
        uint256 balance;
    }

    function getBalances(address walletAddress, address[] memory tokens) 
        public view returns (TokenBalance[] memory) {
            TokenBalance[] memory results = new TokenBalance[](tokens.length);
            for (uint i = 0; i < tokens.length; i++) {
                results[i] = TokenBalance(tokens[i], 
                    ERC20Basic(tokens[i]).balanceOf(walletAddress));
            }
            
            return results;
    }
}

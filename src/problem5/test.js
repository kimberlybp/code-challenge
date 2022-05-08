const { ethers } = require("ethers");
const { abi } = require('./build/contracts/Utility.json');

const ADDR = "0xa7D2533314D0CdA99403B44eF26f086deF082571";   // your contract address
const ABI = abi;    // your contract ABI

const ADDRESS = "0xBC206cCa73bc14a99F5e5c1fB4C01587c5e42E6F"; // some wallet address with token balance
const TOKENS = [    // token contract addresses
    "0xF491e59c25dcAa8422b66Ea25CD02741f5B43ee2",
    "0x578304cc10b9219B6a292d9C50185939ee76D183",
    "0x5183367826C09486D1314eF8b07F030Dd8EDEAb2"
];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = new ethers.providers.getDefaultProvider('ropsten');

const test = async () => {
    const contract = new ethers.Contract(ADDR, ABI, provider);

    const balances = await contract.getBalances(ADDRESS, TOKENS);

    // to filter out extra variables that came with tuple
    const filtered = balances.map(x => {
        return {
            token: x.token,
            balance: x.balance
        }
    });

    return filtered;
};

test().then(console.log);
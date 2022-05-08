import { ethers } from "ethers";

const swthAddress: string = "0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c";
const endpoint: string = "https://bsc-dataseed.binance.org/";
const addresses: string[] = [
    "0x123d475e13aa54a43a7421d94caa4459da021c77",
    "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
    "0xfe808b079187cc460f47374580f5fb47c82b87a5"
];

const provider = new ethers.providers.JsonRpcProvider(endpoint);
const swthAbi = [
    "function balanceOf(address) view returns (uint256)"
];

async function readData() {
    const swthContract = new ethers.Contract(swthAddress, swthAbi, provider);
    for (const address of addresses) {
        const balance = await swthContract.balanceOf(address);
        console.log(`${address} ${balance / 1e8}`);
    }
}

readData();

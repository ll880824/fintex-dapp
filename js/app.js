
let web3;
let contract;

// 替换为你的合约地址和 ABI
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [ /* YOUR_ABI_HERE */ ];

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);
        alert("钱包已连接");
    } else {
        alert("请安装MetaMask");
    }
}

async function claimAirdrop() {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.airdrop().send({ from: accounts[0] });
}

async function withdrawTokens() {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.withdrawToken().send({ from: accounts[0] });
}

async function burnTokens() {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.burn(1000).send({ from: accounts[0] });
}

async function mine() {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.mine().send({ from: accounts[0] });
}

async function register() {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.register().send({ from: accounts[0] });
}

async function recharge() {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.rechargeUSDT().send({ from: accounts[0] });
}

let web3;
let contract;
let accounts;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    accounts = await web3.eth.getAccounts();
    document.getElementById("wallet-address").innerText = "钱包地址: " + accounts[0];
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  } else {
    alert("请安装 MetaMask");
  }
}

async function register() {
  await contract.methods.register().send({ from: accounts[0] });
}

async function claimAirdrop() {
  await contract.methods.claimAirdrop().send({ from: accounts[0] });
}

async function mine() {
  await contract.methods.claimMiningReward().send({ from: accounts[0] });
}

async function withdraw() {
  await contract.methods.withdrawToken().send({ from: accounts[0] });
}

async function rechargeAndReward() {
  const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // mainnet USDT
  const usdt = new web3.eth.Contract([{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}], usdtAddress);
  await usdt.methods.transfer(CONTRACT_ADDRESS, web3.utils.toWei("1", "ether")).send({ from: accounts[0] });
  await contract.methods.claimRechargeReward().send({ from: accounts[0] });
}
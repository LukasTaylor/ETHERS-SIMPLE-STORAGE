const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //RPC Server - HTTP://172.21.48.1:7545

  //connect script to the local provided blockchain
  const provider = new ethers.providers.JsonRpcProvider(
    "HTTP://172.21.48.1:7545"
  );
  //connect private key of wallet to blockchain network
  const wallet = new ethers.Wallet(
    "c69e9f5bf2e39f7a483e27f4d82ed83b14acd04a0f2b4f2eb376df02c8624936",
    provider
  );
  //feed abi and binary files to script
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
  //object used to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  console.log("Deploying... Please wait");
  //deploy contract
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

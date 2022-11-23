const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  //set wallet variable to the private key
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  //use ethers library to encrypt private key with password - both stored in env file
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  console.log(encryptedJsonKey);
  //saving new encrypted key to key file
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

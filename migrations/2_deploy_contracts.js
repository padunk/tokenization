const Token = artifacts.require("./Token.sol");
const TokenSale = artifacts.require("./TokenSale.sol");
const KycContract = artifacts.require("./KycContract.sol");
require("dotenv").config({ path: "../.env" });

const initialToken = process.env.INITIAL_TOKEN;

module.exports = async function (deployer) {
    const addr = await web3.eth.getAccounts();
    await deployer.deploy(Token, initialToken);
    await deployer.deploy(KycContract);
    await deployer.deploy(
        TokenSale,
        1,
        addr[0],
        Token.address,
        KycContract.address
    );
    const tokenInstance = await Token.deployed();
    await tokenInstance.transfer(TokenSale.address, initialToken);
};

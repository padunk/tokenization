const Token = artifacts.require("Token");
const TokenSale = artifacts.require("TokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./chaiSetup");
const BN = web3.utils.BN;
const { expect } = chai;

let token, tokenSale, kyc;

contract("TokenSale Test", async (accounts) => {
    const [deployer, account1, account2, ...otherAccounts] = accounts;

    beforeEach(async () => {
        token = await Token.deployed();
        tokenSale = await TokenSale.deployed();
        kyc = await KycContract.deployed();
    });

    it("should not have any tokens in deployer account", async () => {
        await expect(
            token.balanceOf(deployer)
        ).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("should be possible to buy token", async () => {
        let account1Balance = await token.balanceOf.call(account1);
        await expect(
            tokenSale.sendTransaction({
                from: account1,
                value: web3.utils.toWei("1", "wei"),
            })
        ).to.be.rejected;

        await expect(account1Balance).to.be.a.bignumber.equal(
            await token.balanceOf.call(account1)
        );

        // add kyc
        await kyc.setAllowed(account1);
        await expect(
            tokenSale.sendTransaction({
                from: account1,
                value: web3.utils.toWei("1", "wei"),
            })
        ).to.be.fulfilled;

        await expect(account1Balance + 1).to.be.a.bignumber.equal(
            await token.balanceOf.call(account1)
        );
    });
});

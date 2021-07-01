const Token = artifacts.require("Token");
require("dotenv").config({ path: "../.env" });

const chai = require("./chaiSetup");
const BN = web3.utils.BN;
const { expect } = chai;

let instance, totalSupply, balance;

contract("Token Test", async (accounts) => {
    const [deployer, account1] = accounts;

    beforeEach(async () => {
        instance = await Token.new(process.env.INITIAL_TOKEN);
    });

    it("All tokens should be in my account", async () => {
        totalSupply = await instance.totalSupply(); // bignumber
        balance = await instance.balanceOf(deployer); // bignumber
        expect(balance).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be able to transfer token between accounts", async () => {
        totalSupply = await instance.totalSupply(); // bignumber
        balance = await instance.balanceOf(deployer); // bignumber
        const sendTokens = 1;
        await expect(instance.transfer(account1, sendTokens)).to.eventually.be
            .fulfilled;
        await expect(
            instance.balanceOf(deployer)
        ).to.eventually.be.a.bignumber.equal(
            totalSupply.sub(new BN(sendTokens))
        );
        await expect(
            instance.balanceOf(account1)
        ).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("should not send more token than the balance", async () => {
        balance = await instance.balanceOf(deployer); // bignumber
        await expect(instance.transfer(account1, new BN(balance + 1))).to
            .eventually.be.rejected;
    });
});

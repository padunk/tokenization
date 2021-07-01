const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const BN = web3.utils.BN;
chai.use(require("chai-bn")(BN));
chai.use(chaiAsPromised);

module.exports = chai;

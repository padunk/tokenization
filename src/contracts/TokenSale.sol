// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CrowdSale.sol";
import './KycContract.sol';

contract TokenSale is Crowdsale {

    KycContract kycContract;
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _kycContract
    )
        Crowdsale(rate, wallet, token)
    {
        kycContract = _kycContract;
    }

    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal view override {
        super._preValidatePurchase(_beneficiary, _weiAmount);
        require(kycContract.getAllowed(_beneficiary), "KYC not completed yet, aborting");
    }
}

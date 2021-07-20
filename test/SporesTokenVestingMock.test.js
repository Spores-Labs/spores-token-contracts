const BN = require("bn.js");
var config = require("../conf/config");
const SporesToken = artifacts.require("SporesToken");
const SporesTokenVestingMock = artifacts.require("SporesTokenVestingMock");

contract('SporesTokenVesting', (accounts) => {
    const [owner] = accounts;

    let token;
    let vestHub;
    const _name = "Spores Token"; // Token name
    const _symbol = "SPO"; // Token symbol
    const _decimals = new BN(8); // Token decimals
    const _cap = new BN("500000000000000000"); // Token total supply
    const listingDatetimestamp = new BN("1625619600"); // Date and time (GMT): Wednesday, 7 July 2021 01:00:00

    before(async () => {
        token = await SporesToken.new(_name, _symbol, _decimals, _cap, { from: owner });
        vestHub = await SporesTokenVestingMock.new(token.address, listingDatetimestamp, { from: owner });

        // Add minter role
        await token.mint(vestHub.address, _cap, { from: owner });

        // Add beneficiaries
        config.tesnetBeneficiaries.forEach(async info => {
            const decimalsBN = new BN(_decimals);
            const multiplyBN = new BN(10);
            const amountBN = new BN(info.amount);
            const upfrontAmountBN = new BN(info.upfrontAmount);

            const sendAmount = amountBN.mul(multiplyBN.pow(decimalsBN));
            const sendUpfrontAmount = upfrontAmountBN.mul(multiplyBN.pow(decimalsBN));
            await vestHub
                .addBeneficiary(
                    info.address,
                    sendAmount,
                    info.lockDuration,
                    info.vestingDuration,
                    sendUpfrontAmount,
                    info.vestingInternal,
                    { from: owner }
                );
        });
    });

    it('Public sale [0xdC0DFD55954c93a284faFA7aa3861aA366e0E56f] should be unlocked all 80,000,000 SPO', async () => {
        const balance = await token.balanceOf('0xdC0DFD55954c93a284faFA7aa3861aA366e0E56f');
        assert.equal(balance.toString(), '8000000000000000');
    });

    it('Seed sale [0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2] should be unlocked upfront amount 5,000,000/100,000,000 SPO', async () => {
        const balance = await token.balanceOf('0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2');
        assert.equal(balance.toString(), '500000000000000');
    });

    it('Seed sale [0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2] should be remain by 95,000,000/100,000,000 SPO', async () => {
        const info = await vestHub.beneficiaries('0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2', { from: owner });
        assert.equal(info.leftOverVestingAmount.toString(), '9500000000000000');
    });

    it('Seed sale [0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2] should be vested after 1 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1628384400")); //Sunday, 8 August 2021 01:00:00 1 month

        // Get vested amount
        const response = await vestHub.releasableAmount('0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '1027777777777777'); // 5,000,000 + 5,277,777 * 1 = 10,277,777 
        assert.equal(newAvailableAmount.toString(), '527777777777777'); // 5,277,777 * 1
        // Compare
    });

    it('Seed sale [0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2] should be vested after 12 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1657242000")); // Friday, 8 July 2022 01:00:00
        // Get vested amount
        const response = await vestHub.releasableAmount('0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '6833333333333333'); // 5,000,000 + 5,277,777 * 12 = 68,333,333.33333333
        assert.equal(newAvailableAmount.toString(), '6333333333333333'); // 5,277,777 * 12 = 63,333,333.33333333
        // Compare
    });

    it('Seed sale [0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2] should be vested after 18 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1673139600")); // Sunday, 8 January 2023 01:00:00

        // Get vested amount
        const response = await vestHub.releasableAmount('0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '10000000000000000'); // 5,000,000 + 5,277,777 * 18 = 100,000,000
        assert.equal(newAvailableAmount.toString(), '9500000000000000'); // 5,277,777 * 18 = 95,000,000
    });

    it('Seed sale [0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2] check release [init, 1, 12, 18] month', async () => {
        // before release
        let balance = await token.balanceOf('0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2');
        assert.equal(balance.toString(), '500000000000000');
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1628384400")); //Sunday, 8 August 2021 01:00:00 1 month
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2');
        assert.equal(balance.toString(), '1027777777777777');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1657242000")); // Friday, 8 July 2022 01:00:00 12 month
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2');
        assert.equal(balance.toString(), '6833333333333332');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1673139600")); // Sunday, 8 January 2023 01:00:00 18 month
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0xC555ba71185FbDb4CBe95ba774Dae9f15f1fD8e2');
        assert.equal(balance.toString(), '10000000000000000');
    });

    it('Private sale [0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A] should be unlocked upfront amount 33,000,000/660,000,000 SPO', async () => {
        const balance = await token.balanceOf('0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A');
        assert.equal(balance.toString(), '3300000000000000');
    });

    it('Private sale [0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A] should be vested after 1 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1628384400")); //Sunday, 8 August 2021 01:00:00 1 month


        // Get vested amount
        const response = await vestHub.releasableAmount('0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '8525000000000000'); // 33,000,000 + 52,250,000 * 1
        assert.equal(newAvailableAmount.toString(), '5225000000000000'); // 52,250,000 * 1
        // Compare
    });

    it('Private sale [0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A] should be vested after 6 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1642640400")); // Saturday, 8 January 2022 01:00:00


        // Get vested amount
        const response = await vestHub.releasableAmount('0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];



        assert.equal(totalVestedAmount.toString(), '34650000000000000'); // 33,000,000 + 52,250,000 * 5 = 346,500,000 
        assert.equal(newAvailableAmount.toString(), '31350000000000000'); // 52,250,000 * 5 = 313,500,000
        // Compare
    });

    it('Private sale [0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A] should be vested after 12 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1657242000")); // Friday, 8 July 2022 01:00:00


        // Get vested amount
        const response = await vestHub.releasableAmount('0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '66000000000000000'); // 33,000,000 + 52,250,000 * 12 = 660,000,000 
        assert.equal(newAvailableAmount.toString(), '62700000000000000'); // 52,250,000 * 12 = 627,000,000
        // Compare
    });

    it('Private sale [0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A] check release [init, 1, 6, 12] month', async () => {
        // before release
        let balance = await token.balanceOf('0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A');
        assert.equal(balance.toString(), '3300000000000000');
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1628384400")); //Sunday, 8 August 2021 01:00:00 1 month
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A');
        assert.equal(balance.toString(), '8525000000000000');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1642640400")); // Saturday, 8 January 2022 01:00:00 6 month
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A');
        assert.equal(balance.toString(), '34650000000000000');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1673139600")); // Sunday, 8 January 2023 01:00:00 12 month
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0xeEe0113CFc119FeaB8278cF46dd6DFBeb8F5D04A');
        assert.equal(balance.toString(), '66000000000000000');
    });


    // Team 1

    it('Team 1 Wallet 1 [0xA75ca7245C834A755bcdCc4fb890432189ecc546] locked 11 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1654045200"));  // Wednesday, 1 June 2022 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0xA75ca7245C834A755bcdCc4fb890432189ecc546');
        assert.equal(balance.toString(), '0');
    });

    it('Team 1 Wallet 1 [0xA75ca7245C834A755bcdCc4fb890432189ecc546] release at 12 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1657242000")); // Friday, 8 July 2022 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0xA75ca7245C834A755bcdCc4fb890432189ecc546');
        assert.equal(balance.toString(), '1000000000000000');
    });

    it('Team 1 Wallet 2 [0xA141B3aa2e5F97765f004E1e4236f8986663946d] locked 23 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1685581200")); // Thursday, 1 June 2023 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0xA141B3aa2e5F97765f004E1e4236f8986663946d');
        assert.equal(balance.toString(), '0');
    });

    it('Team 1 Wallet 2 [0xA141B3aa2e5F97765f004E1e4236f8986663946d] release at 24 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1688783426")); // Saturday, 8 July 2023 02:30:26
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0xA141B3aa2e5F97765f004E1e4236f8986663946d');
        assert.equal(balance.toString(), '1500000000000000');
    });

    it('Team 1 Wallet 3 [0xE016fCf768c65966DF61eec42D7d21b55EE6d820] locked 35 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1717203600")); // Saturday, 1 June 2024 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0xE016fCf768c65966DF61eec42D7d21b55EE6d820');
        assert.equal(balance.toString(), '0');
    });

    it('Team 1 Wallet 3 [0xE016fCf768c65966DF61eec42D7d21b55EE6d820] release at 36 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1720400400")); // Monday, 8 July 2024 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0xE016fCf768c65966DF61eec42D7d21b55EE6d820');
        assert.equal(balance.toString(), '2500000000000000');
    });

    // Team 2

    it('Team 2 Wallet 1 [0x5B7c96378BF89a1db98c0b36B6CF2AfC90F69D18] locked 11 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1654045200"));  // Wednesday, 1 June 2022 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x5B7c96378BF89a1db98c0b36B6CF2AfC90F69D18');
        assert.equal(balance.toString(), '0');
    });

    it('Team 2 Wallet 1 [0x5B7c96378BF89a1db98c0b36B6CF2AfC90F69D18] release at 12 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1657242000")); // Friday, 8 July 2022 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x5B7c96378BF89a1db98c0b36B6CF2AfC90F69D18');
        assert.equal(balance.toString(), '1250000000000000');
    });

    it('Team 2 Wallet 2 [0x5E37489F38E4A985F868B4eC4340ED3fce67b169] locked 23 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1685581200")); // Thursday, 1 June 2023 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x5E37489F38E4A985F868B4eC4340ED3fce67b169');
        assert.equal(balance.toString(), '0');
    });

    it('Team 2 Wallet 2 [0x5E37489F38E4A985F868B4eC4340ED3fce67b169] release at 24 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1688783426")); // Saturday, 8 July 2023 02:30:26
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x5E37489F38E4A985F868B4eC4340ED3fce67b169');
        assert.equal(balance.toString(), '1875000000000000');
    });

    it('Team 2 Wallet 3 [0x54a36B3a31A4b1b224747d78b503EC8c1F07D24d] locked 35 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1717203600")); // Saturday, 1 June 2024 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x54a36B3a31A4b1b224747d78b503EC8c1F07D24d');
        assert.equal(balance.toString(), '0');
    });

    it('Team 2 Wallet 3 [0x54a36B3a31A4b1b224747d78b503EC8c1F07D24d] release at 36 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1720400400")); // Monday, 8 July 2024 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x54a36B3a31A4b1b224747d78b503EC8c1F07D24d');
        assert.equal(balance.toString(), '3125000000000000');
    });

    // Team 3

    it('Team 3 Wallet 1 [0x3a7b58e4cA14896a1C9f21F22cC0646b154add51] locked 11 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1654045200"));  // Wednesday, 1 June 2022 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x3a7b58e4cA14896a1C9f21F22cC0646b154add51');
        assert.equal(balance.toString(), '0');
    });

    it('Team 3 Wallet 1 [0x3a7b58e4cA14896a1C9f21F22cC0646b154add51] release at 12 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1657242000")); // Friday, 8 July 2022 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x3a7b58e4cA14896a1C9f21F22cC0646b154add51');
        assert.equal(balance.toString(), '1250000000000000');
    });

    it('Team 3 Wallet 2 [0xD194699D9E351D6b7729612d4ca0fC4ACD5dfE69] locked 23 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1685581200")); // Thursday, 1 June 2023 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0xD194699D9E351D6b7729612d4ca0fC4ACD5dfE69');
        assert.equal(balance.toString(), '0');
    });

    it('Team 3 Wallet 2 [0xD194699D9E351D6b7729612d4ca0fC4ACD5dfE69] release at 24 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1688783426")); // Saturday, 8 July 2023 02:30:26
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0xD194699D9E351D6b7729612d4ca0fC4ACD5dfE69');
        assert.equal(balance.toString(), '1875000000000000');
    });

    it('Team 3 Wallet 3 [0x46580453802f1896bB0f28a9e1717aca62D684B9] locked 35 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1717203600")); // Saturday, 1 June 2024 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x46580453802f1896bB0f28a9e1717aca62D684B9');
        assert.equal(balance.toString(), '0');
    });

    it('Team 3 Wallet 3 [0x46580453802f1896bB0f28a9e1717aca62D684B9] release at 36 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1720400400")); // Monday, 8 July 2024 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x46580453802f1896bB0f28a9e1717aca62D684B9');
        assert.equal(balance.toString(), '3125000000000000');
    });

    // Team 4

    it('Team 4 Wallet 1 [0x837c6aFe7fB26107FFdDDEe1a48Fd39F709D3C28] locked 11 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1654045200"));  // Wednesday, 1 June 2022 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x837c6aFe7fB26107FFdDDEe1a48Fd39F709D3C28');
        assert.equal(balance.toString(), '0');
    });

    it('Team 4 Wallet 1 [0x837c6aFe7fB26107FFdDDEe1a48Fd39F709D3C28] release at 12 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1657242000")); // Friday, 8 July 2022 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x837c6aFe7fB26107FFdDDEe1a48Fd39F709D3C28');
        assert.equal(balance.toString(), '11500000000000000');
    });

    it('Team 4 Wallet 2 [0x77731aF3e7B380169A4840BdbEB0f51d15C2762b] locked 23 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1685581200")); // Thursday, 1 June 2023 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x77731aF3e7B380169A4840BdbEB0f51d15C2762b');
        assert.equal(balance.toString(), '0');
    });

    it('Team 4 Wallet 2 [0x77731aF3e7B380169A4840BdbEB0f51d15C2762b] release at 24 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1688783426")); // Saturday, 8 July 2023 02:30:26
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x77731aF3e7B380169A4840BdbEB0f51d15C2762b');
        assert.equal(balance.toString(), '17250000000000000');
    });

    it('Team 4 Wallet 3 [0xA009Da1503931738382a1358140D47A5c85444eC] locked 35 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1717203600")); // Saturday, 1 June 2024 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0xA009Da1503931738382a1358140D47A5c85444eC');
        assert.equal(balance.toString(), '0');
    });

    it('Team 4 Wallet 3 [0xA009Da1503931738382a1358140D47A5c85444eC] release at 36 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1720400400")); // Monday, 8 July 2024 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0xA009Da1503931738382a1358140D47A5c85444eC');
        assert.equal(balance.toString(), '28750000000000000');
    });

    // Advisor

    it('Advisor Wallet 1 [0x51Ed3ED377B22FeDe1D3492B6D071ee404553C83] locked 11 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1654045200"));  // Wednesday, 1 June 2022 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x51Ed3ED377B22FeDe1D3492B6D071ee404553C83');
        assert.equal(balance.toString(), '0');
    });

    it('Advisor Wallet 1 [0x51Ed3ED377B22FeDe1D3492B6D071ee404553C83] release at 12 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1657242000")); // Friday, 8 July 2022 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x51Ed3ED377B22FeDe1D3492B6D071ee404553C83');
        assert.equal(balance.toString(), '3000000000000000');
    });

    it('Advisor Wallet 2 [0x89077cbeb8db0b5057f1E078474443232CfE916b] locked 23 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1685581200")); // Thursday, 1 June 2023 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x89077cbeb8db0b5057f1E078474443232CfE916b');
        assert.equal(balance.toString(), '0');
    });

    it('Advisor Wallet 2 [0x89077cbeb8db0b5057f1E078474443232CfE916b] release at 24 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1688783426")); // Saturday, 8 July 2023 02:30:26
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x89077cbeb8db0b5057f1E078474443232CfE916b');
        assert.equal(balance.toString(), '4500000000000000');
    });

    it('Advisor Wallet 3 [0x47f2F3ADD8624fc24042A0a5DabB8edf5e859f05] locked 35 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1717203600")); // Saturday, 1 June 2024 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x47f2F3ADD8624fc24042A0a5DabB8edf5e859f05');
        assert.equal(balance.toString(), '0');
    });

    it('Advisor Wallet 3 [0x47f2F3ADD8624fc24042A0a5DabB8edf5e859f05] release at 36 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1720400400")); // Monday, 8 July 2024 01:00:00
        await vestHub.releaseAllTokens({ from: owner });

        const balance = await token.balanceOf('0x47f2F3ADD8624fc24042A0a5DabB8edf5e859f05');
        assert.equal(balance.toString(), '7500000000000000');
    });


    // Liquidity Pool

    it('Liquidity 1 [0x56e4a625dAc993f6CC81dc650c7ce5565cE39a4b] should be unlocked all 50,000,000 SPO', async () => {
        const balance = await token.balanceOf('0x56e4a625dAc993f6CC81dc650c7ce5565cE39a4b');
        assert.equal(balance.toString(), '5000000000000000');
    });

    it('Liquidity 2 [0x83dCE5d41bD4123eF6770033c4CfE8b79569203b] should be unlocked all 50,000,000 SPO', async () => {
        const balance = await token.balanceOf('0x83dCE5d41bD4123eF6770033c4CfE8b79569203b');
        assert.equal(balance.toString(), '5000000000000000');
    });

    it('Liquidity 3 [0x676742F9435A2f642CC32f6f6a8C111A03454002] should be unlocked all 50,000,000 SPO', async () => {
        const balance = await token.balanceOf('0x676742F9435A2f642CC32f6f6a8C111A03454002');
        assert.equal(balance.toString(), '5000000000000000');
    });

    // Community

    it('Community [0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133] check release [init, 4, 8, 12] weeks', async () => {
        // before release
        let balance = await token.balanceOf('0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133');
        assert.equal(balance.toString(), '0');
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1628384400")); //Sunday, 8 August 2021 01:00:00 4 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133');
        assert.equal(balance.toString(), '20000000000000000');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1631062800")); // Wednesday, 8 September 2021 01:00:00 8 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133');
        assert.equal(balance.toString(), '40000000000000000');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1633654800")); // Friday, 8 October 2021 01:00:00 12 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133');
        assert.equal(balance.toString(), '60000000000000000');
    });

    it('Community [0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133] should be remain by 600,000,000/600,000,000 SPO', async () => {
        const info = await vestHub.beneficiaries('0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133', { from: owner });
        assert.equal(info.leftOverVestingAmount.toString(), '60000000000000000');
    });

    it('Community [0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133] should be vested after 1 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1628384400")); //Sunday, 8 August 2021 01:00:00 1 month

        // Get vested amount
        const response = await vestHub.releasableAmount('0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '20000000000000000'); // 50,000,000 * 4 = 200,000,000
        assert.equal(newAvailableAmount.toString(), '20000000000000000'); // 50,000,000 * 4 = 200,000,000
        // Compare
    });

    it('Community [0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133] should be vested after 2 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1631062800")); // Wednesday, 8 September 2021 01:00:00

        // Get vested amount
        const response = await vestHub.releasableAmount('0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '40000000000000000'); // 50,000,000 * 8 = 400,000,000
        assert.equal(newAvailableAmount.toString(), '40000000000000000'); // 50,000,000 * 8 = 400,000,000
        // Compare
    });

    it('Community [0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133] should be vested after 3 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1633654800")); // Friday, 8 October 2021 01:00:00

        // Get vested amount
        const response = await vestHub.releasableAmount('0x8Ad78F3C2cE9cB389Be514B0B3aFB2Be40D40133', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '60000000000000000'); // 50,000,000 * 12 = 600,000,000
        assert.equal(newAvailableAmount.toString(), '60000000000000000'); // 50,000,000 * 12 = 600,000,000
        // Compare
    });

    // Ecosystem

    it('Ecosystem [0xF70f21D76B42ae99043Cc74016762A7f781d778c] check release [init, 4, 8, 12, 24] weeks', async () => {
        // before release
        let balance = await token.balanceOf('0xF70f21D76B42ae99043Cc74016762A7f781d778c');
        assert.equal(balance.toString(), '0');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1628384400")); //Sunday, 8 August 2021 01:00:00 4 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0xF70f21D76B42ae99043Cc74016762A7f781d778c');
        assert.equal(balance.toString(), '12500000000000000');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1631062800")); // Wednesday, 8 September 2021 01:00:00 8 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0xF70f21D76B42ae99043Cc74016762A7f781d778c');
        assert.equal(balance.toString(), '25000000000000000');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1633654800")); // Friday, 8 October 2021 01:00:00 12 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0xF70f21D76B42ae99043Cc74016762A7f781d778c');
        assert.equal(balance.toString(), '37500000000000000');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1641603600")); // Saturday, 8 January 2022 01:00:00 24 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0xF70f21D76B42ae99043Cc74016762A7f781d778c');
        assert.equal(balance.toString(), '75000000000000000');
    });

    it('Ecosystem [0xF70f21D76B42ae99043Cc74016762A7f781d778c] should be remain by 750,000,000/750,000,000 SPO', async () => {
        const info = await vestHub.beneficiaries('0xF70f21D76B42ae99043Cc74016762A7f781d778c', { from: owner });
        assert.equal(info.leftOverVestingAmount.toString(), '75000000000000000');
    });

    it('Ecosystem [0xF70f21D76B42ae99043Cc74016762A7f781d778c] should be vested after 1 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1628384400")); //Sunday, 8 August 2021 01:00:00 1 month

        // Get vested amount
        const response = await vestHub.releasableAmount('0xF70f21D76B42ae99043Cc74016762A7f781d778c', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '12500000000000000'); // 31,250,000 * 4 = 125,000,000
        assert.equal(newAvailableAmount.toString(), '12500000000000000'); // 31,250,000 * 4 = 125,000,000
        // Compare
    });

    it('Ecosystem [0xF70f21D76B42ae99043Cc74016762A7f781d778c] should be vested after 2 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1631062800")); // Wednesday, 8 September 2021 01:00:00

        // Get vested amount
        const response = await vestHub.releasableAmount('0xF70f21D76B42ae99043Cc74016762A7f781d778c', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '25000000000000000'); // 31,250,000 * 8 = 250,000,000
        assert.equal(newAvailableAmount.toString(), '25000000000000000'); // 31,250,000 * 8 = 250,000,000
        // Compare
    });

    it('Ecosystem [0xF70f21D76B42ae99043Cc74016762A7f781d778c] should be vested after 3 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1633654800")); // Friday, 8 October 2021 01:00:00

        // Get vested amount
        const response = await vestHub.releasableAmount('0xF70f21D76B42ae99043Cc74016762A7f781d778c', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '37500000000000000'); // 31,250,000 * 12 = 375,000,000
        assert.equal(newAvailableAmount.toString(), '37500000000000000'); // 31,250,000 * 12 = 375,000,000
        // Compare
    });

    it('Ecosystem [0xF70f21D76B42ae99043Cc74016762A7f781d778c] should be vested after 6 month', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1641603600")); // Saturday, 8 January 2022 01:00:00

        // Get vested amount
        const response = await vestHub.releasableAmount('0xF70f21D76B42ae99043Cc74016762A7f781d778c', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '75000000000000000'); // 31,250,000 * 12 = 375,000,000
        assert.equal(newAvailableAmount.toString(), '75000000000000000'); // 31,250,000 * 12 = 375,000,000
        // Compare
    });

    // Mining

    it('Mining [0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7] check release [init, 4, 141, 144] weeks', async () => {
        // before release
        let balance = await token.balanceOf('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7');
        assert.equal(balance.toString(), '0');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1626483600")); // Saturday, 17 July 2021 01:00:00 1 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7');
        assert.equal(balance.toString(), '868055555555555');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1717203600")); // Saturday, 1 June 2024 01:00:00 141 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7');
        assert.equal(balance.toString(), '122395833333333332');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1720400400")); // Monday, 8 July 2024 01:00:00 144 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7');
        assert.equal(balance.toString(), '125000000000000000');
    });

    it('Mining [0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7] should be remain by 1,250,000,000/1,250,000,000 SPO', async () => {
        const info = await vestHub.beneficiaries('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7', { from: owner });
        assert.equal(info.leftOverVestingAmount.toString(), '125000000000000000');
    });

    it('Mining [0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7] should be vested after 1 weeks', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1626483600")); // Saturday, 17 July 2021 01:00:00
        // await vestHub.releaseAllTokens({ from: owner });

        // const balance = await token.balanceOf('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7');
        // assert.equal(balance.toString(), '868055555555555'); // 8,680,555 x 1  = 8,680,555

        const response = await vestHub.releasableAmount('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '868055555555555'); // 8,680,555 x 1  = 8,680,555
        assert.equal(newAvailableAmount.toString(), '868055555555555'); // 8,680,555 x 1  = 8,680,555
    });


    it('Mining [0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7] should be vested after 141 weeks', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1717203600")); // Saturday, 1 June 2024 01:00:00
        // await vestHub.releaseAllTokens({ from: owner });

        // const balance = await token.balanceOf('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7');
        // assert.equal(balance.toString(), '122395833333333333');

        const response = await vestHub.releasableAmount('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '122395833333333333'); // 8,680,555 x 141  = 1,223,958,333
        assert.equal(newAvailableAmount.toString(), '122395833333333333'); // 8,680,555 x 141  = 1,223,958,333
    });

    it('Mining [0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7] should be vested after 144 weeks', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1720400400")); // Monday, 8 July 2024 01:00:00
        // await vestHub.releaseAllTokens({ from: owner });

        // const balance = await token.balanceOf('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7');
        // assert.equal(balance.toString(), '125000000000000000');


        const response = await vestHub.releasableAmount('0x5bb47070Ef07D67Dcba3Ff545ead4276d30B74d7', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '125000000000000000'); // 8,680,555 x 144 = 1,250,000,000
        assert.equal(newAvailableAmount.toString(), '125000000000000000'); // 8,680,555 x 144  = 1,250,000,000
    });

    // Reserve

    it('Reserve [0x2653Fba012ec8cf1ab5a459745de3961a9F27d94] check release [init, 4, 119, 120] weeks', async () => {
        // before release
        let balance = await token.balanceOf('0x2653Fba012ec8cf1ab5a459745de3961a9F27d94');
        assert.equal(balance.toString(), '0');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1626483600")); // Saturday, 17 July 2021 01:00:00 1 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0x2653Fba012ec8cf1ab5a459745de3961a9F27d94');
        assert.equal(balance.toString(), '425000000000000');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1703034000")); // Tuesday, 2 January 2024 01:00:00 119 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0x2653Fba012ec8cf1ab5a459745de3961a9F27d94');
        assert.equal(balance.toString(), '50575000000000000');

        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1704675600")); // Monday, 8 January 2024 01:00:00 120 weeks
        await vestHub.releaseAllTokens({ from: owner });

        balance = await token.balanceOf('0x2653Fba012ec8cf1ab5a459745de3961a9F27d94');
        assert.equal(balance.toString(), '51000000000000000');
    });

    it('Reserve [0x2653Fba012ec8cf1ab5a459745de3961a9F27d94] should be remain by 550,000,000/550,000,000 SPO', async () => {
        const info = await vestHub.beneficiaries('0x2653Fba012ec8cf1ab5a459745de3961a9F27d94', { from: owner });
        assert.equal(info.leftOverVestingAmount.toString(), '51000000000000000');
    });

    it('Reserve [0x2653Fba012ec8cf1ab5a459745de3961a9F27d94] should be vested after 1 weeks', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1626483600")); // Saturday, 17 July 2021 01:00:00

        const response = await vestHub.releasableAmount('0x2653Fba012ec8cf1ab5a459745de3961a9F27d94', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '425000000000000'); // 4,250,000 x 1  = 4,250,000
        assert.equal(newAvailableAmount.toString(), '425000000000000'); // 4,250,000 x 1  = 4,250,000
    });


    it('Reserve [0x2653Fba012ec8cf1ab5a459745de3961a9F27d94] should be vested after 119 weeks', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1703034000")); // Tuesday, 2 January 2024 01:00:00

        const response = await vestHub.releasableAmount('0x2653Fba012ec8cf1ab5a459745de3961a9F27d94', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '50575000000000000'); // 4,250,000 x 119  = 505,750,000
        assert.equal(newAvailableAmount.toString(), '50575000000000000'); // 4,250,000 x 119  = 505,750,000
    });

    it('Reserve [0x2653Fba012ec8cf1ab5a459745de3961a9F27d94] should be vested after 120 weeks', async () => {
        // Set mock timestamp
        await vestHub.setBlockTimestamp(new BN("1704675600")); // Monday, 8 January 2024 01:00:00

        const response = await vestHub.releasableAmount('0x2653Fba012ec8cf1ab5a459745de3961a9F27d94', { from: owner });

        const totalVestedAmount = response[0];
        const newAvailableAmount = response[1];

        assert.equal(totalVestedAmount.toString(), '51000000000000000'); // 4,250,000 x 120 = 510,000,000
        assert.equal(newAvailableAmount.toString(), '51000000000000000'); // 4,250,000 x 120  = 510,000,000
    });
});
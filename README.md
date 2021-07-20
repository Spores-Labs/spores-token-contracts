
### Contracts
| Name | Feature |
|--|--|
| SporesToken.sol | ERC20 token of Spores |
| ISporesToken| Interface of Spores token use in vesting contract |
| SporesTokenVesting.sol | Vesting token contract. Which will distribute to wallets base on settings of vesting schedule |
| SporesTokenVestingMocking.sol | Mocking contract for local testing **Do not deploy it to network** |
| UsingLiquidityProtectionService | **Anti Bot service protection (111PG)** |
| UniswapV2Library | **Anti Bot service protection (111PG)** |
| UniswapV3Library | **Anti Bot service protection (111PG)** |
| UniswapV3Library | **Anti Bot service protection (111PG)** |
| IPLPS | **Anti Bot service protection (111PG)** |
### Configuration
|Name| Description |
|--|--|
| address | Wallet of the beneficiary |
| amount| Total distribution amount to the beneficiary|
| upfrontAmount| Amount of tokens will be transfer to the beneficiary at TGE |
| lockDuration| Lock time to prevent early token release|
| vestingDuration| Total vesting duration to distribute full tokens to the beneficiary |
| vestingInternal| Minimum require time to release tokens to the beneficiary |

### Deployment Flow(using script)

 1. Deploy SporesToken contract using SporesToken.sol
 2. Deploy SporesTokenVesting contract using SporesTokenVesting.sol
 3. Owner calls SporesToken to mint all tokens to vesting contract for now the total cap is 5,000,000,000
 4. Owner calls SporesTokenVesting contract (addBeneficiary method) to add new beneficiary with settings in configuration file. **No duplicated address**
 5. Verify contracts
 
### Release Flow
Both owner and beneficiary can call contract SporesTokenVesting method to release vested tokens up to current datetime.
 1. Go to [Ethereum (ETH) Blockchain Explorer (etherscan.io)](https://etherscan.io/) [or [TESTNET Rinkeby (ETH) Blockchain Explorer (etherscan.io)](https://rinkeby.etherscan.io/)] and go to deployed address of SporesTokenVesting contract
 2. Go to **Contract > Write Contract > Connect to** owner wallet or your beneficiary wallet
 3. If you are **owner** of vesting contract **call releaseAllTokens method** > Confirm transaction > Check transaction result
 4. If you are **beneficiary** of vesting contract. You can **call releaseMyTokens** method > Confirm transaction > Check transaction result

const tesnetBeneficiaries = [
  // tatal supply 5b 5,000,000,000
  // ==========================================================================
  // total seed, private, public 16.8% 84 0,000,000
  // seed sale 100,000,000
  {
    address: "0x945Eea57ffc1c870a1ee1F14bA1E4Fc1d2202dED",
    amount: "100000000", // 100m
    upfrontAmount: "5000000", // 5% 5m
    lockDuration: "0",
    vestingDuration: "5400", // 18 months (30 days as a month) 46656000 seconds,
    vestingInternal: "300", // release vesting per 1 month
    isSender: true,
  },
  // public sale 80,000,000
  {
    address: "0x7264C37d13740f991b4C0127A487Be2f52647133",
    amount: "80000000", // 80m
    upfrontAmount: "80000000", // 100% 80m
    lockDuration: "0", // no lock
    vestingDuration: "0", // unlock 100%
    vestingInternal: "0", // no vesting internal
    isSender: true,
  },
  // private sale 660,000,000
  {
    // address: "0x413225A1d1e4562cF6073206A6D07d2690cc0be4",
    address: "0xB919c437C468e820DdeA7B5ED773e73d68f8402D",
    amount: "660000000", // 660m
    upfrontAmount: "33000000", // 5% 33m
    lockDuration: "0",
    vestingDuration: "3600", // 12 months (30 days as a month)
    vestingInternal: "300", // release vesting per 1 month
    isSender: true,
  },
  // ==========================================================================
  // total team 15% 750,000,000
  // ==========================================================================
  // team 1 1% 50,000,000
  // ==========================================================================
  // wallet 1 20% lock 1 year of 50,000,000 10m
  {
    address: "0x0aC0C1680c007afD24e7F5538c704A3a9Eb302a5",
    amount: "10000000", // 10m
    upfrontAmount: "0",
    lockDuration: "7200", // lock 2 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  //  wallet 2 30% lock 2 years of 50,000,000 15m
  {
    address: "0xC0e09A112Ae45d87597CD78c11b7D95a55aCC5F0",
    amount: "15000000", // 15m
    upfrontAmount: "0",
    lockDuration: "10800", // lock 3 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 3 50% lock 3 years of 50,000,000 25m
  {
    address: "0xa226e1963Aa07fa7B3898F1DD1A331e6Bd4179E6",
    amount: "25000000", // 25m
    upfrontAmount: "0",
    lockDuration: "14400", // lock 4 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // ==========================================================================
  // team 2 1.25% 62,500,000
  // ==========================================================================
  // wallet 1 20% lock 1 year of 62,500,000 12,5m
  // ==========================================================================
  {
    address: "0x680420778088b18088Abc658351377d65FA62bD1",
    amount: "12500000", // 12,5m
    upfrontAmount: "0",
    lockDuration: "7200", // lock 2 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 2 30% lock 2 years of 62,500,000 18,75m
  {
    address: "0xe935fB98D37694074C6C4082E06cD392D8c9cB06",
    amount: "18750000", // 18,75m
    upfrontAmount: "0",
    lockDuration: "10800", // lock 3 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 3 50% lock 3 years of 62,500,000 31,25m
  {
    address: "0x6d4E9C723948Cdbb9F6aA398B3CbB97D198c4ECa",
    amount: "31250000", // 31,25m
    upfrontAmount: "0",
    lockDuration: "14400", // lock 4 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // ==========================================================================
  // team 3 1.25% 62,500,000
  // ==========================================================================
  // wallet 1 20% lock 1 year of 62,500,000 12,5m
  // ==========================================================================
  {
    address: "0xaeFefE2c60718d9033aF55Ac0E90992FC645C699",
    amount: "12500000", // 10m
    upfrontAmount: "0",
    lockDuration: "7200", // lock 2 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 2 30% lock 2 years of 62,500,000 18,75m
  {
    address: "0xd8d344e6F75dDE8c7d9d2978d5cc23C088f504eA",
    amount: "18750000", // 450m
    upfrontAmount: "0",
    lockDuration: "10800", // lock 3 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 3 50% lock 3 years of 62,500,000 31,25m
  {
    address: "0xC305D523c4746a2339cDF4981037cb90612487AB",
    amount: "31250000", // 750m
    upfrontAmount: "0",
    lockDuration: "14400", // lock 4 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // ==========================================================================
  // team 4 11.5% 575,000,000 575m
  // ==========================================================================
  // wallet 1 20% lock 1 year of 575,000,000 115m
  // ==========================================================================
  {
    address: "0x82A97e0C458B8c4e873404B8E90933587BD1c73c",
    amount: "115000000", // 115m
    upfrontAmount: "0",
    lockDuration: "7200", // lock 2 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 2 30% lock 2 years of 575,000,000 172,5m
  {
    address: "0x6BAa8Ebdb4C8BD40cD64D4A103b5eABd8535E83C",
    amount: "172500000", // 172,5m
    upfrontAmount: "0",
    lockDuration: "10800", // lock 3 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 3 50% lock 3 years of 575,000,000 287,5m
  {
    address: "0x579D12d63A4392447Cd6a29d0Ba6BBF90d101B2b",
    amount: "287500000", // 287,5m
    upfrontAmount: "0",
    lockDuration: "14400", // lock 4 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // total advisor 3% 150,000,000 150m
  // advisor 1 20% lock 1 years 30,000,000 30m
  {
    address: "0x64898041f1f133873BDCa2c3c931633852a81d7F",
    amount: "30000000", // 30m
    upfrontAmount: "0",
    lockDuration: "7200", // lock 2 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // advisor 2 30% lock 2 years 45,000,000 45m
  {
    address: "0x585026D74D49B9b2D1c8d017b6A678D03c17956c",
    amount: "45000000", // 45m
    upfrontAmount: "0",
    lockDuration: "10800", // lock 3 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // advisor 3 lock 3 years 75,000,000 75m
  {
    address: "0x4417f63772181aFAe5E72624349d73256b1b60d9",
    amount: "75000000", // 75m
    upfrontAmount: "0",
    lockDuration: "14400", // lock 4 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // ==========================================================================
  // total liquidity 3% 150,000,000 150m
  // liquidity
  // liquidity 1 1% 50000000 50m
  {
    address: "0x1734E714dD381Af330379DBF84Bd3b3198A9a0Ea",
    amount: "50000000",
    upfrontAmount: "50000000",
    lockDuration: "0",
    vestingDuration: "0",
    vestingInternal: "0",
    isSender: true,
  },
  // liquidity 2 1% 50000000 50m
  {
    address: "0xF6722D93B2201833e51A5343e58d50505CF1c91F",
    amount: "50000000",
    upfrontAmount: "50000000",
    lockDuration: "0",
    vestingDuration: "0",
    vestingInternal: "0",
    isSender: true,
  },
  // liquidity 3 1% 50000000 50m
  {
    address: "0x438B245DF1e66A67Ee389cC9ed0Ef7F68A4Bd6eD",
    amount: "50000000",
    upfrontAmount: "50000000",
    lockDuration: "0",
    vestingDuration: "0",
    vestingInternal: "0",
    isSender: true,
  },
  // ==========================================================================
  // total community 12% 600,000,000 600m
  // community 1 200m 4%
  {
    address: "0x6C1764fD2294EA5a028b986DdBD8EF5379FAAE76",
    amount: "200000000",
    upfrontAmount: "0",
    lockDuration: "300", // 1 month = 5 min x 60 = 300s
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // community 2 200m 4%
  {
    address: "0x307b7479523A6c7b7ebbDB2C54CF48CA4D41B2c7",
    amount: "200000000",
    upfrontAmount: "0",
    lockDuration: "600", // 2 month = 5 x 60 x 2 = 600s
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // community 3 200m 4%
  {
    address: "0x03379f9C9e30B57C48C5d8Fd00dD1E6eBe715f3e",
    amount: "200000000",
    upfrontAmount: "0",
    lockDuration: "900", // 3 month = 5 x 60 x 3 = 900s
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // ==========================================================================
  // total ecosystem 15% 750,000,000 750m
  // ecosystem
  // ==========================================================================
  // total ecosystem 15% 750,000,000 750m
  // ecosystem
  {
    address: "0x7d07Fc4336AB7C6c523f02A7d3a074D70c259E2E",
    amount: "250000000",
    upfrontAmount: "0",
    lockDuration: "0",
    vestingDuration: "600", // lock 2 month = 5 min x 60 x 2 = 600s
    vestingInternal: "300", // 1 month = 5 min x 60 = 300s
  },
  {
    address: "0x8B6452644E1E47097FDDc7627c33628706867Dec",
    amount: "250000000",
    upfrontAmount: "0",
    lockDuration: "600", // lock 2 month = 5 min x 60 x 2 = 600s
    vestingDuration: "600", // 2 month
    vestingInternal: "300", // 1 month
  },
  {
    address: "0xC26Ec3c12415fe3E3E74b1027Cec49aA05171385",
    amount: "250000000",
    upfrontAmount: "0",
    lockDuration: "1200", // lock 4 month
    vestingDuration: "600",
    vestingInternal: "300",
  },
  // total mining 25% 1,250,000,000 1,25b
  // mining
  {
    address: "0xFaA3A78617FB1a407bD93b2c0227DecE21341bc1",
    amount: "1250000000",
    upfrontAmount: "0",
    lockDuration: "0",
    vestingDuration: "10800", // 36 months (30 days as a month)
    vestingInternal: "300", // 1 month
  },
  // total reserve 10.2% 510,000,000 550m
  // reserve
  {
    address: "0xD6f844B0500Fb85fC9A7D1C8154D748FF790F8F6",
    amount: "510000000",
    upfrontAmount: "0",
    lockDuration: "2700", // 9 months (30 days as a month)
    vestingDuration: "9000", // 30 months (30 days as a month)
    vestingInternal: "300", // 1 month
  },
];

const mainnetBeneficiaries = [
  // tatal supply 5b 5,000,000,000
  // ==========================================================================
  // total seed, private, public 16.8% 84 0,000,000
  // seed sale 100,000,000
  {
    address: "0x945Eea57ffc1c870a1ee1F14bA1E4Fc1d2202dED",
    amount: "100000000", // 100m
    upfrontAmount: "5000000", // 5% 5m
    lockDuration: "0",
    vestingDuration: "46656000", // 18 months (30 days as a month) 46656000 seconds,
    vestingInternal: "2592000", // release vesting per 1 month
    isSender: true,
  },
  // public sale 80,000,000
  {
    address: "0x7264C37d13740f991b4C0127A487Be2f52647133",
    amount: "80000000", // 80m
    upfrontAmount: "80000000", // 100% 80m
    lockDuration: "0", // no lock
    vestingDuration: "0", // unlock 100%
    vestingInternal: "0", // no vesting internal
    isSender: true,
  },
  // private sale 660,000,000
  {
    // address: "0x413225A1d1e4562cF6073206A6D07d2690cc0be4",
    address: "0xB919c437C468e820DdeA7B5ED773e73d68f8402D",
    amount: "660000000", // 660m
    upfrontAmount: "33000000", // 5% 33m
    lockDuration: "0",
    vestingDuration: "31104000", // 12 months (30 days as a month)
    vestingInternal: "2592000", // release vesting per 1 month
    isSender: true,
  },
  // ==========================================================================
  // total team 15% 750,000,000
  // ==========================================================================
  // team 1 1% 50,000,000
  // ==========================================================================
  // wallet 1 20% lock 1 year of 50,000,000 10m
  {
    address: "0x0aC0C1680c007afD24e7F5538c704A3a9Eb302a5",
    amount: "10000000", // 10m
    upfrontAmount: "0",
    lockDuration: "62208000", // lock 2 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  //  wallet 2 30% lock 2 years of 50,000,000 15m
  {
    address: "0xC0e09A112Ae45d87597CD78c11b7D95a55aCC5F0",
    amount: "15000000", // 15m
    upfrontAmount: "0",
    lockDuration: "93312000", // lock 3 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 3 50% lock 3 years of 50,000,000 25m
  {
    address: "0xa226e1963Aa07fa7B3898F1DD1A331e6Bd4179E6",
    amount: "25000000", // 25m
    upfrontAmount: "0",
    lockDuration: "124416000", // lock 4 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // ==========================================================================
  // team 2 1.25% 62,500,000
  // ==========================================================================
  // wallet 1 20% lock 1 year of 62,500,000 12,5m
  // ==========================================================================
  {
    address: "0x680420778088b18088Abc658351377d65FA62bD1",
    amount: "12500000", // 12,5m
    upfrontAmount: "0",
    lockDuration: "62208000", // lock 2 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 2 30% lock 2 years of 62,500,000 18,75m
  {
    address: "0xe935fB98D37694074C6C4082E06cD392D8c9cB06",
    amount: "18750000", // 18,75m
    upfrontAmount: "0",
    lockDuration: "93312000", // lock 3 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 3 50% lock 3 years of 62,500,000 31,25m
  {
    address: "0x6d4E9C723948Cdbb9F6aA398B3CbB97D198c4ECa",
    amount: "31250000", // 31,25m
    upfrontAmount: "0",
    lockDuration: "124416000", // lock 4 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // ==========================================================================
  // team 3 1.25% 62,500,000
  // ==========================================================================
  // wallet 1 20% lock 1 year of 62,500,000 12,5m
  // ==========================================================================
  {
    address: "0xaeFefE2c60718d9033aF55Ac0E90992FC645C699",
    amount: "12500000", // 10m
    upfrontAmount: "0",
    lockDuration: "62208000", // lock 2 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 2 30% lock 2 years of 62,500,000 18,75m
  {
    address: "0xd8d344e6F75dDE8c7d9d2978d5cc23C088f504eA",
    amount: "18750000", // 450m
    upfrontAmount: "0",
    lockDuration: "93312000", // lock 3 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 3 50% lock 3 years of 62,500,000 31,25m
  {
    address: "0xC305D523c4746a2339cDF4981037cb90612487AB",
    amount: "31250000", // 750m
    upfrontAmount: "0",
    lockDuration: "124416000", // lock 4 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // ==========================================================================
  // team 4 11.5% 575,000,000 575m
  // ==========================================================================
  // wallet 1 20% lock 1 year of 575,000,000 115m
  // ==========================================================================
  {
    address: "0x82A97e0C458B8c4e873404B8E90933587BD1c73c",
    amount: "115000000", // 115m
    upfrontAmount: "0",
    lockDuration: "62208000", // lock 2 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 2 30% lock 2 years of 575,000,000 172,5m
  {
    address: "0x6BAa8Ebdb4C8BD40cD64D4A103b5eABd8535E83C",
    amount: "172500000", // 172,5m
    upfrontAmount: "0",
    lockDuration: "93312000", // lock 3 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // wallet 3 50% lock 3 years of 575,000,000 287,5m
  {
    address: "0x579D12d63A4392447Cd6a29d0Ba6BBF90d101B2b",
    amount: "287500000", // 287,5m
    upfrontAmount: "0",
    lockDuration: "124416000", // lock 4 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // total advisor 3% 150,000,000 150m
  // advisor 1 20% lock 1 years 30,000,000 30m
  {
    address: "0x64898041f1f133873BDCa2c3c931633852a81d7F",
    amount: "30000000", // 30m
    upfrontAmount: "0",
    lockDuration: "62208000", // lock 2 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // advisor 2 30% lock 2 years 45,000,000 45m
  {
    address: "0x585026D74D49B9b2D1c8d017b6A678D03c17956c",
    amount: "45000000", // 45m
    upfrontAmount: "0",
    lockDuration: "93312000", // lock 3 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // advisor 3 lock 3 years 75,000,000 75m
  {
    address: "0x4417f63772181aFAe5E72624349d73256b1b60d9",
    amount: "75000000", // 75m
    upfrontAmount: "0",
    lockDuration: "124416000", // lock 4 years
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // ==========================================================================
  // total liquidity 3% 150,000,000 150m
  // liquidity
  // liquidity 1 1% 50000000 50m
  {
    address: "0x1734E714dD381Af330379DBF84Bd3b3198A9a0Ea",
    amount: "50000000",
    upfrontAmount: "50000000",
    lockDuration: "0",
    vestingDuration: "0",
    vestingInternal: "0",
    isSender: true,
  },
  // liquidity 2 1% 50000000 50m
  {
    address: "0xF6722D93B2201833e51A5343e58d50505CF1c91F",
    amount: "50000000",
    upfrontAmount: "50000000",
    lockDuration: "0",
    vestingDuration: "0",
    vestingInternal: "0",
    isSender: true,
  },
  // liquidity 3 1% 50000000 50m
  {
    address: "0x438B245DF1e66A67Ee389cC9ed0Ef7F68A4Bd6eD",
    amount: "50000000",
    upfrontAmount: "50000000",
    lockDuration: "0",
    vestingDuration: "0",
    vestingInternal: "0",
    isSender: true,
  },
  // ==========================================================================
  // total community 12% 600,000,000 600m
  // community 1 200m 4%
  {
    address: "0x6C1764fD2294EA5a028b986DdBD8EF5379FAAE76",
    amount: "200000000",
    upfrontAmount: "0",
    lockDuration: "2592000", // 1 month = 5 min x 60 = 300s
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // community 2 200m 4%
  {
    address: "0x307b7479523A6c7b7ebbDB2C54CF48CA4D41B2c7",
    amount: "200000000",
    upfrontAmount: "0",
    lockDuration: "5184000", // 2 month = 5 x 60 x 2 = 600s
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // community 3 200m 4%
  {
    address: "0x03379f9C9e30B57C48C5d8Fd00dD1E6eBe715f3e",
    amount: "200000000",
    upfrontAmount: "0",
    lockDuration: "7776000", // 3 month = 5 x 60 x 3 = 900s
    vestingDuration: "0",
    vestingInternal: "0",
  },
  // ==========================================================================
  // total ecosystem 15% 750,000,000 750m
  // ecosystem
  // ==========================================================================
  // total ecosystem 15% 750,000,000 750m
  // ecosystem
  {
    address: "0x7d07Fc4336AB7C6c523f02A7d3a074D70c259E2E",
    amount: "250000000",
    upfrontAmount: "0",
    lockDuration: "0",
    vestingDuration: "5184000", // lock 2 month = 5 min x 60 x 2 = 600s
    vestingInternal: "2592000", // 1 month = 5 min x 60 = 300s
  },
  {
    address: "0x8B6452644E1E47097FDDc7627c33628706867Dec",
    amount: "250000000",
    upfrontAmount: "0",
    lockDuration: "5184000", // lock 2 month = 5 min x 60 x 2 = 600s
    vestingDuration: "5184000", // 2 month
    vestingInternal: "2592000", // 1 month
  },
  {
    address: "0xC26Ec3c12415fe3E3E74b1027Cec49aA05171385",
    amount: "250000000",
    upfrontAmount: "0",
    lockDuration: "10368000", // lock 4 month
    vestingDuration: "5184000",
    vestingInternal: "2592000",
  },
  // total mining 25% 1,250,000,000 1,25b
  // mining
  {
    address: "0xFaA3A78617FB1a407bD93b2c0227DecE21341bc1",
    amount: "1250000000",
    upfrontAmount: "0",
    lockDuration: "0",
    vestingDuration: "93312000", // 36 months (30 days as a month)
    vestingInternal: "2592000", // 1 month
  },
  // total reserve 10.2% 510,000,000 550m
  // reserve
  {
    address: "0xD6f844B0500Fb85fC9A7D1C8154D748FF790F8F6",
    amount: "510000000",
    upfrontAmount: "0",
    lockDuration: "23328000", // 9 months (30 days as a month)
    vestingDuration: "77760000", // 30 months (30 days as a month)
    vestingInternal: "2592000", // 1 month
  },
];

const token = {
  name: "Spores 2",
  symbol: "SPO2",
  decimals: 18,
  cap: "5000000000000000000000000000",
};

var config = {
  tesnetBeneficiaries,
  mainnetBeneficiaries,
  token,
};

module.exports = config;

const tesnetBeneficiaries = [
    // tatal supply 5b 5,000,000,000
    // ==========================================================================
    // total seed, private, public 16.8% 84 0,000,000
    // seed sale 100,000,000
    {
        address: "0xD38D721215C49836b76ea60EdFD2a6BBe6d445D9",
        amount: "100000000", // 100m
        upfrontAmount: "5000000", // 5% 5m
        lockDuration: "0",
        vestingDuration: "1080", // 18 months (30 days as a month) 46656000 seconds,
        vestingInternal: "60", // release vesting per 1 month
    },
    // public sale 80,000,000
    {
        address: "0x7264C37d13740f991b4C0127A487Be2f52647133",
        amount: "80000000", // 80m
        upfrontAmount: "80000000", // 100% 80m
        lockDuration: "0", // no lock
        vestingDuration: "0", // unlock 100%
        vestingInternal: "0", // no vesting internal
    },
    // private sale 660,000,000
    {
        address: "0x413225A1d1e4562cF6073206A6D07d2690cc0be4",
        amount: "660000000", // 660m
        upfrontAmount: "33000000",  // 5% 33m
        lockDuration: "0",
        vestingDuration: "720", // 12 months (30 days as a month)
        vestingInternal: "60", // release vesting per 1 month
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
        lockDuration: "1440", // lock 2 years
        vestingDuration: "0",
        vestingInternal: "0",
    },
    //  wallet 2 30% lock 2 years of 50,000,000 15m
    {
        address: "0xC0e09A112Ae45d87597CD78c11b7D95a55aCC5F0",
        amount: "15000000", // 15m
        upfrontAmount: "0",
        lockDuration: "2160", // lock 3 years
        vestingDuration: "0",
        vestingInternal: "0",
    },
    // wallet 3 50% lock 3 years of 50,000,000 25m
    {
        address: "0xa226e1963Aa07fa7B3898F1DD1A331e6Bd4179E6",
        amount: "25000000", // 25m
        upfrontAmount: "0",
        lockDuration: "2880", // lock 4 years
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
        lockDuration: "1440", // lock 2 years
        vestingDuration: "0",
        vestingInternal: "0",

    },
    // wallet 2 30% lock 2 years of 62,500,000 18,75m 
    {
        address: "0xe935fB98D37694074C6C4082E06cD392D8c9cB06",
        amount: "18750000", // 18,75m
        upfrontAmount: "0",
        lockDuration: "2160", // lock 3 years
        vestingDuration: "0",
        vestingInternal: "0",

    },
    // wallet 3 50% lock 3 years of 62,500,000 31,25m
    {
        address: "0x6d4E9C723948Cdbb9F6aA398B3CbB97D198c4ECa",
        amount: "31250000", // 31,25m
        upfrontAmount: "0",
        lockDuration: "2880", // lock 4 years
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
        lockDuration: "1440", // lock 2 years
        vestingDuration: "0",
        vestingInternal: "0",

    },
    // wallet 2 30% lock 2 years of 62,500,000 18,75m 
    {
        address: "0xd8d344e6F75dDE8c7d9d2978d5cc23C088f504eA",
        amount: "18750000", // 450m
        upfrontAmount: "0",
        lockDuration: "2160", // lock 3 years
        vestingDuration: "0",
        vestingInternal: "0",

    },
    // wallet 3 50% lock 3 years of 62,500,000 31,25m
    {
        address: "0xC305D523c4746a2339cDF4981037cb90612487AB",
        amount: "31250000", // 750m
        upfrontAmount: "0",
        lockDuration: "2880", // lock 4 years
        vestingDuration: "0",
        vestingInternal: "0",
    },
    // ==========================================================================
    // team 4 11.5% 575,000,000 575m
    // ==========================================================================
    // wallet 1 20% lock 1 year of 575,000,000 115m
    // ==========================================================================
    {
        address: "0x31ed9A9c5479F98A0CAFEDC701e716Dd107da97c",
        amount: "115000000", // 115m
        upfrontAmount: "0",
        lockDuration: "1440", // lock 2 years
        vestingDuration: "0",
        vestingInternal: "0",

    },
    // wallet 2 30% lock 2 years of 575,000,000 172,5m
    {
        address: "0xd6E61f7290E8E4a42A6786974E41fc7856AE48D2",
        amount: "172500000", // 172,5m
        upfrontAmount: "0",
        lockDuration: "2160", // lock 3 years
        vestingDuration: "0",
        vestingInternal: "0",

    },
    // wallet 3 50% lock 3 years of 575,000,000 287,5m
    {
        address: "0x34AC2dF6f421A3B037547Ec460e2C2f9E0717fbd",
        amount: "287500000", // 287,5m
        upfrontAmount: "0",
        lockDuration: "2880", // lock 4 years
        vestingDuration: "0",
        vestingInternal: "0",
    },
    // total advisor 3% 150,000,000 150m
    // advisor 1 20% lock 1 years 30,000,000 30m
    {
        address: "0x29fb3466D977b1467CB26e82dF38F3bD51a32720",
        amount: "30000000", // 30m
        upfrontAmount: "0",
        lockDuration: "1440", // lock 2 years
        vestingDuration: "0",
        vestingInternal: "0",

    },
    // advisor 2 30% lock 2 years 45,000,000 45m
    {
        address: "0x448956Bebf82a9ac122e6a42A8C8c91190E0Cad5",
        amount: "45000000", // 45m
        upfrontAmount: "0",
        lockDuration: "2160", // lock 3 years
        vestingDuration: "0",
        vestingInternal: "0",

    },
    // advisor 3 lock 3 years 75,000,000 75m
    {
        address: "0x6619a4caa2f905f07Ac731652ADE0D35dBD7614a",
        amount: "75000000", // 75m
        upfrontAmount: "0",
        lockDuration: "2880", // lock 4 years
        vestingDuration: "0",
        vestingInternal: "0",
    },
    // ==========================================================================
    // total liquidity 3% 150,000,000 150m
    // liquidity
    // liquidity 1 1% 50000000 50m
    {
        address: "0xF6722D93B2201833e51A5343e58d50505CF1c91F",
        amount: "50000000",
        upfrontAmount: "50000000",
        lockDuration: "0",
        vestingDuration: "0",
        vestingInternal: "0"
    },
    // liquidity 2 1% 50000000 50m
    {
        address: "0x438B245DF1e66A67Ee389cC9ed0Ef7F68A4Bd6eD",
        amount: "50000000",
        upfrontAmount: "50000000",
        lockDuration: "0",
        vestingDuration: "0",
        vestingInternal: "0"
    },
    // liquidity 3 1% 50000000 50m
    {
        address: "0xA8138D04A52e36936eEcd39B7B856FE8940CB3A5",
        amount: "50000000",
        upfrontAmount: "50000000",
        lockDuration: "0",
        vestingDuration: "0",
        vestingInternal: "0"
    },
    // ==========================================================================
    // total community 12% 600,000,000 600m
    // community 1 200m 4%
    {
        address: "0xC6b6F519c13aCFF3A30B21257d8a6cAcC57687a6",
        amount: "200000000",
        upfrontAmount: "0",
        lockDuration: "60", // 1 month
        vestingDuration: "0",
        vestingInternal: "0",
    },
    // community 2 200m 4%
    {
        address: "0x527D45a232d412C45eADB57cCe5bf942edF0364E",
        amount: "200000000",
        upfrontAmount: "0",
        lockDuration: "120",  // 2 month
        vestingDuration: "0",
        vestingInternal: "0",
    },
    // community 3 200m 4%
    {
        address: "0x482bE3Ec3A24eE4FEc390576473dbc9DaD2E6d66",
        amount: "200000000",
        upfrontAmount: "0",
        lockDuration: "180", // 3 month
        vestingDuration: "0",
        vestingInternal: "0",
    },
    // ==========================================================================
    // total ecosystem 15% 750,000,000 750m
    // ecosystem
    {
        address: "0xB71010cfAB22d4A8b80010c1FF90d57EF1D80a30",
        amount: "250000000",
        upfrontAmount: "0",
        lockDuration: "120", // 2 month
        vestingDuration: "0",
        vestingInternal: "0",
    },
    {
        address: "0xe54dfbAde632D17DF10a2517c6A57acD3EbA23B2",
        amount: "250000000",
        upfrontAmount: "0",
        lockDuration: "240", // 4 month
        vestingDuration: "0",
        vestingInternal: "0",
    },
    {
        address: "0xb20fE47a815189e0AF085F6924Bcd609d6f8a3F2",
        amount: "250000000",
        upfrontAmount: "0",
        lockDuration: "360", // 6 month
        vestingDuration: "0",
        vestingInternal: "0",
    },
    // total mining 25% 1,250,000,000 1,25b
    // mining
    {
        address: "0xE282C14d9872747a9e5E7440f9Be9e8255137C7B",
        amount: "1250000000",
        upfrontAmount: "0",
        lockDuration: "0",
        vestingDuration: "2160", // 36 months (30 days as a month)
        vestingInternal: "60", // 1 month

    },
    // total reserve 10.2% 510,000,000 550m
    // reserve
    {
        address: "0x859b8dC74DFdf96e8A8BC1a61be2AC2b536c3fdc",
        amount: "510000000",
        upfrontAmount: "0",
        lockDuration: "540", // 9 months (30 days as a month)
        vestingDuration: "1800", // 30 months (30 days as a month)
        vestingInternal: "60", // 1 month
    },
];

const mainnetBeneficiaries = [
    // // total 10,000,000,000 10b
    // // total seed, private, public 10% 1000000000 - 1b
    // // seed sale
    // {
    //     address: "",
    //     amount: "100000000", // 100m
    //     upfrontAmount: "5000000", // 5% 5m
    //     lockDuration: "0",
    //     vestingDuration: "46656000", // 18 months (30 days as a month) 46656000 seconds,
    //     vestingInternal: "2592000", // release vesting per 1 month

    // },
    // // public sale
    // {
    //     address: "",
    //     amount: "50000000", // 50m
    //     upfrontAmount: "50000000", // 100% 50m
    //     lockDuration: "0",
    //     vestingDuration: "0",
    //     vestingInternal: "0", // release vesting per 1 month

    // },
    // // private sale
    // {
    //     address: "",
    //     amount: "850000000", // 850m
    //     upfrontAmount: "42500000",  // 5% 42,5m
    //     lockDuration: "0",
    //     vestingDuration: "31104000", // 12 months (30 days as a month)
    //     vestingInternal: "2592000", // release vesting per 1 month

    // },
    // // Total team 1500000000 1,5b 
    // // team 1 20% lock 1 years vest 0
    // {
    //     address: "",
    //     amount: "300000000", // 300m
    //     upfrontAmount: "0",
    //     lockDuration: "31104000", // lock 1 years
    //     vestingDuration: "0",
    //     vestingInternal: "0", // release when end lock

    // },
    // // team 2 30% lock 2 years vest 0
    // {
    //     address: "",
    //     amount: "450000000", // 450m
    //     upfrontAmount: "0",
    //     lockDuration: "62208000", // lock 2 years
    //     vestingDuration: "0",
    //     vestingInternal: "0", // release when end lock

    // },
    // // team 3 30% lock 3 years vest 0
    // {
    //     address: "",
    //     amount: "750000000", // 750m
    //     upfrontAmount: "0",
    //     lockDuration: "93312000", // lock 3 years
    //     vestingDuration: "0",
    //     vestingInternal: "0", // release when end lock

    // },
    // // total advisor 3% 300000000 300m
    // // advisor 1 20% lock 1 years
    // {
    //     address: "",
    //     amount: "60000000", // multiply by decimals later
    //     upfrontAmount: "0",
    //     lockDuration: "31104000", // lock 1 years
    //     vestingDuration: "0",
    //     vestingInternal: "0", // release when end lock
    // },
    // // advisor 2 lock 2 years
    // {
    //     address: "",
    //     amount: "90000000", // multiply by decimals later
    //     upfrontAmount: "0",
    //     lockDuration: "62208000", // lock 2 years
    //     vestingDuration: "0",
    //     vestingInternal: "0", // release when end lock
    // },
    // // advisor 3 lock 3 years
    // {
    //     address: "",
    //     amount: "150000000", // multiply by decimals later
    //     upfrontAmount: "0",
    //     lockDuration: "93312000", // lock 3 years
    //     vestingDuration: "0",
    //     vestingInternal: "0", // release when end lock

    // },
    // // total liquidity 3% 300m
    // // liquidity
    // {
    //     address: "",
    //     amount: "300000000", // multiply by decimals later
    //     upfrontAmount: "300000000",
    //     lockDuration: "0",
    //     vestingDuration: "0", // 0 months (30 days as a month)
    //     vestingInternal: "0"
    // },
    // // total community 12% 1200000000 1,2b
    // // community
    // {
    //     address: "",
    //     amount: "1200000000", // multiply by decimals later
    //     upfrontAmount: "0",
    //     lockDuration: "0",
    //     vestingDuration: "7776000", // 3 month
    //     vestingInternal: "604800", // 1 weeks

    // },
    // // total ecosystem 15% 1500000000 1,5b
    // // ecosystem
    // {
    //     address: "",
    //     amount: "1500000000", // multiply by decimals later
    //     upfrontAmount: "0",
    //     lockDuration: "0",
    //     vestingDuration: "15552000", // 6 month
    //     vestingInternal: "604800", // 1 weeks

    // },
    // // total mining 30% 3000000000 3b
    // // mining
    // {
    //     address: "",
    //     amount: "3000000000", // multiply by decimals later
    //     upfrontAmount: "0",
    //     lockDuration: "0",
    //     vestingDuration: "93312000", // 36 months (30 days as a month)
    //     vestingInternal: "604800", // 1 weeks

    // },
    // // total community 12% 1200000000 1,2b
    // // reserve
    // {
    //     address: "",
    //     amount: "1200000000", // multiply by decimals later
    //     upfrontAmount: "0",
    //     lockDuration: "23328000", // 9 months (30 days as a month)
    //     vestingDuration: "77760000", // 30 months (30 days as a month)
    //     vestingInternal: "604800", // 1 weeks

    // },
];

const token = {
    name: 'Spores Token',
    symbol: 'SPO',
    decimals: 18,
    cap: '5000000000000000000000000000'
}

var config = {
    tesnetBeneficiaries,
    mainnetBeneficiaries,
    token
};

module.exports = config;
const HDWalletProvider = require('@truffle/hdwallet-provider');
const alchemyapiKey = "Z4M2OsjCv2-dqWklky_h-J0C1086Ww-Q";
const mnemonicOrPrivateKey = "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    test: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    live: {
      provider: function () {
        return new HDWalletProvider(mnemonicOrPrivateKey, `wss://eth-mainnet.alchemyapi.io/v2/${alchemyapiKey}`);
      },
      network_id: 1,
      gas: 6000000
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonicOrPrivateKey, `wss://eth-rinkeby.alchemyapi.io/v2/${alchemyapiKey}`);
      },
      network_id: 4,
      gas: 5500000
    },
    binance_testnet: {
      provider: function () {
        return new HDWalletProvider(mnemonicOrPrivateKey, "https://data-seed-prebsc-1-s1.binance.org:8545");
      },
      network_id: 97,
      gas: 5500000
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: 'R6BG54BYF7ZDNQ4JYI9IAWVDC6MGEYD8IY'
  },
  mocha: {
    timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.7.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    },
  },
};

// const BN = require("bn.js");
// const SporesToken = artifacts.require("SporesToken");

// contract('SporesToken', (accounts) => {
//   const [owner] = accounts;

//   let token;
//   const _name = "Spores Token"; // Token name
//   const _symbol = "SPO"; // Token symbol
//   const _decimals = new BN(8); // Token decimals
//   const _cap = new BN("1000000000000000000"); // Token total supply

//   beforeEach(async () => {
//     token = await SporesToken.new(_name, _symbol, _decimals, _cap, { from: owner });
//   });

//   it('Initializes with an configuration', async () => {
//     const name = await token.name();
//     const symbol = await token.symbol();
//     const decimals = await token.decimals();
//     const totalCap = await token.cap();
//     assert.equal(name, _name);
//     assert.equal(symbol, _symbol);
//     assert.equal(decimals.toString(), _decimals.toString());
//     assert.equal(totalCap.toString(), _cap.toString());
//   });

//   it('Can 0xdC0DFD55954c93a284faFA7aa3861aA366e0E56f to minter role', async () => {
//     var tnx = await token.addMinterRoleTo('0xdC0DFD55954c93a284faFA7aa3861aA366e0E56f', { from: owner });
//     assert.notEqual('', tnx.tx);
//   });

//   it('Can mint tokens to 0xdC0DFD55954c93a284faFA7aa3861aA366e0E56f', async () => {
//     await token.mint('0xdC0DFD55954c93a284faFA7aa3861aA366e0E56f', _cap, { from: owner });
//     const balance = await token.balanceOf('0xdC0DFD55954c93a284faFA7aa3861aA366e0E56f');
//     assert.equal(balance.toString(), _cap.toString());
//   });
// })
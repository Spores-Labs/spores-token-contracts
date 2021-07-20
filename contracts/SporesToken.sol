// SPDX-License-Identifier: MIT
pragma solidity 0.7.0;

import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./UsingLiquidityProtectionService.sol";

contract SporesToken is
	UsingLiquidityProtectionService(0xBA2bF7693E0903B373077ace7b002Bd925913df2),
	ERC20PresetMinterPauser,
	Ownable
{
	uint256 private TOKEN_MAX_CAP;
	uint8 private TOKEN_DECIMALS;

	constructor(
		string memory _name,
		string memory _symbol,
		uint8 _decimals,
		uint256 _cap
	) ERC20PresetMinterPauser(_name, _symbol) {
		TOKEN_MAX_CAP = _cap;
		TOKEN_DECIMALS = _decimals;
	}

	/**
	 * @dev Returns the cap on the token's total supply.
	 */
	function cap() public view returns (uint256) {
		return TOKEN_MAX_CAP;
	}

	/**
	 * @dev Returns the number of decimals used to get its user representation.
	 * For example, if `decimals` equals `2`, a balance of `505` tokens should
	 * be displayed to a user as `5,05` (`505 / 10 ** 2`).
	 */
	function decimals() public view virtual override returns (uint8) {
		return TOKEN_DECIMALS;
	}

	/**
	 * @dev Creates `amount` new tokens for `to`.
	 *
	 * See {ERC20-_mint}.
	 *
	 * Requirements:
	 *
	 * - the caller must have the `MINTER_ROLE`.
	 */
	function mint(address to, uint256 amount) public virtual override {
		require(
			ERC20.totalSupply() + amount <= cap(),
			"ERC20Capped: cap exceeded"
		);
		require(
			hasRole(MINTER_ROLE, _msgSender()),
			"ERC20PresetMinterPauser: must have minter role to mint"
		);
		_mint(to, amount);
	}

	/**
	 * @dev Add minter role of token contract to `to` address.
	 *
	 * See {ERC20-_setupRole}.
	 *
	 * Requirements:
	 *
	 * - the caller must have the owner of token contract.
	 */
	function addMinterRoleTo(address to) public onlyOwner {
		_setupRole(MINTER_ROLE, to);
	}

	/**
	 * @dev these function use to integrate with anti bot protection
	 */
	function token_transfer(
		address _from,
		address _to,
		uint256 _amount
	) internal override {
		_transfer(_from, _to, _amount); // Expose low-level token transfer function.
	}

	function token_balanceOf(address _holder)
		internal
		view
		override
		returns (uint256)
	{
		return balanceOf(_holder); // Expose balance check function.
	}

	function protectionAdminCheck() internal view override onlyOwner {} // Must revert to deny access.

	function uniswapVariety() internal pure override returns (bytes32) {
		return UNISWAP; // UNISWAP / PANCAKESWAP / QUICKSWAP.
	}

	function uniswapVersion() internal pure override returns (UniswapVersion) {
		return UniswapVersion.V2; // V2 or V3.
	}

	function uniswapFactory() internal pure override returns (address) {
		return 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f; // Replace with the correct address.
	}

	function _beforeTokenTransfer(
		address _from,
		address _to,
		uint256 _amount
	) internal override {
		super._beforeTokenTransfer(_from, _to, _amount);
		LiquidityProtection_beforeTokenTransfer(_from, _to, _amount);
	}

	function protectionChecker() internal view override returns (bool) {
		return ProtectionSwitch_manual(); // Switch off protection by calling disableProtection(); from owner. Default.
	}

	// This token will be pooled in pair with:
	function counterToken() internal pure override returns (address) {
		return 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; // WETH
	}
}

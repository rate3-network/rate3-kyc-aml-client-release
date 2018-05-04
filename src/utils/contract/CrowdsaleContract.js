import Web3 from 'web3';

import { convertFromZeroDecimalRepresentation } from '../converter';

const CONTRACT_ABI = [
  // ABI to remain
  {
    "constant": true,
    "inputs": [],
    "name": "allTokensSold",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "bonusTokensSold",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "cap",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "whitelist",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "tokenInvestments",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "bonusTokenInvestments",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
];

const { CONTRACT_PROVIDER } = process.env;
const { CROWDSALE_CONTRACT_ADDRESS } = process.env;

let _contractInstance = null;

class CrowdsaleContract {
  /**
   * Initializer for CrowdSaleContract. Subsequent calls after first initialization will not reinitialize
   * the instance.
   */
  static init() {
    if (!_contractInstance) {
      const web3 = new Web3(new Web3.providers.HttpProvider(CONTRACT_PROVIDER));
      _contractInstance = new web3.eth.Contract(CONTRACT_ABI, CROWDSALE_CONTRACT_ADDRESS);
    }
  }

  /**
   * Retrive value of `allTokensSold` variable in contract.
   * @return {Promise<string>} A promise that resolves with the string value of `allTokensSold`.
   */
  static async getAllTokensSoldAsync() {
    const allTokensSold = await _contractInstance.methods.allTokensSold().call();
    return convertFromZeroDecimalRepresentation(allTokensSold, 18);
  }

  /**
   * Retrieve value of `bonusTokensSold` variable in contract.
   * @return {Promise<string>} A promise that resolves with the string value of `bonusTokensSold`.
   */
  static async getBonusTokensSoldAsync() {
    const bonusTokensSold = await _contractInstance.methods.bonusTokensSold().call();
    return convertFromZeroDecimalRepresentation(bonusTokensSold, 18);
  }

  /**
   * Retrieve value of `cap` variable in contract.
   * @return {Promise<string>} A promise that resolves with the string value of `cap`.
   */
  static async getCapAsync() {
    const cap = await _contractInstance.methods.cap().call();
    return convertFromZeroDecimalRepresentation(cap, 18);
  }

  /**
   * Retrieve whitelist status for a particular address
   * @param {string} address Eth Address.
   * @return {Promise<boolean>}
   * A promise that resolves with a boolean value of whether the address is whitelisted.
   */
  static getWhitelistStatusAsync(address) {
    return _contractInstance.methods.whitelist(address).call();
  }

  /**
   * Retrieve token investment amount.
   * @param {string} address Eth Address.
   * @return {Promise<string>} A promise that resolves with the string value of token investments.
   */
  static async getTokenInvestmentsAsync(address) {
    const tokenInvestments = await _contractInstance.methods.tokenInvestments(address).call();
    return convertFromZeroDecimalRepresentation(tokenInvestments, 18);
  }

  /**
   * Retrieve bonus token investment amount.
   * @param {string} address Eth Address.
   * @return {Promise<string>} A promise that resolves with the string value of bonus token investments.
   */
  static async getBonusTokenInvestmentsAsync(address) {
    const bonusTokenInvestments = await _contractInstance.methods.bonusTokenInvestments(address).call();
    return convertFromZeroDecimalRepresentation(bonusTokenInvestments, 18);
  }
}

export default CrowdsaleContract;

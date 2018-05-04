import Web3 from 'web3';

import { convertFromZeroDecimalRepresentation } from '../converter';

const CONTRACT_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
];

const { CONTRACT_PROVIDER } = process.env;
const { TOKEN_CONTRACT_ADDRESS } = process.env;

let _contractInstance = null;

class TokenContract {
  /**
   * Initializer for TokenContract. Subsequent calls after first initialization will not reinitialize
   * the instance.
   */
  static init() {
    if (!_contractInstance) {
      const web3 = new Web3(new Web3.providers.HttpProvider(CONTRACT_PROVIDER));
      _contractInstance = new web3.eth.Contract(CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);
    }
  }

  /**
   * Retrieve token balance for token owner.
   * @param {string} address Eth Address of token owner.
   * @return {Promise<string>} A promise that resolves with the string value token balance.
   */
  static async getBalanceOfAsync(address) {
    const balance = await _contractInstance.methods.balanceOf(address).call();
    return convertFromZeroDecimalRepresentation(balance, 18);
  }
}

export default TokenContract;

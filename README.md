# Ethereum Counter DApp

## Description

This project demonstrates a decentralized application (DApp) built on Ethereum blockchain using Solidity smart contracts and React.js frontend. The DApp allows users to interact with a simple counter smart contract deployed on Ethereum test networks. Users can connect their MetaMask wallet, view contract details, deposit funds, and withdraw funds.

## Getting Started

### Installing

After cloning the GitHub repository, follow these steps to get the code running on your computer:

1. Inside the project directory, install dependencies:
   
   ```bash
   npm install
   ```

2. Open two additional terminals in your VS code.

3. In the second terminal, start the Hardhat development network:

   ```bash
   npx hardhat node
   ```

4. In the third terminal, deploy the smart contract to the local network:

   ```bash
   npx hardhat run --network localhost scripts/deploy.js
   ```

5. Back in the first terminal, start the frontend development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Help

For common problems or issues, please refer to the troubleshooting section in the README.md file.

## Authors

- [Ashley Manalo](https://github.com/qeewpi)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

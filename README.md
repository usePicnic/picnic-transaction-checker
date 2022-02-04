# DeFi Basket Transaction Decoder

To further protect our users, we have created an open source verifier for the transactions. This provides an extra layer of security for users and enables the protocol to remain permissionless and decentralized by design. It allows a user to ensure all interactions only occur with trusted and audited bridges. An online version of the checker is available at <https://defibasket.github.io/checker/>, but it is recommended to run it locally for maximum protection.

## Local setup

Run:

1. `git clone https://github.com/defibasket/defibasket-transaction-checker.git`
2. `yarn`
3. `yarn build`
4. `yarn start`

## How to use

1. Paste your transaction data in the input box.
2. All valid transactions to trusted bridged will be shown with a check icon.
3. In case a transaction is not valid, please contact us in [Discord](https://discord.gg/aWVWytFF) immediately.

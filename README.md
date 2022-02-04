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
2. All valid transactions to trusted bridged will be shown with a check icon ![check](https://user-images.githubusercontent.com/2355491/152592398-963ac8a2-70e3-4ceb-baa3-d358e5d7c29d.svg)
3. In case a transaction is not valid ![alert](https://user-images.githubusercontent.com/2355491/152592472-7165124b-cf5e-4f45-9e6a-8020a34ebeda.svg)
, please contact us in [Discord](https://discord.gg/aWVWytFF) immediately.

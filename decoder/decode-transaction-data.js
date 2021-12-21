import { Contract } from '@ethersproject/contracts';
import * as IndexPool from './contracts/IndexPool.json';
import * as AaveV2DepositBridge from './contracts/bridges/AaveV2DepositBridge.json';
import * as AutofarmDepositBridge from './contracts/bridges/AutofarmDepositBridge.json';
import * as QuickswapLiquidityBridge from './contracts/bridges/QuickswapLiquidityBridge.json';
import * as QuickswapSwapBridge from './contracts/bridges/QuickswapSwapBridge.json';
import * as WMaticWrapBridge from './contracts/bridges/WMaticWrapBridge.json';
import { BigNumber } from "@ethersproject/bignumber";

const decodeBridgeCalls = (bridgeAddresses, bridgeEncodedCalls) => {
  const bridges = [
    {
      name: 'AaveV2DepositBridge',
      address: '0x29494C1673903e608352020CF8F545af70111Ad4',
      abi: AaveV2DepositBridge.abi,
    },
    {
      name: 'QuickswapSwapBridge',
      address: '0xFA299c3f1eE9DEA789b1d94243Ab7AEeA8BD7C77',
      abi: QuickswapSwapBridge.abi,
    },
    {
      address: '0x89Db516B50819593f058040F781BfF9880ca81a8',
      name: 'QuickswapLiquidityBridge',
      abi: QuickswapLiquidityBridge.abi,
    },
    {
      address: '0x4789499ed6D3c9E9b874E7E02AB8139779A51704',
      name: 'AutofarmDepositBridge',
      abi: AutofarmDepositBridge.abi,
    },
    {
      address: '0x9bA04eDb13e129c19823a084c7E9988FA5e20647',
      name: 'WMaticWrapBridge',
      abi: WMaticWrapBridge.abi,
    },
  ]

  const decodedBridgeCalls = bridgeAddresses.map(
    (_, i) => {
      const bridgeObj = bridges.find(
        (bridge) => bridge.address === bridgeAddresses[i]
      );

      if (bridgeObj === undefined) {
        return {
          bridgeAddress: bridgeAddresses[i],
          isValid: false,
        };
      }

      const bridgeContract = new Contract(
        bridgeObj.address,
        bridgeObj.abi,
        undefined
      );

      const decodedBridgeCall = bridgeContract.interface.parseTransaction({
        data: bridgeEncodedCalls[i],
      });

      const tempArgs = Object.entries(decodedBridgeCall.args);
      const namedArgs = tempArgs.slice(tempArgs.length / 2);
      const processedArgs = namedArgs.map(([name, value]) => {
        if (BigNumber.isBigNumber(value)) {
          return {
            name,
            value: value.toString(),
          };
        }
        if (Array.isArray(value)) {
          const arrayValues = value.map((v) => {
            if (BigNumber.isBigNumber(v)) {
              return v.toString();
            }
            return v;
          });
          return {
            name,
            value: arrayValues,
          };
        }
        return {
          name,
          value,
        };
      });

      const contractName = bridgeObj.name;
      const functionName = decodedBridgeCall.name;

      const value = decodedBridgeCall.value.toString();

      return {
        bridgeAddress: bridgeAddresses[i],
        isValid: true,
        contractName,
        functionName,
        value,
        args: processedArgs,
      };
    }
  );

  return decodedBridgeCalls;
};


const decodeTransactionData = (transactionData) => {
  const indexpoolContract = new Contract(
    '0x3ef849C414AE8f2ADD46ff80cF6904f4Da4ef1b9',
    IndexPool.abi,
    undefined,
  );
  try {
    const decodedIndexpoolData = indexpoolContract.interface.parseTransaction(
      { data: transactionData },
    );

    const name = decodedIndexpoolData.name;
    const { bridgeAddresses, bridgeEncodedCalls } = decodedIndexpoolData.args;

    if (!(['createPortfolio', 'depositPortfolio', 'editPortfolio', 'withdrawPortfolio'].includes(name))) {
      return null;
    }

    return {
      name: decodedIndexpoolData.name,
      decodedBridgeCalls: decodeBridgeCalls(bridgeAddresses, bridgeEncodedCalls)
    };
  } catch (e) {
    return null;
  }
};

export default decodeTransactionData;

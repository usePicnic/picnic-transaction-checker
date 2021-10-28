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
      address: '0x1F2c6621bE5e72e0da454337EF52e7e819F3EEe9',
      abi: AaveV2DepositBridge.abi,
    },
    {
      name: 'QuickswapSwapBridge',
      address: '0x6d5BD4Fdb0bAeD81F44795D32EAd78C3922BA930',
      abi: QuickswapSwapBridge.abi,
    },
    {
      address: '0x824314A675928B429845EF4219F62E1eA6C1b043',
      name: 'QuickswapLiquidityBridge',
      abi: QuickswapLiquidityBridge.abi,
    },
    {
      address: '0x788bFcDEf296F44fEe92390E7268d8DaC1c4ff98',
      name: 'AutofarmDepositBridge',
      abi: AutofarmDepositBridge.abi,
    },
    {
      address: '0x6E2b5a261ccfCEE64565C74d7F113658015066f9',
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
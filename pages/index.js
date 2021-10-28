import Head from 'next/head'
import decodeTransactionData from '@decoder/decode-transaction-data';
import React, { useEffect, useState } from 'react';
import BridgeCallsTable from 'components/bridge-calls-table';
import TransactionDataInput from 'components/transaction-data-input';

export default function Home() {
  const [transactionData, setTransactionData] = useState('');
  const [decodedTransactionData, setDecodedTransactionData] = useState(null);

  useEffect(() => {
    console.log(decodeTransactionData(transactionData));
    setDecodedTransactionData(
      decodeTransactionData(transactionData)
    );
  }, [transactionData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>DeFi Basket Transaction Decoder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center gap-10">
        <h1 className="text-6xl font-bold">
          DeFi Basket Transaction Decoder
        </h1>


        <TransactionDataInput transactionData={transactionData} setTransactionData={setTransactionData} decodedTransactionData={decodedTransactionData} />

        {decodedTransactionData && decodedTransactionData.name}

        {decodedTransactionData && <BridgeCallsTable
          decodedBridgeCalls={decodedTransactionData.decodedBridgeCalls}
        />}

      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://www.defibasket.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create your portfolio at DeFiBasket.org
        </a>
      </footer>
    </div>
  )
}

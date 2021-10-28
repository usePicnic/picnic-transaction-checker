import { ExclamationCircleIcon } from '@heroicons/react/solid'

export default function TransactionDataInput({ transactionData, setTransactionData, decodedTransactionData }) {
  const invalid = decodedTransactionData === null && transactionData !== '';

  return (
    <div>
      <label htmlFor="transactionData" className="sr-only">
        Transaction Data
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="transactionData"
          id="transactionData"
          className={`shadow-sm block w-96 sm:text-sm border-gray-300 rounded-md
            ${!invalid && 'focus:ring-blue-500 focus:border-blue-500'}
            ${invalid && 'pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'}`}
          onChange={(e) => setTransactionData(e.target.value)}
          placeholder="Paste transaction data here..."
        />
        {invalid && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>}
      </div>
      {invalid && <p className="mt-2 text-sm text-red-600">
        Invalid transaction data
      </p>}

    </div>
  )
}

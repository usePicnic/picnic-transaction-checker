import { BadgeCheckIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

export default function BridgeCallsTable({ decodedBridgeCalls }) {
  console.log(decodedBridgeCalls);
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Bridge address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                  >
                    Function call
                  </th>
                </tr>
              </thead>
              <tbody>
                {decodedBridgeCalls.map((bridgeCall, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <div>
                          {bridgeCall.isValid && <BadgeCheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />}
                          {!bridgeCall.isValid && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                        </div>
                        <div className="ml-3 flex flex-col items-start">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {bridgeCall.isValid && bridgeCall.contractName}
                            {!bridgeCall.isValid && 'Invalid/untrusted bridge'}
                          </p>
                          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                            {bridgeCall.bridgeAddress}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-left text-gray-500">
                      <b>{bridgeCall.functionName}</b>(<br />
                        {bridgeCall.args && bridgeCall.args.map((arg) => {
                          return <div className="pl-3 ">
                            <i>{arg.name}:</i>  
                            {/* {JSON.stringify(arg.value)} */}
                            <br />
                          </div>;
                        })}
                      )
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

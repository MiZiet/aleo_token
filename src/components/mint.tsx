import {EventType, useEvents, useRequestCreateEvent} from '@puzzlehq/sdk';
import {useState} from 'react';

import {PROGRAM_ID} from "../constants.ts";

function Mint() {
  const [recipient, setRecipient] = useState<string | undefined>();
  const [amount, setAmount] = useState<string | undefined>();
  const [mintType, setMintType] = useState<'private' | 'public'>('private')

  const {
    requestCreateEvent,
    loading: execute_loading,
    eventId,
    error
  } = useRequestCreateEvent({
    programId: 'essa_1337.aleo',
    functionId: mintType === 'private' ? 'mint_private' : 'mint_public',
    inputs: [recipient ?? '', amount + 'u64'],
    type: EventType.Execute,
    fee: 0.25,
  })

  const {events} = useEvents({filter: {programId: PROGRAM_ID, type: EventType.Execute}});
  const event = events?.find((e) => e._id === eventId);

  return (
    <div className='w-full border rounded-lg flex flex-col items-center justify-center gap-4 p-4'>
      <span className='text-xl font-bold'>Mint</span>
      <div className='w-full flex items-center justify-center gap-4 p-4'>
        <label className='text-l font-bold' htmlFor="mint-type">Mint type</label>
        <div><input defaultChecked onInput={() => setMintType('private')} type="radio" value="Private"
                    name="mint-type"/> Private
        </div>
        <div><input onInput={() => setMintType('public')} type="radio" value="Public" name="mint-type"/> Public</div>
      </div>
      <div className='w-[80%]'>
        <label htmlFor="recipient" className="block text-sm font-medium leading-6">
          Recipient
        </label>
        <div className="mt-2">
          <input
            name="recipient"
            id="recipient"
            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="aleo168l7zt7686ns54qmweda5ngs28c9jr6rdehlezdcv6ssr899m5qq4f4qgy"
            onChange={(e) => {
              setRecipient(e.target.value)
            }}
          />
        </div>
      </div>
      <div className='w-[80%]'>
        <label htmlFor="amount" className="block text-sm font-medium leading-6">
          Amount
        </label>
        <div className="mt-2">
          <input
            name="amount"
            id="amount"
            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="10"
            onChange={(e) => {
              setAmount(e.target.value)
            }}
          />
        </div>
      </div>
      <button
        disabled={execute_loading || !amount || !recipient}
        onClick={requestCreateEvent}
      >
        mint
      </button>
      {error && <p>{error}</p>}
      {eventId && <p>{eventId}</p>}
      {event && <pre className='whitespace-pre-wrap '>{JSON.stringify(event, null, 2)}</pre>}
    </div>
  );
}

export default Mint;
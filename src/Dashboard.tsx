import { useAccount, useConnect, useRecords } from '@puzzlehq/sdk';
import { useEffect, useState } from 'react';
import Mint from './components/mint';
import { PROGRAM_ID } from './main';
import Transfer from './components/transfer';
import Balance from './components/balance';

function Dashboard() {
  const { account } = useAccount();
  const { loading } = useConnect();
  const { records, fetchPage } = useRecords({
    filter: { programIds: [PROGRAM_ID], type: 'unspent' }
  });
  const [totalBalance, setTotalBalance] = useState(0);
  const [maxSpendable, setMaxSpendable] = useState(0);

  useEffect(() => {
    fetchPage();
  }, []);

  useEffect(() => {
    if (records) {
      // console.log('records', records);
      let total = 0;
      let max = 0;
      records.forEach(r => {
        const credits = Number(r.plaintext.split('amount:')[1]?.split('u64')[0]) ?? 0;
        total += credits;
        max = Math.max(credits, max);
      });
      setTotalBalance(total);
      setMaxSpendable(max);
    }
  }, [records]);


  // if (!isConnected) {
  //   throw new Error('dashboard shouldn\'t be showing rn');
  // }

  if (loading) {
    return <>loading...</>
  }


  console.log(account);
  if (!account) {
    return <p>loading account info...</p>
  }

  return (
    <div className='flex flex-col w-full h-full gap-2 items-center'>
      <div className='w-3/4 lg:w-1/2 flex flex-col items-center justify-center gap-10 pb-4'>
        <Balance maxSpendable={maxSpendable} totalBalance={totalBalance}/>
        { account?.address === account.address && records && records.length > 0 && (
          <Transfer/>
        )}
        { account?.address === "aleo15g0ldc2s6a7fpt7q8e4cq4c94908ksgy62rmp3v93w43e47quv8s9dfmmt" && (
          <Mint />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
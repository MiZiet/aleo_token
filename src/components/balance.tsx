interface Props {
  totalPrivateBalance: number;
  maxPrivateSpendable: number;
  publicBalance: number;
}

function Balance({totalPrivateBalance, maxPrivateSpendable, publicBalance}: Props) {

  return (
    <div className='w-full border rounded-lg flex flex-col p-4'>
      <div className='w-full flex justify-between'>
        <span className='font-bold'>Total Private Balance</span>
        <span>{totalPrivateBalance.toLocaleString() ?? 0}</span>
      </div>
      <div className='w-full flex justify-between'>
        <span className='font-bold'>Largest Record to Spend</span>
        <span>{maxPrivateSpendable.toLocaleString()}</span>
      </div>
      <div className='w-full flex justify-between'>
        <span className='font-bold'>Public Balance</span>
        <span>{publicBalance.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default Balance;
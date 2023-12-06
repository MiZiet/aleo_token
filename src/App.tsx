import {useAccount, useConnect} from '@puzzlehq/sdk';
import Dashboard from './Dashboard.js';
import Header from './components/header.js';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
  const {connect, loading} = useConnect();
  const {account} = useAccount();
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full h-full flex justify-center items-center'>
        <Header address={account?.address}/>
        <div className='w-full h-full pt-20 pb-4 items-center align-middle'>
          {loading &&
              <div className='w-full h-full text-center align-middle'>
                  loading...
              </div>
          }
          {!loading && account && <Dashboard/>}
          {!loading && !account &&
              <div className='w-full h-full text-center align-middle'>
                  <button onClick={connect}>Connect your wallet</button>
              </div>
          }
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
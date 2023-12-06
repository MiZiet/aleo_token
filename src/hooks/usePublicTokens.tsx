import {useQuery} from "@tanstack/react-query";
import {PROGRAM_ID} from "../constants.ts";

export function usePublicTokens(address: string) {
  const {data} = useQuery({
    queryKey: ['public-tokens'],
    queryFn: async () => {
      try {
        const response = await fetch(`https://api.explorer.aleo.org/v1/testnet3/program/${PROGRAM_ID}/mapping/account/${address}`)
        return await response.json()
      } catch {
        return '0';
      }
    },
  })

  return Number(((data ?? '0u64') as string).split('u64')[0])
}
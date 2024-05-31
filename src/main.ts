import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'

import { mainnet, arbitrum } from 'viem/chains'
import { reconnect } from '@wagmi/core'
import { watchAccount, disconnect, getAccount } from '@wagmi/core'

// 1. Get a project ID at https://cloud.walletconnect.com
const projectId = '9067d0b0b06536b6872f9e3f2e440cf0'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://example.com', // origin must match your domain & subdomain.
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})
reconnect(config)

// 3. Create modal
const modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
})

function connect() {
  if (getAccount(config).isConnected) {
    disconnect(config)
  } else {
    modal.open()
  }
}

const btnEl = document.getElementById('connect-button')
const userEl = document.getElementById('user')

btnEl.addEventListener('click', connect)
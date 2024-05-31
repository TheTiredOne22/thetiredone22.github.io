import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, arbitrum } from 'viem/chains'
import { reconnect } from '@wagmi/core'

// 1. Get a project ID at https://cloud.walletconnect.com
const projectId = '9067d0b0b06536b6872f9e3f2e440cf0'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain.
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata
  // Optional - Override createConfig parameters can be added here if necessary
})

reconnect(config)

// 3. Create modal
const modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

// Function to handle wallet connection
const connectWallet = async () => {
  try {
    await modal.connect()
    console.log('Wallet connected successfully')
  } catch (error) {
    console.error('Failed to connect wallet:', error)
  }
}

// Attach event listener to the button
document.getElementById('connect-wallet-button').addEventListener('click', connectWallet)

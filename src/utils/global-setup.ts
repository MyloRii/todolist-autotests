import { FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  require('dotenv/config')
  process.env.HEADLESS = process.env.HEADLESS ? process.env.HEADLESS : 'true'
}

export default globalSetup

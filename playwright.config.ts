import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  globalSetup: './src/utils/global-setup.ts',
  timeout: 300 * 1000,
  globalTimeout: 1200 * 1000,
  retries: 1,
  testDir: './src/tests',
  workers: 4,
  expect: {
    timeout: 30 * 1000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'always' }],
  ],

  projects: [
    {
      name: 'todo-list',
      testDir: './src/tests',
      grep: [new RegExp(`@Todolist`)],
      use: {
        browserName: 'chromium',
        headless: process.env.HEADLESS === 'false' ? false : true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 30 * 1000,
        navigationTimeout: 30 * 1000,
        ignoreHTTPSErrors: true,
        colorScheme: 'dark',
        video: 'on',
        screenshot: 'on',
      },
    },
  ],
}

export default config

import {test} from '@playwright/test'

// loginUser.use({
//   launchOptions: {
//     slowMo: 1000, // 1 second delay between actions
//   },
// })


// test('Login', async ({ page } ) => 
  export async function loginUser(page, email, password)
{
    await page.goto('https://demo.prestashop.com/#/en/front')
  
  //Wait for the page to fully load
  await page.waitForLoadState('load')

   // Wait for iframe that host the live store
  const iframeElement = await page.waitForSelector('iframe#framelive', { timeout: 30000 })

  // Get the iframe content
  const frame = await iframeElement.contentFrame()

// Wait for "Sign in" link to be visible inside iframe
  const signInButton = await frame.waitForSelector('a:has-text("Sign in")', { timeout: 20000 })

// Click it
  await signInButton.click()

  // waiting for email field
  const emailInput = frame.locator('#field-email')
  await emailInput.waitFor({ state: 'visible', timeout: 10000 })
  
  // Enter email to login
  await emailInput.fill('asthakattel1234@gmail.com')
  
  // wiating for password field and enter password
  const passwordInput = frame.locator('input[name="password"]')
  await passwordInput.waitFor({ state: 'visible' , timeout: 10000})
  await passwordInput.fill('#Password@123')
  
  // Wait for SHOW button and click it
  const showButton = frame.locator('button[data-action="show-password"]')
  // password becomes visible
  await showButton.click()

  // Click again to hide password
  await showButton.click()

  // Click "Sign in"
  await frame.locator('button[id="submit-login"]').click()

}

// //  Test to check login functionality independently
//   test('Login Test - Standalone', async ({ page }) => {
//   await loginUser(page, 'asthakattel1234@gmail.com', '#Password@123')
//   })
import {test} from '@playwright/test'

// test.use({
//   launchOptions: {
//     slowMo: 1000, // 1 second delay between actions
//   },
// });


//fresh page asigning
// test('Registration', async ({ page } ) => 
// {
  export async function registerUser(page, email, password)
{
  // set-ing timeout for this test(if we do it globally, it will slow out other test also)
   test.setTimeout(200000)

  await page.goto('https://demo.prestashop.com/#/en/front',
    {
      waitUntil: 'networkidle',
        timeout: 100000
    })

  await page.waitForTimeout(5000) // wait 5 seconds for the page to stabilize

  // Wait for iframe that host the live store
  const iframeElement = await page.waitForSelector('iframe#framelive', { timeout: 60000 })

  // Get the iframe content
  const frame = await iframeElement.contentFrame()
  await frame.waitForLoadState('domcontentloaded')

  const signInLink = frame.getByRole('link', { name: 'Sign in', exact: true })
  await signInLink.click()


  // Wait for "No account? Create one here" link and click
  const createAccountLink = frame.locator('a:has-text("No account? Create one here")')
  await createAccountLink.waitFor({ state: 'visible', timeout: 100000 })
  await createAccountLink.click()


  // select "ms." for radio button
  const genderFemale = frame.locator('input[name="id_gender"][value="2"]')
  await genderFemale.waitFor()
  await genderFemale.check()

  // Fill in form fields
  await frame.fill('#field-firstname', 'Astha')
  await frame.fill('#field-lastname', 'Kattel')
  await frame.fill('#field-email', "asthakattel1234@gmail.com")
  await frame.fill('#field-password', '#Password@123')
  
  await frame.locator('button[data-action="show-password"]').click({ timeout: 10000 })

  await frame.fill('#field-birthday', '01/15/2002')

  // Check "Receive offers from our partner"
  await frame.locator('input[type="checkbox"][name="optin"]').check()

  // Check "Terms of service"
  await frame.locator('input[type="checkbox"][name="psgdpr"]').check()

  await frame.locator('input[type="checkbox"][name="newsletter"]').check()

  await frame.locator('input[type="checkbox"][name="customer_privacy"]').check()


  //For submitting details
  const submitButton = frame.getByRole('button', { name: 'Save' })

  // Wait until it’s visible
  await submitButton.waitFor({ state: 'visible', timeout: 30000 })

  // Click it
  await submitButton.click()

}

// //  Test to check login functionality independently
// test('Registration Test - Standalone', async ({ page }) => {
//   await registerUser(page, 'asthakattel1234@gmail.com', '#Password@123')
// })


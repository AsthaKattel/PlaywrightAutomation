import { test } from '@playwright/test'
import { registerUser } from './registration.spec.js'
import { loginUser } from './login.spec.js'

// I have faced authentication error while directly logging in (even though it is registered users)
// so, trying to complete automation of purchase flow task through
// this steps(Register -> signout -> signin -> purchase)

test('Register, Sign-in, and Purchase Flow', async ({ page }) => {
 
  // set-ing timeout for this test(if we do it globally, it will slow out other test also)
  test.setTimeout(200000);

  await registerUser(page, 'asthakattel1234@gmail.com', '#Password@123');
  
  // Re-acquire iframe after registration
  const iframeElementAfter= await page.waitForSelector('iframe#framelive', { timeout: 60000 });
  const frameAfter = await iframeElementAfter.contentFrame();
    
  //Wait for registration completion (logged-in state)
  await frameAfter.waitForSelector('a:has-text("Sign out")', { timeout: 30000 })

  // Sign out
  const signOutLink = frameAfter.locator('a:has-text("Sign out")').first()
  await signOutLink.waitFor({ state: 'visible', timeout: 30000 })
  // await signOutLink.scrollIntoViewIfNeeded()
  await signOutLink.click()

  //logging-in by importing and using helper file
  await loginUser(page, 'asthakattel1234@gmail.com', '#Password@123');

  //PURCHASSE FLOW

  const firstItem = frameAfter.locator('.product-miniature').first()
  await firstItem.click()

  // Wait for navigation inside iframe
  await page.waitForTimeout(2000) // small wait for iframe to reload

  // Re-acquire the iframe
  const iframeElement2 = await page.waitForSelector('iframe#framelive', { timeout: 30000 })
  const frame2 = await iframeElement2.contentFrame()

  const addToCartBtn = frame2.locator('button.add-to-cart')
  await addToCartBtn.click()

  const continueShoppingBtn = frame2.locator('button:has-text("Continue shopping")')
  await continueShoppingBtn.waitFor({ state: 'visible', timeout: 30000 })
  await continueShoppingBtn.click({ timeout: 30000, force: true })

  // reacquire the iframe first
  const iframeElement3 = await page.waitForSelector('iframe#framelive', { timeout: 30000 })
  const frame3 = await iframeElement3.contentFrame()

  // Hover on Accessories
  const accessoriesTab = frame3.locator('a.dropdown-item[data-depth="0"]', { hasText: 'Accessories' })
  await accessoriesTab.hover()   

  // Wait for Home Accessories to be visible
  const homeAccessories = frame3.locator('a.dropdown-item[data-depth="1"]', { hasText: 'Home Accessories' })
  await homeAccessories.waitFor({ state: 'visible', timeout: 10000 })

  // Click Home Accessories
  await homeAccessories.click({ force: true })

  //adding second item to cart
  const secondItem = frame3.locator('.product-miniature').first()
  await secondItem.click()
  
  // re-aquire
  const newIframeElement4 = await page.waitForSelector('iframe#framelive', { timeout: 30000 })
  const newFrame4 = await newIframeElement4.contentFrame()

  await newFrame4.locator('button.add-to-cart').click()

  const proceedCheckoutBtn = newFrame4.locator('a:has-text("Proceed to checkout")')
  await proceedCheckoutBtn.waitFor({ state: 'visible' })
  await proceedCheckoutBtn.click()

  // Re-acquire the iframe 
  const iframeElement5 = await page.waitForSelector('iframe#framelive', { timeout: 30000 })
  const frame5 = await iframeElement5.contentFrame()

  // suddenly process is being stuck in this part:
  // (if clicked manually in this part, than other part will be run automatically)
  const finalCheckoutBtn = frame5.locator('a.btn-primary', { hasText: 'Proceed to checkout' })

  // const finalCheckoutBtn = frame5.locator('a.btn-primary:has-text("Proceed to checkout")')
  await finalCheckoutBtn.waitFor({ state: 'visible' })
  await finalCheckoutBtn.click({ force: true })

  const iframeElement6 = await page.waitForSelector('iframe#framelive', { timeout: 30000 });
  const frame6 = await iframeElement6.contentFrame();

  // waiting for the form to appear
  await frame6.waitForSelector('#checkout-addresses-step', { state: 'visible', timeout: 60000 })
  console.log("Checkout page loaded");

  await frame6.fill('#field-firstname', 'Astha')
  await frame6.fill('#field-lastname', 'kattel')
  await frame6.fill('#field-address1', 'kathmandu, sinamangal')
  await frame6.fill('#field-city', 'kathmandu')
  await frame6.selectOption('#field-id_state', '8') 
  await frame6.fill('#field-postcode', '12345')
  await frame6.fill('#field-phone', '9800000000')

  // Continue with delivery options, agree terms, etc.
  await frame6.click('button[name="confirm-addresses"]')
  await frame6.fill('textarea[name="delivery_message"]', 'Leave package at the door')
  await frame6.click('button[name="confirmDeliveryOption"]')

  const agreeTerms = frame6.locator('input[name="conditions_to_approve[terms-and-conditions]"]')
  await agreeTerms.check()

})

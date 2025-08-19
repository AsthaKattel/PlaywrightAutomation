This project automates end-to-end flows on a demo e-commerce website using Playwright with JavaScript. The main flows covered include user registration, login, purchase, and advanced UI interactions such as iframes, alerts, window switching, mouse/keyboard actions, and explicit waits.

Installation Requirement and Instructions

1. Check if Node.js is installed (node.js required for playwright), if not node.js should be installed:
	
    npm -v

2. Install Playwright

Ensure you have Visual Studio code (VS Code) installed. Then, install Playwright by opening terminal from Vs code:

npm init playwright@latest

While completing process of installation; it asks some question like Which language you want (JavaScript, TypeScript etc.), Whether you want sample tests, Which browsers to install (Chromium, Firefox, WebKit) , we have to choose according our requirements. Here, i have choosed Javascript , Yes, Chromium respectively.

NOTE: up-down arrow can be used to go over the options, and enter is used to select

At the end, it sets up a ready-to-use Playwright project with:
package.json, playwright.config.js, Example tests, Installed browsers


Execution Instructions

To execute this program:

1. Get project download/clone from Git

2. Open downloaded folder using Vs Code
    
    Open Vs code
    Click on 'File'
    Click on 'Open Folder'
    Now, Go to the downloaded folder , select folder and clcik on open.

3. Run the test file on terminal

    In the folder 'tests' there must be file like login.spec.js, registration.spec.js, purchaseflow.spec.js
    Click on one file(For registration and login file, you must comment out last commented part of code to run file independently - since it is imported in purchase flow file, i have commented out that part to avoid running 3 test and 3 worker)
    Click on 'Terminal' tab.
    click on "New Terminal' (terminal should have path of the project)

4. Run the file (in chrome)
     npx playwright test PATH_OF_THE_TEST_FILE --project Chromium --headed

     eg: npx playwright test ./tests/purchaseflow.spec.js --project Chromium --headed


NOTE: By default, tests may run in headless mode. To visualize the browser, Run with Headed Mode:

npx playwright test --headed

5. View Test Reports
     After execution, HTML report can be generated: npx playwright show-report



IMPORTANT INFO:

1.  I have faced authentication error while directly logging in (even though it is registered users). So, trying to complete automation of purchase flow task through this steps(Register -> signout -> signin -> purchase)

2. Suddenly process is being stuck in final checkout button but if clicked manually in this part, than other part will be run automatically.
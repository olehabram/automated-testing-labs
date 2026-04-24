const puppeteer = require('puppeteer');

const PAGE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const PRODUCT_NAME = 'Sauce Labs Backpack';

jest.setTimeout(60000);

async function clickAndWaitForUrl(page, selector, urlPart) {
  await Promise.all([
    page.waitForFunction((expectedUrlPart) => window.location.href.includes(expectedUrlPart), {}, urlPart),
    page.click(selector)
  ]);
}

async function login(page) {
  await page.goto(PAGE_URL, {
    waitUntil: 'networkidle2'
  });

  await page.type('[data-test="username"]', USERNAME);
  await page.type('[data-test="password"]', PASSWORD);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
    page.click('[data-test="login-button"]')
  ]);
}

describe('SauceDemo E2E user scenarios', () => {
  let browser;
  let context;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  });

  beforeEach(async () => {
    context = await browser.createBrowserContext();
    page = await context.newPage();
  });

  afterEach(async () => {
    if (page) {
      await page.close();
    }
    if (context) {
      await context.close();
    }
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('successfully logs in a user', async () => {
    await login(page);

    await page.waitForSelector('[data-test="title"]');
    const currentUrl = page.url();
    const pageTitle = await page.$eval('[data-test="title"]', (element) =>
      element.textContent.trim()
    );

    expect(currentUrl).toContain('/inventory.html');
    expect(pageTitle).toBe('Products');
  });

  test('adds a product to the cart', async () => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.waitForSelector('[data-test="shopping-cart-badge"]');

    const badgeText = await page.$eval('[data-test="shopping-cart-badge"]', (element) =>
      element.textContent.trim()
    );
    expect(badgeText).toBe('1');

    await clickAndWaitForUrl(page, '[data-test="shopping-cart-link"]', 'cart.html');
    await page.waitForSelector('[data-test="inventory-item-name"]');

    const cartItemName = await page.$eval('[data-test="inventory-item-name"]', (element) =>
      element.textContent.trim()
    );
    expect(cartItemName).toBe(PRODUCT_NAME);
  });

  test('completes an order checkout', async () => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.waitForSelector('[data-test="shopping-cart-badge"]');
    await clickAndWaitForUrl(page, '[data-test="shopping-cart-link"]', 'cart.html');
    await page.waitForSelector('[data-test="checkout"]');
    await clickAndWaitForUrl(page, '[data-test="checkout"]', 'checkout-step-one.html');

    await page.waitForSelector('[data-test="firstName"]');
    await page.type('[data-test="firstName"]', 'Oleh');
    await page.type('[data-test="lastName"]', 'Student');
    await page.type('[data-test="postalCode"]', '01001');

    await clickAndWaitForUrl(page, '[data-test="continue"]', 'checkout-step-two.html');
    await page.waitForSelector('[data-test="finish"]');

    await clickAndWaitForUrl(page, '[data-test="finish"]', 'checkout-complete.html');
    await page.waitForSelector('[data-test="complete-header"]');
    const completeMessage = await page.$eval('[data-test="complete-header"]', (element) =>
      element.textContent.trim()
    );

    expect(completeMessage).toBe('Thank you for your order!');
  });
});

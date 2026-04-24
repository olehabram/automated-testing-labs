import puppeteer from 'puppeteer';
import { login, SELECTORS } from '../../src/helpers/saucedemo.helpers';

jest.setTimeout(60000);
jest.retryTimes(2);

describe('SauceDemo E2E tests', () => {
  let browser;
  let context;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
  });

  beforeEach(async () => {
    context = await browser.createBrowserContext();
    page = await context.newPage();
  });

  afterEach(async () => {
    await context.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('user can log in successfully', async () => {
    await login(page);
    const title = await page.$eval(SELECTORS.productsTitle, (element) => element.textContent);

    expect(title).toBe('Products');
  });

  test('user can add Sauce Labs Backpack to the cart', async () => {
    await login(page);
    await page.click(SELECTORS.backpackAddButton);
    const cartBadge = await page.$eval('.shopping_cart_badge', (element) => element.textContent);

    expect(cartBadge).toBe('1');
  });

  test('user can remove an item from the cart', async () => {
    await login(page);
    await page.click(SELECTORS.backpackAddButton);
    await page.click(SELECTORS.backpackRemoveButton);
    const cartBadge = await page.$('.shopping_cart_badge');

    expect(cartBadge).toBeNull();
  });

  test('user can move to checkout and fill personal data', async () => {
    await login(page);
    await page.click(SELECTORS.backpackAddButton);
    await page.click(SELECTORS.cartLink);
    await page.waitForSelector(SELECTORS.checkoutButton);
    await page.click(SELECTORS.checkoutButton);
    await page.waitForSelector(SELECTORS.firstNameInput);
    await page.type(SELECTORS.firstNameInput, 'John');
    await page.type(SELECTORS.lastNameInput, 'Doe');
    await page.type(SELECTORS.postalCodeInput, '12345');
    await page.click(SELECTORS.continueButton);
    await page.waitForSelector(SELECTORS.finishButton);
    const title = await page.$eval(SELECTORS.productsTitle, (element) => element.textContent);

    expect(title).toBe('Checkout: Overview');
  });

  test('user can complete an order', async () => {
    await login(page);
    await page.click(SELECTORS.backpackAddButton);
    await page.click(SELECTORS.cartLink);
    await page.waitForSelector(SELECTORS.checkoutButton);
    await page.click(SELECTORS.checkoutButton);
    await page.waitForSelector(SELECTORS.firstNameInput);
    await page.type(SELECTORS.firstNameInput, 'John');
    await page.type(SELECTORS.lastNameInput, 'Doe');
    await page.type(SELECTORS.postalCodeInput, '12345');
    await page.click(SELECTORS.continueButton);
    await page.waitForSelector(SELECTORS.finishButton);
    await page.click(SELECTORS.finishButton);
    await page.waitForSelector(SELECTORS.completeHeader);
    const completeMessage = await page.$eval(SELECTORS.completeHeader, (element) => element.textContent);

    expect(completeMessage).toBe('Thank you for your order!');
  });
});

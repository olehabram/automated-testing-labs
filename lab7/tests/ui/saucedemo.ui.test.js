import puppeteer from 'puppeteer';
import { login, openLoginPage, SELECTORS } from '../../src/helpers/saucedemo.helpers';

jest.setTimeout(60000);
jest.retryTimes(2);

describe('SauceDemo UI tests', () => {
  let browser;
  let context;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
  });

  beforeEach(async () => {
    context = await browser.createBrowserContext();
    page = await context.newPage();
    await openLoginPage(page);
  });

  afterEach(async () => {
    await context.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('login page opens', async () => {
    expect(page.url()).toContain('saucedemo.com');
  });

  test('username field exists', async () => {
    const usernameInput = await page.$(SELECTORS.usernameInput);

    expect(usernameInput).not.toBeNull();
  });

  test('password field exists', async () => {
    const passwordInput = await page.$(SELECTORS.passwordInput);

    expect(passwordInput).not.toBeNull();
  });

  test('Login button exists', async () => {
    const loginButton = await page.$(SELECTORS.loginButton);

    expect(loginButton).not.toBeNull();
  });

  test('Products title is visible after login', async () => {
    await login(page);
    const title = await page.$eval(SELECTORS.productsTitle, (element) => element.textContent);

    expect(title).toBe('Products');
  });

  test('product list is visible after login', async () => {
    await login(page);
    const productCount = await page.$$eval('.inventory_item', (items) => items.length);

    expect(productCount).toBeGreaterThan(0);
  });
});

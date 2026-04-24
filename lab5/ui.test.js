const puppeteer = require('puppeteer');

const PAGE_URL = 'https://example.com';

jest.setTimeout(30000);

describe('Example.com UI tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(PAGE_URL, {
      waitUntil: 'domcontentloaded'
    });
  });

  afterEach(async () => {
    if (page) {
      await page.close();
    }
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('has the correct page title', async () => {
    await expect(page.title()).resolves.toBe('Example Domain');
  });

  test('has the main h1 heading', async () => {
    const heading = await page.$('h1');

    expect(heading).not.toBeNull();
  });

  test('has the correct main heading text', async () => {
    const headingText = await page.$eval('h1', (element) => element.textContent.trim());

    expect(headingText).toBe('Example Domain');
  });

  test('has a descriptive paragraph', async () => {
    const paragraphText = await page.$eval('p', (element) => element.textContent.trim());

    expect(paragraphText.length).toBeGreaterThan(0);
    expect(paragraphText).toContain('This domain is for use in documentation examples');
  });

  test('has the Learn more link text', async () => {
    const linkText = await page.$eval('a', (element) => element.textContent.trim());

    expect(linkText).toBe('Learn more');
  });

  test('has a link that leads to iana.org', async () => {
    const href = await page.$eval('a', (element) => element.href);

    expect(href).toContain('iana.org');
  });
});

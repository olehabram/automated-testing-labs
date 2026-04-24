export const PAGE_URL = 'https://www.saucedemo.com/';
export const USERNAME = 'standard_user';
export const PASSWORD = 'secret_sauce';

export const SELECTORS = {
  usernameInput: '#user-name',
  passwordInput: '#password',
  loginButton: '#login-button',
  productsTitle: '.title',
  inventoryList: '.inventory_list',
  backpackAddButton: '#add-to-cart-sauce-labs-backpack',
  backpackRemoveButton: '#remove-sauce-labs-backpack',
  cartLink: '.shopping_cart_link',
  checkoutButton: '#checkout',
  firstNameInput: '#first-name',
  lastNameInput: '#last-name',
  postalCodeInput: '#postal-code',
  continueButton: '#continue',
  finishButton: '#finish',
  completeHeader: '.complete-header'
};

export const openLoginPage = async (page) => {
  await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector(SELECTORS.usernameInput);
};

export const login = async (page) => {
  await openLoginPage(page);
  await page.type(SELECTORS.usernameInput, USERNAME);
  await page.type(SELECTORS.passwordInput, PASSWORD);
  await Promise.all([
    page.waitForSelector(SELECTORS.inventoryList),
    page.click(SELECTORS.loginButton)
  ]);
};

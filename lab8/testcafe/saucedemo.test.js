import { Selector } from 'testcafe';

fixture('SauceDemo UI tests with TestCafe').page('https://www.saucedemo.com/');

const loginLogo = Selector('.login_logo');
const usernameInput = Selector('[data-test="username"]');
const passwordInput = Selector('[data-test="password"]');
const loginButton = Selector('[data-test="login-button"]');
const pageTitle = Selector('[data-test="title"]');

test('opens the SauceDemo login page', async t => {
  await t
    .expect(loginLogo.visible)
    .ok()
    .expect(loginLogo.innerText)
    .eql('Swag Labs');
});

test('shows username, password fields and Login button', async t => {
  await t
    .expect(usernameInput.visible)
    .ok()
    .expect(passwordInput.visible)
    .ok()
    .expect(loginButton.visible)
    .ok()
    .expect(loginButton.value)
    .eql('Login');
});

test('logs in as standard_user and shows Products page', async t => {
  await t
    .typeText(usernameInput, 'standard_user')
    .typeText(passwordInput, 'secret_sauce')
    .click(loginButton)
    .expect(pageTitle.visible)
    .ok()
    .expect(pageTitle.innerText)
    .eql('Products');
});

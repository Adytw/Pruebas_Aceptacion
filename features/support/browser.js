const { After, Before } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const path = require('path');
const { pathToFileURL } = require('url');

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.page = await this.browser.newPage();
  this.storeUrl = pathToFileURL(path.resolve(__dirname, '..', '..', 'index.html')).href;
});

After(async function () {
  try {
    if (this.page) {
      await this.attach(await this.page.screenshot(), 'image/png');
    }
  } finally {
    if (this.browser) {
      await this.browser.close();
    }
  }
});

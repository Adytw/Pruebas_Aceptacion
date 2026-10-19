const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('que abro la tienda y el carrito está vacío', async function () {
  await this.page.goto(this.storeUrl);
  assert.strictEqual(await this.page.locator('#total').innerText(), '$0.00');
  assert.strictEqual(await this.page.locator('#item-count').innerText(), '0');
});

When('agrego {int} unidades de {string}', async function (cantidad, producto) {
  const addButton = this.page.locator(`.add-button[data-name="${producto}"]`);

  for (let unit = 0; unit < cantidad; unit += 1) {
    await addButton.click();
  }
});

Then('veo {int} artículos y un total de {string}', async function (cantidadEsperada, totalEsperado) {
  assert.strictEqual(await this.page.locator('#item-count').innerText(), String(cantidadEsperada));
  assert.strictEqual(await this.page.locator('#item-label').innerText(), `${cantidadEsperada} artículos`);
  assert.strictEqual(await this.page.locator('#subtotal').innerText(), totalEsperado);
  assert.strictEqual(await this.page.locator('#total').innerText(), totalEsperado);
  assert.strictEqual(await this.page.locator('.item-detail').innerText(), '2 × $10.00');
});

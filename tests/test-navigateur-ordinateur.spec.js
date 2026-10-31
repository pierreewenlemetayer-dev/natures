// Tests Playwright à exécuter localement sur la branche de développement.
// npm install --no-save @playwright/test && npx playwright test tests/test-navigateur-ordinateur.spec.js
const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const url = pathToFileURL(path.join(__dirname, 'preview-corpus-elargi.html')).href;

test.use({ viewport: { width: 1440, height: 900 } });

test('une partie commence et la grille reste lisible sur ordinateur', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('#word')).toHaveText('Prêt ?');
  await page.locator('#next').click();
  await expect(page.locator('#progress')).toHaveText('Question 1 / 10');
  const layout = await page.locator('.layout').boundingBox();
  const center = await page.locator('.word').boundingBox();
  expect(layout && center).toBeTruthy();
  expect(center.width).toBeGreaterThan(270);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('le clavier accède aux sous-catégories puis au bouton Suivant', async ({ page }) => {
  await page.goto(url);
  await page.locator('#next').click();
  await page.locator('[data-class="pronom"]').click();
  await expect(page.locator('#subchoices')).toBeVisible();
  await expect(page.locator('#subchoices button').first()).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#next')).toBeVisible();
  await expect(page.locator('#next')).toBeFocused();
  await expect(page.locator('#feedback')).toContainText('Réponses acceptées');
});

test('les réponses multiples sont toutes affichées dans la correction', async ({ page }) => {
  await page.goto(url);
  await page.locator('#next').click();
  // Une partie peut contenir un mot ambigu ; comparer la correction à la source du corpus.
  const result = await page.evaluate(() => {
    const w = document.querySelector('#word').textContent;
    const item = window.NATURES_DATA.find(([mot]) => mot === w);
    return { word: w, answers: item[1] };
  });
  await page.locator('[data-class="nom"]').click();
  await expect(page.locator('#feedback')).toContainText('Réponses acceptées');
  const fb = await page.locator('#feedback').innerText();
  for (const answer of result.answers) {
    const type = answer.split(':')[1] || answer;
    expect(fb.toLowerCase()).toContain(type.toLowerCase());
  }
});

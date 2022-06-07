import { test, expect, Page } from '@playwright/test';
import { injectAxe, checkA11y, getViolations, reportViolations } from 'axe-playwright';

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.colorado.edu/demos/training/advanced-layout/layouts-videos/video-reveal");
        await injectAxe(page);
      });
      
  test('simple accessibility run', async ({ page }) => {
    await checkA11y(page)
  })


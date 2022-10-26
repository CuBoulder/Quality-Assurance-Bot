import { test, expect, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { HomePage } from "../pages/homepage.page";
import {
  injectAxe,
  checkA11y,
  getViolations,
  reportViolations,
} from "axe-playwright";
var links = fs
  .readFileSync(path.resolve(__dirname, "foo.txt"))
  .toString()
  .split("\n")
  .map((e) => e.trim());

for (const link of links) {

  test("simple accessibility run " + link, async ({ page }) => {
    await page.goto(link);
    await injectAxe(page);
    await checkA11y(page);
  });

  test("test server " + link, async ({ page }) => {
    const url = new URL(link);
    const sitemap = url.protocol + "//" + url.hostname + "/sitemap.xml";

    //await page.goto("https://playwright.dev/docs/intro");
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.status() == 200),
      await page.goto(sitemap),
      //await page.locator(".navbar__brand").click,
    ]);
  });

  test("test live " + link, async ({ page }) => {

    //await page.goto("https://playwright.dev/docs/intro");
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.status() == 200),
      await page.goto(link),
      //await page.locator(".navbar__brand").click,
    ]) ;
  });
}

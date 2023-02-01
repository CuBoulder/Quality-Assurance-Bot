import { test, expect, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import {
  injectAxe,
  checkA11y,
  getViolations,
  reportViolations,
} from "axe-playwright";
var links = fs
  .readFileSync(path.resolve(__dirname, "../test.txt"))
  .toString()
  .split(",")
  .map((e) => e.trim());

for (const link of links) {

  test("simple accessibility run " + link, async ({ page }) => {
    await page.goto(link);
    await injectAxe(page);
    await checkA11y(page);
  });

}

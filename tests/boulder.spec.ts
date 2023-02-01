import { test, expect, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
var links = fs
  .readFileSync(path.resolve(__dirname, "../test.txt"))
  .toString()
  .split(",")
  .map((e) => e.trim());
    for (const link of links) {
      test("valid link: " + link, async ({ page }) => {
        await page.goto(link);
        await expect(page).toHaveURL(link);
        
      });
    }
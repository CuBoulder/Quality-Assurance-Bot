const { playAudit } = require("playwright-lighthouse");
const playwright = require("playwright");
import { test, expect, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

var links = fs
  .readFileSync(path.resolve(__dirname, "../test.txt"))
  .toString()
  .split(",")
var portcheck = 9223;
for (const link of links) {
  test("lighthouse: " + link, async () => {
      var newport = portcheck + links.indexOf(link);
    const browser = await playwright["chromium"].launch({
      args: ["--remote-debugging-port=" + newport],
    });
    const page = await browser.newPage();
    await page.goto(link);

    await playAudit({
      page: page,
      thresholds: {
        performance: 10,
        accessibility: 10,
        "best-practices": 10,
        seo: 10,
        pwa: 10,
      }, 
      reports: {
        formats: {
          html: true, //defaults to false
        }
      },
      port: newport,
    });

    await browser.close();
  });
}

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
const DOTENV = require('dotenv').config();
const Sitemapper = require("sitemapper");
var links = ["google.com"];
console.log(process.env.XML_FILE)
var promise = new Promise(function (resolve, reject) {
  links = ["https://www.colorado.edu/src/sitemap.xml"];

  const sitemapper = new Sitemapper();
  sitemapper.timeout = 5000;
  sitemapper
    .fetch(process.env.XML_FILE)
    .then(({ url, sites }) => {
      console.log(`url:${url}`, "lol:", sites);
    })

    .catch((error) => console.log(error));


  resolve(links);
});

promise
  .then(function () {
    for (const link of links) {
      test("basic test " + link, async ({ page }) => {
        await page.goto(link);
        const logo = page.locator(".sitename span");
        await expect(logo).toHaveText("Physics");
      });
    }
  })
  .catch(function () {
    console.log("Some error has occurred");
  });

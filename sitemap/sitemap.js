
const DOTENV = require("dotenv").config();
const Sitemapper = require("sitemapper");
const sitemapper = new Sitemapper();
    const fs = require('fs');

const content = 'Some conteknt!';
sitemapper.timeout = 5000;
sitemapper
  .fetch('https://www.colorado.edu/physics/sitemap.xml')
  .then(({ url, sites }) => {
fs.writeFile('../test.txt', String(sites), err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
  })
  .catch((error) => console.log(error));
  
//code puppeteer automation likeee
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const TiktokAutoLike = async (even, arg) => {
  const { email, password } = arg;
  try {
    (async () => {
      // if using infinite pass --iteration=infinite args
      const iteration = 10;
      // General constants
      const tiktokUrl =
        "https://www.tiktok.com/login/phone-or-email/email?lang=en";
      // Selectors constants
      const inputEmailSelector = 'input[name="username"]';
      const inputPasswordSelector = 'input[placeholder="Password"]';
      const submitLoginSelector = 'button[type="submit"]:not([disabled])';
      const closeButtonSelector = 'div[data-e2e="modal-close-inner-button"]';
      const likeButtonSelector = 'span[data-e2e="like-icon"]';
      // Helper functions
      const waitAndClickSelector = async (selector) => {
        await page.waitForSelector(selector);
        await page.click(selector);
      };
      const waitForTimeout = (delay) =>
        new Promise((resolve) => setTimeout(resolve, delay));
      const randomDelayWithInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
      };

      // Starts the automation
      const browser = await puppeteer.launch({
        // using Chrome instead of Chromium due to bug when Chromium opens tiktok keep getting crashed
        executablePath:
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        headless: false,
      });
      const page = (await browser.pages())[0];
      // set view port and open tiktok page
      page.setViewport({ width: 1280, height: 800, isMobile: false });
      await page.goto(tiktokUrl, { timeout: 0 });

      // Login flow
      await page.type(inputEmailSelector, email, { delay: 10 });
      await page.type(inputPasswordSelector, password, { delay: 10 });
      await page.click(submitLoginSelector);
      // await page.waitForSelector(closeButtonSelector, { hidden: true, timeout: 0 });

      // Begin the iteration of liking post
      let i = 1;
      while (iteration === "infinite" ? true : i <= iteration) {
        const listItemSelector = `article[data-e2e="recommend-list-item-container"]:nth-of-type(${i})`;
        // const listItemSelector = `div[article]:nth-of-type(${i})`;
        const likeButton = `${listItemSelector} ${likeButtonSelector}`;

        await waitAndClickSelector(likeButton);
        await page.keyboard.press("ArrowDown");

        // A random delay to prevent activity being recognized as bot
        await waitForTimeout(randomDelayWithInterval(5, 7));
        i++;
      }
      even.sender.send("success", "Job Success");
      await browser.close();
    })();
  } catch (err) {
    console.log(err);
  }
};

module.exports = TiktokAutoLike;

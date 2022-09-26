import puppeteer from 'puppeteer';
import navigate from '../utils/navigate';
import { refocusWindow } from '../utils/window';

const YOUTUBE_MUSIC_URL = 'https://music.youtube.com/';

export const playMusic = async (args: string[]) => {
  if (args.length === 0) {
    return navigate(YOUTUBE_MUSIC_URL);
  }

  const searchQuery = args.join('+');
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  //Without setting the user agent, the selectors won't be found in headless mode
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
  );

  const searchUrl = `${YOUTUBE_MUSIC_URL}search?q=${searchQuery}`;

  await page.goto(searchUrl);

  //Wait for the primary suggested search result to load
  await page.waitForSelector(
    'ytmusic-shelf-renderer:first-of-type div#contents'
  );

  //Hover over the first search result to show its menu icon
  await page.hover(
    'ytmusic-shelf-renderer:first-of-type div#contents ytmusic-responsive-list-item-renderer:first-of-type'
  );

  //Click on the menu icon to open the side menu
  await page.click(
    'ytmusic-shelf-renderer:first-of-type div#contents ytmusic-responsive-list-item-renderer:first-of-type ytmusic-menu-renderer'
  );

  await page.waitForSelector('ytmusic-menu-popup-renderer');

  //Get the href from the first anchor tag in the popup menu ("Start Radio" for songs and "Shuffle" for albums/artists)
  let href = await page.$$eval(
    'ytmusic-menu-popup-renderer #items a',
    (elements) => {
      return elements
        .find(
          <HTMLElement>(el) =>
            el.querySelector('yt-formatted-string')?.innerText === 'Start radio'
        )
        .getAttribute('href');
    }
  );
  let url = `${YOUTUBE_MUSIC_URL}${href}`;

  await browser.close();
  const refocus = await refocusWindow();
  navigate(url);
  refocus();
};

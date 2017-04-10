import { MagicPage } from './app.po';

describe('magic App', () => {
  let page: MagicPage;

  beforeEach(() => {
    page = new MagicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

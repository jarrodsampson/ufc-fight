import { UfcFightPage } from './app.po';

describe('ufc-fight App', () => {
  let page: UfcFightPage;

  beforeEach(() => {
    page = new UfcFightPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

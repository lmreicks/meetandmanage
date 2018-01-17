import { MeetandmanagePage } from './app.po';

describe('meetandmanage App', () => {
  let page: MeetandmanagePage;

  beforeEach(() => {
    page = new MeetandmanagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { ScheduleMePage } from './app.po';

describe('schedule-me App', function() {
  let page: ScheduleMePage;

  beforeEach(() => {
    page = new ScheduleMePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

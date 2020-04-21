import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    page.navigateTo();
    const text = await page.getTitleText();
    expect(text).toContain('vue-ngx-datatable ');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      // tslint:disable-next-line: no-object-literal-type-assertion
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});

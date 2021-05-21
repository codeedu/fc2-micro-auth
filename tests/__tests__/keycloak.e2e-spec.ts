import { Builder, Capabilities, until, WebDriver } from "selenium-webdriver";
import Keycloak from "keycloak-connect";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";

const capabilities = Capabilities.chrome();

capabilities.set("goog:chromeOptions", {
  args: [
    "--disable-gpu",
    "--headless",
    "--window-size=800,600",
    "--enable-javascript",
    "--disable-extensions",
    "--disable-dev-shm-usage",
    "--no-proxy-server",
    "--proxy-server='direct://'",
    "--proxy-bypass-list=*",
    "--no-sandbox",
  ],
});

describe("validate themes", () => {
  let driver: WebDriver;
  beforeEach(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      .withCapabilities(capabilities)
      .usingServer("http://selenium:4444/wd/hub")
      .build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  test("validate codeflix theme", async () => {
    const memoryStore = new session.MemoryStore();

    const keycloak = new Keycloak(
      { store: memoryStore },
      {
        realm: "test",
        resource: "codeflix-client",
        "auth-server-url": "http://app.test:8080/auth/",
        "ssl-required": "external",
        "confidential-port": 0,
      }
    );

    const loginUrl = keycloak.loginUrl(uuidv4(), "http://localhost:8000");

    await driver.get(loginUrl);
    await driver.sleep(5000);
    await driver.wait(
      until.elementLocated({ xpath: "//span[text()='Log In']" })
    );
    await driver.wait(
      until.elementLocated({
        className:
          "MuiTypography-root MuiCardHeader-title MuiTypography-h5 MuiTypography-displayBlock",
      })
    );
  });
});

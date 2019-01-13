const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

describe("When logged in", async () => {
  beforeEach(async () => {
    await page.login();
    await page.click("a.btn-floating");
  });

  test("User's are able to see create form", async () => {
    const label = await page.getContentsOf("form label");
    expect(label).toEqual("Blog Title");
    // await page.goto("localhost:3000/blogs");
  });

  describe("When using valid input", async () => {
    beforeEach(async () => {
      await page.type(".title input", "Users Title");
      await page.type(".content input", "Users Content");
      await page.click("form button");
    });

    test("Clicking on submit button takes users to review screen", async () => {
      const text = await page.getContentsOf(".container form h5");

      expect(text).toEqual("Please confirm your entries");
    });

    test("Click on submit button and then saving content adds blog to the index page", async () => {
      await page.click(".container button.green");
      await page.waitFor(".card");

      const title = await page.getContentsOf(".card-title");
      const content = await page.getContentsOf("p");

      expect(title).toEqual("Users Title");
      expect(content).toEqual("Users Content");
    });
  });

  describe("When using invalid inputs", async () => {
    beforeEach(async () => {
      await page.click("form button");
    });
    test("The form shows an error message", async () => {
      const titleError = await page.getContentsOf(".title .red-text");
      const contentError = await page.getContentsOf(".content .red-text");

      expect(titleError).toEqual("You must provide a value");
      expect(contentError).toEqual("You must provide a value");
    });
  });
});

describe("When user is not logged in", async () => {
  test("User is not able to create blog posts", async () => {
    const result = await page.evaluate(() => {
      return fetch("/api/blogs", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: "My New Title",
          content: "My New Content"
        })
      }).then(res => res.json());
    });
    expect(result).toEqual({ error: "You must log in!" });
  });

  test("User not able to see blog posts", async () => {
    const result = await page.evaluate(() => {
      return fetch("/api/blogs", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json());
    });
    expect(result).toEqual({ error: "You must log in!" });
  });
});

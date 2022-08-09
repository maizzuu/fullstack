describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Test Tester",
      username: "ttester",
      password: "topsecret",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in:");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("ttester");
      cy.get("#password").type("topsecret");
      cy.get("#loginButton").click();
      cy.contains("Test Tester logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrong");
      cy.get("#password").type("wrong");
      cy.get("#loginButton").click();
      cy.get(".error").contains("wrong credentials");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("ttester");
      cy.get("#password").type("topsecret");
      cy.get("#loginButton").click();
    });

    it("A blog can be created", function () {
      cy.get("#togglableButton").click();
      cy.get("#title").type("How to write a book");
      cy.get("#author").type("Serious Author");
      cy.get("#url").type("www.google.co.uk");
      cy.get("#createButton").click();
      cy.contains("a new blog How to write a book by Serious Author added");
      cy.contains("How to write a book Serious Author");
    });

    it("A blog can be liked", function () {
      cy.get("#togglableButton").click();
      cy.get("#title").type("Blog");
      cy.get("#author").type("Author");
      cy.get("#url").type("www.google.co.uk");
      cy.get("#createButton").click();
      cy.get("#viewBlog").click();
      cy.contains("likes 0");
      cy.get("#likeBlog").click();
      cy.contains("likes 1");
    });

    it("A blog can be removed", function () {
      cy.get("#togglableButton").click();
      cy.get("#title").type("Blog");
      cy.get("#author").type("Author");
      cy.get("#url").type("www.google.co.uk");
      cy.get("#createButton").click();
      cy.reload();
      cy.get("#viewBlog").click();
      cy.get("#removeBlog").click();
      cy.get("#removeBlog").should("not.exist");
    });

    it("Arranges blogs in correct order", function () {
      cy.get("#togglableButton").click();
      cy.get("#title").type("No likes");
      cy.get("#author").type("Author");
      cy.get("#url").type("www.google.co.uk");
      cy.get("#createButton").click();
      cy.reload();
      cy.get("#togglableButton").click();
      cy.get("#title").type("Two likes");
      cy.get("#author").type("Author");
      cy.get("#url").type("www.google.co.uk");
      cy.get("#createButton").click();
      cy.reload();
      cy.get("#viewTwolikes").click();
      cy.get("#likeTwolikes").click();
      cy.get("#likeTwolikes").click();
      cy.reload();
      cy.get(".blog").eq(0).contains("Two likes Author");
      cy.get(".blog").eq(1).contains("No likes Author");
    });
  });
});

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
});

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("calls on onsubmit", async () => {
  const mockSubmit = jest.fn();
  render(<BlogForm onSubmit={mockSubmit} />);
  const user = userEvent.setup();
  const title = screen.getByPlaceholderText("title here");
  const author = screen.getByPlaceholderText("author here");
  const url = screen.getByPlaceholderText("url here");
  const submit = screen.getByRole("button");
  await user.type(title, "blog title");
  await user.type(author, "blog author");
  await user.type(url, "www.blogurl.fi");
  await user.click(submit);
  expect(mockSubmit).toHaveBeenCalledTimes(1);
  expect(mockSubmit).toHaveBeenCalledWith({
    title: "blog title",
    author: "blog author",
    url: "www.blogurl.fi",
  });
});

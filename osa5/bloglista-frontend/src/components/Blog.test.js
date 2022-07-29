import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  id: 1,
  title: "Test title",
  author: "Test Author",
  url: "www.test.com",
  likes: 22,
};

test("renders title and author", () => {
  render(
    <Blog
      blog={blog}
      showRemove={false}
      handleRemove={() => {}}
      handleLike={() => {}}
    />
  );
  const el = screen.getByTestId("blog");
  expect(el).toHaveTextContent(blog.title);
  expect(el).toHaveTextContent(blog.author);
});

test("renders url and likes when view is clicked", async () => {
  render(
    <Blog
      blog={blog}
      showRemove={false}
      handleRemove={() => {}}
      handleLike={() => {}}
    />
  );
  const user = userEvent.setup();
  const viewButton = screen.getByRole("button", { name: "view" });
  await user.click(viewButton);
  expect(screen.getByTestId("blog")).toHaveTextContent(blog.url);
  expect(screen.getByTestId("blog")).toHaveTextContent(blog.likes);
});

test("calls on handlelike when like button is clicked", async () => {
  const mockHandle = jest.fn();
  render(
    <Blog
      blog={blog}
      showRemove={false}
      handleRemove={() => {}}
      handleLike={mockHandle}
    />
  );
  const user = userEvent.setup();
  const viewButton = screen.getByRole("button", { name: "view" });
  await user.click(viewButton);
  const likeButton = screen.getByRole("button", { name: "like" });
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandle).toHaveBeenCalledTimes(2);
});

import React from "react";
import { LinkButton } from "./link-button";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

test("render LinkButton", async () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <MemoryRouter>
        <LinkButton href="some-page" color="primary">
          This link probably goes nowhere
        </LinkButton>
      </MemoryRouter>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("link")).toHaveAttribute("href", "/some-page");
  expect(getByTestId("button")).toHaveTextContent(
    "This link probably goes nowhere",
  );
});

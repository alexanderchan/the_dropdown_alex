import * as React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import {
  getByTestId as domGetByTestId,
  queryByTestId
} from "@testing-library/dom";
import "jest-dom/extend-expect";
import Dropdown from "../Dropdown";

const items = [
  {
    key: "CA",
    name: "Canada"
  },
  {
    key: "US",
    name: "United States"
  },
  {
    key: "CH",
    name: "Switzerland"
  }
];

beforeEach(cleanup);
test("an item can be chosen", () => {
  const onChange = jest.fn();
  const { getByPlaceholderText, getByTestId, getByText } = render(
    <Dropdown items={items} onChange={onChange} />
  );

  fireEvent.click(getByPlaceholderText(/choose/i));
  fireEvent.click(getByText(/United/i));

  expect(onChange).toHaveBeenCalledWith(items[1]);
  expect(getByTestId("input")).toHaveAttribute("value", "United States");
});

test("item can be cleared", () => {
  const onChange = jest.fn();
  const { getByPlaceholderText, getByTestId, getByText } = render(
    <Dropdown items={items} onChange={onChange} />
  );

  fireEvent.click(getByPlaceholderText(/choose/i));
  fireEvent.click(getByText(/United/i));
  fireEvent.click(getByTestId("clear"));
  expect(onChange).toHaveBeenLastCalledWith(null);
  expect(getByPlaceholderText(/choose/i)).toHaveProperty("value", "");
});

test("all the items are displayed when menu is open", () => {
  const { container, getByPlaceholderText } = render(
    <Dropdown items={items} />
  );

  fireEvent.click(getByPlaceholderText(/choose/i));

  expect(container.querySelectorAll("li").length).toBe(items.length);
});

test("the selected item is checked when re-opening", async () => {
  const { getByTestId, getByText } = render(<Dropdown items={items} />);

  const itemMatch = /Switzerland/i;

  fireEvent.click(getByTestId("input"));
  fireEvent.click(getByText(itemMatch));
  fireEvent.click(getByTestId("input"));

  let checkmark = await domGetByTestId(getByTestId("item-CH"), "checkmark");
  expect(checkmark).toBeTruthy();
  let nocheckmark = await queryByTestId(getByTestId("item-CA"), "checkmark");
  expect(nocheckmark).toBeFalsy();
});

// "An update to App inside a test was not wrapped in act..."
// This warning is fixed in react-dom@16.9 but it is only alpha as of 2019-06-22
// see https://github.com/testing-library/react-testing-library/issues/281

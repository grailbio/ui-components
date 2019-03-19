// @flow
import "jest-dom/extend-expect";
import React from "react";
import mockConsole from "jest-mock-console";
import { SimpleTable } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";
import {
  columns, data, invalidColumns, tableOptions,
} from "./utilities/test-table-properties";

afterEach(cleanup);

/**
 Passing Cases
 */

test("render simple table", () => {
  const { container } = render(
    <TestWrapper>
      <SimpleTable
        columns={columns}
        data={data}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render simple table with no results", () => {
  const { container } = render(
    <TestWrapper>
      <SimpleTable
        columns={columns}
        data={[]}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render loading simple table", () => {
  const { container } = render(
    <TestWrapper>
      <SimpleTable
        columns={columns}
        data={data}
        isLoading
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render simple table with no results and is loading", () => {
  const { container } = render(
    <TestWrapper>
      <SimpleTable
        columns={columns}
        data={[]}
        isLoading
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render simple table with all items selected", () => {
  const mockSelect = jest.fn();
  const { container } = render(
    <TestWrapper>
      <SimpleTable
        idKey="columnOne"
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        onSelect={mockSelect}
        selectedRows={[...tableOptions.selectedRowIds, "Second Datum"]}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render full simple table", () => {
  const mockSelect = jest.fn();
  const { container } = render(
    <TestWrapper>
      <SimpleTable
        idKey="columnOne"
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        onSelect={mockSelect}
        selectedRows={tableOptions.selectedRowIds}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

/**
 Fail Cases
 */

test("throw invalid simple table error", async () => {
  mockConsole();
  expect(() => render(<SimpleTable columns={columns} />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid columns error", () => {
  mockConsole();
  expect(() => render(<SimpleTable
    columns={invalidColumns}
    data={data}
  />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid sortOptions error", () => {
  mockConsole();
  expect(() => render(<SimpleTable
    columns={columns}
    data={data}
    onSort={() => {}}
  />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid selectedRows error", () => {
  mockConsole();
  expect(() => render(<SimpleTable
    columns={columns}
    data={data}
    onSelect={() => {}}
  />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

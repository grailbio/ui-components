// @flow
import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import classNames from "classnames";
import keyBy from "lodash/keyBy";
import mapValues from "lodash/mapValues";
import styles from "../table.module.scss";
import { PagedTableRow } from "./table-row";
import { TableHeader } from "./table-header";
import { getCheckboxColumn } from "../utilities/checkbox-column";
import { getRowId, handleKeyboardHighlight } from "../utilities/row-utils";

type Props = {
  columns: Array<PagedTableColumn>,
  data: Array<Object>,
  isLoading: boolean,
  selectedRows: Array<number | string>,
  classes?: PagedTableClasses,
  idKey?: string | number,
  onSelect?: (Array<any>) => any,
  onSort?: ({ sortOptions: SortOptions }) => any,
  onHighlightRow?: (?number | ?string) => any,
  highlightedRowId?: ?number | ?string,
  tableOptions?: SimpleTableOptions,
  enableSelectAll: boolean,
  shadeOnHover: boolean,
  hasColumnVisibilityChooser?: boolean,
};

export const TableComponent = (props: Props) => {
  const {
    classes = {},
    columns,
    data,
    idKey,
    isLoading,
    onSelect,
    onSort,
    selectedRows,
    onHighlightRow,
    highlightedRowId,
    tableOptions,
    enableSelectAll,
    shadeOnHover,
    hasColumnVisibilityChooser = false,
    ...tableProps
  } = props;
  const sortingProps = { onSort, tableOptions };
  const selectionProps = {
    data,
    idKey,
    onSelect,
    selectedRows,
    onHighlightRow,
    highlightedRowId,
  };
  const highlightRowProps = {
    data,
    idKey,
    onHighlightRow,
    highlightedRowId,
  };
  const availableColumns = columns.filter(column => column.excludeFromTable !== true);
  let tableColumns = availableColumns.map((column, index) => ({
    ...column,
    index,
  }));
  const [columnVisibility, setColumnVisibility] = useState<{ [number]: boolean }>(
    // This simply constructs a map from the column index to a boolean
    // representing whether or not the column is visible.
    mapValues(
      keyBy(tableColumns, column => column.index),
      // TODO(ecarrel): maybe retrieve visibility values from localstorage once
      //  they are stored there.
      column => column.showByDefault !== false,
    ),
  );
  tableColumns = tableColumns.map(column => ({
    ...column,
    isVisible: !hasColumnVisibilityChooser || columnVisibility[column.index],
  }));
  if (onSelect) {
    tableColumns = [getCheckboxColumn(selectionProps), ...tableColumns];
  }
  const hasHeaders = tableColumns.find(column => column.Header);
  return (
    <Table
      tabIndex="0"
      data-testid="table"
      onKeyDown={event => handleKeyboardHighlight(event, highlightRowProps)}
      className={classNames(classes.table, styles.table)}
      {...tableProps}
    >
      {hasHeaders && (
        <TableHeader
          columns={tableColumns}
          // $FlowFixMe undefined props are incompatible with flow definitions.
          sortingProps={sortingProps}
          enableSelectAll={enableSelectAll}
          hasColumnVisibilityChooser={hasColumnVisibilityChooser}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
      )}
      <TableBody>
        {data.length > 0 &&
          data.map((instance, index) => {
            const rowId = getRowId(idKey, instance, index);
            return (
              <PagedTableRow
                selectionProps={selectionProps}
                key={index}
                instance={instance}
                columns={tableColumns}
                rowId={rowId}
                rowIndex={index}
                shadeOnHover={shadeOnHover}
                className={classes.rows || ""}
                hasColumnVisibilityChooser={hasColumnVisibilityChooser}
              />
            );
          })}
        {!data.length && (
          <TableRow>
            <TableCell
              colSpan={tableColumns.length}
              className={classNames("no-results", styles.noResults)}
            >
              {!isLoading && "0 Results"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

// @flow
import React from "react";
import classNames from "classnames";
import styles from "./table.module.scss";
import { CommonCard } from "../common-card";
import { ExportButton } from "../export-button/export-button";
import { SpinnerOverlay } from "../spinner-overlay";
import { TableComponent } from "./components/table-component";
import { TablePager } from "./components/table-pager";
import { TableSummary } from "./components/table-summary";
import { getRowId } from "./utilities/row-utils";

export type PagedTableProps = {
  /** Provides the information you wish to display */
  data: Array<Object>,
  /**
   * Defines the table structure.
   *
   * Must at least include a Cell or accessor key to identify which property in data to display
   */
  columns: Array<PagedTableColumn>,
  /**
   * Provides classNames to table sub-components. Options include:
   *
   *  - `root`: card root div element
   *
   *  - `body`: table div container
   *
   *  - `pagination`: pagination div container
   *
   *  - `table`: `table` element
   *
   *  - `rows`: table row. Can take a function to help specify a className for any specific row
   */
  classes?: PagedTableClasses,
  /**
   * Defaults to the row's `index`.
   *
   * The key from `data` that should be used as the accessor to identify each unique row (returned by `onSelect`).
   */
  idKey?: string | number,
  /** Displays a spinner when `isLoading` is true */
  isLoading?: boolean,
  /** Includes an export button which allows users to download the contents of
   * the table in various formats. Defaults to true. */
  includeExportButton?: boolean,
  /** A function which takes no input and returns a promise to a list of the
   * data that will be exported if the user chooses the option "All rows on all
   * pages matching the given search filter" in the modal that appears when
   * they click the export button. If this function is not specified, such an
   * option does not appear and so users can only export the data present in
   * the table (which is limited by pagination). Has no effect if
   * `includeExportButton` is false. */
  fetchBulkExportRows?: () => Promise<Array<Object>>,
  /** Enables checkbox selection. Must change the state of selectedRows */
  onSelect?: (Array<any>) => any,
  /** Provides the id's for the selected rows when onSelect is used */
  selectedRows?: Array<any>,
  /** Enables row highlighting */
  onHighlightRow?: (?string | ?number) => any,
  /** Provides the id for the highlighted row when onHighlightRow is used */
  highlightedRowId?: ?string | ?number,
  /** Parameters for onPageChange and onSort (see documentation for functions) */
  tableOptions?: PagedTableOptions,
  /** Title to display in card header */
  title?: Node,
  /** Sub Title to display in card header */
  subheader?: Node,
  /** Buttons to display in card header */
  headerActions?: Node<*>,
  /**
   * Enables card pagination.
   *
   * Must change the state of `tableOptions {count: number, offset: number}`
   */
  onPageChange?: Object => any,
  /**
   * Enables sorting.
   *
   * Must change the state of `tableOptions {sortOptions: Array<{id: string, desc: boolean}>`
   */
  onSort?: ({ sortOptions: SortOptions }) => any,
  /** Enables the "select all" checkbox if specified (default: true). */
  enableSelectAll?: boolean,
  /** Props for the CommonCard component */
  cardProps?: Object,
  /** Add margins to card body */
  hasTableMargin?: boolean,
  /** If true, fill parent element with card and table (should specify parent height)
  If false, show as fixed height card. */
  isFullBleed?: boolean,
  /** Displays rows as shade when hovered over. Can only be used with onHighlightRow */
  shadeOnHover?: boolean,
  /** Allows user to show/hide columns. */
  hasColumnVisibilityChooser?: boolean,
};

/** Provides a simple table for displaying data, with the ability to opt into additional features. */
export const PagedTable = (props: PagedTableProps) => {
  const {
    onPageChange,
    headerActions = [],
    title = "",
    subheader,
    hasTableMargin = true,
    isFullBleed = false,
    cardProps = {},
    includeExportButton = true,
    fetchBulkExportRows,
    ...tableProps
  } = props;
  const {
    classes = {}, columns, data, isLoading = false, onSelect, selectedRows, tableOptions, idKey,
  } = tableProps;
  if (isFullBleed) {
    cardProps.elevation = 0;
  }

  if (!columns || !data) {
    throw new Error("data prop or columns prop or both are not provided");
  }
  const rowCount = data.length;
  const paginationProps = {
    onPageChange,
    onSelect,
    rowCount,
    selectedRows,
    tableOptions,
  };
  const numberSelected = (selectedRows && selectedRows.length) || 0;
  const cardTitle = (
    <>
      {title}
      {numberSelected > 0 ? ` (${numberSelected} Selected)` : ""}
    </>
  );
  const hasHeaderActions = Array.isArray(headerActions) ? headerActions.length > 0 : !!headerActions;
  return (
    <>
      <CommonCard
        title={cardTitle}
        subheader={subheader}
        headerActions={
          (includeExportButton || hasHeaderActions) && (
            <>
              {includeExportButton && (
                <ExportButton
                  columns={columns}
                  visibleRows={data}
                  filenamePrefix={
                    typeof title === "string" ? title.toLowerCase().replace(/[^a-z\d]/g, "-") : "exported-table"
                  }
                  selectedRows={
                    selectedRows
                      ? data.filter((instance, index) => {
                        const rowId = getRowId(idKey, instance, index);
                        return selectedRows.includes(rowId);
                      })
                      : undefined
                  }
                  fetchBulkExportRows={fetchBulkExportRows}
                />
              )}
              {hasHeaderActions && headerActions}
            </>
          )
        }
        footerActions={onPageChange ? <TablePager paginationProps={paginationProps} /> : <TableSummary data={data} />}
        data-testid="paged-table"
        classes={{
          root: classNames(styles.pagedTableCardRoot, classes.root, {
            [styles.fullBleedPagedTableCardRoot]: isFullBleed,
          }),
          body: classNames(
            styles.pagedTableCardBody,
            {
              [styles.hasTableMargin]: hasTableMargin,
            },
            styles.tableContainer,
            classes.tableContainer,
            classes.body,
          ),
          footer: classNames(styles.pagedTableCardFooter, { [styles.tableFooter]: onPageChange }, classes.pagination),
        }}
        {...cardProps}
      >
        <TableComponent {...tableProps} />
      </CommonCard>
      {isLoading && <SpinnerOverlay className={styles.spinnerOverlay} />}
    </>
  );
};

import React from "react";

import classNames from "classnames";
import styles from "./date-input.module.scss";
import { DATE_FORMAT, DATE_INPUT_MASK } from "@grailbio/lib";
import { DatePicker } from "material-ui-pickers";
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers";
import { ReadOnlyTextField } from "../readonly-text-field";
import { formatDate } from "./components/formatted-date-time";

type Props = {
  /** When `true`, displays a read only input field using `ReadOnlyTextField` */
  readOnly?: boolean;
  /** Used for read only input field, see ReadOnlyTextField. */
  showEmptyValue?: boolean;
  /** Determines value used for the input. Takes a `moment` object */
  input?: string;
  /** Remains above the input field upon choosing a value */
  label?: string;
  /** String that specifies the format of the date field. Defaults to `YYYY-MM-DD`. */
  format?: string;
  /** Text to display beneath the date input */
  helperText?: string;
  useOldPicker?: boolean;
} & KeyboardDatePickerProps;

/** Provides component for common Date picker. */
export const DateInput: React.FC<Props> = props => {
  const {
    readOnly,
    showEmptyValue = false,
    value,
    useOldPicker,
    onChange,
    format = DATE_FORMAT,
    className,
  } = props;
  if (readOnly) {
    return (
      <ReadOnlyTextField showEmptyValue={showEmptyValue}>
        {formatDate(value, format)}
      </ReadOnlyTextField>
    );
  }
  if (!props.onChange) {
    throw new Error("onChange must be defined for DateInput");
  }

  return useOldPicker ? (
    // @ts-ignore: DatePicker and KeyboardDatePicker has slightly different props.
    <DatePicker
      keyboard
      clearable
      InputAdornmentProps={{ className: styles.adornmentWidth }}
      KeyboardButtonProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-picker-button",
      }}
      data-testid="date-input"
      DialogProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-picker-dialog",
      }}
      autoOk
      mask={DATE_INPUT_MASK}
      {...props}
      className={classNames(className, styles.textFieldWidth)}
      value={value || null}
      format={format}
    />
  ) : (
    <KeyboardDatePicker
      clearable
      InputAdornmentProps={{ className: styles.adornmentWidth }}
      KeyboardButtonProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-picker-button",
      }}
      data-testid="date-input"
      DialogProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-picker-dialog",
      }}
      autoOk
      {...props}
      className={classNames(className, styles.textFieldWidth)}
      onAccept={onChange}
      value={value || null}
      format={format}
    />
  );
};
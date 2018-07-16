// @flow
import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { OMNI_KEY } from "@grail/lib";
import classNames from "classnames";
import styles from "../omni.module.scss";

type Props = {
	omniText: string,
	onChange: (string, any) => any,
	onSearch: () => any,
	onClear: () => void,
	error: string,
	toggleDropdown: () => any,
	isOpen?: boolean,
	defaultField?: string,
};

type State = {
	isSelected: boolean,
};

export class OmniField extends React.Component<Props, State> {
	state: State = {
		isSelected: false,
	};

	componentDidUpdate = (prevProps: Props) => {
		if (prevProps.isOpen !== this.props.isOpen) {
			this.setState({ isSelected: this.props.isOpen });
		}
	};

	activateOmniField = () => {
		this.setState({ isSelected: true });
	};

	deactivateOmniField = () => {
		this.setState({ isSelected: false });
	};

	render = () => {
		const {
			omniText,
			onChange,
			onSearch,
			onClear,
			error,
			isOpen = false,
			toggleDropdown,
			defaultField = "",
		} = this.props;
		const omniChange = (event: InputEvent) => {
			const {
				currentTarget: { id, value: text },
			} = event;
			onChange(id, text);
		};
		const isActive = isOpen || this.state.isSelected;
		const textClass = isActive ? styles.textHighlight : styles.text;
		return (
			<div className={styles.omniField}>
				<TextField
					value={omniText}
					className={classNames(styles.placeholder, textClass, isActive ? styles.fieldHighlight : styles.field)}
					onChange={omniChange}
					onKeyDown={event => {
						if (event.keyCode === 13) {
							onSearch();
						}
					}}
					onFocus={this.activateOmniField}
					onBlur={this.deactivateOmniField}
					fullWidth
					error={!!error}
					helperText={error}
					FormHelperTextProps={{ error: true }}
					id={OMNI_KEY}
					placeholder={`Search ${defaultField === "" ? "" : defaultField.concat(" ")}here or use dropdown`}
					InputProps={{
						disableUnderline: true,
						startAdornment: (
							<InputAdornment position="start">
								<IconButton
									id={`${OMNI_KEY}-search`}
									title="Search"
									color="inherit"
									onClick={onSearch}
									className={classNames(styles.iconButton, textClass)}
									aria-label="Clear entered search values"
									disableRipple
								>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								{omniText !== undefined &&
									omniText !== "" && (
										<IconButton
											id={`${OMNI_KEY}-clear`}
											title="Clear"
											color="inherit"
											onClick={async () => {
												await onClear();
												onSearch();
											}}
											className={classNames(styles.iconButton, textClass)}
											aria-label="Clear entered search values"
											disableRipple
										>
											<ClearIcon />
										</IconButton>
								)}
								<IconButton
									id={`${OMNI_KEY}-menu`}
									data-testid="menu-test"
									label="menu"
									color="inherit"
									title="Search options"
									className={classNames(styles.iconButton, textClass)}
									disableRipple
									aria-label="Expand search options"
									onClick={toggleDropdown}
								>
									<ArrowDropDownIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</div>
		);
	};
}

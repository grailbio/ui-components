// @flow
import React, { type Node } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { OMNI_KEY } from "@grail/lib";
import { TwoColumnRow } from "@grail/components";
import styles from "../omni.module.scss";
import { SearchField } from "./search-field";

type Props = {
	searchDefs: SearchDefs,
	searchValues: SearchValues,
	onChange: (string, SearchValue) => void,
	onClear: () => void,
	onSearch: () => void,
	width: number | string,
	children?: Node,
};

export class OmniDropdown extends React.Component<Props> {
	render = () => {
		const { searchDefs, searchValues, onChange, onSearch, onClear, width, children } = this.props;
		return (
			<div style={{ width: width }}>
				<Paper
					square={true}
					className={styles.paper}>
					<Grid container>
						{searchDefs.map((searchDef, index) => {
							const { name, type, Component = SearchField, description = "" } = searchDef;
							const searchValue = searchValues.get(index);
							const row: GridRow = {
								label: name,
								value: (
									<Component
										autoFocus={index === 0}
										searchKey={`${OMNI_KEY}-${index}`}
										placeholder={description}
										searchType={type}
										searchValue={searchValue}
										onChange={onChange}
									/>
								),
							};
							return <TwoColumnRow
								key={index}
								row={row}
								labelWidth={3} />;
						})}
						{children}
						<Grid
							item
							className={styles.footer}>
							<Button
								disableRipple
								onClick={onClear}>
								Clear
							</Button>
							<Button
								disableRipple
								onClick={onSearch}
								color="primary"
								variant="raised">
								Search
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</div>
		);
	};
}

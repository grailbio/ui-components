// @flow
import React, { type Node, type ElementConfig } from "react";
import Button from "@material-ui/core/Button";

type Props = {
	/** The children to display in the body of the button */
	children?: Node,
} & ElementConfig<typeof Button>;

/**
 *  ExternalLinkButton opens in a new tab, while ensuring that the link protects from:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/.
 * Similar to ExternalLink but it is represented in a button.
 */
export const ExternalLinkButton = (props: Props) => {
	const { children, ...buttonProps } = props;
	return (
		<Button
			{...buttonProps}
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</Button>
	);
};

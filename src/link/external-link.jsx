// @flow
import React, { type Node } from "react";

type Props = {
  /** Takes a node to include in the omni dropdown after the search fields */
  children?: Node,
  /** The link */
  href: string,
  /** data-testid for the component */
  "data-testid"?: string,
};

/**
 *  ExternalLink opens in a new tab, while ensuring that the link protects from:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
export const ExternalLink = (props: Props) => {
  const { children, "data-testid": dataTestId = "external-link", ...aTagProps } = props;
  return (
    <a
      data-testid={dataTestId}
      {...aTagProps}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
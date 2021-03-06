import React, { ReactNode } from "react";
import { ClickableItem } from "../../types/dropdown";
import {
  HeaderAction,
  SlimPageConfig,
  SlimTabbedPageClasses,
} from "../../types/card";
import { SlimPage } from "./slim-page";
import { TabProps } from "@material-ui/core/Tab";
import { TabsComponent } from "./components/tabs-component";

type Props = {
  /**
   * The array of objects used to define the tabs displayed in the header, and their corresponding pages.
   * The `key` property is used to determine which tab is selected.
   */
  pageConfigs: SlimPageConfig[];
  /** Takes the handler used to switch between tabs, based on the tab's value */
  onChangeActiveTab: (x0: string) => any;
  /** The value of the tab header. Used to define which tab is open */
  activeTab: string | false;
  /** Page title */
  title?: ReactNode;
  /** Subtitle shown under the `title` */
  subtitle?: ReactNode;
  /**
   *
   * Provides classNames to the page and its sub-components. Options include:
   *
   *  - `root`
   *
   *  - `header` (applied to entire header container which contains headerActions, title, subtitle, and special actions)
   *
   *  - `headerActions` (applied to the container around the header actions)
   *
   *  - `primaryActions`
   *
   *  - `secondaryActions`
   *
   *  - `tabs` (applied to the container around the header tabs)
   *
   *  - `tab` (applied to each individual tab)
   *
   *  - `titleContainer` (applied to the container around the title and subtitle)
   *
   *  - `title`
   *
   *  - `subtitle`
   *
   *  - `content` - (applied to the container around the content)
   */
  classes?: SlimTabbedPageClasses;
  /** Primary actions to display on the header */
  primaryActions?: HeaderAction[];
  /** Secondary actions to display in the secondary actions menu */
  secondaryActions?: ClickableItem[];
  /** Props applied to the `Tabs` container */
  tabProps?: Partial<TabProps>;
  /** Displays an non-interactive loading animation over the page content when true */
  isLoading?: boolean;
  /** When `false`, tab labels will be set to in-line. Defaults to true */
  wrapTabLabels?: boolean;
};

/**
 * `SlimTabbedPage` provides a component for a page with a flush card header,
 * a tab bar, and an optional side menu. Note: if you are using this component
 * in a new environment, we recommend building a new child component for your
 * environment; take a look at the `TabbedLimsPage` component as an example.
 */
export const SlimTabbedPage: React.FC<Props> = (props) => {
  const {
    classes = {},
    activeTab,
    pageConfigs,
    onChangeActiveTab,
    children,
    isLoading = false,
    wrapTabLabels = true,
    tabProps = {},
    ...commonPageProps
  } = props;
  if (!isLoading && !pageConfigs) {
    throw new Error("pageConfigs is required");
  }
  const selectedTab = pageConfigs.find((tab) => tab.key === activeTab);
  if (!isLoading && activeTab && !selectedTab) {
    console.error("no pageConfig keys match the provided activeTab");
  }
  let PageContent: ReactNode = null;
  if (selectedTab && selectedTab.Component) {
    const SelectedComponent = selectedTab.Component;
    PageContent = SelectedComponent ? (
      <SelectedComponent {...(selectedTab.componentProps || {})} />
    ) : null;
  }
  const { tabs, tab, ...commonPageClasses } = classes;
  return (
    <SlimPage
      {...commonPageProps}
      classes={{ ...commonPageClasses }}
      isLoading={isLoading}
      centerHeader={
        pageConfigs &&
        pageConfigs.length > 0 && (
          <TabsComponent
            wrapTabLabels={wrapTabLabels}
            activeTab={(!isLoading && activeTab) || false}
            onChangeActiveTab={onChangeActiveTab}
            classes={{ tabs, tab }}
            pageConfigs={pageConfigs}
            tabProps={tabProps}
          />
        )
      }
    >
      {PageContent}
      {children}
    </SlimPage>
  );
};

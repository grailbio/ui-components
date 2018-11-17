// @flow
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import moment from "moment";
import styles from "../notification.module.scss";
import { DATE_TIME_FORMAT } from "@grail/lib";
import { NotificationTypeIcon } from "./notification-type-icon";

type Props = {
  message: string,
  time: string,
  type: string,
  notificationIndex: number,
  removeNotification: number => any,
};

export const NotificationCard = (props: Props) => {
  const {
    notificationIndex, message, time, type, removeNotification,
  } = props;
  return (
    <Card className="margin-left-10 margin-right-10 margin-bottom-10">
      <CardContent
        classes={{
          root: styles.notificationContainer,
        }}
      >
        <NotificationTypeIcon type={type} />

        <IconButton
          disableRipple
          color="inherit"
          classes={{
            root: styles.notificationClose,
          }}
          onClick={() => removeNotification(notificationIndex)}
        >
          <Close />
        </IconButton>

        {message}
        <br />
        <small className={styles.timestamp}>{moment(time).format(DATE_TIME_FORMAT)}</small>
      </CardContent>
    </Card>
  );
};

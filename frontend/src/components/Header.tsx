import React from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.title}
        >
          Polkadot Scanner
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

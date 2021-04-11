import React, { useEffect } from 'react';
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Container, Box, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  selectAuth,
  postAuthentication,
  resetError,
} from './authSlice';

import AuthForm from './authForm';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10, 0, 8),
  },
  center: {
    margin: theme.spacing(10, 0, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  }
}));

export default function Auth() {
  const { authenticated, loading, error } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
  }, [authenticated]);

  const handleAuthenticate = (password: string) => {
    dispatch(postAuthentication(password));
  };

  const handleCloseError = () => {
    dispatch(resetError());
  };

  return (
    <Container maxWidth="sm">
      <Box className={classes.center}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Authentication
        </Typography>
        <AuthForm
          onSubmit={handleAuthenticate}
          onCloseError={handleCloseError}
          loading={loading}
          error={error}
        />
      </Box>
    </Container>
  );
}

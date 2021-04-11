import React, { useEffect } from 'react';
import { Container, Avatar, Typography } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import LoadingOverlay from 'components/LoadingOverlay';

import {
  EventsSearchParameters,
  getEvents,
  getLatestBlock,
  resetError,
  selectEvents,
  selectLatestBlock,
  selectScanError
} from './scanSlice';
import ScannerForm from './scanForm';
import EventsTable from './eventsTable';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10, 0, 8),
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  }
}));

export default function Scan() {
  const scan = useAppSelector(selectEvents);
  const latestBlock = useAppSelector(selectLatestBlock);
  const scanError = useAppSelector(selectScanError);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getLatestBlock());
  }, [dispatch]);

  const handleGetScanEvents = (values: EventsSearchParameters) => {
    dispatch(getEvents(values));
  };

  const handleCloseScanError = () => {
    dispatch(resetError());
  };

  const eventsData = scan.value || [];

  return (
    <Box className={classes.root}>
      {latestBlock.loading && (
        <LoadingOverlay />
      )}
      <Container maxWidth="sm">
        <Box className={classes.center}>
          <Avatar className={classes.avatar}>
            <ExploreIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Scan
          </Typography>
          <ScannerForm
            onSubmit={handleGetScanEvents}
            onCloseError={handleCloseScanError}
            latestBlock={latestBlock.value}
            loading={scan.loading}
            error={scanError}
          />
        </Box>
      </Container>
      <Container maxWidth="xl">
        {eventsData.length > 0 && (
          <EventsTable data={eventsData} />
        )}
      </Container>
    </Box>
  );
}

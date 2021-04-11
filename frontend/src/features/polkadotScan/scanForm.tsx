import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 6),
  },
}));

const schema = Yup.object().shape({
  startBlock: Yup.number()
    .required('Required')
    .min(1)
    .integer("Must be a whole number")
    .max(Yup.ref("endBlock"), "Must be less than or equal to end block"),
  endBlock: Yup.number()
    .min(1)
    .integer("Must be a whole number")
    .required('Required'),
  endpoint: Yup.string()
    .required('Required'),
});

type ScanFormProps = {
  onSubmit: Function;
  onCloseError: (event: React.SyntheticEvent<Element, Event>) => void;
  latestBlock: number | string | null;
  loading: boolean;
  error?: string;
};

function ScanForm(props: ScanFormProps) {
  const { onSubmit, onCloseError, latestBlock, loading, error } = props;
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        startBlock: '',
        endBlock: latestBlock ?? '',
        endpoint: 'wss://rpc.polkadot.io'
      }}
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onSubmit(values);
      }}
    >
      {({ submitForm }) => (
        <Form className={classes.form}>
          {error && (
            <Alert severity="error" onClose={onCloseError}>{error}</Alert>
          )}
          <Box>
            <Field
              component={TextField}
              name="startBlock"
              type="number"
              label="Start Block"
              margin="normal"
              fullWidth
            />
          </Box>
          <Box>
            <Field
              component={TextField}
              name="endBlock"
              type="number"
              label="End Block"
              margin="normal"
              fullWidth
            />
          </Box>
          <Box>
            <Field
              component={TextField}
              name="endpoint"
              type="text"
              label="Endpoint"
              margin="normal"
              fullWidth
            />
          </Box>
          {loading && (
            <Box margin="10px 0px">
              <LinearProgress />
            </Box>
          )}
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={submitForm}
            fullWidth
          >
            Scan
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ScanForm;

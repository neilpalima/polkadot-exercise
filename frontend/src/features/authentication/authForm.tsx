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
  password: Yup.string()
    .required('Required'),
});

type AuthFormProps = {
  onSubmit: Function;
  onCloseError: (event: React.SyntheticEvent<Element, Event>) => void;
  loading: boolean;
  error?: string;
};

function ScanForm(props: AuthFormProps) {
  const { onSubmit, onCloseError, loading, error } = props;
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        password: ''
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onSubmit(values.password);
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
              name="password"
              type="password"
              label="Password"
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

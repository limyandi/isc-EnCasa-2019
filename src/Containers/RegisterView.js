import React from 'react';
import MyTextField from '../Components/TextField';
import MyButton from '../Components/Button';
import useForm from '../Components/UseForm';
import MyHyperLink from '../Components/Hyperlink';
import PaperSheet from '../Components/Paper';
import MyDropdown from '../Components/Dropdown';
import MyCheckbox from '../Components/Checkbox';
import FormDialog from '../Components/FormDialog';

function RegisterView() {
  // hooks for simple email and password form
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
      driverChecked: false
    },
    onSubmit(val, errors) {
      // alert(JSON.stringify({ val, errors }, null, 2));
      console.log(val, errors);
      // TODO: Fix this circular dependency.
      // eslint-disable-next-line no-use-before-define
      handleClickOpen();
    },
    validate(val) {
      const errors = {};
      if (val.email === '') {
        errors.name = 'Please enter an email';
      }
      return errors;
    }
  });

  const [open, setOpen] = React.useState(false);
  const [suburb, setSuburbs] = React.useState([]);

  const suburbLists = [
    'CBD',
    'Mascot',
    'Surry Hills',
    'Hurstville',
    'Glensville'
  ];

  function handleAddSuburb(event) {
    setSuburbs(event.target.value);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleConfirm() {
    // TODO: API CALL FOR REGISTER HERE.
    // alert(JSON.stringify({ val, errors }, null, 2));
    setOpen(false);
    console.log(values, suburb);
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <PaperSheet>
            <MyTextField
              style={{ marginBottom: 10 }}
              name="email"
              label="email"
              value={values.email}
              onChange={handleChange}
            />
            <MyTextField
              style={{ marginBottom: 10 }}
              name="password"
              label="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            <MyCheckbox
              checked={values.driverChecked}
              onChange={handleChange}
              name="driverChecked"
              label="Register as Driver"
            />
            <MyButton
              style={{ marginTop: 15, marginBottom: 10 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Register
            </MyButton>
            <FormDialog
              open={open}
              handleClose={handleClose}
              handleSubmit={handleConfirm}
            >
              <MyDropdown
                value={suburb}
                onChange={handleAddSuburb}
                valueLists={suburbLists}
              />
            </FormDialog>
            <MyHyperLink to="/login">
              Already have an account? Login!
            </MyHyperLink>
          </PaperSheet>
        </form>
      </div>
    </div>
  );
}

export default RegisterView;

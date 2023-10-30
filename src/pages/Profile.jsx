import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { changePassword } from "../store/auth";

const Profile = () => {
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword1, setNewShowPassword1] = useState(false);
  const [showNewPassword2, setNewShowPassword2] = useState(false);
  const initialValues = {
    oldPassword: "",
    new_password1: "",
    new_password2: "",
  };

  const dispatch = useDispatch()

  const currentUser = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");
  const first_name = sessionStorage.getItem("first_name");
  const last_name = sessionStorage.getItem("last_name");

  const profileSchema = yup.object().shape({
    new_password1: yup
      .string()
      .min(8, "Password Minimum 8 Characters")
      .max(12)
      .matches(/\d+/, "Password Should Include At Least 1 Number")
      .matches(
        /[a-z]+/,
        "Password Should Include At Least 1 Lowercase Character"
      )
      .matches(
        /[A-Z]+/,
        "Password Should Include At Least 1 Uppercase Character"
      )
      .matches(
        /[!,?.{}<>%#+-]+/,
        "Password Should Include At Least 1 Special Character"
      )
      .required("Password is Required"),
    new_password2: yup
      .string()
      .min(8, "Password Minimum 8 Characters")
      .max(12)
      .matches(/\d+/, "Password Should Include At Least 1 Number")
      .matches(
        /[a-z]+/,
        "Password Should Include At Least 1 Lowercase Character"
      )
      .matches(
        /[A-Z]+/,
        "Password Should Include At Least 1 Uppercase Character"
      )
      .matches(
        /[!,?.{}<>%#+-]+/,
        "Password Should Include At Least 1 Special Character"
      )
      .required("Password is Required")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.new_password1 === value;
      }),
  });

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)
    const {new_password1, new_password2} = values
    dispatch(changePassword({new_password1, new_password2}))
    actions.resetForm()
  };

  return (
    <Box p={5}>
      <Typography variant="h5" component="h1" color="inherit" noWrap>
        Profile
      </Typography>

      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <Avatar
                    src="/broken-image.jpg"
                    alt={currentUser.toUpperCase()}
                    variant="square"
                    sx={{ width: 100, height: 100, fontSize: 36 }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            Username:
                          </Typography>
                          <Typography variant="subtitle1">
                            {currentUser}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            Email:
                          </Typography>
                          <Typography variant="subtitle1">{email}</Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            First Name:
                          </Typography>
                          <Typography variant="subtitle1">
                            {first_name}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            Last Name:
                          </Typography>
                          <Typography variant="subtitle1">
                            {last_name}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2"> Change Password </Typography>

                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={profileSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field
                        as={TextField}
                        type={showOldPassword ? "text" : "password"}
                        variant="outlined"
                        label="Old Password"
                        fullWidth
                        name="oldPassword"
                        margin="dense"
                        error={
                          Boolean(errors.oldPassword) &&
                          Boolean(touched.oldPassword)
                        }
                        helperText={
                          Boolean(touched.oldPassword) ? errors.oldPassword : ""
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" sx={{ pr: 2 }}>
                              <IconButton
                                edge="end"
                                onClick={() =>
                                  setOldShowPassword(!showOldPassword)
                                }
                              >
                                {showOldPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Field
                        as={TextField}
                        type={showNewPassword1 ? "text" : "password"}
                        variant="outlined"
                        label="New Password"
                        fullWidth
                        name="new_password1"
                        margin="dense"
                        error={
                          Boolean(errors.new_password1) &&
                          Boolean(touched.new_password1)
                        }
                        helperText={
                          Boolean(touched.new_password1)
                            ? errors.new_password1
                            : ""
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" sx={{ pr: 2 }}>
                              <IconButton
                                edge="end"
                                onClick={() =>
                                  setNewShowPassword1(!showNewPassword1)
                                }
                              >
                                {showNewPassword1 ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Field
                        as={TextField}
                        type={showNewPassword2 ? "text" : "password"}
                        variant="outlined"
                        label="Confirm New Password"
                        fullWidth
                        name="new_password2"
                        margin="dense"
                        error={
                          Boolean(errors.new_password2) &&
                          Boolean(touched.new_password2)
                        }
                        helperText={
                          Boolean(touched.new_password2)
                            ? errors.new_password2
                            : ""
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" sx={{ pr: 2 }}>
                              <IconButton
                                edge="end"
                                onClick={() =>
                                  setNewShowPassword2(!showNewPassword2)
                                }
                              >
                                {showNewPassword2 ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ mt: 2, width: "100%" }}
                      >
                        Change Password
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Grid>
              <Grid item>
                <Box m={2} mt={4}>

                  <Typography variant="body2" gutterBottom>
                    Password Minimum 8 Characters
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password Should Include At Least 1 Number
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password Should Include At Least 1 Lowercase Character
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password Should Include At Least 1 Uppercase Character
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password Should Include At Least 1 Special Character
                  </Typography>
                </Box>
                
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { updatePartner } from "components/graphQL/Mutation";
import { useTheme } from "@mui/material/styles";
import { NoData } from "components/layouts";
import { CustomButton, PreviousButton, Loader } from "components/Utilities";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { getPartner } from "components/graphQL/useQuery";
import * as Yup from "yup";

const Profile = ({
  selectedMenu,
  selectedSubMenu,
  setSelectedMenu,
  setSelectedSubMenu,
}) => {
  const [update] = useMutation(updatePartner);
  const { loading, error, data } = useQuery(getPartner, {
    variables: {
      id: localStorage.getItem("pharmacyId"),
    },
  });

  const [profile, setProfile] = useState();

  useEffect(() => {
    setProfile(data?.getPartner);
  }, [data]);

  const theme = useTheme();
  const validationSchema = Yup.object({
    name: Yup.string("Enter your Name").trim().required("Name is required"),
    email: Yup.string("Enter your Email").trim().required("Email is required"),
    category: Yup.string("Select your Category"),
    image: Yup.string("Upload a single Image"),
  });

  const trasparentButton = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  const onSubmit = async (values) => {
    const { email, name, image } = values;

    await update({
      variables: {
        id: profile._id,
        name,
        email,
        category: "pharmacy",
        logoImageUrl: image,
      },
      refetchQueries: [
        {
          query: getPartner,
          variables: {
            id: localStorage.getItem("diagnosticId"),
          },
        },
      ],
    });
  };
  const initialValues = {
    name: profile?.name,
    email: profile?.email,
    category: profile?.category || "",
    image: profile?.logoImageUrl,
  };

  useEffect(() => {
    setSelectedMenu(11);
    // setSelectedSubMenu(12)

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  if (loading) return <Loader />;
  if (error) return <NoData />;
  return (
    <Grid container>
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton
          path={"/setting"}
          onClick={() => {
            setSelectedSubMenu(11);
          }}
        />
      </Grid>
      <Grid container>
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount={false}
          initialValues={initialValues}
          enableReinitialize
        >
          {({ isSubmitting, dirty, isValid, setFieldValue }) => {
            return (
              <Grid item container direction="column">
                <Form>
                  <Grid item container gap={2} md={4} direction="column">
                    <Grid item md={6}>
                      <FormikControl
                        control="file" 
                        name="image"
                        label="Upload Your Logo"
                        setFieldValue={setFieldValue}
                        type="image"
                        file={profile?.logoImageUrl}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <FormikControl
                        control="input"
                        name="name"
                        label="Name "
                        placeholder="Enter Name"
                      />
                    </Grid>
                    <Grid item md={6}>
                      <FormikControl
                        control="input"
                        name="email"
                        label="Email"
                        placeholder="Email"
                      />
                    </Grid>

                    <Grid item md={6}>
                      <CustomButton
                        title="Save"
                        type={trasparentButton}
                        width="100%"
                        isSubmitting={isSubmitting}
                        disabled={!(dirty || isValid)}
                      />
                    </Grid>
                  </Grid>
                </Form>
              </Grid>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};
Profile.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default Profile;

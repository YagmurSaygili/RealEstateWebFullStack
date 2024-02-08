import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreateProperty() {
  const { authState } = useContext(AuthContext);
  let history = useHistory();
  const initialValues = {
    title: "",
    propertyText: "",
  };

  useEffect(() => {
    // Check if the user is logged in
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    propertyText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    // post request for user to be able to create properties
    axios
      .post("http://localhost:3001/properties", data, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((Response) => {
        history.push("/");
      });
  };

  return (
    <div className="cratePropertyContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreateProperty"
            name="title"
            placeholder="Ex. Title"
          />
          <label>Property:</label>
          <ErrorMessage name="propertyText" component="span" />{" "}
          <Field
            id="inputCreateProperty"
            name="propertyText"
            placeholder="Ex. Villa"
          />
          <button type="submit">Create a Property</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateProperty;

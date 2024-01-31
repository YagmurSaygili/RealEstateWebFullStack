import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreateProperty() {
  const initialValues = {
    title: "",
    propertyText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    propertyText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  let history = useHistory();
  const onSubmit = (data) => {
    // post request for user to be able to create properties
    axios.post("http://localhost:3001/properties", data).then((Response) => {
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
          <label>Username:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreateProperty"
            name="username"
            placeholder="Ex. YagmurSay"
          />
          <button type="submit">CreateProperty</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateProperty;

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Signup.css";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import { AuthvalueAction } from "../../Context/AuthProvider";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  name: "",
  email: "",
  phonenumber: "",
  password: "",
  passwordconfirmation: "",
};

const Signupform = () => {
  const [error , setError] = useState(null);
  const setAuth = AuthvalueAction();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const userdata = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phonenumber,
      password: values.password,
    };
    axios
      .post("http://localhost:5000/api/user/register", userdata)
      .then((res) => {
        // console.log(res.data);
        toast.success(`${res.data.name} signed up`)
        setAuth(res.data);
        localStorage.setItem("Auth" , JSON.stringify(res.data));
        setError(null)
        navigate("/")
      })
      .catch((err) => setError(err.response.data.message));
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("must be correct email")
      .required("email is required"),
    phonenumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    password: Yup.string().required("Password is required"),
    passwordconfirmation: Yup.string()
      .required("confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="formcontrol">
        <label>name :</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
          <p>{formik.errors.name}</p>
        ) : null}
      </div>
      <div className="formcontrol">
        <label>email :</label>
        <input
          type="trxt"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <p>{formik.errors.email}</p>
        ) : null}
      </div>
      <div className="formcontrol">
        <label>phone :</label>
        <input
          type="string"
          name="phonenumber"
          value={formik.values.phonenumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phonenumber && formik.touched.phonenumber ? (
          <p>{formik.errors.phonenumber}</p>
        ) : null}
      </div>
      <div className="formcontrol">
        <label>password :</label>
        <input
          type="text"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
      </div>
      <div className="formcontrol">
        <label>password :</label>
        <input
          type="text"
          name="passwordconfirmation"
          value={formik.values.passwordconfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.passwordconfirmation &&
        formik.touched.passwordconfirmation ? (
          <p>{formik.errors.passwordconfirmation}</p>
        ) : null}
      </div>
      <button type="submit" disabled={!formik.isValid}>
        Register
      </button>
      {error && <p>{error}</p>}
      <Link to="/login">
        <p className="pp">alredy sigup ??</p>
      </Link>
    </form>
  );
};

export default Signupform;

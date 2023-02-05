import { useEffect, useState  } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../signup/Signup.css"
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import {useNavigate , useLocation} from "react-router-dom"
import { Authvalue, AuthvalueAction } from "../../Context/AuthProvider";


const initialValues = {
  email: "",
  password: "",
};

const Loginform = () => {
  const[search , setSearch] = useState(false);
  const location = useLocation();
  const redirect = location.search.slice(1);
  // console.log(location.search.slice(1))
  const navigate = useNavigate();

  const setAuth = AuthvalueAction();
  const auth = Authvalue();

  const[error , setError] = useState(null);

  useEffect(()=>{
    if(auth) navigate(`/${redirect}`)
  } , [])

  const onSubmit = (values) => {
    // console.log(values);
    axios
      .post("http://localhost:5000/api/user/login", values)
      .then((res) => {
        setAuth(res.data);
        localStorage.setItem("Auth" , JSON.stringify(res.data));
        setError(null);
        toast.success(`${res.data.name} wellcome to your site`);
        // {search ? navigate(`/${location.search.slice(1)}`) : navigate("/") }
        {redirect ? navigate(`/${redirect}`) : navigate("/")}
      })
      .catch((err) => setError(err.response.data.message));
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("must be correct email")
      .required("email is required"),
    password: Yup.string().required("Password is required"),
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
      <button type="submit" disabled={!formik.isValid}>
        login
      </button>
      {error && <p>{error}</p>}
      <Link to="/signup">
        <p className="pp">Not signup ??</p>
      </Link>
    </form>
  );
};

export default Loginform;

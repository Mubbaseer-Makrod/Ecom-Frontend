import React, {useState} from 'react'
import authService from '../../backend/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [values, setValues] = useState({
      email: "",
      password: "",
      error: "",
      loading: false,
    });
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const { email, password, error, loading } = values;

    console.log("Error From Backend is: ", JSON.stringify(error))
  
    const handleChange = (event) => {
        console.log(event)
        setValues({...values, [event.target.name]: event.target.value})
        console.log("values are :", values)
    }

    const onSubmit = async (event) => {
      event.preventDefault()
      setValues({...values, loading: true})
      console.log("Email and Password is :", email, " and ", password)
      if(!(email && password)) {
        setValues({...values, error: [{msg:"Please provide both email and password"}], loading: false})
        return false
      }

      authService.login({email, password})
      .then((userData) => {
        console.log("User Data is :", userData)
        dispatch(login({userData}))
        setValues({...values, loading: false})
        navigate("/")
      })
      .catch((err) => {
        console.log("Error is :", err)
        let error = err.response?.data?.error?.errors || [{msg: err.response?.data?.error}]
        console.log("Entered the Catching errro part")
        setValues({...values, loading: false, error})
      })
    }

    const loadingMessage = () => {
      return (
        loading && (
          <div className="alert alert-info">
            <h2>Loading...</h2>
          </div>
        )
      );
    };
  
    const errorMessage = () => {
      return (
        error && (
          error.map((error, index) => (
            <div className="row" key={index}>
              <div className="col-md-6 offset-sm-3 text-left">
                <div
                  className="alert alert-danger"
                  // style={{ display: error ? "" : "none" }}
                >
                  {error.msg}
                </div>
            </div>
        </div>
          ))
        )
      );
    };
  
    const signInForm = () => {
      return (
        <div className="row">
          <h1 className='text-center'> Sign In </h1>
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-blue">Email</label>
                <input
                  onChange={handleChange}
                  name="email"
                  value={email}
                  className="form-control"
                  type="email"
                />
              </div>
  
              <div className="form-group">
                <label className="text-blue">Password</label>
                <input
                  onChange={handleChange}
                  name="password"
                  value={password}
                  className="form-control"
                  type="password"
                />
              </div>
              <button onClick={onSubmit} className="btn btn-success btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    };
  
    return (
    <div>
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
  
        <p className="text-white text-center">{JSON.stringify(values)}</p>
    </div>
    );
};
  
  export default Signin;
import React, {useState} from 'react'
import authService from '../../backend/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

// email, password, name, lastname 

const Signup = () => {
    const [values, setValues] = useState({
      email: "",
      password: "",
      name: "",
      lastname: "",
      error: "",
      loading: false,
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const { email, password, name, lastname, error, loading } = values;

    console.log("Error From Backend is: ", JSON.stringify(error))
  
    const handleChange = (event) => {
        console.log(event)
        setValues({...values, [event.target.name]: event.target.value})
        console.log("values are :", values)
    }

    const onSubmit = async (event) => {
      console.log("Submission started")
      event.preventDefault()
      setValues({...values, loading: true})
      console.log("Email and Password is :", values)

      if(!(email && password && name )) {
        setValues({...values, error: [{msg: "Please Provide ALL Field"}],loading: false})
        console.log("Error is ", error)
        return false
      }

      authService.createAccount({email, password, name, lastname})
      .then(userData => {
        dispatch(login({userData}))
        console.log("USER DATA: ", userData)
        setValues({...values, loading: false})
        navigate("/")
      })
      .catch((err) => {
        let error = err.response.data?.error?.errors || [{msg: err.response.data?.error}]

        console.log("error is :", error)
        setValues({...values, loading: false})
        setValues({...values, error})
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
  
    const signUpForm = () => {
      return (
        <div className="row">
          <h1 className='text-center'> Sign Up </h1>
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
            <div className="form-group">
                <label className="text-blue">Name</label>
                <input
                  onChange={handleChange}
                  name="name"
                  value={name}
                  className="form-control"
                  type="text"
                />
              </div>

              <div className="form-group">
                <label className="text-blue">Lastname</label>
                <input
                  onChange={handleChange}
                  name="lastname"
                  value={lastname}
                  className="form-control"
                  type="text"
                />
              </div>

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
        {signUpForm()}
  
        <p className="text-white text-center">{JSON.stringify(values)}</p>
    </div>
    );
  };
  
  export default Signup;
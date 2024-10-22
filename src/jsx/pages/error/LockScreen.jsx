import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// image
// import logo from "../../assets/images/logo-full.png";
import logolight from "../../../assets/images/logo-full.png";


const LockScreen = () => {

  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    nav("/dashboard");
  };
  return (
    <div className="fix-wrapper ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="card mb-0 h-auto">
              
                    <div className="card-body">
                      <div className="text-center mb-2">
                        <Link to="/dashboard"> 
                          <img src={logolight} alt="logo" /> 
                        </Link>
                      </div>
                    <h4 className="text-center mb-4 ">Account Locked</h4>
                    <form onSubmit={(e) => submitHandler(e)}>
                      <div className="mb-4 position-relative">
                          <label className="form-label">Password</label>
                          <input 
                            type={showPassword ? "password" : "text"} 
                            className="form-control" defaultValue="123456"
                          />
                          <span className={`show-pass eye ${showPassword ? '' : 'active'}`}
                            onClick={()=>setShowPassword(!showPassword)}
                          >
                              <i className="fa fa-eye-slash"></i>
                              <i className="fa fa-eye"></i>
                          </span>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block">Unlock</button>
                      </div>
                    </form>
                  </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;

import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import ClipLoader from "react-spinners/ClipLoader";

import "../style/login.style.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const [color, setColor] = useState("#FAF9F8");

  const loginWithEmail = (event) => {
    event.preventDefault();
    //이메일,패스워드를 가지고 백엔드로 보내기
    dispatch(userActions.loginWithEmail({ email, password }))
  };

  const handleGoogleLogin = async (googleData) => {
    // 구글로 로그인 하기
  };

  if (user) {
    navigate("/");
  }
  return (
    <>
      <Container className="login-area">
        {error && (
          <div className="error-message">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        {loading && (
          <div className="loading-spinner">
            <ClipLoader color={color} loading={loading} size={50} />
          </div>
        )}
        <Form className="login-form" onSubmit={loginWithEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="display-space-between login-button-area">
            <Button variant="danger" type="submit">
              Login
            </Button>
            <div>
              Don't have an account yet? <Link to="/register">Register</Link>{" "}
            </div>
          </div>

          <div className="text-align-center mt-2">
            <p>-Use an external account to sign in-</p>
            <div className="display-center"></div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;

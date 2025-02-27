import React, { useState } from "react"
import { Form, Button} from 'react-bootstrap';
import { LogIn } from 'lucide-react';
import { login } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";

const AuthPage: React.FC = () => {
  const [DataLogin, SetDataLogin] = useState({
    identification: '', password: '',
  })
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login(DataLogin));
    if (login.fulfilled.match(result)) {
      navigate('/admin');
    }
  };

  return (
    <>
      <div className="text-center mb-4">
        <LogIn size={40} className="text-primary mb-2" />
        <h2 className="fw-bold">Welcome Back</h2>
        <p className="text-muted">Please sign in to continue</p>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username or email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email or username"
            value={DataLogin.identification}
            onChange={(e) => SetDataLogin({...DataLogin, identification: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={DataLogin.password}
            onChange={(e) => SetDataLogin({...DataLogin, password: e.target.value})}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 mb-3"
          disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
      </Form>
    </>
  )
}

export default AuthPage
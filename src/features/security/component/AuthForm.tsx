import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import type UserCredentials from "../models/UserCredentials.model.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import apiClient from "../../../api/apiClient.ts";
import type AuthenticationResponse from "../models/AuthenticationResponse.ts";
import { getClaims, storeToken } from "../utils/HandleJWT.ts";
import { useContext, useState } from "react";
import AuthenticationContext from "../utils/AuthenticationContext.ts";
import {NavLink, useNavigate} from "react-router";
import type { AxiosError } from "axios";
import extractErrors from "../../../utils/extractErrors.ts";
import DisplayErrors from "../../../components/DisplayErrors.tsx";
import Button from "../../../components/Button.tsx";
import extractIdentityErrors from "../utils/ExtractIdentityErrors.ts";

export default function AuthForm(props: AuthFormProps) {
  const navigate = useNavigate();
  const { update } = useContext(AuthenticationContext);
  const [errorsState, setErrorsState] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UserCredentials>({
    resolver: yupResolver(validationRules),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<UserCredentials> = async (data) => {
    try {
      const response = await apiClient.post<AuthenticationResponse>(
        props.url,
        data
      );
      storeToken(response.data);
      update(getClaims());
      navigate("/");
    } catch (err) {
      const errorsFromBackend = extractIdentityErrors(err as AxiosError);
      setErrorsState(errorsFromBackend);
    }
  };
  return (
    <>
      <DisplayErrors errors={errorsState} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input autoComplete="new-email" className="form-control" type="email" id="email" {...register('email')} />
          {errors.email && <p className="error">You must type the email!</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input autoComplete="new-password" className="form-control" type="password" id="password" {...register('password')} />
          {errors.password && <p className="error">You must type the password!</p>}
        </div>
        <div className="mt-2">
          <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Sending' : 'Send'}</Button>
          <NavLink className="btn btn-secondary ms-2" to="/">Cancel</NavLink>
        </div>
      </form>
      <div>
      </div>
    </>
  );
}

interface AuthFormProps {
  url: string;
}

const validationRules = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

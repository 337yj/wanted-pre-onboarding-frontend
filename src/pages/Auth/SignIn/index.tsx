import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../api/Auth";
import useAuthContext from "../../../context/AuthContext";
import { UserAuth } from "../../../types";
import AuthInput from "../AuthInput";
import { FormErrors, validateForm } from "../validation/validateForm";
import styles from "./signIn.module.scss";

const SignInPage = () => {
  const { token, saveToken } = useContext(useAuthContext);
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [form, setForm] = useState<UserAuth>({
    email: "",
    password: "",
  });
  const [err, setErr] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const checkFormValidity = () => {
    const isValidEmail = err.email === "";
    const isValidPassword = err.password === "";
    setIsFormValid(isValidEmail && isValidPassword);
  };

  const onClickToSignUp = () => {
    navigate(`/signup`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.currentTarget;
    setForm((prevForm) => ({ ...prevForm, [type]: value }));

    const errors = validateForm({ ...form, [type]: value });
    setErr(errors);

    setIsFormValid(Object.values(errors).every((error) => !error));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;
    const errors = validateForm(form);
    setErr(errors);
    checkFormValidity();

    if (isFormValid) {
      try {
        const response = await signIn({ email, password });
        if (response.data) {
          saveToken(response.data.access_token);
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate(`/todo`);
    }
  }, []);

  return (
    <main className={styles.wrapper}>
      <h1>로그인</h1>
      <form onSubmit={onSubmit} noValidate>
        <AuthInput form={form} err={err} onChange={onChange} />
        <div className={styles.signinWrap}>
          <button
            type="submit"
            data-testid="signin-button"
            disabled={!isFormValid}
          >
            로그인
          </button>
          <a onClick={onClickToSignUp}>회원가입이 필요하신가요?</a>
        </div>
      </form>
    </main>
  );
};

export default SignInPage;

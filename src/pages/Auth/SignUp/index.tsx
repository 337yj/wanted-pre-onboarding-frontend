import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../api/Auth";
import useAuthContext from "../../../context/AuthContext";
import { UserAuth } from "../../../types";
import AuthInput from "../AuthInput";
import { FormErrors, validateForm } from "../validation/validateForm";
import styles from "./signUp.module.scss";

const SignUpPage = () => {
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

    try {
      const response = await signUp({
        email,
        password,
      });

      if (response.status === 201) {
        alert("회원가입 되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/signin");
      }
    } catch (error) {
      console.log({ error });
    }
    setForm({ email: "", password: "" });
  };

  return (
    <main className={styles.wrapper}>
      <h1>회원가입</h1>
      <form onSubmit={onSubmit}>
        <AuthInput form={form} err={err} onChange={onChange} />
        <button
          type="submit"
          data-testid="signup-button"
          disabled={!isFormValid}
        >
          회원가입
        </button>
      </form>
    </main>
  );
};

export default SignUpPage;

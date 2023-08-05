import { FormErrors } from "../validation/validateForm";
import { UserAuth } from "../../../types";
import styles from "./authInput.module.scss";

interface AuthFormProps {
  form: UserAuth;
  err: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput = ({ form, err, onChange }: AuthFormProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrap}>
        <label htmlFor="email">이메일</label>
        <p className={styles.errorText}>{err.email}</p>
      </div>
      <input
        id="email"
        type="email"
        data-testid="email-input"
        value={form.email}
        onChange={onChange}
        placeholder="example@email.com"
        autoFocus
        autoComplete="off"
      />
      <div className={styles.textWrap}>
        <label htmlFor="password">비밀번호</label>
        <p className={styles.errorText}>{err.password}</p>
      </div>
      <input
        id="password"
        type="password"
        data-testid="password-input"
        value={form.password}
        onChange={onChange}
        placeholder="********"
        autoComplete="off"
      />
    </div>
  );
};

export default AuthInput;

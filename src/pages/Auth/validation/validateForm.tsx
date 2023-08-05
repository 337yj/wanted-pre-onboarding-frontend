export interface AuthForm {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}

export const validateForm = (form: AuthForm): FormErrors => {
  const errors: FormErrors = {};

  if (!form.email.includes("@")) {
    errors.email = "유효한 이메일을 입력해주세요.";
  }
  if (form.password.length < 8) {
    errors.password = "비밀번호는 8자 이상이어야 합니다.";
  }

  return errors;
};

## Todo App

원티드 프리온보딩 프론트엔드 인턴십 선별 과제 Todo App 입니다.

<br/>

## 지원자

이윤정

<br/>

## 프로젝트 실행 방법

```
git clone https://github.com/337yj/wanted-pre-onboarding-frontend.git

npm install
npm start
```

<br/>

## 배포링크

🔗 http://wanted-todo-app.s3-website.ap-northeast-2.amazonaws.com

<br/>

## 데모 영상

<table>
 <tr>
    <td ><b>회원가입</b></td>
    <td ><b>로그인</b></td>		
  </tr>
  <tr>
    <td>   
      <img width="75%" src="https://github.com/337yj/wanted-pre-onboarding-frontend/assets/110447844/27aebcc4-313f-4cb3-a511-d5e1025b46b4" />
    </td>
    <td>   
      <img  width="100%" src="https://github.com/337yj/wanted-pre-onboarding-frontend/assets/110447844/c58cd46f-6939-4a6d-89c5-068cd8858434" />
    </td>
  </tr>
  <tr>
    <td>ㆍ 유효성 검사<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 이메일 조건: @ 포함<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 비밀번호 조건: 8자 이상<br/>
    ㆍ 유효성 검사 통과시 버튼 활성<br/>
    ㆍ 회원가입 정상 완료 시 /signin 경로로 이동
    </td>
    <td>ㆍ 로그인 정상 완료 시 /todo 경로로 이동<br/>
    ㆍ 로컬 스토리지에 access token 저장<br/>
    ㆍ 로컬 스토리지에 토큰 유무에 따른 리다이렉션
    </td>		
</tr>
 <tr>
    <td ><b>TODO 추가</b></td>
    <td ><b>TODO 수정</b></td>		
  </tr>
  <tr>
    <td>   
      <img   width="75%" src="https://github.com/337yj/wanted-pre-onboarding-frontend/assets/110447844/7e602650-9225-423a-8c36-6a4a44b5691f" />
    </td>
    <td>   
      <img   width="100%" src="https://github.com/337yj/wanted-pre-onboarding-frontend/assets/110447844/988a5dd9-05cc-4b95-959a-69c12529ee3a" />
    </td>
  </tr>
  <tr>
    <td>ㆍ 새로운 TODO 추가<br/>
    </td>
    <td>ㆍ 체크박스를 통해 완료 여부 수정<br/>
    ㆍ TODO 우측 버튼을 통해 수정, 수정 취소, 삭제 <br/>
    </td>		
</tr>
</table>

<br/>

## 폴더 구조

```
📂 src
   ├─ api # 서버 요청 api
   │  ├─ Auth
   │  ├─ Todo
   │  └─ apiClient.ts
   │
   ├─ components
   │  └─ Layout
   │     └─ Header
   │  
   ├─ context
   │  └─ AuthContext.tsx # access token 관리 컨텍스트
   │ 
   ├─ pages
   │  ├─ Auth
   │  │  ├─ AuthInput
   │  │  ├─ SignIn # 로그인 페이지
   │  │  ├─ SignUp # 회원가입 페이지
   │  │  └─ validation # 유효성 검사 로직
   │  ├─ NotFound 
   │  ├─ Redirect # access token 유무에 따른 리다이렉션
   │  └─ TodoList # 투두리스트 페이지
   │     └─ TodoItem
   │  
   ├─ router
   ├─ styles # reset, 전역 스타일, scss 변수
   │  ├─ _base.scss
   │  ├─ _font_face.scss
   │  ├─ _reset.scss
   │  ├─ constants # colors
   │  ├─ fonts
   │  ├─ global.scss
   │  └─ mixins # flexbox
   │
   ├─ types # UserAuth, Todo 타입
   └─ index.js
```

<br/>

## 기능 구현

### ✅ API 관리

```tsx
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
  timeout: 5000,
});

apiClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default apiClient;
```

- axios의 intercepter를 사용해 모든 요청에 일관된 헤더를 추가할 수 있어 코드 중복을 방지하고 효율적인 관리를 할 수 있도록 구현

<br/>

```tsx
import { UserAuth } from "../../types";
import apiClient from "../apiClient";

export const signUp = (body: UserAuth) => {
  return apiClient.post("/auth/signup", body);
};

export const signIn = (body: UserAuth) => {
  return apiClient.post("/auth/signin", body);
};
```

```tsx
import { Todo } from "../../types";
import apiClient from "../apiClient";

export const createTodo = (todo: Todo) => {
  return apiClient.post("/todos", todo);
};

export const getTodos = () => {
  return apiClient.get("/todos");
};

export const updateTodo = (id: number, todo: Todo) => {
  return apiClient.put(`/todos/${id}`, todo);
};

export const deleteTodo = (id: number) => {
  return apiClient.delete(`/todos/${id}`);
};
```

- auth, todo 요청 API를 호출하는 컴포넌트 내에서 직접 관리하지 않고, 별도의 파일에 따로 묶어서 관리
- 코드의 구조를 더 체계적으로 관리할 수 있고, 유지보수 및 개발 효율성 증가

<br/>

### ✅ 리다이렉션

```tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Layout } from "../components";
import { NotFoundPage, SignInPage, SignUpPage, TodoListPage } from "../pages";
import { Authorized, UnAuthorized } from "../pages/Redirect";

const router = (
  <Route element={<Layout />}>
    <Route element={<UnAuthorized />}>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Route>
    <Route element={<Authorized />}>
      <Route path="/" element={<Navigate to="/todo" replace />} />
      <Route path="/todo" element={<TodoListPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;
```

- 페이지 접근 전 권한체크가 필요한 경우 중첩 라우트를 이용해 리다이렉션 처리

<br/>

```tsx
import { createContext } from "react";
import { ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("ACCESS_TOKEN");

  const saveToken = useCallback(
    (token: string) => {
      localStorage.setItem("ACCESS_TOKEN", token);
      navigate("/todo");
    },
    [navigate],
  );

  const clearToken = useCallback(() => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/signin");
  }, [navigate]);

  return (
    <useAuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </useAuthContext.Provider>
  );
};

export const useAuthContext = createContext<{
  token: string | null;
  saveToken: (token: string) => void;
  clearToken: () => void;
}>({ token: null, saveToken: () => {}, clearToken: () => {} });

export default useAuthContext;
```

- **`useAuthContext`** 를 통해 인증 정보와 관련된 상태와 함수를 다른 컴포넌트에서 공유
- 각 컴포넌트에서 중복되는 코드를 피하고 재사용성을 높이기 위해 인증 관련 로직을 **`context`** 를 이용해 모듈화

<br/>

```tsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export const UnAuthorized = () => {
  const { token } = useContext(useAuthContext);
  if (token !== null) {
    return <Navigate to="/todo" />;
  } else {
    return <Outlet />;
  }
};

export const Authorized = () => {
  const { token } = useContext(useAuthContext);
  if (token === null) {
    return <Navigate to="/signin" />;
  } else {
    return <Outlet />;
  }
};
```

- 권한 체크와 같은 중요한 역할들을 따로 분리해 기능을 더 명확하게 하고 각 컴포넌트는 해당 역할에 집중할 수 있도록 함.

<br/>

### ✅ 회원가입

```tsx
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
```

<br/>

### ✅ 로그인

```tsx
const SignInPage = () => {
  const { saveToken } = useContext(useAuthContext);
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
```

```tsx
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
```

- **회원가입, 로그인 유효성 검사**
  - email은 includes, password는 length를 사용
  - 입력이 유효하지 않다면, 사용자가 입력할 때마다 에러 메시지 표시, 버튼 disabled
  - 중복 코드를 줄이기 위해 재사용 가능하도록 모듈화

<br/>

### ✅ **입력 필드** (공통 컴포넌트)

```tsx
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
```

- 입력 필드는 로그인과 회원가입 페이지에서 공통으로 사용하기 위해 재사용 가능한 형태로 구현

<br/>

### ✅ Todo

#### **TodoItem**

```tsx
const TodoItem = ({ todo, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo>(todo);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateTodo(editedTodo.id, editedTodo);
    onEdit();
    setIsEditing(false);
  };

  const onCompleteTodo = async () => {
    if (!isEditing) {
      const updatedTodo = {
        ...editedTodo,
        isCompleted: !editedTodo.isCompleted,
      };
      setEditedTodo(updatedTodo);
      await updateTodo(updatedTodo.id, updatedTodo);
      onEdit();
    }
  };

  const onUpdateTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedTodo(todo);
  };

  const onEditTodo = () => {
    setIsEditing(!isEditing);
  };

  const onDeleteTodo = async () => {
    await deleteTodo(todo.id);
    onEdit();
  };

  return (
    <li className={styles.wrapper}>
      <label htmlFor={`${todo.id}`}>
        <input
          id={`${todo.id}`}
          type="checkbox"
          checked={editedTodo.isCompleted}
          onChange={onCompleteTodo}
        />
      </label>
      {!isEditing ? (
        <span>{todo.todo}</span>
      ) : (
        <form onSubmit={onSubmit} className={styles.editForm}>
          <input
            type="text"
            name="todo"
            value={editedTodo.todo}
            data-testid="modify-input"
            onChange={onUpdateTodo}
            className={styles.editInput}
          />

          <button type="submit" data-testid="submit-button">
            <FontAwesomeIcon icon={faCheck} className={styles.icon} />
          </button>
          <button
            type="button"
            data-testid="cancel-button"
            onClick={cancelEdit}
          >
            <FontAwesomeIcon icon={faXmark} className={styles.icon} />
          </button>
        </form>
      )}

      {!isEditing && (
        <>
          <button
            type="button"
            data-testid="modify-button"
            onClick={onEditTodo}
          >
            <FontAwesomeIcon icon={faPenToSquare} className={styles.icon} />
          </button>
          <button
            type="button"
            data-testid="delete-button"
            onClick={onDeleteTodo}
          >
            <FontAwesomeIcon icon={faTrashCan} className={styles.icon} />
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
```

- 각각의 Todo 항목을 표현하고, **수정 및 삭제 기능**을 담당, 재사용 가능하도록 구현
- Todo 항목을 수정하거나 삭제할 때 API와 연동하여 데이터를 업데이트하고 **`onEdit`** 함수를 호출하여 Todo 목록을 다시 로드

<br/>

#### **TodoList**

```tsx
const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const onGetTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  const handleCreateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodo) return;

    const newTodoObj: Partial<Todo> = {
      todo: newTodo,
    };

    await createTodo(newTodoObj as Todo);

    setNewTodo("");
    onGetTodos();
  };

  useEffect(() => {
    onGetTodos();
  }, []);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;
  console.log(formattedDate);

  return (
    <section className={styles.wrapper}>
      <h2>{formattedDate}</h2>

      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          data-testid="new-todo-input"
          value={newTodo}
          onChange={onChange}
          placeholder="오늘 할 일은?"
        />
        <button
          type="submit"
          data-testid="new-todo-add-button"
          disabled={!newTodo}
        >
          <FontAwesomeIcon icon={faAdd} className={styles.icon} />
        </button>
      </form>

      <ul>
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} onEdit={onGetTodos} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
```

- **전체 Todo 목록을 보여주고, 새로운 Todo를 추가**하는 기능 담당
- API를 이용하여 Todo 목록을 불러오는 **`onGetTodos`** 함수를 구현. 이 함수는 컴포넌트가 마운트될 때와 Todo 항목이 업데이트될 때 호출
- 새로운 Todo를 생성하는 **`handleCreateTodo`** 함수에서는 입력된 내용을 가지고 API에 요청하여 Todo를 생성하고, 생성 후에는 목록을 다시 로드
- Todo 항목을 렌더링할 때는 **`TodoItem`** 컴포넌트를 활용

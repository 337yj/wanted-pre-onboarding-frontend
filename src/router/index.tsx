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

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "../components";
import {
  NotFoundPage,
  ProtectedRoute,
  SignInPage,
  SignUpPage,
  TodoListPage,
} from "../pages";

const router = (
  <Route element={<Layout />}>
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/" element={<ProtectedRoute />}>
      <Route path="/todo" element={<TodoListPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;

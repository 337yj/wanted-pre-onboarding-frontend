import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "../components";
import { NotFoundPage, SignInPage, SignUpPage, TodoListPage } from "../pages";

const router = (
  <Route element={<Layout />}>
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/todo" element={<TodoListPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;

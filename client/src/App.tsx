import { useEffect, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./pages/RequireAuth";
import AuthMiddleware from "./middlewares/auth";

const Home = lazy(() => import("./pages/Home"));
const FullPost = lazy(() => import("./pages/FullPost"));
const Login = lazy(() => import("./pages/Login"));
const Registration = lazy(() => import("./pages/Registration"));
const MyPosts = lazy(() => import("./pages/MyPosts"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const AddPost = lazy(() => import("./pages/AddPost"));
const EditPost = lazy(() => import("./pages/EditPost"));

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<AuthMiddleware />}>
          <Route index element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route element={<RequireAuth />}>
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="/posts/user/me" element={<MyPosts />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Route>
    </Routes>
  );
};

export default App;

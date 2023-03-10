import { useEffect, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import AuthMiddleware from "./middlewares/auth";
import RequireAuth from "./pages/RequireAuth";

const Home = lazy(() => import("./pages/Home"));
const FullPost = lazy(() => import("./pages/FullPost"));
const AddPost = lazy(() => import("./pages/AddPost"));
const Registration = lazy(() => import("./pages/Registration"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const MyPosts = lazy(() => import("./pages/MyPosts"));
const Login = lazy(() => import("./pages/Login"));

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
            <Route path="/posts/:id/edit" element={<AddPost />} />
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

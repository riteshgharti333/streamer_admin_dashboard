import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { movieInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import NewMovie from "./pages/newMovie/NewMovie";
import SingleMovie from "./pages/SingleMovie/SingleMovie";
import SingleList from "./pages/SingleList/SingleList";
import {
  movieColumns,
  MovieListColumns,
  SubscriptionsColumns,
  userColumns,
} from "./datatablesource";
import NewList from "./pages/NewList/NewList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register/Register";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import SingleSubscriptions from "./pages/SingleSubscriptions/SingleSubscriptions";
import Earnings from "./pages/Earnings/Earnings";
import Stats from "./pages/Stats/Stats";
import Home from "./pages/home/Home";
import Login from "./pages/SignIn/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { user } = useSelector((state) => state.auth);

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>

            <Route path="changepassword" element={<UpdatePassword />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="stats" element={<Stats />} />

            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="profile" element={<Profile />} />

            {/* users */}
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List
                      title="Users"
                      listColumns={userColumns}
                      type="users"
                      movieType="users"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
            </Route>

            {/* movies */}
            <Route path="movies">
              <Route
                index
                element={
                  <RequireAuth>
                    <List
                      title="Add New Movie"
                      type="movies"
                      listColumns={movieColumns}
                      movieType="movies"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path=":movieId"
                element={
                  <RequireAuth>
                    <SingleMovie />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewMovie inputs={movieInputs} title="Add New Movie" />
                  </RequireAuth>
                }
              />
            </Route>

            {/* webseries */}
            <Route path="series">
              <Route
                index
                element={
                  <RequireAuth>
                    <List
                      title="Add New Webseries"
                      type="series"
                      listColumns={movieColumns}
                      movieType="series"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path=":seriesId"
                element={
                  <RequireAuth>
                    <SingleMovie />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewMovie inputs={movieInputs} title="Add New Series" />
                  </RequireAuth>
                }
              />
            </Route>

            {/* Lists */}
            <Route path="lists">
              <Route
                index
                element={
                  <RequireAuth>
                    <List
                      title="Add New Lists"
                      type="list"
                      listColumns={MovieListColumns}
                      movieType="lists"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path=":listId"
                element={
                  <RequireAuth>
                    <SingleList />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewList inputs={movieInputs} title="Add New List" />
                  </RequireAuth>
                }
              />
            </Route>

            {/* subscriptions */}
            <Route path="subscriptions">
              <Route
                index
                element={
                  <RequireAuth>
                    <List
                      title="Subscriptions"
                      type="subscriptions"
                      listColumns={SubscriptionsColumns}
                      movieType="subscriptions"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path=":subscriptionId"
                element={
                  <RequireAuth>
                    <SingleSubscriptions />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;

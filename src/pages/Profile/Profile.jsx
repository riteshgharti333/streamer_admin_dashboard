import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  updateProfileAsync,
  userProfileAsync,
} from "../../redux/asyncThunks/authThunks";
import { profileSchema } from "../../schemas";
import { useFormik } from "formik";
import Skeleton from "react-loading-skeleton";

export default function Profile() {
  const navigate = useNavigate();
  const [updateMode, setUpdateMode] = useState(false);

  const { user } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const initialvalues = {
    name: user.name || "",
    email: user.email || "",
  };

  const [isLoading, setIsLoading] = useState(true);

  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsLoading(true);
    if (!profile) {
      dispatch(userProfileAsync());
    }
    setIsLoading(false);
  }, [dispatch, profile]);

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      validationSchema: profileSchema,
      onSubmit: async (values) => {
        try {
          const response = await dispatch(updateProfileAsync(values)).unwrap();
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, user: response.user }),
          );
          toast.success(response.message);
          navigate(0);
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      },
    });

  const sBG = {
    backgroundColor: isLoading ? "white" : "",
    background: isLoading ? "white" : "",
  };

  return (
    <div className="settings">
      <h1>Profile</h1>

      <div className="settingsWrapper" style={sBG}>
        <div className="profileData">
          <div className="right">
            {updateMode ? (
              <form className="updateMode" onSubmit={handleSubmit}>
                <div className="inputValid">
                  <div className="inputType">
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Username"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.name && touched.name ? (
                    <p className="formError">{errors.name}</p>
                  ) : null}
                </div>
                <div className="inputValid">
                  <div className="inputType">
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <p className="formError">{errors.email}</p>
                  ) : null}
                </div>
                <div className="profileEditBtn">
                  <button
                    className="primary-btn"
                    onClick={() => setUpdateMode(!updateMode)}
                  >
                    Cancel
                  </button>
                  <button className="primary-btn" type="submit">
                    Update
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="profileName">
                  <h3>
                    {isLoading ? (
                      <Skeleton width={200} height={40} />
                    ) : (
                      user.name
                    )}
                  </h3>
                </div>
                <div className="profileEmail">
                  <p>
                    {isLoading ? (
                      <Skeleton width={200} height={40} />
                    ) : (
                      user.email
                    )}
                  </p>
                </div>
                {isLoading ? (
                  <Skeleton width={100} height={30} />
                ) : (
                  <div className="profileEditBtn">
                    <button
                      className="primary-btn"
                      onClick={() => setUpdateMode(!updateMode)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <Link to={"/changepassword"}>
            <p className="changePwd">
              {isLoading ? <Skeleton width={100} /> : "  Change Password"}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

import "./newMovie.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAsyncSingleMovie } from "../../redux/asyncThunks/movieThunks";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { genre, ageRestrictions } from "../../datatablesource";
import { toast } from "react-toastify";
import addImage from "../../assets/images/addImage.svg";

const NewMovie = ({ title }) => {
  const [data, setData] = useState({});
  const [featureImg, setFeatureImg] = useState(null);
  const [featureSmImg, setFeatureSmImg] = useState(null);
  const [smImg, setSmImg] = useState(null);
  // const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const uploadFile = async (items) => {
    if (!items) return;

    setIsUploading(true); // Start uploading

    const storageRef = ref(storage);

    let uploadPromises = items.map((item) => {
      if (!item.file) return Promise.resolve(); // Skip if no file

      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = uploadBytesResumable(
        ref(storageRef, `/items/${fileName}`),
        item.file,
      );

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(Math.round(progress));
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setData((prev) => ({ ...prev, [item.label]: downloadURL }));
              setUploaded((prev) => prev + 1);
              resolve();
            } catch (error) {
              console.log("Error getting download URL:", error);
              reject(error);
            }
          },
        );
      });
    });

    try {
      await Promise.all(uploadPromises);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
    }
  };

  const handleUploadAndSubmit = async (e) => {
    e.preventDefault();

    if (uploaded < 3) {
      await uploadFile([
        { file: featureImg, label: "featureImg" },
        { file: featureSmImg, label: "featureSmImg" },
        { file: smImg, label: "smImg" },
        // { file: video, label: "video" },
      ]);
    }

    if (uploaded === 3) {
      try {
        const movieData = { ...data, video: videoLink }; // Add video link to data
        await dispatch(createAsyncSingleMovie(movieData)).unwrap();
        toast.success("Created Successfully");
        navigate(-1);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }

    // if (uploaded === 4) {
    //   try {
    //     await dispatch(createAsyncSingleMovie(data)).unwrap();
    //     toast.success("Created Successfully");
    //     navigate(-1);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  return (
    <div className="new">
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="center">
        <form>
          <div className="left">
            <div className="formInput">
              <p>Feature Image</p>
              <label htmlFor="featureImg">
                <input
                  type="file"
                  name="featureImg"
                  id="featureImg"
                  accept="image/*"
                  onChange={(e) => setFeatureImg(e.target.files[0])}
                  style={{ display: "none" }}
                />
                {featureImg ? (
                  <img
                    className="movieImg"
                    src={URL.createObjectURL(featureImg)}
                  />
                ) : (
                  <div className="noImage">
                    <div className="noImageInfo">
                      <img className="noImg" src={addImage} alt="" />
                      <p>Add Images</p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            <div className="formInput">
              <p>Feature Small Image</p>
              <label htmlFor="featureSmImg">
                <input
                  type="file"
                  name="featureSmImg"
                  id="featureSmImg"
                  accept="image/*"
                  onChange={(e) => setFeatureSmImg(e.target.files[0])}
                  style={{ display: "none" }}
                />
                {featureSmImg ? (
                  <img
                    className="movieImg"
                    src={URL.createObjectURL(featureSmImg)}
                  />
                ) : (
                  <div className="noImage">
                    <div className="noImageInfo">
                      <img className="noImg" src={addImage} alt="" />
                      <p>Add Images</p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            <div className="formInput">
              <p>Small Image</p>
              <label htmlFor="smallImg">
                <input
                  type="file"
                  name="smallImg"
                  id="smallImg"
                  accept="image/*"
                  onChange={(e) => setSmImg(e.target.files[0])}
                  style={{ display: "none" }}
                />
                {smImg ? (
                  <img className="movieImg" src={URL.createObjectURL(smImg)} />
                ) : (
                  <div className="noImage">
                    <div className="noImageInfo">
                      <img className="noImg" src={addImage} alt="" />
                      <p>Add Images</p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="right">
            <div className="formInput">
              <input
                type="text"
                name="title"
                placeholder="Name"
                onChange={handleInput}
              />
              <label>Title</label>
            </div>

            <div className="formInput">
              <input
                type="text"
                placeholder="Name"
                name="desc"
                onChange={handleInput}
              />
              <label>Description</label>
            </div>

            <div className="formInput">
              <input
                type="number"
                placeholder="Name"
                name="duration"
                onChange={handleInput}
              />
              <label>Duration</label>
            </div>

            <div className="formInput">
              <input
                type="number"
                placeholder="Name"
                name="year"
                onChange={handleInput}
              />
              <label>Year</label>
            </div>

            <div className="formInput">
              <input
                type="text"
                name="videoLink"
                placeholder="Name"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
              <label>Video</label>
            </div>
          </div>

          <div className="bottom">
            <div className="bottomInput">
              <label>Genre</label>
              <select
                id="genre"
                onChange={handleInput}
                name="genre"
                value={data.genre || "default"}
              >
                <option value="default" disabled>
                  Select a genre
                </option>
                {genre.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="bottomInput">
              <label>Age</label>
              <select
                id="age"
                onChange={handleInput}
                name="age"
                value={data.age || "default"}
              >
                <option value="default" disabled>
                  Select an Age
                </option>
                {ageRestrictions.map((age) => (
                  <option value={age} key={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            <div className="bottomInput">
              <label>Type</label>
              <select
                id="isSeries"
                onChange={handleInput}
                name="isSeries"
                value={data.isSeries || "default"}
              >
                <option value="default" disabled>
                  Select Type
                </option>
                <option value="false">Movie</option>
                <option value="true">Series</option>
              </select>
            </div>
          </div>

          <button
            className="addProductButton primary-btn"
            onClick={handleUploadAndSubmit}
            disabled={isUploading} // Disable when uploading
          >
            {isUploading
              ? "Uploading..."
              : uploaded === 4
                ? "Create"
                : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewMovie;

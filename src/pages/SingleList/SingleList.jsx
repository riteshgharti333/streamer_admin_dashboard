import { useState } from "react";
import "./SingleList.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { ListofListColumns } from "../../datatablesource";
import { ListofListSColumns } from "../../datatablesource";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteAsyncSingleList,
  getAsyncSingleList,
  updateAsyncSingleList,
} from "../../redux/asyncThunks/listThunks"; // Import the update thunk
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAsyncMovies,
  getAsyncSigleMovie,
} from "../../redux/asyncThunks/movieThunks";
import { genre } from "../../datatablesource";
import { toast } from "react-toastify";

const SingleList = () => {
  const [add, setAdd] = useState(false);
  const [list, setList] = useState({});
  const [moviesListId, setMoviesListId] = useState([]);
  const [rows, setRows] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  const [data, setData] = useState({});
  const [selectedMovies, setSelectedMovies] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = location.pathname.split("/")[2];

  const lists = useSelector((state) => state.lists.lists);
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    dispatch(getAsyncMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies && movies.movies) {
      const filtered = movies.movies.filter(
        (movie) => !moviesListId.includes(movie._id),
      );
      setAllMovies(filtered);
    }
  }, [movies, moviesListId]);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
    setList((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleOpen = () => {
    setAdd(!add);
  };

  useEffect(() => {
    dispatch(getAsyncSingleList(path));
  }, [dispatch, path]);

  useEffect(() => {
    if (lists.list) {
      setList(lists.list);
      setMoviesListId(lists.list.content);
    }
  }, [lists]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviePromises = moviesListId.map((id) =>
          dispatch(getAsyncSigleMovie(id)),
        );
        const movieResponses = await Promise.all(moviePromises);
        const movies = movieResponses.map(
          (response) => response.payload.getMovie,
        );
        setRows(movies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch, moviesListId]);

  const deleteList = async (id) => {
    try {
      await dispatch(deleteAsyncSingleList(id)).unwrap();
      toast.success("list deleted");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleRowSelection = (selectionModel) => {
    setSelectedMovies(selectionModel);
  };

  const handleAddMovies = () => {
    const updatedContent = [...moviesListId, ...selectedMovies];
    setMoviesListId(updatedContent);

    setList({ ...list, content: updatedContent });
    setAdd(false);

    console.log(selectedMovies);
    setAdd(!add);
  };

  const deleteMovieFromList = (id) => {
    const updatedContent = moviesListId.filter((movieId) => movieId !== id);
    setMoviesListId(updatedContent);
    setList({ ...list, content: updatedContent });
  };

  const updateList = async () => {
    const updateList = {
      ...list,
      content: moviesListId,
    };
    try {
      await dispatch(
        updateAsyncSingleList({ id: list._id, updateList }),
      ).unwrap();
      toast.success("Updated Successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="actions">
          <DeleteIcon
            className="deleteIcon"
            onClick={() => deleteMovieFromList(params.row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={`mainContainer ${add ? "blur" : ""}`}>
      <div className="singleList">
        <div className="top">
          <h1 className="addlistTitle ">Update List</h1>
          <button className="primary-btn" onClick={() => deleteList(list._id)}>
            Delete
          </button>
        </div>
        <div className="bottom">
          <form className="addlistForm" onChange={handleChange}>
            <div className="addlistItem">
              <input
                type="text"
                placeholder="popular movies"
                name="title"
                value={list.title || ""}
                onChange={handleChange}
              />
              <label>Title</label>
            </div>
            <div className="addlistItem">
              <label>Genre</label>
              <select name="genre" value={list.genre} onChange={handleChange}>
                {genre.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="addlistItem">
              <label>Type</label>

              <select name="type" value={list.type} onChange={handleChange}>
                <option value="movies">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>
            <div className="addlistItem">
              <label>Content</label>
              <div className="datagridContainer">
                <DataGrid
                  className="datagrid"
                  rows={rows}
                  columns={ListofListColumns.concat(actionColumn)}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  getRowId={(row) => row._id}
                  pageSizeOptions={[5, 10, 20]}
                  checkboxSelection
                />
              </div>
            </div>

            <div className="listButton">
              <button
                className="addlistButton primary-btn"
                type="button"
                onClick={handleOpen}
              >
                Add
              </button>
              <button
                className="addlistButton primary-btn"
                type="button"
                onClick={updateList}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {add && (
        <div className="AddMovies">
          <DataGrid
            className="datagrid"
            rows={allMovies}
            columns={ListofListSColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleRowSelection}
          />
          <div className="AddMoviesBtn">
            <button className="primary-btn" onClick={handleAddMovies}>
              Add
            </button>
            <button className="primary-btn" onClick={handleOpen}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleList;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  genre,
  ListofListColumns,
  ListofListSColumns,
} from "../../datatablesource";
import { getAsyncMovies } from "../../redux/asyncThunks/movieThunks";
import "./NewList.scss";
import { createAsyncSingleList } from "../../redux/asyncThunks/listThunks";
import { toast } from "react-toastify";

const NewList = ({ title }) => {
  const [add, setAdd] = useState(false);
  const [moviesListId, setMoviesListId] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [data, setData] = useState({});
  const [content, setContent] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    dispatch(getAsyncMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies && movies.movies) {
      // Filter out movies already in the list
      const filtered = movies.movies.filter(
        (movie) => !moviesListId.includes(movie._id),
      );
      setAllMovies(filtered);
    }
  }, [movies, moviesListId]);

  const handleInput = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const deleteMovieFromList = (id) => {
    const updatedContent = content.filter((movie) => movie._id !== id);
    setContent(updatedContent);

    const updatedMoviesListId = moviesListId.filter(
      (movieId) => movieId !== id,
    );
    setMoviesListId(updatedMoviesListId);
  };

  const handleRowSelection = (selectionModel) => {
    const selectedMoviesData = allMovies.filter((movie) =>
      selectionModel.includes(movie._id),
    );
    setSelectedMovies(selectedMoviesData);
  };

  const handleAddMovies = () => {
    const updatedContent = [...content, ...selectedMovies];
    const uniqueContent = Array.from(
      new Set(updatedContent.map((movie) => movie._id)),
    ).map((id) => updatedContent.find((movie) => movie._id === id));

    setContent(uniqueContent);
    setMoviesListId(uniqueContent.map((movie) => movie._id));
    setAdd(false);
  };

  // const handleAddMovies = () => {
  //   const AddedContent = [...moviesListId,...selectedMovies];

  //   console.log(AddedContent);
  //   setContent(AddedContent);
  //   setAdd(false);
  // };

  const createList = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        createAsyncSingleList({ ...data, content: moviesListId }),
      ).unwrap();
      toast.success("Created Successfully");
      navigate("/lists");
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
    <div className={`mainNewList ${add ? "blur" : ""}`}>
      <div className="newList">
        <h1>{title}</h1>
        <div className="bottom">
          <form>
            <div className="addlistItem">
              <input
                type="text"
                placeholder="Popular movies"
                name="title"
                onChange={handleInput}
              />
              <label>Title</label>
            </div>

            <div className="addlistItem">
              <label>Genre</label>
              <select
                name="genre"
                defaultValue="default"
                onChange={handleInput}
              >
                <option value="default" disabled>
                  Select Genre
                </option>
                {genre.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="addlistItem">
              <label>Type</label>

              <select
                id="type"
                name="type"
                defaultValue="default"
                onChange={handleInput}
              >
                <option value="default" disabled>
                  Select Type
                </option>
                <option value="movies">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>
            <div className="addlistItem">
              <label>Content</label>
              <div className="datagridContainer">
                <DataGrid
                  className="datagrid"
                  rows={content}
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
                  // onSelectionModelChange={(newSelection) =>
                  //   handleRowSelection(newSelection)
                  // }
                />
              </div>
            </div>
            <div className="formBtn">
              <button
                className="addlistButton primary-btn"
                type="button"
                onClick={() => setAdd(true)}
              >
                Add
              </button>
              <button
                className="addlistButton primary-btn"
                type="button"
                onClick={createList}
              >
                Create List
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
            <button className="primary-btn" onClick={() => setAdd(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewList;

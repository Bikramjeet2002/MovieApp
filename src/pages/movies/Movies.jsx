import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovieRequest,
  deleteMovieRequest,
  editMovieRequest,
  fetchMovieRequest,
} from "../../redux/features/movie/movieSlice";

const Movies = () => {
  const [movieData, setMovieData] = useState({
    year: "",
    poster: "",
    title: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieRequest());
  }, []);

  const movies = useSelector((state) => state.movie?.movies);

  const handleDelete = (id) => {
    dispatch(deleteMovieRequest(id));
    // console.log(id,"id")
  };
  // const handleAddOrEdit = () => {
    
  
  //   try {
  //     const users = JSON.parse(localStorage.getItem("users"));
  
  //     if (movieData?.id) {
  //       dispatch(editMovieRequest({ ...movieData, userId: users.id }));
  //     } else {
  //       dispatch(addMovieRequest({ ...movieData, userId: users.id }));
  //     }
  
  //     console.log("Movie Data Submitted:", { ...formData, userId: users.id });
  
  //     setFormData({ year: "", poster: "", title: "" });
  
  //   } catch (error) {
  //     console.error("Error in handleAddOrEdit:", error);
  //   }
  // };
  

  const handleAddorEdit = () => {
    
  
    try {
      if (movieData?.id) {
        const users = JSON.parse(localStorage.getItem("users"));
        dispatch(editMovieRequest({ ...movieData, userId: users.id }));
      } else {
        const users = JSON.parse(localStorage.getItem("users"));
        dispatch(addMovieRequest({ ...movieData, userId: users.id }));
        
        console.log({ ...movieData, userId: users.id });
    
      }
      setMovieData({ year: "", poster: "", title: "" });

    } catch (error) {
      console.log(error); 
    }
  };
  const handleInput = (e) => {
    e.preventDefault();
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };
  const handleEdit = (id) => {
    const editData = movies.find((movie) => movie.id == id);
    setMovieData(editData);
    //  dispatch(editMovieRequest(movieData))
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Add Movie
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleAddorEdit}
            className="space-y-6"
          >
            <div>
              {/* <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email 
                </label> */}
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={movieData?.title}
                  placeholder="Title"
                  onChange={handleInput}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="poster"
                  name="poster"
                  type="text"
                  required
                  value={movieData?.poster}
                  onChange={handleInput}
                  placeholder="Poster Url"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              {/* <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email 
                </label> */}
              <div className="mt-2">
                <input
                  id="year"
                  name="year"
                  type="number"
                  min="0"
                  required
                  onChange={handleInput}
                  placeholder="Year"
                  value={movieData?.year}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {movieData?.id ? "Edit Movie" : "Add Movie"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {movies
        ? movies?.map((list) => (
            <li key={list.id} className="mt-3">
              {list.title}{" "}
              <button
                className="bg-yellow-500 px-2 rounded-lg text-white hover:bg-yellow-600"
                onClick={() => handleEdit(list.id)}
              >
                {" "}
                Edit
              </button>
              <button
                className="bg-red-500 px-2 ml-2 rounded-lg text-white hover:bg-red-600"
                onClick={() => handleDelete(list.id)}
              >
                {" "}
                Delete
              </button>
            </li>
          ))
        : "NO DATA fOUND"}
    </div>
  );
};

export default Movies;

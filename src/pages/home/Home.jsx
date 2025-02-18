import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchMovieRequest } from "../../redux/features/movie/movieSlice";
import { useDispatch } from "react-redux";
// import { fetchUser } from '../../redux/features/authSlice'

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  // console.log(movies.map((e) => e.id));
  useEffect(() => {
    dispatch(fetchMovieRequest());
  }, [dispatch]);

  const movies = useSelector((state) => state.movie?.movies);
  // console.log(movies);
  return (
    <div>
      <div>welcome {user?.firstName}</div>
      {/* <button onClick={fetchMovie}>get Movies</button> */}
      <div className="flex gap-3 flex-wrap">
        {movies
          ? movies?.map((movie) => 
              <div
                key={movie.id}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <div>
                  <img
                    className="h-[400px] w-[300px] object-cover "
                    src={movie.poster}
                    alt="No pic found"
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{movie.title}</div>
                  <p className="text-gray-700 text-base">{movie.year} </p>
                </div>
              </div>
            )
          : "no data Found"}
      </div>
    </div>
  );
};

export default Home;

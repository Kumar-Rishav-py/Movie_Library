  /* eslint-disable react-hooks/rules-of-hooks */
  import { useEffect, useState } from "react";
  import Navbar from "../components/Navbar";
  import MovieCard from "../components/MovieCard";
  import { useFirebase } from "../context/firebase";
  import { useNavigate } from "react-router";
  import ListCard from "../components/ListCard";
  import PublicListCard from "../components/PublicListCard";
  import { IoIosLink } from "react-icons/io";
  import { MdDelete } from "react-icons/md";
  import { toast } from "sonner";

  const arr = ['marvel', 'star', 'lego', "game", 'harry', "walking", 'pirates'];

  const Home = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const firebase = useFirebase();
    const navigate = useNavigate();

    useEffect(() => {
      if (!firebase.user?.email) {
        navigate('/sign');
      } else {
        navigate('/');
      }
    }, [firebase, navigate]);

    useEffect(() => {
      fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&s=${arr[Math.floor(Math.random() * arr.length)]}`)
        .then(res => res.json())
        .then(data => {
          setData(data.Search);
        })
        .catch(err => {
          console.log(err);
        });
    }, []);

    useEffect(() => {
      if (search.length > 2) {
        setLoading(true);
        setTimeout(() => {
          fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&s=${search}`)
            .then(res => res.json())
            .then(data => {
              setData(data.Search);
              setLoading(false);
            })
            .catch(err => {
              console.log(err);
              setLoading(false);
            });
        }, 3000);
      }
    }, [search]);

    const createPrivateList = () => {
      var r = Math.floor(Math.random() * 16);
      firebase.putData(`${firebase.user.uid}/private/${r}`, { id: r });
      toast.success('Created new list', { duration: 3000 });
    };

    const createPublicList = () => {
      var r = Math.floor(Math.random() * 16);
      firebase.putData(`${firebase.user.uid}/public/${r}`, { id: r });
      toast.success('Created new list', { duration: 3000 });
    };

    const deletePublicList = (data) => {
      firebase.putData(`${firebase.user.uid}/public/${data[0]}`, { id: null });
      toast.success('List deleted successfully', { duration: 3000 });
    };

    const deletePrivateList = (data) => {
      firebase.putData(`${firebase.user.uid}/private/${data[0]}`, { id: null });
      toast.success('List deleted successfully', { duration: 3000 });
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-800 mb-4">Search for Movies</h1>
            <input
              value={search}
              onInput={e => setSearch(e.target.value)}
              type="text"
              className="w-full md:w-2/3 lg:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Enter at least three characters..."
            />
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading && <p className="text-center text-xl">Loading...</p>}
                {!loading && data?.length === 0 && <p className="text-center text-xl text-indigo-600">No Results Found</p>}
                {!loading && data?.map((movie, id) => (
                  <MovieCard key={id} id={movie.imdbID} title={movie.Title} year={movie.Year} img={movie.Poster} type={movie.Type} />
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-indigo-800">Public Lists</h2>
                  <button onClick={createPublicList} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300">New List</button>
                </div>
                {firebase.publicData ? Object.entries(firebase.publicData).map((data, key) => {
                  const copyToClip = async (data) => {
                    await navigator.clipboard.writeText(`${location.href}public/${firebase.user.uid}/${data[0]}`);
                    toast('Copied to clipboard', { duration: 3000 });
                  };
                  return (
                    <div key={key} className="bg-indigo-100 p-4 rounded-lg mb-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-indigo-900">Public List - {key + 1}</h3>
                        <div className="flex items-center space-x-2">
                          <IoIosLink onClick={() => copyToClip(data)} className="text-xl text-indigo-700 cursor-pointer hover:text-indigo-900 transition duration-300" />
                          <MdDelete onClick={() => deletePublicList(data)} className="text-xl text-red-700 cursor-pointer hover:text-red-900 transition duration-300" />
                        </div>
                      </div>
                      <PublicListCard key={key} data={data[1]} />
                    </div>
                  );
                }) : <p className="text-center text-indigo-700">No public lists</p>}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-indigo-800">Private Lists</h2>
                  <button onClick={createPrivateList} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300">New List</button>
                </div>
                {firebase.privateData ? Object.entries(firebase.privateData).map((data, key) => (
                  <div key={key} className="bg-indigo-100 p-4 rounded-lg mb-4 shadow-sm">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-indigo-900">Private List - {key + 1}</h3>
                      <MdDelete onClick={() => deletePrivateList(data)} className="text-xl text-red-700 cursor-pointer hover:text-red-900 transition duration-300" />
                    </div>
                    <ListCard key={key} data={data[1]} />
                  </div>
                )) : <p className="text-center text-indigo-700">No private lists</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Home;

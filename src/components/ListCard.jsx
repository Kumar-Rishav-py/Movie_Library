/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { IoIosRemoveCircle } from "react-icons/io";
import { useFirebase } from '../context/firebase';
import { toast } from 'sonner';

const ListItem = ({ val, id }) => {
  const [data, setData] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&i=${val}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [val]);

  const deleteData = () => {
    firebase.putData(`${firebase.user.uid}/private/${id}/${data.imdbID}`, {
      id: null
    });
    toast.success('Removed from list', { duration: 3000 });
  };

  return (
    <div className="flex items-center gap-4 p-2 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300">
      <img className="w-20 h-28 rounded-lg" src={data?.Poster} alt="Movie Poster" />
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{data?.Title}</h3>
        <p className="text-sm text-gray-500">{data?.Year}</p>
      </div>
      <button onClick={deleteData} className="text-red-500 hover:text-red-700">
        <IoIosRemoveCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

const ListCard = ({ data }) => {
  const { id, ...temp } = data;

  return (
    <div className="flex flex-col gap-4 p-2">
      {Object.entries(temp).length > 0 ? (
        Object.entries(temp).map((d, k) => (
          <ListItem key={k} val={d[0]} id={id} />
        ))
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default ListCard;

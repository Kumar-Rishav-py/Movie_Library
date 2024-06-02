/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useFirebase } from '../context/firebase';
import { toast } from 'sonner';

const List = ({ val, id }) => {
  const [data, setData] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&i=${val}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [val]);

  const deleteData = () => {
    firebase.putData(`${firebase.user.uid}/public/${id}/${val}`, {
      id: null,
    });
    toast.success('Removed from list', { duration: 3000 });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {data && (
        <>
          <div className="flex items-center space-x-4">
            <img
              className="h-20 w-20 rounded-lg"
              src={data.Poster}
              alt="Movie Poster"
            />
            <div>
              <p className="font-semibold text-lg">{data.Title}</p>
              <p className="text-gray-500">{data.Year}</p>
            </div>
          </div>
          <div
            className="text-red-600 cursor-pointer hover:text-red-700"
            onClick={deleteData}
          >
            <IoIosRemoveCircle className="text-4xl" />
          </div>
        </>
      )}
    </div>
  );
};

const PublicListCard = ({ data }) => {
  const { id, ...temp } = data;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-100">
      </div>
      <div className="divide-y divide-gray-200">
        {Object.entries(temp).length > 0 ? (
          Object.entries(temp).map((d, k) => {
            return <List key={k} val={d[0]} id={id} />;
          })
        ) : (
          <p className="p-4 text-gray-500">No movies in the list</p>
        )}
      </div>
    </div>
  );
};

export default PublicListCard;

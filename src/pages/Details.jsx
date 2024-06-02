import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../components/Navbar';
import { useFirebase } from '../context/firebase';
import { BsFillUnlockFill, BsFillLockFill } from "react-icons/bs";
import { toast } from 'sonner';

const Details = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const firebase = useFirebase();
    const navigate = useNavigate();

    useEffect(() => {
        if (!firebase.user?.email) {
            navigate('/sign');
        }
    }, [firebase, navigate]);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=29e1ccf2&i=${id}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const addToPrivate = (idd) => {
        firebase.putData(`${firebase.user.uid}/private/${idd}/${id}`, {
            id: id
        });
        toast.success('Added to private list', { duration: 3000 });
    };

    const addToPublic = (idd) => {
        firebase.putData(`${firebase.user.uid}/public/${idd}/${id}`, {
            id: id
        });
        toast.success('Added to public list', { duration: 3000 });
    };

    return (
        <div className='min-h-screen bg-gray-100'>
            <Navbar />
            {data ? (
                <div className='max-w-5xl mx-auto p-4'>
                    <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                        <div className='md:flex'>
                            <div className='md:w-1/3'>
                                <img src={data.Poster} alt={data.Title} className='object-cover w-full h-full' />
                            </div>
                            <div className='p-6 md:w-2/3'>
                                <h1 className='text-3xl font-bold mb-4'>{data.Title}</h1>
                                <div className='mb-4'>
                                    <h2 className='text-xl font-semibold'>Basic Details</h2>
                                    <p><span className='font-bold'>Release Date:</span> {data.Released}</p>
                                    <p><span className='font-bold'>Genre:</span> {data.Genre}</p>
                                    <p><span className='font-bold'>Language:</span> {data.Language}</p>
                                    <p><span className='font-bold'>Actors:</span> {data.Actors}</p>
                                </div>
                                <div className='mb-4'>
                                    <h2 className='text-xl font-semibold'>Plot</h2>
                                    <p className='text-justify'>{data.Plot}</p>
                                </div>
                                <div className='mb-4'>
                                    <h2 className='text-xl font-semibold'>Add to List</h2>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        {firebase.privateData ? Object.entries(firebase.privateData).map((item, key) => (
                                            <button
                                                key={key}
                                                onClick={() => addToPrivate(Number(item[0]))}
                                                className='flex items-center justify-between px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'
                                            >
                                                <span>Private List - {key + 1}</span>
                                                <BsFillLockFill />
                                            </button>
                                        )) : <p>No private list</p>}
                                        {firebase.publicData ? Object.entries(firebase.publicData).map((item, key) => (
                                            <button
                                                key={key}
                                                onClick={() => addToPublic(Number(item[0]))}
                                                className='flex items-center justify-between px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300'
                                            >
                                                <span>Public List - {key + 1}</span>
                                                <BsFillUnlockFill />
                                            </button>
                                        )) : <p>No public list</p>}
                                    </div>
                                </div>
                                <div>
                                    <h2 className='text-xl font-semibold'>Ratings</h2>
                                    {data.Ratings.map((rating, key) => (
                                        <div key={key} className='mb-2'>
                                            <p className='font-semibold'>{rating.Source}</p>
                                            <p>{rating.Value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-center min-h-screen'>
                    <p className='text-3xl'>Loading....</p>
                </div>
            )}
        </div>
    );
};

export default Details;
    
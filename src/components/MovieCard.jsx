import { useNavigate } from "react-router";

const MovieCard = ({ title, year, img, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/details/${id}`);
      }}
      className="rounded-lg overflow-hidden shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
    >
      <img className="w-full h-auto" src={img} alt={title} />
      <div className="px-4 py-3 bg-white">
        <p className="text-lg font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;

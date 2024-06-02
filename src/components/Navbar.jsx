import { FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useFirebase } from "../context/firebase";
import { toast } from "sonner";

const Navbar = () => {
    const navigate = useNavigate();
    const firebase = useFirebase();

    const handleLogout = () => {
        firebase.signOutUser();
        toast.success('Successfully Logged Out', { duration: 3000 });
    };

    return (
        <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                <img src="public\Logo.JPG" alt="" className="h-12 w-auto" />
            </div>
            <button onClick={handleLogout} className="text-base sm:text-lg px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 transition duration-300">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;

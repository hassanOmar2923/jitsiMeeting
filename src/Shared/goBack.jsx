import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export const GoBack = ({ title }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#16A901] to-[#1ec46b] text-white py-2 px-4 flex items-center justify-between z-50">
      {/* Back button */}
      <button onClick={goBack} className="text-white p-2 rounded-full hover:bg-white hover:text-[#16A901] transition duration-200">
        <FaArrowLeft size={16} />
      </button>

      {/* Title */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base font-medium">
        {title}
      </h1>

      {/* Spacer to balance layout */}
      <div className="p-2"></div>
    </div>
  );
};

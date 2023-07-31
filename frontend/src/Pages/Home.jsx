import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://witty-suit-tick.cyclic.cloud/blogs`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setBlogData(data);
        setLoading(false);
      } catch (error) {
        setErr(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <h1 className="text-center text-4xl mt-10">Loading...</h1>;
  }

  if (err) {
    return (
      <h1 className="text-center text-4xl mt-10">
        Something went wrong. Please refresh the page.
      </h1>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[83rem] mx-auto mt-6">
      {blogData.map((ele) => (
        <div
          key={ele._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <Link to={`/create/${ele._id}`}>
            <img
              className="w-full h-48 object-cover"
              src={ele.image}
              alt="Blog Cover"
            />
          </Link>
          <div className="p-4">
            <p className="text-green-400 font-serif font-semibold mb-2">
              Startups
            </p>
            <Link to={`/create/${ele._id}`}>
              <h1 className="text-3xl font-bold text-blue-600 hover:text-blue-800 mb-2">
                {ele.title}
              </h1>
            </Link>
            <p className="text-md font-sans font-semibold text-gray-600 mb-4">
              by sagar tiwary
            </p>
            <p className="text-gray-700 line-clamp-3">{ele.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

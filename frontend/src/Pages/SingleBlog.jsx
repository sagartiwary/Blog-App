import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const SingleBlog = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBlog = (id) => {
    fetch(`https://witty-suit-tick.cyclic.cloud/blogs/delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let fetchedData = async (id) => {
    try {
      setLoading(true);
      let res = await fetch(
        `https://witty-suit-tick.cyclic.cloud/blogs/create/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      let gotData = await res.json();
      console.log(gotData);
      setData(gotData);
      setLoading(false);
      // console.log(gotData);
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedData(id);
  }, [id]);

  if (loading) {
    return <h1 className="text-center text-4xl mt-10">Loading...</h1>;
  }
  if (err) {
    return (
      <h1 className="text-center text-4xl mt-10">
        Something Wrong... Please try again
      </h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {data._id && id === data._id && (
        <div className="flex justify-center space-x-4 mt-3 mb-6">
          <Link to={`/update/${data._id}`}>
            <button className="border border-green-400 px-4 py-2 bg-green-400 rounded text-white hover:bg-green-500 focus:outline-none">
              Edit Blog
            </button>
          </Link>
          <button
            onClick={() => handleDeleteBlog(data._id)}
            className="border border-red-400 px-4 py-2 bg-red-400 rounded text-white hover:bg-red-500 focus:outline-none"
          >
            Delete Blog
          </button>
        </div>
      )}
      <h1 className="text-left text-green-600 font-semibold text-lg font-sans mt-3 mb-3">
        Startup
      </h1>
      <h1 className="text-left font-bold text-3xl mb-3">{data.title}</h1>
      <p className="mt-5 text-md font-bold mb-4">
        Sagar Tiwary @sagar /{" "}
        <span className="text-sm text-gray-500">
          12:35 AM GMT + 5:30 July 29, 2023
        </span>
      </p>
      <img
        src={data.image}
        alt="Blog Cover"
        className="mb-5 w-full rounded-lg shadow-lg"
      />
      <h1 className="text-lg font-semibold italic">
        Welcome to Startups Weekly. Sign up here to get it in your inbox every
        day.
      </h1>

      <p className="mt-3 text-md leading-6">{data.blog}</p>
    </div>
  );
};



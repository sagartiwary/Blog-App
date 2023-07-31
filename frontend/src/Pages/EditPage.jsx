import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
const initialState = {
  title: "",
  summary: "",
  blog: "",
  num_comments: "",
  image: "",
};

export const EditPage = () => {
  const [blogData, setBlogData] = useState(initialState);
  const { postID } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(
          `https://witty-suit-tick.cyclic.cloud/create/${postID}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const gotData = await res.json();
        // console.log(gotData);

        setBlogData(gotData);
      } catch (error) {
        console.log("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [postID, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: name === "num_comments" ? +value : value,
    }));
  };

  const handleEdit = (ev) => {
    ev.preventDefault();
    fetch(`https://witty-suit-tick.cyclic.cloud/blogs/update/${postID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Blog updated successfully:", data);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error updating blog:", err);
      });
  };
  const { title, summary, blog, num_comments, image } = blogData;
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 mt-8">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 max-w-[900px]">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit Blog
              </h1>
              <form className="space-y-4 md:space-y-6 " onSubmit={handleEdit}>
                <div>
                  <input
                    type="text"
                    name="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Title"
                    required
                    value={title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="summary"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Summary"
                    required
                    value={summary}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Image"
                    required
                    value={image}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="num_comments"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={num_comments}
                    onChange={handleChange}
                    placeholder="NO of Comments"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="blog"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={blog}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                >
                  Update Blog
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

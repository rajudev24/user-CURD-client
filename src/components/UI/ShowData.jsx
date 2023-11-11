import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowData({ isUpdate }) {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("UserId");
  const [editablePostId, setEditablePostId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");

  const fetchData = async () => {
    try {
      const url = `http://localhost:5000/api/v1/post/${userId}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:5000/api/v1/post/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        body: updatedText,
      });
      if (response.ok) {
        toast.success("Post Deleted successfully");
        fetchData();
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const url = `http://localhost:5000/api/v1/update-post/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: updatedText }),
      });
      if (response.ok) {
        toast.success("Post updated successfully");
        setEditablePostId(null);
        fetchData();
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, isUpdate]);
  console.log(posts);
  return (
    <div className="flex justify-center items-center">
      <div>
        {posts.length > 0 ? (
          <h1 className="text-lg font-semibold"> Your posted Data</h1>
        ) : (
          <h1 className="text-lg font-semibold"> No data available </h1>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex justify-between border-2 my-2 p-2 rounded-lg"
          >
            {editablePostId === post.id ? (
              <input
                className="w-full mr-6"
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
              />
            ) : (
              <h1 className="mr-2"> {post.text} </h1>
            )}

            <button
              onClick={() => {
                if (editablePostId === post.id) {
                  handleUpdate(post.id);
                } else {
                  setEditablePostId(post.id);
                  setUpdatedText(post.text);
                }
              }}
              className="bg-indigo-700 text-white p-1 px-2 rounded-full mr-2"
            >
              {editablePostId === post.id ? "Save" : "Update"}
            </button>

            <button
              onClick={() => handleDelete(post.id)}
              className="bg-indigo-700 text-white p-1 px-8 rounded-full "
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

import React from "react";
import SingleBlogCard from "../../components/SingleBlogCard";
import SingleColCard from "../../components/SingleColCard";
import LoadingPage from "../../components/LoadingPage";
import "./index.css";

const Stories = () => {
  const [posts, setPosts] = React.useState([]);
  const _URL =
    "https://public-api.wordpress.com/wp/v2/sites/feedtheneedy518055725.wordpress.com/posts";

  React.useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetch(_URL);
      const fetchedPosts = await data.json();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  if (!posts) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <div className="titleLifeContainer">
          <h1 className="titleLifes">Lifes that changed by you</h1>
          <h3 className="titleLifes2">We can change the world together</h3>
          <div className="blogPageSec">
            {posts.map((post, index) => {
              if (index % 2 === 0) {
                return <SingleBlogCard post={post} order="first" />;
              } else {
                return <SingleBlogCard post={post} order="last" />;
              }
            })}
          </div>
          <div className="titleLifeContainer2">
            <h1 className="titlelates">Latest Blog Posts</h1>
            <div className="blogPageSec2">
              {posts.map((post, index) => {
                if (index % 2 === 0) {
                  return <SingleColCard post={post} order="first" />;
                } else {
                  return <SingleColCard post={post} order="last" />;
                }
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Stories;

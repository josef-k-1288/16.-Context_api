import { useParams, Link, useHistory } from "react-router-dom";
import { useContext  } from 'react';
import api from './api/posts';
import DataContext from './context/DataContext';

const PostPage = () => {
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const history = useHistory();
    const post = posts.find(post => (post.id).toString() === id);

    const handleDelete = async (id) => {
        try {
          await api.delete(`/posts/${id}`); // brise post trajno
          const postsList = posts.filter(post => post.id !== id); // filtriramo post koji ima id u koji smo usli
          setPosts(postsList); // vracamo na listu postova koja nema taj id
          history.push('/'); // vracamo rutu na pocetnu stranicu (preko useHistory hook-a)
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }

    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage

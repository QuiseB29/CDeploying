// BlogPost.tsx
import React, { useState, useEffect } from 'react';

interface Comment {
  title: string;
  body: string;
}

const BlogPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  // Load comments from localStorage when the component mounts
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComment: Comment = { title, body };

    // Add the new comment to the list
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    // Store the updated comments in localStorage
    localStorage.setItem('comments', JSON.stringify(updatedComments));

    // Clear the input fields
    setTitle('');
    setBody('');
  };
  return (
    <div>
      <h2>Blog Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.title}</strong>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPost;

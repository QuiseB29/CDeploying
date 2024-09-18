import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import BlogPost from './components/BlogPost';

const App = () => {
  return (
    <div>
      <h1>Blog Post</h1>
      <BlogPost />
    </div>
  );
};

// Get the root element from the HTML and render the App component into it
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

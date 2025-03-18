import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    date: 'March 10, 2025',
    content: `
      React hooks are a powerful feature that allows functional components to have state and side effects. 
      In this article, we'll dive deep into how hooks like useState, useEffect, and custom hooks work.
      React hooks are a powerful feature that allows functional components to have state and side effects. 
      In this article, we'll dive deep into how hooks like useState, useEffect, and custom hooks work.
    `,
  },
  {
    id: 2,
    title: 'Mastering JavaScript ES6+ Features',
    date: 'February 25, 2025',
    content: `
      ES6+ has introduced numerous new features that make JavaScript more powerful and cleaner to write. 
      Features such as arrow functions, async/await, destructuring, and spread operators have become staples in modern JS development.
    `,
  },
  // Add more blog posts here
];

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <Typography variant="h4">Post not found</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        {post.title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#888', marginBottom: 2 }}>
        {post.date}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {post.content}
      </Typography>
      <Link to="/blog" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Back to Blog
        </Button>
      </Link>
    </Box>
  );
};

export default BlogPost;

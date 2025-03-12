import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    date: 'March 10, 2025',
    excerpt: 'React hooks are a powerful feature that allows functional components to have state and side effects...',
    image: 'https://via.placeholder.com/200', // Replace with your actual image URL
  },
  {
    id: 2,
    title: 'Mastering JavaScript ES6+ Features',
    date: 'February 25, 2025',
    excerpt: 'ES6+ has introduced numerous new features that make JavaScript more powerful and cleaner to write...',
    image: 'https://via.placeholder.com/200', // Replace with your actual image URL
  },
  // Add more blog posts here
];

const BlogList = () => {
  return (
    <Box sx={{ padding: 3, marginTop: 10 }}> {/* Increased marginTop here */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Latest Blog Posts
      </Typography>

      <Grid container spacing={3}>
        {blogPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: 3,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888', marginBottom: 2 }}>
                  {post.date}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', marginBottom: 2 }}>
                  {post.excerpt}
                </Typography>
                <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;


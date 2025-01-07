'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PostTable from './components/PostTable';
import PostDialog from './components/PostDialog';
import { Post, CreatePostInput } from './types/post';
import { getPosts, createPost, updatePost, deletePost } from './services/api';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedPost(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setDialogOpen(true);
  };

  const handleView = (post: Post) => {
    setSelectedPost(post);
    setViewDialogOpen(true);
  };

  const handleDelete = async (post: Post) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.id);
        setPosts(posts.filter((p) => p.id !== post.id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleSave = async (postData: CreatePostInput) => {
    try {
      if (selectedPost) {
        const updated = await updatePost({ ...postData, id: selectedPost.id });
        setPosts(posts.map((p) => (p.id === selectedPost.id ? updated : p)));
      } else {
        const created = await createPost(postData);
        setPosts([created, ...posts]);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'grey.100',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: 'white',
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
              }}
            >
              Posts Dashboard
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
              }}
            >
              Create Post
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <PostTable
              posts={posts}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </Paper>

        <PostDialog
          open={dialogOpen}
          post={selectedPost}
          onClose={() => setDialogOpen(false)}
          onSave={handleSave}
        />

        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: theme.shadows[5],
            },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              p: 2,
            }}
          >
            Post Details
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {selectedPost?.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {selectedPost?.body}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button
              onClick={() => setViewDialogOpen(false)}
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

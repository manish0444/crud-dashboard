'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  useTheme,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Post, CreatePostInput } from '../types/post';

interface PostDialogProps {
  open: boolean;
  post?: Post;
  onClose: () => void;
  onSave: (post: CreatePostInput) => void;
}

export default function PostDialog({ open, post, onClose, onSave }: PostDialogProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const theme = useTheme();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    } else {
      setTitle('');
      setBody('');
    }
    setTitleError('');
    setBodyError('');
  }, [post, open]);

  const validateForm = () => {
    let isValid = true;
    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError('');
    }
    if (!body.trim()) {
      setBodyError('Content is required');
      isValid = false;
    } else {
      setBodyError('');
    }
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        title: title.trim(),
        body: body.trim(),
        userId: post?.userId || 1,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          m: 0,
          p: 2,
          backgroundColor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" component="div">
          {post ? 'Edit Post' : 'Create New Post'}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!titleError}
            helperText={titleError}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            error={!!bodyError}
            helperText={bodyError}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          {post ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

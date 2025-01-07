'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  TablePagination,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { Post } from '../types/post';

interface PostTableProps {
  posts: Post[];
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export default function PostTable({ posts, onView, onEdit, onDelete }: PostTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visiblePosts = posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (isMobile) {
    return (
      <Box sx={{ width: '100%' }}>
        {visiblePosts.map((post) => (
          <Card key={post.id} sx={{ mb: 2, backgroundColor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                {post.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
                <Tooltip title="View">
                  <Button
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => onView(post)}
                  >
                    View
                  </Button>
                </Tooltip>
                <Tooltip title="Edit">
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(post)}
                  >
                    Edit
                  </Button>
                </Tooltip>
                <Tooltip title="Delete">
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(post)}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        ))}
        <TablePagination
          component="div"
          count={posts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          boxShadow: theme.shadows[2],
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visiblePosts.map((post) => (
              <TableRow
                key={post.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Tooltip title="View Details">
                      <IconButton
                        onClick={() => onView(post)}
                        size="small"
                        sx={{
                          color: 'info.main',
                          '&:hover': { backgroundColor: 'info.light' },
                        }}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Post">
                      <IconButton
                        onClick={() => onEdit(post)}
                        size="small"
                        sx={{
                          color: 'primary.main',
                          '&:hover': { backgroundColor: 'primary.light' },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Post">
                      <IconButton
                        onClick={() => onDelete(post)}
                        size="small"
                        sx={{
                          color: 'error.main',
                          '&:hover': { backgroundColor: 'error.light' },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={posts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
}

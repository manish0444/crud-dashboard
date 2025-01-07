import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: typeof document !== 'undefined' ? document.body : undefined,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: typeof document !== 'undefined' ? document.body : undefined,
      },
    },
    MuiModal: {
      defaultProps: {
        container: typeof document !== 'undefined' ? document.body : undefined,
      },
    },
  },
});

export default theme;

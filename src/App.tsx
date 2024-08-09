import { ApolloProvider } from '@apollo/client';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

import Guard from './components/auth/Guard';
import Header from './components/header/Header';
import SimpleSnackbar from './components/snackbar/SnackBar';
import client from './constants/apollo-client';
import router from './router';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Container>
          <Guard>
            <RouterProvider router={router} />
          </Guard>
        </Container>
        <SimpleSnackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

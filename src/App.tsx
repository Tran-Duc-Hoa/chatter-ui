import { ApolloProvider } from '@apollo/client';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

import Guard from './components/auth/Guard';
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
        <Container>
          <Guard>
            <RouterProvider router={router} />
          </Guard>
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

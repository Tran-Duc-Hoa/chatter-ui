import { ApolloProvider } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

import Guard from './components/auth/Guard';
import ChatList from './components/chat-list/ChatList';
import Header from './components/header/Header';
import SimpleSnackbar from './components/snackbar/SnackBar';
import client from './constants/apollo-client';
import { usePath } from './hooks/usePath';
import router from './router';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  const { path } = usePath();

  const showChatList = path === '/' || path.includes('chats');

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {showChatList ? (
            <Grid container sx={{ height: '100%', pb: '20px' }}>
              <Grid item md={3}>
                <ChatList />
              </Grid>
              <Grid item md={9}>
                <Routes />
              </Grid>
            </Grid>
          ) : (
            <Routes />
          )}
        </Guard>
        <SimpleSnackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

const Routes = () => {
  return (
    <Container sx={{ height: '100%', flex: 1 }}>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;

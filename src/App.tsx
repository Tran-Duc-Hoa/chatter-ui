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
          <Container maxWidth='xl' sx={{ height: '100%' }}>
            {showChatList ? (
              <Grid container spacing={5} sx={{ height: '100%', pb: '20px' }}>
                <Grid item xs={12} md={5} lg={4} xl={3}>
                  <ChatList />
                </Grid>
                <Grid item xs={12} md={7} lg={8} xl={9}>
                  <RouterProvider router={router} />
                </Grid>
              </Grid>
            ) : (
              <RouterProvider router={router} />
            )}
          </Container>
        </Guard>
        <SimpleSnackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

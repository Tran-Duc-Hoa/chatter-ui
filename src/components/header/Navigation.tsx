import { Box, Button } from '@mui/material';
import { Page } from 'src/interfaces/page.interface';
import router from 'src/router';

interface Props {
  pages: Page[];
}

const Navigation = ({ pages }: Props) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page) => (
        <Button key={page.path} onClick={() => router.navigate(page.path)} sx={{ my: 2, color: 'white', display: 'block' }}>
          {page.title}
        </Button>
      ))}
    </Box>
  );
};

export default Navigation;

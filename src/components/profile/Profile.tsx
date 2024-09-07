import UploadFile from '@mui/icons-material/UploadFile';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { snackVar } from 'src/constants/snack';

import { BACKEND_URL } from 'src/constants/urls';
import { useGetMe } from 'src/hooks/useGetMe';

const Profile = () => {
  const { data } = useGetMe();

  const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = event.target.files?.[0];
      if (file) {
        formData.append('file', file);
        const res = await fetch(`${BACKEND_URL}/users/image`, {
          method: 'POST',
          body: formData
        });

        if (!res.ok) throw new Error('Image upload failed.');
        snackVar({ message: 'Image uploaded.', type: 'success' });
      }
    } catch (error) {
      snackVar({ message: 'Error uploading file.', type: 'error' });
    }
  };

  return (
    <Stack spacing={6} sx={{ marginTop: '2.5rem', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant='h1'>{data?.me.username}</Typography>
      <Avatar sx={{ width: 256, height: 256 }} />
      <Button component='label' variant='contained' size='large' startIcon={<UploadFile />}>
        Upload Image
        <input type='file' hidden onChange={handleUploadFile} />
      </Button>
    </Stack>
  );
};

export default Profile;

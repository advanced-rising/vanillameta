import React from 'react';
import { Button, Stack } from '@mui/material';

function ConfirmButton(props) {
  return (
    <Stack direction="row" component="ul" spacing={2} p={0} m={1}>
      <Button variant="outlined" sx={{ minWidth: 100 }}>
        취소
      </Button>
      <Button variant="contained" sx={{ minWidth: 100 }}>
        저장
      </Button>
    </Stack>
  );
}

export default ConfirmButton;

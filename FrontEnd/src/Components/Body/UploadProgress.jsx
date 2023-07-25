import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

function UploadProgress({ uploading, progress }) {
  return (
    <div>
      {uploading && (
        <div>
          <CircularProgress variant="determinate" value={progress} />
          <Typography variant="body2" component="div">{`${progress}% Uploaded`}</Typography>
        </div>
      )}
    </div>
  );
};

export default UploadProgress
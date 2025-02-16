import { useDropzone } from "react-dropzone";
import { Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import Iconify from "./Iconify";

type DropZoneType = {
  onDrop: (data) => void;
};

const DropZoneCustom: React.FC<DropZoneType> = ({ onDrop }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrop = useCallback(
    (acceptedFiles: any[]) => {
      console.log(acceptedFiles, "123");
      if (acceptedFiles.length !== 0) {
        const file = acceptedFiles[0];
        onDrop(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onDrop],
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: handleDrop,
  });

  const { ref, ...rootProps } = getRootProps();

  return (
    <Stack
      sx={{
        maxHeight: "600px",
        width: "100%",
        padding: "12px",
      }}
      ref={ref}
    >
      <div {...getRootProps()}>
        {acceptedFiles.length === 0 && (
          <Stack direction="column" alignItems="center">
            <input {...getInputProps()} height="100%" width="100%" />
            <Iconify icon="cuida:upload-outline" fontSize="300px" />
            <Typography variant="subtitle1">
              Drag drop some files here, or click to select files
            </Typography>
          </Stack>
        )}

        {acceptedFiles.length > 0 && (
          <div>
            <Typography variant="h6">{acceptedFiles[0].name}</Typography>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  objectFit: "contain",
                  maxHeight: "600px",
                }}
              />
            )}
          </div>
        )}
      </div>
    </Stack>
  );
};

export default React.memo(DropZoneCustom);

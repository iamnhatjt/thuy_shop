import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DropZone from "../../../../layouts/sharedComponents/DropZone";
import React, { useState } from "react";
import { useAdminBanner } from "../../../../store/banner/selectors";

const BannerAddingPopup = () => {
  const [file, setFile] = useState<any>();
  const { isOpenAddingPopup, onToggleOpenBanner, onAddingBanner } =
    useAdminBanner();

  return (
    <Dialog open={isOpenAddingPopup} maxWidth="md" fullWidth>
      <DialogTitle align="center">Adding Banner</DialogTitle>
      <DialogContent>
        <DropZone
          onDrop={(data) => {
            if (!!data) {
              const reader = new FileReader();
              reader.onload = () => {
                setFile(reader.result);
              };
              reader.readAsArrayBuffer(data);
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={() => onToggleOpenBanner(false)}>
          cancel
        </Button>
        <Button
          size="large"
          color="success"
          variant="contained"
          onClick={() => {
            const form = new FormData();
            if (!!file) {
              form.append("file", new Blob([file]));
              onAddingBanner(form);
            }
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(BannerAddingPopup);

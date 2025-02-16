import React, { useState } from "react";
import BannerTable from "./components/BannerTable";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DropZone from "../../../layouts/sharedComponents/DropZone";
import { useAddBannerMutation } from "../../../store/banner/bannerApiSlice";

const AdminBanner: React.FC = () => {
  const [addbanner] = useAddBannerMutation();
  const [file, setFile] = useState<any>();

  return (
    <>
      <Button variant="contained">Adding</Button>
      <BannerTable />
      <Dialog open={true} maxWidth="md" fullWidth>
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
          <Button variant="text">cancel</Button>
          <Button
            size="large"
            color="success"
            variant="contained"
            onClick={() => {
              const form = new FormData();
              if (!!file) {
                form.append("file", new Blob([file]));
                addbanner(form);
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(AdminBanner);

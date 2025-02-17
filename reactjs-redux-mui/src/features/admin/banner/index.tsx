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
import { useAdminBanner } from "../../../store/banner/selectors";
import { onToggleAddingBannerPopup } from "../../../store/banner/reducers";
import { useAppDispatch } from "../../../store/hooks";

const AdminBanner: React.FC = () => {
  const [addbanner] = useAddBannerMutation();
  const [file, setFile] = useState<any>();

  const { isOpenAddingPopup, onAddingBanner } = useAdminBanner();
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => dispatch(onToggleAddingBannerPopup(true))}
      >
        Adding
      </Button>
      <BannerTable />
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
          <Button
            variant="text"
            onClick={() => dispatch(onToggleAddingBannerPopup(false))}
          >
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

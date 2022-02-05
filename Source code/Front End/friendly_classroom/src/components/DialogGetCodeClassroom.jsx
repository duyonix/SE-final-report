import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

function DialogGetCodeClassroom(props) {
  const { openGetCodeDialog, handleCloseGetCodeDialog, classInfo } = props;
  const code = classInfo.code;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
    handleCloseGetCodeDialog();
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openGetCodeDialog}
        onClose={handleCloseGetCodeDialog}
      >
        <DialogTitle sx={{ pb: 0 }}>Lớp học {classInfo.name}</DialogTitle>

        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Mã lớp học"
              value={code}
              // variant="filled"
              InputProps={{
                readOnly: true,
              }}
              type="text"
              name="name"
              autoComplete="off"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "0 24px 20px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseGetCodeDialog}
          >
            Hủy
          </Button>
          <Button variant="contained" onClick={copyCodeToClipboard}>
            Sao chép mã
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogGetCodeClassroom;

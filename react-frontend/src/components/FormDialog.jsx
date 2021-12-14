import React from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const FormDialog = ({ isOpen, data, onChange, onClose, onSubmit }) => {
  const { id, firstName, lastName, emailId } = data;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {<DialogTitle id="alert-dialog-title">{id ? "Update Employee" : "Create New Employee"}</DialogTitle>}
        <DialogContent>
          <form>
            <TextField
              id="firstName"
              value={firstName}
              onChange={(e) => onChange(e)}
              placeholder="Enter First Name"
              label="First Name"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="lastName"
              value={lastName}
              onChange={(e) => onChange(e)}
              placeholder="Enter Last Name"
              label="Last Name"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="emailId"
              value={emailId}
              onChange={(e) => onChange(e)}
              placeholder="Enter Email"
              label="Email"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button color="primary" onClick={() => onSubmit()} variant="contained">
            {id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;

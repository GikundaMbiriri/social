import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataAction";

const styles = {
  deleteButton: {
    left: "50%",
    top: "10%",
  },
};
class DeleteScream extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);

    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <MyButton
          tip="Delete Scream"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this scream?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};
export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);

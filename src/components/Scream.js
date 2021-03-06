import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataAction";
import MyButton from "../util/MyButton";
import { Chat as ChatIcon } from "@material-ui/icons"; //
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
    '@media(maxWidth: 780px)' : {
      width: '80%'
    }
    
  },
  image: {
    width:"70px",
    height:"70px",
    objectFit:"cover"
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};
class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    )
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userhandle,
        screamId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton tip="Undo like" onClick={this.unlikeScream}>
        <Favorite color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    const deleteButton =
      authenticated && userhandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
    return (
      <>
        <Card className={classes.card}  >
         
          <CardMedia
            src={userImage}
            title="Profile image"
            className={classes.image}
            component="img"
          />
          <CardContent className={classes.content}>
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userhandle}`}
            >
              {userhandle}
            </Typography>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            {likeButton}
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
            <ScreamDialog screamId={screamId} userhandle={userhandle} />
          </CardContent>
        </Card>
      </>
    );
  }
}
Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  likeScream,
  unlikeScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));

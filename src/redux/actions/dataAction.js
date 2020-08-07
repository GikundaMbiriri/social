import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  POST_SCREAM,
  SET_SCREAM,
  STOP_LOADING_UI,
  CLEAR_DATA,
} from "../types";
import axios from "axios";
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("https://us-central1-peter-87987.cloudfunctions.net/api/screams")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: {},
      });
    });
};
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(
      `https://us-central1-peter-87987.cloudfunctions.net/api/scream/${screamId}/like`
    )
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(
      `https://us-central1-peter-87987.cloudfunctions.net/api/scream/${screamId}`
    )
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch((err) => console.log(err));
};
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-peter-87987.cloudfunctions.net/api/scream",
      newScream
    )
    .then((res) => {
      dispatch({ type: POST_SCREAM, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
export const clearData = () => (dispatch) => {
  dispatch({ type: CLEAR_DATA });
};
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(
      `https://us-central1-peter-87987.cloudfunctions.net/api/scream/${screamId}`
    )
    .then((res) => {
      dispatch({ type: SET_SCREAM, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

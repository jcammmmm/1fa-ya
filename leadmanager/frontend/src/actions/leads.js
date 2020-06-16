import axios from "axios";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

// Get all leads
export const getLeads = () => dispatch => {
  axios.get("/api/leads").then(res => {
    dispatch({
      type: GET_LEADS,
      payload: res.data
    })
  }).catch(err => console.log(err));
}

// Delete lead
export const deleteLead = (id) => dispatch => {
  axios.delete(`/api/leads/${id}/`).then(res => {
    dispatch({
      type: DELETE_LEAD,
      payload: id
    })
  }).catch(err => console.log(err));
}

// Add lead
export const addLead = (lead) => dispatch => {
  axios.post("/api/leads/", lead).then(res => {
    dispatch({
      type: ADD_LEAD,
      payload: res.data
    })
  }).catch(err => console.log(err));
}
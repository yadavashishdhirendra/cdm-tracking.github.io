import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const createTaskReducer = createReducer(initialState, {
  // LOGIN
  CreateTaskRequest: (state) => {
    state.loading = true;
  },
  CreateTaskSuccess: (state, action) => {
    state.loading = false;
    state.task = action.payload;
  },
  CreateTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  CreateTaskReset: (state) => {
    state.loading = false;
    state.task = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const getSingleTask = createReducer(initialState, {
  // LOGIN
  getsingleTaskRequest: (state) => {
    state.loading = true;
  },
  getsingleTaskSuccess: (state, action) => {
    state.loading = false;
    state.task = action.payload;
  },
  getsingleTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const addComment = createReducer(initialState, {
  // LOGIN
  AddCommentTaskRequest: (state) => {
    state.loading = true;
  },
  AddCommentTaskSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  AddCommentTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  AddCommentTaskReset: (state) => {
    state.loading = false;
    state.message = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const updateTaskStatus = createReducer(initialState, {
  // LOGIN
  UpdateTaskStatusRequest: (state) => {
    state.loading = true;
  },
  UpdateTaskStatusSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateTaskStatusFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateTaskStatusReset: (state) => {
    state.loading = false;
    state.message = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const updateProductiveTime = createReducer(initialState, {
  // LOGIN
  UpdateTaskProductiveHoursRequest: (state) => {
    state.loading = true;
  },
  UpdateTaskProductiveHoursSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateTaskProductiveHoursFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateTaskProductiveHoursReset: (state) => {
    state.loading = false;
    state.message = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const updateProductiveTimeEnd = createReducer(initialState, {
  // LOGIN
  UpdateTaskProductiveHoursEndRequest: (state) => {
    state.loading = true;
  },
  UpdateTaskProductiveHoursEndSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateTaskProductiveHoursEndFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateTaskProductiveHoursEndReset: (state) => {
    state.loading = false;
    state.message = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const getProductiveHours = createReducer(initialState, {
  // LOGIN
  getProductiveHoursRequest: (state) => {
    state.loading = true;
  },
  getProductiveHoursSuccess: (state, action) => {
    state.loading = false;
    state.starttime = action.payload;
  },
  getProductiveHoursFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const getProductiveHoursEnd = createReducer(initialState, {
  // LOGIN
  getProductiveHoursEndRequest: (state) => {
    state.loading = true;
  },
  getProductiveHoursEndSuccess: (state, action) => {
    state.loading = false;
    state.endtime = action.payload;
  },
  getProductiveHoursEndFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const getDelayedTask = createReducer(initialState, {
  // LOGIN
  getDelayedTaskRequest: (state) => {
    state.loading = true;
  },
  getDelayedTaskSuccess: (state, action) => {
    state.loading = false;
    state.task = action.payload;
  },
  getDelayedTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const addMinutes = createReducer(initialState, {
  // LOGIN
  addMinutesInTaskRequest: (state) => {
    state.loading = true;
  },
  addMinutesInTaskSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addMinutesInTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  addMinutesInTaskReset: (state) => {
    state.loading = false;
    state.message = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const addHour = createReducer(initialState, {
  // LOGIN
  addHourInTaskRequest: (state) => {
    state.loading = true;
  },
  addHourInTaskSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addHourInTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  addHourInTaskReset: (state) => {
    state.loading = false;
    state.message = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

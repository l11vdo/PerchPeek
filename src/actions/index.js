import store from '../store'

import { POST_ACTIVITY } from './types';
import { saveActivities } from '../localStorage'

const activityPost = (activity) => ({
  type: POST_ACTIVITY,
  activity
});

export const postActivity = (activity) => dispatch => {
  dispatch(activityPost(activity));
  saveActivities(store.getState().app.activities)
}

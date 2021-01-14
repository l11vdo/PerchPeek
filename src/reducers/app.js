import { POST_ACTIVITY } from '../actions/types';
import { loadActivities } from '../localStorage';

const initialState = {
  user: { first_name: "Lyndon", last_name: "Sutcliffe" },
  mover: { first_name: "Oliver", last_name: "Markham", move_country: "Germany", move_city: "Berlin", image: "unknown.jpg"},
  activities: loadActivities()
};
export const app = (state = initialState, action) => {
  switch (action.type) {
    case POST_ACTIVITY:
      return {
        ...state,
        activities: [action.activity, ...state.activities]
      }    
     default:
      return state;
  }
}
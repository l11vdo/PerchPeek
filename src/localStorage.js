export const loadActivities = () => {
  try {
    const serialized = localStorage.getItem('activities');
    if (serialized === null) {
      return [];
    }
    return JSON.parse(serialized);
  } catch (err) {
    return [];
  }
}; 

export const saveActivities = (activities) => {
  try {
    const serialized = JSON.stringify(activities);
    localStorage.setItem('activities', serialized);
  } catch(e) {
    alert(e.message)
  }
};
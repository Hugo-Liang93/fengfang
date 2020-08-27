export default {
  SET_ACTIVITY_LIST (state, activityList) {
    state.activityList = activityList
  },
  REMOV_ACTIVITY (state, activityId) {
    const Index = state.activityList.findIndex((u) => u.id === activityId)
    state.activityList.splice(Index, 1)
  },
  TOTOP_ACTIVITY_LIST (state, activityId) {
    const Index = state.activityList.findIndex((u) => u.id === activityId)
    state.activityList.unshift(state.activityList.splice(Index, 1)[0])
  }
}
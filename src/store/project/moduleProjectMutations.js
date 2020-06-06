export default {
  SET_PROJECT_LIST (state, projectList) {
    state.projectList = projectList
  },
  REMOV_PROJECT (state, projectId) {
    console.log(state.projectList)
    const projectIndex = state.projectList.findIndex((u) => u.project_id === projectId)
    state.projectList.splice(projectIndex, 1)
    console.log(state.projectList)
  }
}
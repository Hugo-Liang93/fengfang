export default {
  SET_PROJECT_LIST (state, projectList) {
    state.projectList = projectList
  },
  SET_DETAIL_LIST (state, detailList) {
    state.detailList = detailList
  },
  REMOV_PROJECT (state, projectId) {
    const projectIndex = state.projectList.findIndex((u) => u.project_id === projectId)
    state.projectList.splice(projectIndex, 1)
  },
  REMOV_DETAIL (state, detailId) {
    const DetailIndex = state.detailList.findIndex((u) => u.id === detailId)
    state.detailList.splice(DetailIndex, 1)
  }
}
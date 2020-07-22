<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="opAccess('edit')" />
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="opAccess('del')" />
    </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  methods: {
    opAccess (opType) {
      if (this.$acl.check('isAdmin')) {
        if (opType === 'edit') {
          this.editRecord()
        } else this.confirmDeleteRecord()
      } else {
        this.$vs.notify({
          title: 'Error',
          text: '没有该操作权限',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    },
    editRecord () {
      this.$router.push(`/activity/activity-edit/${this.params.data.id}`).catch(() => {})
      /*
              Below line will be for actual product
              Currently it's commented due to demo purpose - Above url is for demo purpose

              this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
            */
    },
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: '确定删除？',
        text: `活动名称为 "${this.params.data.title}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$store.dispatch('activity/removeActivity', this.params.data.id).then((response) => {
        if (response.data === true) {
          this.showDeleteSuccess()
        } else {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: '删除失败',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        }
      }).catch(error => {
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Error',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
      //   .then(()   => { this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: '项目已经删除',
        text: '已经成功删除项目信息'
      })
    }
  }
}
</script>

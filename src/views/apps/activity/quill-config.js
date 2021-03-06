/*富文本编辑图片上传配置*/
const uploadConfig = {
  action:  '/api/user-management/upload/avatar/1',  // 必填参数 图片上传地址
  methods: 'POST',  // 必填参数 图片上传方式
  token: localStorage.getItem('accessToken'),  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: 'file',  // 必填参数 文件的参数名
  size: 500,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'  // 可选 可上传的图片格式
}

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{'header': 1}, {'header': 2}],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],
  [{'indent': '-1'}, {'indent': '+1'}],
  [{'direction': 'rtl'}],
  [{'size': ['small', false, 'large', 'huge']}],
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'color': []}, {'background': []}],
  [{'font': []}],
  [{'align': []}],
  ['clean'],
  ['image']
]
const handlers1 = {
  image: function image () {
    const self = this
    let fileInput = this.container.querySelector('input.ql-image[type=file]')
    if (fileInput === null) {
      fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute('name', uploadConfig.name)
      }
      // 可设置上传图片的格式
      fileInput.setAttribute('accept', uploadConfig.accept)
      fileInput.classList.add('ql-image')
      // 监听选择文件
      fileInput.addEventListener('change', function () {
        // 创建formData
        const formData = new FormData()
        formData.append(uploadConfig.name, fileInput.files[0])
        formData.append('object', 'product')
        // 如果需要token且存在token

        // 图片上传
        const xhr = new XMLHttpRequest()
        xhr.open(uploadConfig.methods, uploadConfig.action, true)
        if (uploadConfig.token) {
          xhr.setRequestHeader('Authorization', `Bearer ${uploadConfig.token}`)
        }
        // 上传数据成功，会触发
        xhr.onload = function (e) {
          console.log(e)
          if (xhr.status === 200) {
            const res = xhr.responseText
            const length = self.quill.getSelection(true).index
            console.log(res)
            //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
            self.quill.insertEmbed(length, 'image', res)
            self.quill.setSelection(length + 1)
          }
          fileInput.value = ''
        }
        // 开始上传数据
        xhr.upload.onloadstart = function (e) {
          fileInput.value = ''
          console.log(e)
        }
        // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
        xhr.upload.onerror = function (e) {
          console.log(e)
        }
        // 上传数据完成（成功或者失败）时会触发
        xhr.upload.onloadend = function (e) {
          console.log('上传结束')
          console.log(e)
        }
        xhr.send(formData)
      })
      this.container.appendChild(fileInput)
    }
    fileInput.click()
  }
}

export default {
  placeholder: '',
  theme: 'snow',  // 主题
  modules: {
    toolbar: {
      container: toolOptions,  // 工具栏选项
      handlers: handlers1  // 事件重写
    }
  }
}

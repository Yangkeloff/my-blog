<template>
  <div class="login_page">
    <el-form :model="adminInfo" :rules="rules" ref="admin" label-width="80px">
      <el-form-item label="用户名" prop="admin_name">
        <el-input v-model="adminInfo.admin_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="admin_pwd">
        <el-input v-model="adminInfo.admin_pwd" placeholder="长度在5到12字符之间" show-password clearable></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary" @click="submitForm('admin')">登录</el-button>
        <el-button @click="resetForm('admin')">重置</el-button>
        <router-link to="/reg">注册</router-link>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminInfo: {
        admin_name: '',
        admin_pwd: '',
        token: ''
      },
      rules: {
        admin_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        admin_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async login() {
      let res = await this.$http.api_admin_login(this.adminInfo) 
      let {code, msg, data = {}} = res.data
      this.$message(msg)
      if(code == 200) {
        this.$store.commit('saveAdminInfo', {
          admin_name: data.admin_name,
          token: data.token
        })
        this.$router.push('/')
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            this.$alert('error')
            return false
          }
        })
      },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
}
</script>

<style lang="stylus">
.login_page
  width 400px
  margin 0 auto 
  margin-top 300px
  .buttons
   text-align center
   .el-button
    margin 0 20px
   a
    float right
</style>

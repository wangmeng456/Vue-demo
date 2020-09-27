<template lang="pug">
.container
  el-form.demo-ruleForm(
    :model="ruleForm",
    :rules="rules",
    ref="ruleForm",
    label-width="100px"
  )
    el-form-item(label="名称", prop="name")
      el-input(v-model="ruleForm.name", placeHolder="请输入名称")
    el-form-item(label="密码", prop="pwd")
      el-input(type="password", v-model="ruleForm.pwd", placeHolder="请输入密码")
    el-form-item
      el-button(type="primary", @click="submitForm('ruleForm')") 登陆
      el-button(@click="resetForm('ruleForm')") 重置
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/,
            message:
              "密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
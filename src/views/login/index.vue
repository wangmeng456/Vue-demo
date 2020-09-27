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
      el-input(
        type="password",
        v-model="ruleForm.pwd",
        autocomplete="off",
        placeHolder="请输入密码"
      )
    el-form-item(label="确认密码", prop="repwd")
      el-input(
        type="password",
        v-model="ruleForm.repwd",
        autocomplete="off",
        placeHolder="确认密码"
      )
    el-form-item(label="手机号", prop="mobile")
      el-input(
        v-model="ruleForm.mobile",
        autocomplete="off",
        placeHolder="请输入手机号"
      )
    el-form-item(label="邮箱", prop="email")
      el-input(
        v-model="ruleForm.email",
        placeHolder="请输入邮箱"
      )
    el-form-item
      el-button(type="primary", @click="submitForm('ruleForm')") 登陆
      el-button(@click="resetForm('ruleForm')") 重置
</template>
<script>
import {
  isvalidMobile,
  isvalidPwd,
  isvalidName,
  isvalidEmail,
} from "@/utils/validate.js";
export default {
  name: "login",
  data() {
    var validatorPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!isvalidPwd(value)) {
        callback(
          new Error(
            "密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位"
          )
        );
      } else {
        if (this.ruleForm.repwd !== "") {
          this.$refs.ruleForm.validateField("repwd");
        }
        callback();
      }
    };
    var validatorRepwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    var validatorMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!isvalidMobile(value)) {
        callback(new Error("请填写正确的手机号码"));
      }
    };
    var validatorName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!isvalidName(value)) {
        callback(
          new Error(
            "用户名要求数字、字母、下划线的组合 数字和字母必须存在 长度为4-15个字符"
          )
        );
      }
    };
    var validatorEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!isvalidEmail(value)) {
        callback(new Error("必须为正确的邮箱地址"));
      }
    };
    return {
      ruleForm: {
        name: "",
        pwd: "",
        repwd: "",
        mobile: "",
        email: "",
      },
      rules: {
        name: [{ required: true, validator: validatorName, trigger: "blur" }],
        pwd: [{ required: true, validator: validatorPwd, trigger: "blur" }],
        repwd: [{ required: true, validator: validatorRepwd, trigger: "blur" }],
        mobile: [{ required: true, validator: validatorMobile, trigger: "blur" }],
        email: [{ required: true, validator: validatorEmail, trigger: "blur" }]
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
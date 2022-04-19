<template>
  <div>
    <div class="sidenav">
      <div class="login-main-text">
        <h2>
          Application<br />
          Login Page
        </h2>
        <p>Login or register from here to access.</p>
      </div>
    </div>
    <div class="main">
      <div class="col-md-6 col-sm-12">
        <div class="login-form">
          <form>
            <div class="form-group">
              <label>User Name</label>
              <input type="text" class="form-control" placeholder="User Name" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-black">
              <router-link to="/home">Login</router-link>
            </button>
            <button type="submit" class="btn btn-secondary">Register</button>
          </form>
          <button class="btn btn-secondary" @click="getList()">getList Test</button>
          <button class="btn btn-secondary" @click="getUser()">getUser Test</button>
          <button class="btn btn-secondary" @click="createUser()">create Test</button>
          <button class="btn btn-secondary" @click="editUser()">edit Test</button>
          <button class="btn btn-secondary" @click="deleteUser()">dekete Test</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { Data } from '@/types/TestType';
import User from '@/store/modules/TestModule';

@Component
export default class LoginPage extends Vue {
  user = getModule(User, this.$store);
  data: Data = {
    avatar: 'test',
    email: 'test',
    id: 2,
    first_name: 'test',
    last_name: 'test',
  };
  getList() {
    this.user.getUserListAction(1);
    this.user.getUserListAction(2);
  }
  getUser() {
    this.user.getUserAction(1);
  }
  createUser() {
    this.user.createUserAction(this.data);
    // this.user.postTest(data);
  }
  editUser() {
    this.user.editUserAction(this.data);
  }
  deleteUser() {
    this.user.deleteUserAction(2);
  }
}
</script>
<style scoped>
body {
  font-family: 'Lato', sans-serif;
}

.main-head {
  height: 150px;
  background: #fff;
}

.sidenav {
  height: 100%;
  background-color: #000;
  overflow-x: hidden;
  padding-top: 20px;
}

.main {
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (max-width: 450px) {
  .login-form {
    margin-top: 10%;
  }

  .register-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 40%;
  }

  .sidenav {
    width: 40%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .login-form {
    margin-top: 80%;
  }

  .register-form {
    margin-top: 20%;
  }
}

.login-main-text {
  margin-top: 20%;
  padding: 60px;
  color: #fff;
}

.login-main-text h2 {
  font-weight: 300;
}

.btn-black {
  background-color: #000 !important;
  color: #fff;
}
</style>
>

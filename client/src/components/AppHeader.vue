<template>
  <header>
    <div>
      <router-link to="/">EXAM SHOP</router-link>
    </div>
    <nav>
      <ul>
        <template v-if="!isLoggedIn">
          <li>
            <router-link to="/shop">Shop</router-link>
          </li>
          <li>
            <router-link to="/login">Login</router-link>
          </li>
          <li>
            <router-link to="/register">Register</router-link>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/inventory">Inventory</router-link>
          </li>
          <li>
            <router-link to="/shop">Shop</router-link>
          </li>
          <li>
            <router-link to="/sell">Sell</router-link>
          </li>
          <li id="welcomeLink">
            <a to="#">Welcome {{username}}</a>
          </li>
          <li>
            <a @click="handleLogout" to="/logout">Logout</a>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
import UserHandler from '../handlers/user';
import EventBus from '../EventBus';

export default {
  name: "AppHeader",
  mounted(){
    EventBus.$on('login', (username) => {
      this.username = username;
      this.isLoggedIn = true;
    });
    EventBus.$on('logout', () => {
      this.username = '';
      this.isLoggedIn = false;
      this.$vToastify.success({title:" ", body: 'Successfully logged out!'});
    });
  },
  data(){
    return{
      username: this.$cookies.get('username'),
      isLoggedIn: this.$cookies.get('token')
    }
  },
  methods:{
    handleLogout(){
      UserHandler.logout();
      this.$forceUpdate();
      if(this.$route.path !== '/')
      this.$router.push('/');
    },
  },
};
</script>

<style>
/* css for the header */
body #root .App > header {
  z-index: 2;
  display: flex;
}

body #root .App > header {
  font-size: 1rem;
  position: fixed;
  width: 100%;
  left: 0px;
  top: 0px;
}

body #root .App > header {
  font-weight: bold;
  /* padding: 1rem 3rem; */
  justify-content: space-between;

  color: white;
  background: #070709;
}

/* css for nav */
body #root .App > header > nav > ul {
  display: flex;
}

body #root .App > header > nav > ul {
  margin: 0%;
  padding-left: 0%;
  list-style-type: none;
}

body #root .App > header > nav > ul li {
  cursor: pointer;
  padding: 1.3rem;
}

body #root .App > header > nav > ul #welcomeLink {
  background: rgba(255, 255, 255, 0.911);
  color: black;
}

body #root .App > header > nav > ul #welcomeLink a {
  color: black;
}

body #root .App > header > nav > ul li a {
  color: white;
  text-decoration: none;
}

body #root .App > header > nav > ul li a:hover {
  color: gray;
}

/* css for app logo */
body #root .App > header > div {
  margin: 0%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.3rem;
  cursor: pointer;
}

body #root .App > header > div > a {
  padding: 0%;
  margin: 0%;

  text-decoration: none;
  color: white;
}
</style>
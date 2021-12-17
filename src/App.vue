<template>
  <div class="nav-container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="isAuthicated"
          >ReciclajeApp</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="
            navbar-collapse
            collapse
            d-flex-sm
            justify-content-end
            align-items-center
          "
          id="navbarColor01"
          style=""
        >
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link
                to="/user/home"
                class="nav-link active"
                v-if="is_auth"
                >Inicio
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/updateUsuario" class="nav-link" v-if="is_auth"
                >Actualizar Usuario</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/user/list" class="nav-link" v-if="is_auth"
                >Lista citas</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                to="#"
                class="nav-link"
                v-if="is_auth"
                @click="logOut"
                >Cerrar Sesión</router-link
              >
            </li>

            <li class="nav-item">
              <router-link to="/user/logIn" class="nav-link" v-if="!is_auth"
                >Iniciar Sesión</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/user/signUp" class="nav-link" v-if="!is_auth"
                >Registrarse</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div class="main-component">
    <router-view
      @completedLogIn="completedLogIn"
      @completedSignUp="completedSignUp"
      @logOut="logOut"
    >
    </router-view>
  </div>
  <div
    class="footer bg-primary p-3 text-sm-center text-md-center text-lg-center"
  >
    <h2 class="h5">Misión Tic 2022 - ReciclajeApp</h2>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      is_auth: false,
    };
  },
  components: {},
  computed: {
    isAuthicated() {
      if (this.is_auth) {
        return "/user/home";
      }
      return "/user/logIn";
    },
  },
  methods: {
    verifyAuth() {
      this.is_auth = localStorage.getItem("isAuth") || false;
      if (this.is_auth == false) this.$router.push({ name: "LogIn" });
      else this.$router.push({ name: "home" });
    },
    logOut() {
      localStorage.clear();
      this.$swal.fire({
        position: "center",
        icon: "success",
        title: "Su sesion ha finalizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      this.verifyAuth();
    },

    completedLogIn(data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      this.$swal.fire({
        position: "center",
        icon: "success",
        title: "Autenticacion Exitosa",
        showConfirmButton: false,
        timer: 1500,
      });
      this.verifyAuth();
    },
    completedSignUp(data) {
      this.$swal.fire({
        position: "center",
        icon: "success",
        title: "Registro Exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      this.completedLogIn(data);
    },
  },
  created() {
    this.verifyAuth();
  },
};
</script>

<style scoped>
.main-component {
  height: calc(100vh - 120px);
}
.footer {
  position: relative;
  width: 100%;
  bottom: 0;
}
</style>
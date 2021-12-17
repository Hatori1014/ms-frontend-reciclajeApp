<template>
  <div class="container d-flex flex-column justify-content-center h-100">
    <div
      class="
        row
        justify-content-sm-center
        justify-content-md-center
        justify-content-lg-center
        align-items-center
        justify-content-center
      "
    >
      <h2 class="h2">Login</h2>
    </div>

    <div
      class="
        row
        justify-content-sm-center
        justify-content-md-center
        justify-content-lg-center
        align-items-center
        justify-content-center
      "
    >
      <div class="col-sm-1 col-md-3 col-lg-4"></div>
      <div class="col-sm-10 col-md-6 col-lg-4 custom-col">
        <form @submit.prevent="processLogInUser">
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              v-model="user.username"
              placeholder="Username"
              required
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              type="password"
              v-model="user.password"
              placeholder="Password"
              required
            />
          </div>
          <div class="form-group">
            <button class="btn btn-success form-control mt-4" type="submit">
              Iniciar Sesion
            </button>
          </div>
        </form>
      </div>
      <div class="col-sm-1 col-md-3 col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "LogIn",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async processLogInUser() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($credenciales: IngresoCredenciales!) {
              iniciarSesion(credenciales: $credenciales) {
                refresh
                access
              }
            }
          `,
          variables: {
            credenciales: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.iniciarSesion.access,
            token_refresh: result.data.iniciarSesion.refresh,
          };
          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          this.$swal.fire({
            position: "center",
            icon: "error",
            title: "Credenciales incorrectas, por favor valide nuevamente",
            showConfirmButton: false,
            timer: 2500,
          });
        });
    },
  },
};
</script>
<style scoped>
.custom-col {
  border-radius: 1rem;
  width: 30%;
  padding: 3rem;
  background: rgba(41, 212, 69, 0.253);
}
</style>


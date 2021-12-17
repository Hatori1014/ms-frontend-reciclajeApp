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
      <h2 class="h2">Registro de usuario</h2>
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
        <form @submit.prevent="processSignUp">
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
            <input
              class="form-control"
              type="text"
              v-model="user.name"
              placeholder="Nombre"
              required
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              type="email"
              v-model="user.email"
              placeholder="Correo Electrónico"
              required
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              type="phone"
              v-model="user.phone"
              placeholder="Teléfono o Celular"
              required
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              type="address"
              v-model="user.address"
              placeholder="Dirección"
              required
            />
          </div>
          <div class="form-group">
            <button class="btn btn-success form-control mt-4" type="submit">
              Crear Cuenta
            </button>
            <router-link
              class="btn btn-danger form-control mt-4"
              to="/user/logIn"
            >
              Cancelar
            </router-link>
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
  name: "SignUp",
  data() {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        address: "",
      },
    };
  },
  methods: {
    async processSignUp() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($usuario: registroUsuarioInput!) {
              registroUsuario(usuario: $usuario) {
                refresh
                access
              }
            }
          `,
          variables: {
            usuario: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.registroUsuario.access,
            token_refresh: result.data.registroUsuario.refresh,
          };
          this.$emit("completedSignUp", dataLogIn);
        })
        .catch((error) => {
          alert("ERROR: Fallo en el registro.", error);
        });
    },
  },
};
</script>

<style scoped>

</style>

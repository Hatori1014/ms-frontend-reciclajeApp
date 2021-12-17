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
      <h2 class="h2">Actualizar datos de usuario</h2>
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
        <form @submit.prevent="UsuarioActualizado">
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              v-model="user.username"
              placeholder="Username"
              disabled
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
              Actualizar
            </button>
            <router-link
              class="btn btn-danger form-control mt-4"
              to="/user/home"
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
import jwt_decode from "jwt-decode";

export default {
  name: "UpdateUsuario",
  data() {
    return {
      idUsuario: jwt_decode(localStorage.getItem("token_refresh")).user_id,
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

  beforeMount() {
    this.chargeDataUser();
  },

  methods: {
    async UsuarioActualizado() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation (
              $idUsuario: Int!
              $registroUsuario: registroUsuarioInput!
            ) {
              actualizarUsuario(
                idUsuario: $idUsuario
                registroUsuario: $registroUsuario
              ) {
                username
                password
                name
                email
                phone
                address
              }
            }
          `,
          variables: {
            idUsuario: this.idUsuario,
            registroUsuario: {
              username: this.user.username,
              password: this.user.password,
              name: this.user.name,
              email: this.user.email,
              phone: this.user.phone,
              address: this.user.address,
            },
          },
        })
        .then((data) => {
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "El usuario ha sido actualizado correctamente.",
            showConfirmButton: false,
            timer: 8000,
          });

          setTimeout(location.reload(), 4000);
        })
        .catch((error) => {
          alert("ERROR: Fallo la actualización del usuario.", error);
        });
    },
    async chargeDataUser() {
      await this.$apollo
        .query({
          query: gql`
            query ($userId: Int!) {
              usuarioPorId(userId: $userId) {
                username
                password
                name
                email
                address
                phone
              }
            }
          `,
          variables: {
            userId: this.idUsuario,
          },
        })
        .then((data) => {
          this.user.username = data.data.usuarioPorId.username;
          this.user.name = data.data.usuarioPorId.name;
          this.user.email = data.data.usuarioPorId.email;
          this.user.phone = data.data.usuarioPorId.phone;
          this.user.address = data.data.usuarioPorId.address;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>

</style>

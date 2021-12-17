<template>
  <div class="container d-flex flex-column justify-content-center h-100">
    <div class="jumbotron">
      <h1 class="display-5">
        ¡Bienvenido
        <span
          ><strong>{{ usuarioPorId.name }}</strong></span
        >!
      </h1>
      <p class="lead">A continuación, puedes ver la información de tu cuenta</p>
      <hr class="my-4" />
      <p>
        <span class="text-secondary">Nombre de Usuario: </span>
        {{ usuarioPorId.username }}
      </p>
      <p>
        <span class="text-secondary">Correo electrónico: </span>
        {{ usuarioPorId.email }}
      </p>
      <p>
        <span class="text-secondary">Dirección: </span>
        {{ usuarioPorId.address }}
      </p>
      <p>
        <span class="text-secondary">Teléfono: </span>
        {{ usuarioPorId.phone }}
      </p>
      <hr class="my-4" />
      <button class="btn btn-outline-danger" @click="eliminarUsuario">
        Eliminar Cuenta
      </button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";
export default {
  name: "Home",
  data() {
    return {
      userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      usuarioPorId: {
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
      },
    };
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/user/logIn");
      location.reload();
    },
    async ejecutaEliminaUsuario() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($eliminarUsuarioId: Int!) {
              eliminarUsuario(id: $eliminarUsuarioId)
            }
          `,
          variables: {
            eliminarUsuarioId: parseInt(this.userId),
          },
        })
        .then((data) => {
          console.log(data);
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Su cuenta ha sido eliminada correctamente.",
            showConfirmButton: false,
            timer: 2000,
          });
          this.logOut();
        });
    },
    async eliminarUsuario() {
      await this.$swal
        .fire({
          title: "Desea eliminar la cuenta?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, Eliminala!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.ejecutaEliminaUsuario();
          }
        });
    },
  },
  apollo: {
    usuarioPorId: {
      query: gql`
        query ($userId: Int!) {
          usuarioPorId(userId: $userId) {
            username
            name
            email
            phone
            address
          }
        }
      `,
      variables() {
        return {
          userId: this.userId,
        };
      },
    },
  },
};
</script>

<style scoped>
</style>

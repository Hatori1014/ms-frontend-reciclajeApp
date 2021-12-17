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
      <h2 class="h2">Citas de recolección programadas</h2>
    </div>

    <div
      class="
        row
        justify-content-sm-center
        justify-content-md-center
        justify-content-lg-center
        align-items-center
        justify-content-center
        mt-4
      "
    >
      <div>
        <button class="btn btn-info mb-2" @click="loadCitas">Crear cita</button>
        <table class="table table-hover table-responsive rounded">
          <thead class="thead-ligth bg-success">
            <tr>
              <th class="align-middle" scope="col">ID</th>
              <th class="align-middle" scope="col">Fecha recolección</th>
              <th class="align-middle" scope="col">Hora recolección</th>
              <th class="align-middle" scope="col">Tipo de material</th>
              <th class="align-middle" scope="col">Peso del material (Kg)</th>
              <th class="align-middle" scope="col">Fecha de creación</th>
              <th class="align-middle" scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="cita in citaPorIdUsuario" :key="cita.id">
              <td class="align-middle text-center">{{ cita.id }}</td>
              <td class="align-middle text-center">
                {{ cita.fechaRecoleccion }}
              </td>
              <td class="align-middle text-center">
                {{ cita.horaRecoleccion }}
              </td>
              <td class="align-middle text-center">{{ cita.tipoMaterial }}</td>
              <td class="align-middle text-center">{{ cita.pesoMaterial }}</td>
              <td class="align-middle text-center">
                {{ convertDate(cita.fechaCreacionCita) }}
              </td>
              <td>
                <i
                  class="fa fa-edit fa-lg text-info ml-2"
                  @click="updateCitas(cita.id)"
                ></i>
                <i
                  class="fa fa-trash fa-lg text-danger"
                  @click="eliminarCita(cita.id)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "ListByCitas",
  data() {
    return {
      citaPorIdUsuario: [],
      idUsuario: jwt_decode(localStorage.getItem("token_refresh")).user_id || 2,
    };
  },
  methods: {
    convertDate(date) {
      let myDate = new Date(date);
      return (
        myDate.getFullYear() + "/" + myDate.getMonth() + "/" + myDate.getDay()
      );
    },
    loadCitas: function () {
      this.$router.push({ name: "signupCitas" });
    },
    updateCitas(idCita) {
      this.$router.push(`/updateCita/${idCita}`);
    },
    eliminarCita(idCita) {
      this.$swal
        .fire({
          title: "Desea eliminar la cita?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, Eliminala!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation ($idCita: Int!) {
                    eliminarCita(idCita: $idCita) {
                      id
                    }
                  }
                `,
                variables: {
                  idCita: idCita,
                },
              })
              .then((data) => {
                this.$swal.fire(
                  "Eliminada!",
                  "Su cita ha sido eliminada correctamente.",
                  "success"
                );
                //window.location.reload();
                this.$apollo.queries.citaPorIdUsuario.refetch();
              })
              .catch((error) => {
                alert("ERROR: No se pudo eliminar la cita.", error);
              });
          }
        });
    },
  },
  apollo: {
    citaPorIdUsuario: {
      query: gql`
        query ($idUsuario: Int!) {
          citaPorIdUsuario(idUsuario: $idUsuario) {
            id
            fechaRecoleccion
            horaRecoleccion
            tipoMaterial
            pesoMaterial
            fechaCreacionCita
            idUsuario
          }
        }
      `,
      variables() {
        return {
          idUsuario: this.idUsuario,
        };
      },
    },
  },
  created() {
    this.$apollo.queries.citaPorIdUsuario.refetch();
  },
};
</script>

<style scoped>
.table-body {
  background: whitesmoke;
}

table i{
  margin-left: 1rem;
}
</style>
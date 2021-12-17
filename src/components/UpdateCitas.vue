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
      <h2 class="h2">Actualizar cita</h2>
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
        <form @submit.prevent="processActualizarCita">
          <div class="form-group">
            <label for="fecha-visita">Fecha de visita</label>
            <input
              class="form-control"
              type="date"
              name="fecha-visita"
              v-model="cita.fechaRecoleccion"
              required
            />
          </div>
          <div class="form-group">
            <label for="hora-visita">Hora de visita:</label>
            <input
              class="form-control"
              type="time"
              name="hora-visita"
              v-model="cita.horaRecoleccion"
              required
            />
          </div>

          <div class="form-group">
            <label for="tipo-material"
              >Tipo de Material</label
            >
            <select
              class="form-control"
              name="tipo-material"
              id="list-material"
              v-model="cita.tipoMaterial"
              required
            >
              <option
                v-for="(material, index) in materiales"
                :key="index"
                :value="material"
              >
                {{ material }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="peso-material"
              >Peso de material(Kg)</label
            >
            <input
              class="form-control"
              type="number"
              min="0.5"
              max="100"
              step="0.5"
              name="peso-material"
              v-model="cita.pesoMaterial"
              required
            />
          </div>

          <div class="form-group">
            <button
              class="btn btn-success form-control mt-3 mb-2"
              type="submit"
            >
              Actualizar
            </button>
            <button class="btn btn-danger form-control" @click="cancelar">
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <div class="col-sm-1 col-md-3 col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
export default {
  name: "UpdateCitas",
  data() {
    return {
      materiales: [
        "Plastico",
        "Envases Metalicos",
        "Aluminio",
        "Papel",
        "Pilas o Baterias",
      ],
      cita: {
        id: this.$route.params.id,
        idUsuario: jwt_decode(localStorage.getItem("token_refresh")).user_id,
        fechaRecoleccion: "",
        horaRecoleccion: "",
        tipoMaterial: "",
        pesoMaterial: null,
      },
    };
  },

  beforeMount() {
    this.chargeDataCita();
  },
  methods: {
    async processActualizarCita() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($idCita: Int!, $citaActualizada: CitasInput!) {
              actualizarCita(
                idCita: $idCita
                citaActualizada: $citaActualizada
              ) {
                id
                idUsuario
                fechaRecoleccion
                horaRecoleccion
                tipoMaterial
                pesoMaterial
                fechaCreacionCita
              }
            }
          `,
          variables: {
            idCita: parseInt(this.$route.params.id),
            citaActualizada: {
              id: parseInt(this.cita.id),
              idUsuario: this.cita.idUsuario,
              fechaRecoleccion: this.cita.fechaRecoleccion,
              horaRecoleccion: this.cita.horaRecoleccion,
              tipoMaterial: this.cita.tipoMaterial,
              pesoMaterial: parseFloat(this.cita.pesoMaterial),
            },
          },
        })
        .then((data) => {
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "La cita ha sido actualizada correctamente.",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push({ name: "listByCitas" });
        })
        .catch((error) => {
          alert("ERROR: Fallo en el registro.", error);
        });
    },
    async chargeDataCita() {
      await this.$apollo
        .query({
          query: gql`
            query ($id: Int!) {
              citaPorId(id: $id) {
                id
                idUsuario
                fechaRecoleccion
                horaRecoleccion
                tipoMaterial
                pesoMaterial
              }
            }
          `,
          variables: {
            id: parseInt(this.$route.params.id),
          },
        })
        .then((data) => {
          this.cita.fechaRecoleccion = data.data.citaPorId.fechaRecoleccion;
          this.cita.horaRecoleccion = data.data.citaPorId.horaRecoleccion;
          this.cita.tipoMaterial = data.data.citaPorId.tipoMaterial;
          this.cita.pesoMaterial = data.data.citaPorId.pesoMaterial;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cancelar() {
      this.$router.push({ name: "listByCitas" });
    },
  },
};
</script>

<style scoped>
</style>

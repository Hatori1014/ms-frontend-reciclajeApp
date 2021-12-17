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
      <h2 class="h2">Agendar Cita</h2>
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
        <form @submit.prevent="CrearCita">
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
            <label   for="tipo-material">Tipo de Material</label>
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
            <label  for="peso-material">Peso de material(Kg)</label>
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
            <button class="btn btn-success form-control mt-3 mb-2" type="submit">Crear</button>
            <button class="btn btn-danger form-control" @click="cancel">Cancelar</button>
          </div>
        </form>
      </div>
      <div class="col-sm-1 col-md-3 col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import shortid from "shortid";
import gql from "graphql-tag";

export default {
  name: "signupCitas",
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
        id: null,
        idUsuario: jwt_decode(localStorage.getItem("token_refresh")).user_id,
        fechaRecoleccion: null,
        horaRecoleccion: null,
        tipoMaterial: null,
        pesoMaterial: null,
      },
    };
  },
  methods: {
    async CrearCita() {
      //this.cita.id = shortid.generate();
      this.cita.id = parseInt((Math.random() * 165684).toFixed(0));
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($agregarCita: CitasInput!) {
              crearCita(agregarCita: $agregarCita) {
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
            agregarCita: this.cita,
          },
        })
        .then((data) => {
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha agendado la cita correctamente.",
            showConfirmButton: false,
            timer: 2000,
          });
          this.$router.push({ name: "listByCitas" });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cancel() {
      this.$router.push({ name: "listByCitas" });
    },
  },
};
</script>

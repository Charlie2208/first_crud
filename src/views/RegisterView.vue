<template>
  <div>
    <h1 class="text-center h-1">Register</h1>
    <v-form v-model="valid" ref="formRegister">
      <v-row justify="center">
        <v-col cols="8" md="4">
          <v-text-field v-model="user.name" label="Name" :rules="nameRules" />
          <v-text-field
            v-model="user.email"
            label="Email"
            :rules="emailRules"
          />
          <!-- <v-text-field
            v-model="user.password"
            label="Password"
            :rules="passwordRules"
          /> -->
          <v-text-field
            v-model="user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <!-- <v-text-field
            v-model="user.passwordRepit"
            label="Repit Password"
            :rules="passwordRepitRules"
          /> -->
          <v-text-field
            v-model="user.passwordRepit"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRepitRules]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="Repite Password"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
          <v-btn
            color="primary"
            class="mr-2"
            :disabled="!valid"
            @click="registrarUser"
            >Login</v-btn
          >
          <v-btn color="error" @click="reset">Reset</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default {
  data() {
    return {
      valid: false,
      user: {
        name: "",
        email: "",
        password: "",
        passwordRepit: "",
      },
      show1: false,
      show2: false,
      nameRules: [(v) => !!v || "No existe"],
      emailRules: [
        (v) => (v && !!v.trim()) || "Escribe algo, no espacios!",
        (v) => !!v || "No existe",
        (v) =>
          /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
          "Formato de email incorrecto",
      ],
      passwordRules: [
        (v) => !!v || "No existe",
        (v) => (v && v.length > 5) || "Password debe ser sobre 6 carácteres",
      ],
      passwordRepitRules: [
        (v) => !!v || "No existe",
        (v) => v === this.user.password || "No coinciden las contraseñas",
      ],
    };
  },
  methods: {
    async registrarUser() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );
        console.log(userCredential);
      } catch (error) {
        console.log(error);
      }
    },
    reset() {
      console.log("reset...");
      this.$refs.formRegister.reset();
    },
  },
};
</script>
<style>
.h-1{
    color: #5E35B1;
}
</style>
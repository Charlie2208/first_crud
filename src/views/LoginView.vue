<template>
  <div>
    <h1 class="text-center h-1">Login</h1>
    <v-form v-model="valid" ref="formRegister">
      <v-row justify="center">
        <v-col cols="8" md="4">
          <v-text-field
            v-model="user.email"
            label="Email"
            :rules="emailRules"
          />
          <v-text-field
            v-model="user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn
            color="primary"
            class="mr-2"
            :disabled="!valid"
            @click="loginUser"
            >Login</v-btn
          >
          <v-btn color="error" @click="reset">Reset</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{}"> </template>

        <v-card>
          <v-card-title class="text-h5 red text-error" dark>
            Error!!!
          </v-card-title>

          <v-card-text>
            La contraseña es incorrecta, por favor ingrésela nuevamente
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

export default {
  data() {
    return {
      valid: false,
      user: {
        email: "",
        password: "",
      },
      dialog: false,
      show1: false,
      emailRules: [
        (v) => (v && !!v.trim()) || "Escribe algo, no espacios!",
        (v) => !!v || "No existe",
        (v) =>
          /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
          "Formato de email incorrecto",
      ],
      passwordRules: [
        (v) => !!v || "No existe",
        (v) => (v && v.length > 5) || "Email sobre 6 carácteres",
      ],
    };
  },
  methods: {
    loginUser() {
      signInWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then((userCredential) => {
          console.log(userCredential);
          this.$router.push({ name: 'crud' })
        })
        .catch((error) => {
          console.log(error);
          this.dialog = true;
        });
    },
    reset() {
      console.log("reset...");
      this.$refs.formRegister.reset();
    },
  },
};
</script>
<style>
.text-error {
  color: white;
}
</style>
<style>
.h-1 {
  color: #5e35b1;
}
</style>

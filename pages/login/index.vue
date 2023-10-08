<template>
  <form class="mt-5" @submit.prevent="handleSubmit">
    <h4 class="card-title mb-1">Selamat Datang</h4>
    <p class="card-text text-muted mb-4">Masuk ke akun kamu</p>

    <b-alert :show="errorMessage !== ''" variant="danger">
      {{ errorMessage }}
    </b-alert>

    <div class="form-group">
      <label for="username">Username</label>
      <input
        id="username"
        v-model="form.username"
        type="text"
        name="username"
        placeholder="Username"
        :class="`form-control ${
          isSubmitted && form.username === '' ? 'is-invalid' : ''
        }`"
      />
      <div v-if="isSubmitted && form.username === ''" class="invalid-feedback">
        Username tidak valid!
      </div>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        name="password"
        placeholder="Password"
        :class="`form-control ${
          isSubmitted && form.password === '' ? 'is-invalid' : ''
        }`"
      />
      <div v-if="isSubmitted && form.password === ''" class="invalid-feedback">
        Password tidak valid!
      </div>
    </div>

    <div class="text-center mt-4">
      <AppButton
        type="submit"
        text="Masuk"
        variant="success"
        icon="box-arrow-in-right"
        class="btn-block mb-3"
      />
      <NuxtLink class="text-success" to="/register">Belum punya akun?</NuxtLink>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'auth',
  middleware: 'guest',
  data() {
    return {
      isSubmitted: false,
      errorMessage: '',
      form: {
        username: '',
        password: '',
      },
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      return this.$route.push('/')
    }
  },
  methods: {
    handleCheckForm() {
      return this.form.username && this.form.password
    },
    async handleSubmit() {
      this.isSubmitted = true

      if (!this.handleCheckForm()) {
        this.errorMessage = 'Username dan password tidak boleh kosong!'
        return
      }

      this.$swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          this.$swal.showLoading()
        },
      })

      try {
        this.errorMessage = ''
        const { username, password } = this.form
        await this.$auth.loginWith('local', {
          data: { username, password },
        })
        this.$swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Berhasil masuk!',
        })
        this.$router.push('/')
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Username atau password tidak sesuai!',
        })
      }
    },
  },
}
</script>

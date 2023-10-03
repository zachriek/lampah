<template>
  <form class="mt-5" @submit.prevent="handleSubmit">
    <h4 class="card-title mb-1">Welcome Back</h4>
    <p class="card-text text-muted mb-4">Please login to your account</p>

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
        text="Login"
        variant="success"
        icon="box-arrow-in-right"
        class="btn-block mb-3"
      />
      <a class="text-success" href="#!">Don't have an account?</a>
    </div>
  </form>
</template>

<script>
export default {
  layout: 'auth',
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
      try {
        const { username, password } = this.form
        const response = await this.$axios.post('/auth/login', {
          username,
          password,
        })
        const { message } = await response.data

        if (response.status === 200) {
          this.errorMessage = ''
          this.$swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: message,
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

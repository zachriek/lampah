<template>
  <form class="mt-5" @submit.prevent="handleSubmit">
    <h4 class="card-title mb-1">Selamat Datang</h4>
    <p class="card-text text-muted mb-4">Daftar akun untuk melanjutkan</p>

    <b-alert :show="errorMessage !== ''" variant="danger">
      {{ errorMessage }}
    </b-alert>

    <div class="form-group">
      <label for="name">Nama Lengkap</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        name="name"
        placeholder="Nama Lengkap"
        :class="`form-control ${
          isSubmitted && form.name === '' ? 'is-invalid' : ''
        }`"
      />
      <small class="form-text text-success">Minimal 6 kata</small>
      <div v-if="isSubmitted && form.name === ''" class="invalid-feedback">
        Nama tidak valid!
      </div>
    </div>

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
      <small class="form-text text-success">Minimal 3 kata</small>
      <div v-if="isSubmitted && form.username === ''" class="invalid-feedback">
        Username tidak valid!
      </div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        name="email"
        placeholder="Email"
        :class="`form-control ${
          isSubmitted && form.email === '' ? 'is-invalid' : ''
        }`"
      />
      <div v-if="isSubmitted && form.email === ''" class="invalid-feedback">
        Email tidak valid!
      </div>
    </div>

    <div class="form-group">
      <label for="phone">Nomor Telepon</label>
      <input
        id="phone"
        v-model="form.phone"
        type="number"
        name="phone"
        placeholder="Nomor Telepon"
        :class="`form-control ${
          isSubmitted && form.phone === '' ? 'is-invalid' : ''
        }`"
      />
      <small class="form-text text-success">Minimal 10 kata</small>
      <div v-if="isSubmitted && form.phone === ''" class="invalid-feedback">
        Nomor telepon tidak valid!
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
      <small class="form-text text-success">Minimal 6 kata</small>
      <div v-if="isSubmitted && form.password === ''" class="invalid-feedback">
        Password tidak valid!
      </div>
    </div>

    <div class="text-center mt-4">
      <AppButton
        type="submit"
        text="Daftar"
        variant="success"
        icon="box-arrow-in-right"
        class="btn-block mb-3"
      />
      <NuxtLink class="text-success" to="/login">Sudah punya akun?</NuxtLink>
    </div>
  </form>
</template>

<script>
export default {
  name: 'RegisterPage',
  layout: 'auth',
  middleware: 'guest',
  data() {
    return {
      isSubmitted: false,
      errorMessage: '',
      form: {
        name: '',
        username: '',
        email: '',
        phone: '',
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
      return (
        this.form.name &&
        this.form.username &&
        this.form.email &&
        this.form.phone &&
        this.form.password
      )
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
        const { name, username, email, phone, password } = this.form
        const response = await this.$axios.post('/auth/register', {
          name,
          username,
          email,
          phone,
          password,
        })
        const { message } = await response.data

        if (response.status === 200) {
          await this.$auth.loginWith('local', {
            data: { username, password },
          })
          this.errorMessage = ''
          this.$swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: message,
          })
          this.$router.push('/')
        }
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Field tidak sesuai',
        })
      }
    },
  },
}
</script>

<template>
  <header>
    <nav
      class="navbar navbar-expand-md navbar-dark bg-success shadow-sm fixed-top"
    >
      <div class="container">
        <AppLogo />
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-md-5 mt-3 mt-md-0">
            <li class="nav-item">
              <NuxtLink
                :class="`nav-link ${this.$route.path === '/' ? 'active' : ''}`"
                to="/"
              >
                <b-icon-house-fill />
                <span>Beranda</span>
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :class="`nav-link ${
                  this.$route.path.includes('/laporan') ? 'active' : ''
                }`"
                to="/laporan"
              >
                <b-icon-file-earmark-text-fill />
                <span>Laporan</span>
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :class="`nav-link ${
                  this.$route.path.includes('/artikel') ? 'active' : ''
                }`"
                to="/artikel"
              >
                <b-icon-newspaper />
                <span>Artikel</span>
              </NuxtLink>
            </li>
          </ul>
          <ul class="navbar-nav ml-md-auto mt-3 mt-md-0">
            <template v-if="isAuthenticated">
              <li class="nav-item mb-2 mb-md-0">
                <NuxtLink
                  :class="`nav-link ${
                    this.$route.path === '/profil' ? 'active' : ''
                  }`"
                  to="/profil"
                >
                  <b-icon-person-fill />
                  <span>{{ loggedInUser.username }}</span>
                </NuxtLink>
              </li>
              <li class="nav-item">
                <button class="btn btn-outline-light" @click="logout">
                  <b-icon-arrow-return-left />
                  <span>Logout</span>
                </button>
              </li>
            </template>
            <li v-else class="nav-item">
              <NuxtLink class="btn btn-outline-light" to="/login">
                <b-icon-arrow-return-right />
                <span>Login</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    isAuthenticated() {
      return this.$auth.loggedIn
    },
    loggedInUser() {
      return this.$auth.user
    },
  },
  methods: {
    async logout() {
      const result = await this.$swal.fire({
        title: 'Apakah kamu yakin?',
        text: 'Apakah kamu yakin ingin keluar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Keluar',
        cancelButtonText: 'Batal',
      })

      if (result.isConfirmed) {
        await this.$auth.logout()

        this.$swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Berhasil keluar!',
        })

        this.$router.push('/login')
      }
    },
  },
}
</script>

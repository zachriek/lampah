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
                  this.$route.path === '/laporan' ? 'active' : ''
                }`"
                to="#"
              >
                <b-icon-file-earmark-text-fill />
                <span>Laporan</span>
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="#">
                <b-icon-person-fill />
                <span>Profil</span>
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
}
</script>

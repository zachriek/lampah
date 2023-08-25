<template>
  <footer class="bg-success text-white py-4 shadow-sm">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 mb-4 mb-md-0">
          <AppLogo />
          <p class="mt-2">
            Pelaporan Sampah adalah aplikasi berbasis website yang bertujuan
            untuk melaporkan tempat-tempat yang tercemar oleh sampah atau
            limbah.
          </p>
        </div>
        <div class="col-12 col-md-6 d-md-flex justify-content-md-end">
          <div>
            <p>
              <b-icon-person-fill />
              <span class="ml-1">Muhammad Zachrie Kurniawan</span>
            </p>
            <p>
              <b-icon-envelope-fill />
              <span class="ml-1">zachrie2005@gmail.com</span>
            </p>
            <p>
              <b-icon-geo-alt-fill />
              <span class="ml-1">Lampung, Indonesia</span>
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <p class="mb-0">
              &copy; Copyright {{ new Date().getFullYear() }} LAMPAH
            </p>
            <div
              class="d-flex justify-content-center align-items-center"
              style="gap: 1rem"
            >
              <a
                class="social-media-link"
                href="https://www.instagram.com/zachriek"
                target="_blank"
                rel="noreferrer"
              >
                <b-icon-instagram />
              </a>
              <a
                class="social-media-link"
                href="https://github.com/zachriek"
                target="_blank"
                rel="noreferrer"
              >
                <b-icon-github />
              </a>
              <a
                class="social-media-link"
                href="https://www.linkedin.com/in/muhammad-zachrie-kurniawan-0a2569152"
                target="_blank"
                rel="noreferrer"
              >
                <b-icon-linkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style scoped>
hr {
  border-color: rgba(255, 255, 255, 0.5);
}
.social-media-link {
  color: #fff;
  text-decoration: none;
}
</style>

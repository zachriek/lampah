<template>
  <section
    id="login"
    class="min-vh-100 d-flex justify-content-center align-items-center"
  >
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded shadow">
            <div class="row g-0">
              <div
                class="col-lg-6 d-flex align-items-center"
                :style="{
                  background: `url(${authImagePath})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }"
              ></div>
              <div class="col-lg-6">
                <div class="card-body p-4 mx-3 p-md-5 mx-md-4">
                  <div class="auth-header">
                    <b-icon-recycle />
                    <span class="ml-1">LAMPAH</span>
                  </div>
                  <Nuxt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import authImagePath from '~/assets/images/auth.jpg'
export default {
  middleware: 'guest',
  data() {
    return { authImagePath }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      return this.$route.push('/')
    }
  },
}
</script>

<style scoped>
section#login {
  background-color: #ddffe5;
}

.auth-header {
  font-size: 2rem;
  font-weight: 700;
  color: var(--success);
  text-align: center;
}
</style>

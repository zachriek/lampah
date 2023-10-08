<template>
  <section id="profil" class="section mt-100">
    <div class="container">
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="heading">Profil Saya</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
          <CardSkeletonLoading
            v-if="isLoading"
            :count="1"
            :size="1"
            class="mb-5"
          />
          <div v-else class="row mb-5">
            <div class="col-12">
              <b-card
                :title="loggedInUser.name"
                :sub-title="loggedInUser.username"
                :img-src="
                  loggedInUser.image ??
                  `https://ui-avatars.com/api/?name=${loggedInUser.name}`
                "
                img-alt="profile"
                img-top
                class="shadow-sm"
              >
                <b-card-text class="mt-4 mb-1">
                  Email: {{ loggedInUser.email }}
                </b-card-text>
                <b-card-text>
                  Nomor Telepon: {{ loggedInUser.phone }}
                </b-card-text>
                <AppButton
                  class="mt-4"
                  text="Ubah Profil"
                  variant="success"
                  icon="pencil"
                  data-toggle="modal"
                  data-target="#profilModal"
                />
              </b-card>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-8">
          <div class="row mb-3">
            <div class="col-12">
              <h3 class="text-success">Laporan Saya</h3>
            </div>
          </div>

          <div class="row mb-3">
            <div
              class="col-12 d-flex flex-wrap align-items-center justify-content-between"
              style="gap: 1rem"
            >
              <b-dropdown
                id="dropdown-left"
                text="Laporan per halaman"
                variant="outline-success"
              >
                <b-dropdown-item
                  v-for="value in [3, 6, 9]"
                  :key="value"
                  @click="handleChangePerPage(value)"
                  >{{ value }} laporan</b-dropdown-item
                >
              </b-dropdown>

              <div>
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text>
                      <b-icon-search />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    v-model="searchQuery"
                    placeholder="Cari laporan..."
                  ></b-form-input>
                </b-input-group>
              </div>

              <CardSkeletonLoading
                v-if="isLoading"
                :count="perPage"
                :size="2"
                class="mt-4"
              />
              <div v-else class="row mt-4">
                <div v-if="reports.length < 1" class="col-12">
                  <div class="alert alert-danger" role="alert">
                    Laporan tidak ditemukan!
                  </div>
                </div>
                <div
                  v-for="report in reports"
                  :key="report.id"
                  class="col-12 col-md-6 mb-5"
                >
                  <ReportCard
                    :title="report.title"
                    :author="`${report.author.name} - ${report.author.username}`"
                    :body="
                      report.body.length > limitBody
                        ? report.body.substring(0, limitBody) + '...'
                        : report.body
                    "
                    :image="report.image ?? null"
                    :href="`/laporan/${report.slug}`"
                    button-text="Lihat"
                    button-icon="eye-fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row my-5">
        <div class="col-12">
          <b-pagination
            v-if="reports.length > 0"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            align="right"
          ></b-pagination>
        </div>
      </div>
    </div>

    <div
      id="profilModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="profilModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="profilModalLabel" class="modal-title">Ubah Profil</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
            <div class="modal-body">
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
                <div
                  v-if="isSubmitted && form.name === ''"
                  class="invalid-feedback"
                >
                  Nama tidak valid!
                </div>
              </div>
              <div class="form-group">
                <label for="body">Username</label>
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
                <div
                  v-if="isSubmitted && form.username === ''"
                  class="invalid-feedback"
                >
                  Username tidak valid!
                </div>
              </div>
              <div class="form-group">
                <label for="body">Email</label>
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
                <div
                  v-if="isSubmitted && form.email === ''"
                  class="invalid-feedback"
                >
                  Email tidak valid!
                </div>
              </div>
              <div class="form-group">
                <label for="body">Nomor Telepon</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="number"
                  name="phone"
                  placeholder="phone"
                  :class="`form-control ${
                    isSubmitted && form.phone === '' ? 'is-invalid' : ''
                  }`"
                />
                <div
                  v-if="isSubmitted && form.phone === ''"
                  class="invalid-feedback"
                >
                  Nomor Telepon tidak valid!
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <AppButton
                text="Kembali"
                variant="outline-success"
                icon="arrow-left"
                data-dismiss="modal"
              />
              <AppButton
                type="submit"
                text="Simpan"
                variant="success"
                icon="box-arrow-down"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProfilPage',
  data() {
    return {
      isSubmitted: false,
      limitBody: 30,
      perPage: 3,
      currentPage: 1,
      searchQuery: '',
      form: {
        name: '',
        username: '',
        email: '',
        phone: '',
      },
      reportsData: [],
      isLoading: true,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$auth.loggedIn
    },
    loggedInUser() {
      return this.$auth.user
    },
    filteredReports() {
      return this.reportsData
        .filter((report) => report.authorId === this.loggedInUser.id)
        .filter((report) =>
          !this.searchQuery
            ? report
            : this.searchQuery
                .toLowerCase()
                .split(' ')
                .every(
                  (s) =>
                    report.title.toLowerCase().includes(s) ||
                    report.body.toLowerCase().includes(s)
                )
        )
    },
    reports() {
      return this.filteredReports
        .slice()
        .sort((a, b) => (a.id < b.id ? 1 : -1))
        .slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        )
    },
    rows() {
      return this.filteredReports.length
    },
  },
  async mounted() {
    await this.fetchReports()
    this.form.name = this.loggedInUser.name
    this.form.username = this.loggedInUser.username
    this.form.email = this.loggedInUser.email
    this.form.phone = this.loggedInUser.phone
  },
  methods: {
    async fetchReports() {
      this.isLoading = true
      const response = await this.$axios.get('/posts')
      const { data } = await response.data
      if (data) {
        this.isLoading = false
        this.reportsData = data
      }
    },
    handleChangePerPage(value) {
      this.perPage = value
    },
    handleCheckForm() {
      return (
        this.form.name &&
        this.form.username &&
        this.form.email &&
        this.form.phone
      )
    },
    async handleSubmit() {
      this.isSubmitted = true

      if (!this.handleCheckForm()) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal mengubah profil!',
        })
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
        const { name, username, email, phone } = this.form

        const response = await this.$axios.patch('/auth/me', {
          name,
          username,
          email,
          phone,
        })
        const { message } = await response.data

        if (response.status === 200) {
          this.$swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: message,
          })
          this.isSubmitted = false
          this.$auth.fetchUser()
        }
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal mengubah profil!',
        })
      }
    },
  },
}
</script>

<template>
  <section id="laporan" class="section mt-100">
    <div class="container">
      <div class="row mb-4">
        <div
          class="col-12 d-flex flex-wrap justify-content-between align-items-center"
          style="gap: 1rem"
        >
          <h2 class="heading">Laporan</h2>
          <AppButton
            text="Buat Laporan"
            variant="success"
            icon="plus"
            data-toggle="modal"
            data-target="#laporanModal"
          />
        </div>
      </div>
      <div class="row mb-5">
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
        </div>
      </div>

      <CardSkeletonLoading v-if="isLoading" :count="perPage" />
      <div v-else class="row">
        <div v-if="reports.length < 1" class="col-12 col-md-6 col-lg-4">
          <div class="alert alert-danger" role="alert">
            Laporan tidak ditemukan!
          </div>
        </div>
        <div
          v-for="report in reports"
          :key="report.id"
          class="col-12 col-md-6 col-lg-4 mb-5"
        >
          <ReportCard
            :title="report.title"
            :author="`${report.author.name} - ${report.author.username}`"
            :username="report.author.username"
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
      id="laporanModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="laporanModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="laporanModalLabel" class="modal-title">Buat Laporan</h5>
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
              <img
                ref="postImage"
                src=""
                class="img-thumbnail mb-3"
                width="200"
                loading="lazy"
              />
              <div class="custom-file mb-3">
                <label
                  ref="postImageLabel"
                  class="custom-file-label"
                  for="image"
                >
                  Pilih file gambar...
                </label>
                <input
                  id="image"
                  ref="postImageInput"
                  type="file"
                  name="image"
                  class="custom-file-input"
                  @change="handleChangeImageInput"
                />
              </div>
              <div class="form-group">
                <label for="title">Judul Laporan</label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  name="title"
                  placeholder="Judul Laporan"
                  :class="`form-control ${
                    isSubmitted && form.title === '' ? 'is-invalid' : ''
                  }`"
                />
                <div
                  v-if="isSubmitted && form.title === ''"
                  class="invalid-feedback"
                >
                  Judul laporan tidak valid!
                </div>
              </div>
              <div class="form-group">
                <label for="body">Isi Laporan</label>
                <textarea
                  id="body"
                  v-model="form.body"
                  name="body"
                  placeholder="Isi Laporan"
                  :class="`form-control ${
                    isSubmitted && form.body === '' ? 'is-invalid' : ''
                  }`"
                  rows="10"
                ></textarea>
                <div
                  v-if="isSubmitted && form.body === ''"
                  class="invalid-feedback"
                >
                  Isi laporan tidak valid!
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
  name: 'LaporanPage',
  data() {
    return {
      isSubmitted: false,
      limitBody: 30,
      perPage: 3,
      currentPage: 1,
      searchQuery: '',
      image: '',
      form: {
        title: '',
        body: '',
        image: '',
      },
      reportsData: [],
      isLoading: true,
    }
  },
  computed: {
    filteredReports() {
      return this.reportsData.filter((report) =>
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
    handleChangeImageInput() {
      this.form.image = this.$refs.postImageInput.files[0] ?? null
      if (!this.form.image) {
        this.form.image = this.image
      }

      if (this.form.image) {
        this.image = this.form.image
        this.$refs.postImage.src = URL.createObjectURL(this.form.image)
        this.$refs.postImageLabel.textContent = this.form.image.name
      }
    },
    handleChangePerPage(value) {
      this.perPage = value
    },
    handleCheckForm() {
      return this.form.title && this.form.body
    },
    async handleSubmit() {
      this.isSubmitted = true

      if (!this.handleCheckForm()) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal membuat laporan baru!',
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
        const { title, body, image } = this.form
        const data = new FormData()
        data.append('title', title)
        data.append('body', body)
        if (image) {
          data.append('image', image)
        }

        const response = await this.$axios.post('/posts', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        const { message } = await response.data

        if (response.status === 200) {
          this.$swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: message,
          })
          this.form.title = ''
          this.form.body = ''
          this.form.image = null
          this.$refs.postImage.src = ''
          this.$refs.postImageLabel.textContent = 'Pilih file gambar...'
          this.isSubmitted = false
          await this.fetchReports()
        }
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal membuat laporan baru!',
        })
      }
    },
  },
}
</script>

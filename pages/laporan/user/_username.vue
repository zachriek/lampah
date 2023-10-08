<template>
  <section id="laporan_user" class="section mt-100">
    <div class="container">
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="heading">Laporan</h2>
          <h5 class="text-muted">Username: {{ paramUsername }}</h5>
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
  </section>
</template>

<script>
export default {
  name: 'LaporanUserPage',
  data() {
    return {
      paramUsername: this.$route.params.username,
      limitBody: 30,
      perPage: 3,
      currentPage: 1,
      searchQuery: '',
      reportsData: [],
      isLoading: true,
    }
  },
  computed: {
    filteredReports() {
      return this.reportsData
        .filter((report) => report.author.username === this.paramUsername)
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
  },
}
</script>

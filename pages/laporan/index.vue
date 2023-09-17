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
              >{{ value }} halaman</b-dropdown-item
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
      <div class="row">
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
          <ReportCard :title="report.title" :body="report.body" />
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
      v-once
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
          <form @submit.prevent="handleSubmit">
            <div class="modal-body">
              <div class="form-group">
                <label for="title">Judul Laporan</label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  name="title"
                  placeholder="Judul Laporan"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="body">Isi Laporan</label>
                <textarea
                  id="body"
                  v-model="form.body"
                  name="body"
                  placeholder="Isi Laporan"
                  class="form-control"
                  rows="10"
                ></textarea>
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
      perPage: 3,
      currentPage: 1,
      searchQuery: '',
      form: {
        title: '',
        body: '',
      },
      reportsData: [
        {
          id: 1,
          title: 'Title 1',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 2,
          title: 'Title 2',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 3,
          title: 'Title 3',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 4,
          title: 'Title 4',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 5,
          title: 'Title 5',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 6,
          title: 'Title 6',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 7,
          title: 'Title 7',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 8,
          title: 'Title 8',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 9,
          title: 'Title 9',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 10,
          title: 'Title 10',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 11,
          title: 'Title 11',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
        {
          id: 12,
          title: 'Title 12',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis delectus officia adipisci distinctio dolores fugiat aut repellat exercitationem a natus minus ipsam, quibusdam quisquam tempore libero doloribus beatae autem assumenda?',
        },
      ],
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
  methods: {
    handleChangePerPage(value) {
      this.perPage = value
    },
    handleCheckForm() {
      return this.form.title && this.form.body
    },
    handleSubmit() {
      if (!this.handleCheckForm()) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal membuat laporan baru!',
        })
      }
      this.reportsData.push({
        id: Date.now(),
        title: this.form.title,
        body: this.form.body,
      })
      this.$swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Berhasil membuat laporan baru!',
      })
    },
  },
}
</script>

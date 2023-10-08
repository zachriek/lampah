<template>
  <section id="report" class="section mt-100">
    <div class="container">
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="heading">Laporan</h2>
        </div>
      </div>
      <CardSkeletonLoading v-if="isLoading" :count="2" :size="2" />
      <div v-else class="row">
        <div class="col-12 col-md-6 mb-5">
          <b-alert :show="!report" variant="danger"
            >Laporan tidak ditemukan</b-alert
          >
          <AppButton
            v-if="!report"
            type="link"
            text="Kembali"
            href="/laporan"
            variant="success"
            icon="arrow-left"
          />
          <ReportCard
            v-if="report"
            :title="report.title"
            :author="`${report.author.name} - ${report.author.username}`"
            :username="report.author.username"
            :body="report.body"
            :image="report.image ?? null"
            href="/laporan"
            button-text="Kembali"
            button-icon="arrow-left"
          />
        </div>
        <div class="col-12 col-md-6 mb-5">
          <b-card class="shadow-sm">
            <div
              v-if="loggedInUser.id === report.authorId"
              class="d-flex justify-content-end align-items-center mb-3"
              style="gap: 1rem"
            >
              <AppButton
                text="Ubah Laporan"
                variant="outline-success"
                size="sm"
                icon="pencil"
                data-toggle="modal"
                data-target="#editLaporanModal"
              />
              <button
                class="btn btn-sm btn-outline-danger"
                @click="deleteReport"
              >
                <b-icon-trash />
                <span>Hapus Laporan</span>
              </button>
            </div>
            <form @submit.prevent="handleSubmitComment">
              <b-form-textarea
                id="comment"
                v-model="form.comment"
                placeholder="Beri komentar..."
                rows="3"
                max-rows="6"
                :class="`${
                  isSubmittedComment && form.comment === '' ? 'is-invalid' : ''
                }`"
              ></b-form-textarea>
              <div
                v-if="isSubmittedComment && form.comment === ''"
                class="invalid-feedback"
              >
                Komentar tidak valid!
              </div>
              <div class="d-flex justify-content-end align-items-center mt-3">
                <AppButton
                  type="submit"
                  text="Kirim"
                  variant="success"
                  icon="send"
                />
              </div>
            </form>
            <hr />
            <b-list-group v-if="report.comments.length > 0">
              <b-list-group-item
                v-for="comment in report.comments"
                :key="comment.id"
              >
                <div class="py-2">
                  <div class="d-flex align-items-center" style="gap: 1rem">
                    <img
                      :src="`https://ui-avatars.com/api/?name=${comment.author.name}`"
                      alt="profile"
                      class="rounded-circle"
                      width="50"
                    />
                    <div>
                      <h6 class="text-muted">
                        {{ comment.author.name }} -
                        {{ comment.author.username }}
                      </h6>
                      <p class="mb-0">{{ comment.comment }}</p>
                    </div>
                  </div>
                  <div
                    v-if="loggedInUser.id === comment.authorId"
                    class="d-flex align-items-center justify-content-end mt-3"
                    style="gap: 1rem"
                  >
                    <b-icon-pencil
                      class="icon-button text-success"
                      data-toggle="modal"
                      data-target="#editKomentarModal"
                      @click="setComment(comment)"
                    />
                    <b-icon-trash
                      class="icon-button text-danger"
                      @click="deleteComment(comment.id)"
                    />
                  </div>
                </div>
              </b-list-group-item>
            </b-list-group>
            <h5 v-else class="text-center text-muted">Belum ada komentar</h5>
          </b-card>
        </div>
      </div>
    </div>

    <div
      id="editLaporanModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="editLaporanModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="editLaporanModalLabel" class="modal-title">Ubah Laporan</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="handleSubmitReport">
            <div class="modal-body">
              <div class="form-group">
                <label for="title">Judul Laporan</label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  name="title"
                  placeholder="Judul Laporan"
                  :class="`form-control ${
                    isSubmittedReport && form.title === '' ? 'is-invalid' : ''
                  }`"
                />
                <div
                  v-if="isSubmittedReport && form.title === ''"
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
                    isSubmittedReport && form.body === '' ? 'is-invalid' : ''
                  }`"
                  rows="10"
                ></textarea>
                <div
                  v-if="isSubmittedReport && form.body === ''"
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

    <div
      id="editKomentarModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="editKomentarModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="editKomentarModalLabel" class="modal-title">
              Ubah Komentar
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="handleSubmitComment">
            <div class="modal-body">
              <div class="form-group">
                <label for="comment">Komentar</label>
                <textarea
                  id="comment"
                  v-model="form.comment"
                  name="comment"
                  placeholder="Komentar"
                  :class="`form-control ${
                    isSubmittedComment && form.comment === ''
                      ? 'is-invalid'
                      : ''
                  }`"
                  rows="10"
                ></textarea>
                <div
                  v-if="isSubmittedComment && form.comment === ''"
                  class="invalid-feedback"
                >
                  Komentar tidak valid!
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
  name: 'LaporanDetailPage',
  data() {
    return {
      paramSlug: this.$route.params.slug,
      isSubmittedReport: false,
      isSubmittedComment: false,
      isLoading: true,
      reportData: '',
      commentId: null,
      form: {
        comment: '',
        title: '',
        body: '',
      },
    }
  },
  computed: {
    report() {
      return this.reportData
    },
    loggedInUser() {
      return this.$auth.user
    },
  },
  async mounted() {
    await this.fetchReport()
  },
  methods: {
    async fetchReport() {
      this.isLoading = true
      try {
        const response = await this.$axios.get(`/posts/${this.paramSlug}`)
        const { data } = await response.data
        if (data) {
          this.reportData = data
          this.form.title = data.title
          this.form.body = data.body
        }
      } catch (err) {
        this.reportData = null
      } finally {
        this.isLoading = false
      }
    },
    async deleteReport() {
      const result = await this.$swal.fire({
        title: 'Apakah kamu yakin?',
        text: 'Apakah kamu yakin ingin menghapus laporan?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
      })

      if (result.isConfirmed) {
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
          const response = await this.$axios.delete(`/posts/${this.paramSlug}`)
          const { message } = await response.data
          if (response.status === 200) {
            this.$swal.fire({
              icon: 'success',
              title: 'Berhasil',
              text: message,
            })
            this.$router.push('/laporan')
          }
        } catch (err) {
          this.$swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Gagal menghapus laporan!',
          })
        }
      }
    },
    async deleteComment(commentId) {
      const result = await this.$swal.fire({
        title: 'Apakah kamu yakin?',
        text: 'Apakah kamu yakin ingin menghapus komentar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
      })

      if (result.isConfirmed) {
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
          const response = await this.$axios.delete(`/comments/${commentId}`)
          const { message } = await response.data
          if (response.status === 200) {
            this.$swal.fire({
              icon: 'success',
              title: 'Berhasil',
              text: message,
            })
            await this.fetchReport()
          }
        } catch (err) {
          this.$swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Gagal menghapus komentar!',
          })
        }
      }
    },
    setComment(comment) {
      this.commentId = comment.id
      this.form.comment = comment.comment
    },
    handleCheckReportForm() {
      return this.form.title && this.form.body
    },
    handleCheckCommentForm() {
      return this.form.comment
    },
    async handleSubmitReport() {
      this.isSubmittedReport = true

      if (!this.handleCheckReportForm()) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal mengubah laporan!',
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
        const { title, body } = this.form

        const response = await this.$axios.patch(`/posts/${this.report.slug}`, {
          title,
          body,
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
          this.isSubmittedReport = false
          await this.fetchReport()
        }
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal mengubah laporan!',
        })
      }
    },
    async handleSubmitComment() {
      this.isSubmittedComment = true

      if (!this.handleCheckCommentForm()) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal membuat komentar!',
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
        const { comment } = this.form
        let response
        if (this.commentId) {
          response = await this.$axios.patch(`/comments/${this.commentId}`, {
            comment,
          })
        } else {
          response = await this.$axios.post(`/comments/${this.report.id}`, {
            comment,
          })
        }
        const { message } = await response.data

        if (response.status === 200) {
          this.$swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: message,
          })
          this.isSubmittedComment = false
          this.form.comment = ''
          this.commentId = null
          await this.fetchReport()
        }
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal membuat komentar!',
        })
      }
    },
  },
}
</script>

<style scoped>
.icon-button {
  cursor: pointer;
}
</style>

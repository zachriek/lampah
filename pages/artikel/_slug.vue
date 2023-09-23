<template>
  <section id="artikel" class="section mt-100">
    <div class="container">
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="heading">Artikel</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 mb-5">
          <b-alert :show="!article" variant="danger"
            >Artikel tidak ditemukan</b-alert
          >
          <AppButton
            v-if="!article"
            type="link"
            text="Kembali"
            href="/artikel"
            variant="success"
            icon="arrow-left"
          />
          <ReportCard
            v-if="article"
            :title="article.title"
            :body="article.content"
            :image="article.img"
            href="/artikel"
            button-text="Kembali"
            button-icon="arrow-left"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ArtikelPage',
  data() {
    return {
      paramSlug: this.$route.params.slug,
      articles: [
        {
          title: 'Judul Artikel 1',
          slug: 'judul-artikel-1',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolor explicabo sint quos exercitationem fugiat reiciendis assumenda. Ad quia veritatis, dolor odit, voluptas numquam modi porro eius reprehenderit ullam tenetur?',
          img: 'https://images.unsplash.com/photo-1649282806617-c51bb282899c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        },
        {
          title: 'Judul Artikel 2',
          slug: 'judul-artikel-2',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolor explicabo sint quos exercitationem fugiat reiciendis assumenda. Ad quia veritatis, dolor odit, voluptas numquam modi porro eius reprehenderit ullam tenetur?',
          img: 'https://images.unsplash.com/photo-1635732646038-0a1a2fe3f2d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        },
        {
          title: 'Judul Artikel 3',
          slug: 'judul-artikel-3',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolor explicabo sint quos exercitationem fugiat reiciendis assumenda. Ad quia veritatis, dolor odit, voluptas numquam modi porro eius reprehenderit ullam tenetur?',
          img: 'https://images.unsplash.com/photo-1640006807976-a6127e9d6fa0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        },
      ],
    }
  },
  computed: {
    article() {
      return this.articles.find((article) => article.slug === this.paramSlug)
    },
  },
}
</script>

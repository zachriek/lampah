<template>
  <div>
    <section id="hero" class="section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-md-6">
            <img src="~/assets/images/hero.jpg" alt="hero" class="img-fluid" />
          </div>
          <div class="col-12 col-md-6">
            <h1 class="text-success font-weight-bold mb-3">Pelaporan Sampah</h1>
            <p class="mb-4">
              Pelaporan Sampah adalah aplikasi berbasis website yang bertujuan
              untuk melaporkan tempat-tempat yang tercemar oleh sampah atau
              limbah.
            </p>
            <AppButton
              type="link"
              text="Lapor Sampah"
              href="/laporan"
              variant="success"
              icon="arrow-right"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="objective">
      <div class="container">
        <div class="row justify-content-center mb-3">
          <div class="col-12 col-lg-8 text-center">
            <h2 class="heading mb-3">Tujuan Kami</h2>
            <p>
              Aplikasi pelaporan sampah memiliki beberapa tujuan yang penting
              dalam upaya mengelola sampah secara lebih efisien dan
              berkelanjutan.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <AccordionContainer>
              <AccordionCard
                title="Mengurangi Pencemaran Lingkungan"
                body="Dengan memungkinkan masyarakat untuk dengan mudah melaporkan tempat-tempat yang tercemar oleh sampah atau limbah, aplikasi ini membantu mengidentifikasi dan mengatasi masalah pencemaran lingkungan lebih cepat. Tindakan pembersihan atau pemrosesan dapat dilakukan lebih efisien untuk mencegah kerusakan lingkungan."
                accr-id="headingOne"
                accr-target="collapseOne"
              />
              <AccordionCard
                title="Meningkatkan Kesadaran Lingkungan"
                body="Aplikasi pelaporan sampah juga dapat berperan dalam meningkatkan kesadaran masyarakat tentang pentingnya menjaga lingkungan yang bersih dan sehat. Melalui penggunaan aplikasi ini, masyarakat dapat lebih sadar akan dampak sampah terhadap lingkungan dan kesehatan mereka sendiri."
                accr-id="headingTwo"
                accr-target="collapseTwo"
              />
              <AccordionCard
                title="Partisipasi Masyarakat"
                body="Aplikasi pelaporan sampah mendorong partisipasi aktif masyarakat dalam mengatasi masalah sampah. Ini dapat menciptakan ikatan yang lebih kuat antara masyarakat dan pemerintah atau lembaga pengelola sampah, memungkinkan kolaborasi dalam menjaga kebersihan lingkungan."
                accr-id="headingThree"
                accr-target="collapseThree"
              />
            </AccordionContainer>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style scoped>
#hero .container {
  height: 100vh;
  display: flex;
  align-items: center;
}

#objective {
  margin-bottom: 100px;
}

@media (max-width: 768px) {
  #objective {
    margin-top: 100px;
  }
}
</style>

<script>
  import { PROJECT_NAME, LOGO_PATH } from "$lib/config/general";
  import { ABOUT_PAGE_SEO } from "$lib/config/about-page";
  import { page } from "$app/stores";
  import Seo from '$lib/components/Common/Seo/Seo.svelte';

  const { title, description, contentType, image } = ABOUT_PAGE_SEO;
  const url = $page.url.href;
  image.url = `${url}${LOGO_PATH}`;
  
</script>
<style lang="less">
  @import './About';
</style>

<main class="container">
  <img src="{LOGO_PATH}" alt="{image.alt}">
  <section>
    <h1>{`Mi a ${PROJECT_NAME}?`}</h1>
    <p>  
      Az oldal célja, hogy a Digitális Képarchívum gyűjteményét elérhetőbbé tegye, elsősorban a mobil eszközöket használók számára. 
      <br>
      A gyűjteményben több mint 100 ezer dokumentum található a legkülönfélébb témákban. 
      Ha többet szeretnél tudni a Digitális Képarchívumról, látogasd meg az oldalukat: 
      <a href="https://dka.oszk.hu/">https://dka.oszk.hu/</a>.
    </p>
  </section>

  <section>
    <h2>Miért?</h2>
    <p>
      Az oldalt a SvelteKittel való ismerkedés céljából kezdtem el fejleszteni, a <a href="https://dka.oszk.hu/export/xml_/">DKA adatbázisa</a> pedig jó alapot adott hozzá. 
      <br>
      Igaz, a dokumentumok nem mindig következetesen vannak rögzítve, így valamivel bonyolultabb hiba nélkül előhívni őket, mintha például egy REST API-ból.
      <br>
      A SvelteKit oldala: <a href="https://kit.svelte.dev/">https://kit.svelte.dev/</a>
    </p>
  </section>

  <section>
    <h2>Mi lesz még?</h2>
    <p>
      Sok fejleszteni való van még az oldalon, szeretném folyamatosan új funkciókkal bővíteni.
      <br>
      A közeli jövőben egy éjszakai módot szeretnék hozzáadni, valamint a DKA RSS feed-jének az olvasását egy új route-on.
      De egy kifinomultabb vizuális megjelenés is szóba jöhet. 
      <br>
      Az oldal kódját elérheted <a href="https://github.com/matyas-mihalyi/dka">GitHubon</a>.
    </p>
  </section>

</main>

<Seo
  {title}
  {description}
  {url}
  {contentType}
  {image}
/>
<script>
  import '../app.css';
  import Starfield from '$lib/components/Starfield.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<Starfield />
<Navbar />

<main class="relative z-10">
  <slot />
</main>

<Footer />

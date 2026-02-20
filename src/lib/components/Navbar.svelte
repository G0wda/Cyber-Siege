<script>
  import { page } from '$app/stores';
  let mobileOpen = false;

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Challenges', href: '/#challenges' },
    { label: 'Register', href: '/register' },
  ];
</script>

<nav class="fixed top-0 left-0 right-0 z-50">
  <!-- Scanline top border -->
  <div class="h-px w-full" style="background: linear-gradient(90deg, transparent, #00f5ff, #bf00ff, transparent);"></div>

  <div class="backdrop-blur-xl bg-black/40 border-b border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <a href="/" class="flex items-center gap-3 group">
          <div class="relative w-9 h-9">
            <div class="absolute inset-0 rounded-full border-2 border-neon-cyan animate-pulse-glow"></div>
            <div class="absolute inset-1 rounded-full border border-neon-violet opacity-60"></div>
            <svg class="absolute inset-0 w-full h-full p-2" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 22,18 2,18" stroke="#00f5ff" stroke-width="1.5" fill="none"/>
              <circle cx="12" cy="12" r="3" fill="#bf00ff"/>
            </svg>
          </div>
          <span class="font-display font-bold text-xl tracking-widest text-star-white group-hover:text-neon-cyan transition-colors">
            CYBER<span class="text-neon-violet">SIEGE</span>
          </span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          {#each links as link}
            {#if link.href === '/register'}
              <a href={link.href} class="btn-primary text-xs py-2 px-5 rounded">
                {link.label}
              </a>
            {:else}
              <a
                href={link.href}
                class="font-body text-sm tracking-wider text-white/60 hover:text-neon-cyan transition-all duration-300 relative group"
              >
                {link.label}
                <span class="absolute -bottom-1 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300"></span>
              </a>
            {/if}
          {/each}
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 cursor-pointer"
          on:click={() => mobileOpen = !mobileOpen}
          aria-label="Toggle menu"
        >
          <span class="h-px w-full transition-all duration-300 {mobileOpen ? 'rotate-45 translate-y-2' : ''}" style="background:#00f5ff;"></span>
          <span class="h-px w-full transition-all duration-300 {mobileOpen ? 'opacity-0' : ''}" style="background:#00f5ff;"></span>
          <span class="h-px w-full transition-all duration-300 {mobileOpen ? '-rotate-45 -translate-y-2' : ''}" style="background:#00f5ff;"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if mobileOpen}
      <div class="md:hidden border-t border-white/5 bg-black/60 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
        {#each links as link}
          <a
            href={link.href}
            class="font-body text-sm tracking-wider {link.href === '/register' ? 'text-neon-cyan' : 'text-white/70 hover:text-neon-cyan'} transition-colors"
            on:click={() => mobileOpen = false}
          >
            {link.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</nav>

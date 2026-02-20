<script>
  const socials = [
    { label: 'Twitter', icon: '𝕏', href: '#' },
    { label: 'Discord', icon: '⚡', href: '#' },
    { label: 'GitHub', icon: '◈', href: '#' },
    { label: 'LinkedIn', icon: '⬡', href: '#' },
  ];

  const links = [
    { label: 'Rules', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy', href: '#' },
  ];
</script>

<footer class="relative border-t overflow-hidden" style="border-color: #00f5ff22;">
  <div class="absolute inset-0 z-0" style="background: linear-gradient(to top, #0a021e55, transparent);"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Top row -->
    <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
      <!-- Brand -->
      <div class="max-w-xs">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 relative">
            <div class="absolute inset-0 rounded-full border-2 border-neon-cyan opacity-80"></div>
            <svg class="absolute inset-0 w-full h-full p-2" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 22,18 2,18" stroke="#00f5ff" stroke-width="1.5" fill="none"/>
              <circle cx="12" cy="12" r="3" fill="#bf00ff"/>
            </svg>
          </div>
          <span class="font-display font-bold text-xl tracking-widest">
            CYBER<span class="text-neon-violet">SIEGE</span>
          </span>
        </div>
        <p class="font-body text-sm text-white/40 leading-relaxed">
          The premier cybersecurity competition pushing hackers beyond known limits.
        </p>
      </div>

      <!-- Quick links -->
      <div>
        <h4 class="font-mono text-xs text-neon-cyan tracking-widest mb-4">// NAVIGATION</h4>
        <div class="flex flex-col gap-2">
          {#each links as link}
            <a href={link.href} class="font-body text-sm text-white/50 hover:text-neon-cyan transition-colors tracking-wide">{link.label}</a>
          {/each}
        </div>
      </div>

      <!-- Socials -->
      <div>
        <h4 class="font-mono text-xs text-neon-cyan tracking-widest mb-4">// CONNECT</h4>
        <div class="flex gap-4">
          {#each socials as s}
            <a href={s.href}
              class="w-10 h-10 rounded-full glass-card neon-border flex items-center justify-center text-white/60 hover:text-neon-cyan hover:scale-110 transition-all duration-300 text-sm"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          {/each}
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="h-px w-full mb-8" style="background: linear-gradient(90deg, transparent, #00f5ff33, #bf00ff33, transparent);"></div>

    <!-- Bottom row -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="font-mono text-xl text-white/30 tracking-wider">
        &copy; 2026 Cyber Siege CTF. All rights reserved.
      </p>
      <p class="font-mono text-xl text-white/40  tracking-wider">
        // CRAFTED IN THE VOID · POWERED BY <span class="text-neon-cyan">Cynex</span>
      </p>
    </div>
  </div>
</footer>

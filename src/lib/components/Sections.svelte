<script>
  const sections = [
    {
      id: 'section-one',
      num: '02',
      label: 'CHALLENGES',
      title: 'Section One',
      icon: '⚡',
      color: '#00f5ff',
    },
    {
      id: 'section-two',
      num: '03',
      label: 'LEADERBOARD',
      title: 'Section Two',
      icon: '🌌',
      color: '#bf00ff',
    },
    {
      id: 'section-three',
      num: '04',
      label: 'SPONSORS',
      title: 'Section Three',
      icon: '🔐',
      color: '#0066ff',
    },
    {
      id: 'section-four',
      num: '05',
      label: 'RESOURCES',
      title: 'Section Four',
      icon: '🛸',
      color: '#ff006e',
    },
  ];
</script>

{#each sections as sec, i}
  <section id={sec.id} class="relative py-20 md:py-28 overflow-hidden">
    <!-- Alternating background blobs -->
    <div class="absolute inset-0 z-0 pointer-events-none"
      style="background: radial-gradient(ellipse at {i % 2 === 0 ? '80%' : '20%'} 50%, {sec.color}11 0%, transparent 60%);">
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="font-mono text-xs tracking-widest mb-4" style="color: {sec.color}">// {sec.num}_{sec.label}</div>

      <div class="glass-card p-12 md:p-20 text-center" style="border: 1px solid {sec.color}33; box-shadow: 0 0 40px {sec.color}11;">
        <!-- Coming soon icon -->
        <div class="text-6xl mb-6 animate-float" style="animation-delay: {i * 0.5}s">{sec.icon}</div>

        <h2 class="font-display font-bold text-4xl md:text-5xl mb-4" style="color: {sec.color}">{sec.title}</h2>
        <div class="w-20 h-px mx-auto mb-6" style="background: linear-gradient(90deg, transparent, {sec.color}, transparent);"></div>

        <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
          style="border: 1px solid {sec.color}44; background: {sec.color}11;">
          <div class="w-2 h-2 rounded-full animate-pulse" style="background: {sec.color}"></div>
          <span class="font-mono text-sm tracking-widest" style="color: {sec.color}">COMING SOON</span>
        </div>

        <p class="font-body text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
          This section is currently under construction. Our team is working on something extraordinary. 
          Check back soon for updates.
        </p>

        <!-- Fake terminal lines -->
        <div class="mt-8 max-w-sm mx-auto text-left glass-card p-4 border border-white/5">
          <div class="font-mono text-xs text-white/30 space-y-1">
            <div><span class="text-neon-cyan">$</span> loading_{sec.label.toLowerCase()}...</div>
            <div><span class="text-white/20">// initiating sequence</span></div>
            <div><span class="text-neon-violet">></span> STATUS: <span style="color:{sec.color}">PENDING</span></div>
            <div class="flex items-center gap-1">
              <span class="text-white/20">// awaiting deployment</span>
              <span class="animate-pulse" style="color:{sec.color}">▊</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
{/each}

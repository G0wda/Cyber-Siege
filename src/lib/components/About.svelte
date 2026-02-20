<script>
  const features = [
    {
      icon: '🛡️',
      title: 'Multiple Categories',
      desc: 'Web exploitation, reverse engineering, cryptography, forensics, pwn, and OSINT challenges await.',
    },
    {
      icon: '🌐',
      title: 'Global Competition',
      desc: 'Compete with hackers and security researchers from across the galaxy. Solo or in teams of up to 4.',
    },
    {
      icon: '🏆',
      title: 'Massive Prizes',
      desc: 'Top teams win cash prizes, internship opportunities, and exclusive cybersecurity swag.',
    },
    {
      icon: '🔮',
      title: 'Real-World Scenarios',
      desc: 'Challenges designed by industry experts to mirror actual penetration testing scenarios.',
    },
  ];
</script>

<section id="about" class="relative py-24 md:py-36">
  <div class="absolute inset-0 z-0" style="background: radial-gradient(ellipse at 20% 50%, #0a021e33 0%, transparent 60%),
    radial-gradient(ellipse at 80% 50%, #00111a22 0%, transparent 60%);"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section header -->
    <div class="text-center mb-20">
      <div class="font-mono text-xs text-neon-cyan tracking-widest mb-4">// 01_ABOUT</div>
      <h2 class="section-title">What is Cyber Siege CTF?</h2>
      <div class="w-24 h-px mx-auto mb-8" style="background: linear-gradient(90deg, transparent, #00f5ff, transparent);"></div>
      <p class="font-body text-white/60 max-w-3xl mx-auto text-lg leading-relaxed">
        Cyber Siege CTF is an elite 48-hour Capture The Flag competition designed for cybersecurity enthusiasts, 
        researchers, and professional hackers. Set in a deep-space command center aesthetic, it challenges 
        participants to solve complex security puzzles across multiple domains.
      </p>
    </div>

    <!-- Feature cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each features as feat, i}
        <div class="glass-card neon-border p-6 hover:scale-105 transition-all duration-300 group"
          style="animation-delay: {i * 100}ms">
          <div class="text-4xl mb-4">{feat.icon}</div>
          <h3 class="font-display font-bold text-base text-star-white mb-3 group-hover:text-neon-cyan transition-colors">{feat.title}</h3>
          <p class="font-body text-sm text-white/50 leading-relaxed">{feat.desc}</p>
        </div>
      {/each}
    </div>

    <!-- Timeline / How it works -->
    <div class="mt-24 glass-card p-8 md:p-12" style="border: 1px solid #bf00ff33; box-shadow: 0 0 40px #bf00ff11;">
      <h3 class="font-display font-bold text-2xl md:text-3xl text-center text-gradient mb-12">How It Works</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Connector line (desktop) -->
        <div class="hidden md:block absolute top-8 left-1/3 right-1/3 h-px" style="background: linear-gradient(90deg, #00f5ff, #bf00ff);"></div>

        {#each [['01', 'Register', 'Sign up solo or form a team of up to 4 members before the deadline.'],
                ['02', 'Compete', '48 hours of intense hacking across 50+ challenges in various categories.'],
                ['03', 'Triumph', 'Capture flags, rack up points, and claim your place on the leaderboard.']] as [num, title, desc]}
          <div class="text-center relative">
            <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-display font-bold text-2xl text-neon-cyan"
              style="border: 2px solid #00f5ff; box-shadow: 0 0 20px #00f5ff44; background: #00f5ff11;">
              {num}
            </div>
            <h4 class="font-display font-bold text-lg text-star-white mb-2">{title}</h4>
            <p class="font-body text-sm text-white/50 leading-relaxed">{desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

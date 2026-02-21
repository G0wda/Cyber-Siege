<script>
  // ── Challenge domain data (Section One) ─────────────────────────────────────
  const domains = [
    {
      id: 'web', label: 'WEB', title: 'Web Exploitation',
      color: '#00f5ff', glow: 'rgba(0,245,255,0.15)', border: 'rgba(0,245,255,0.25)',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      desc: 'Exploit web app vulnerabilities — SQLi, XSS, CSRF, SSRF, auth bypasses, and more.',
      difficulty: 'Easy → Hard', diffLevel: 3,
      count: 8, maxPts: 500,
      tags: ['SQLi', 'XSS', 'IDOR', 'SSRF', 'OAuth', 'JWT'],
    },
    {
      id: 'rev', label: 'REV', title: 'Reverse Engineering',
      color: '#ff6b35', glow: 'rgba(255,107,53,0.15)', border: 'rgba(255,107,53,0.25)',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
      desc: 'Dissect binaries, firmware, and malware. Defeat obfuscation and recover hidden logic.',
      difficulty: 'Medium → Expert', diffLevel: 4,
      count: 7, maxPts: 750,
      tags: ['x86', 'ARM', 'ELF', 'PE', 'Anti-debug', 'VM'],
    },
    {
      id: 'crypto', label: 'CRYPTO', title: 'Cryptography',
      color: '#bf00ff', glow: 'rgba(191,0,255,0.15)', border: 'rgba(191,0,255,0.25)',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      desc: 'Break ciphers, attack weak RSA/AES/ECC, and exploit custom cryptographic schemes.',
      difficulty: 'Easy → Expert', diffLevel: 5,
      count: 9, maxPts: 700,
      tags: ['RSA', 'AES', 'ECC', 'XOR', 'Padding Oracle', 'LCG'],
    },
    {
      id: 'steg', label: 'STEG', title: 'Steganography',
      color: '#00ff88', glow: 'rgba(0,255,136,0.15)', border: 'rgba(0,255,136,0.25)',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
      desc: 'Find hidden messages in images, audio, and video. Uncover what the eye cannot see.',
      difficulty: 'Easy → Hard', diffLevel: 3,
      // count: 6,
      maxPts: 400,
      tags: ['LSB', 'DCT', 'Audio', 'Video', 'Metadata', 'DNA'],
    },
    // {
    //   id: 'ai', label: 'AI SEC', title: 'AI Security',
    //   color: '#ff00aa', glow: 'rgba(255,0,170,0.15)', border: 'rgba(255,0,170,0.25)',
    //   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="19" cy="5" r="3"/></svg>`,
    //   desc: 'Attack AI/ML systems — adversarial examples, model inversion, prompt injection, jailbreaks.',
    //   difficulty: 'Medium → Expert', diffLevel: 4,
    //   count: 5, maxPts: 1000,
    //   tags: ['LLM Jailbreak', 'Prompt Injection', 'Adversarial ML', 'Model Theft'],
    // },
    // {
    //   id: 'iot', label: 'IOT', title: 'IoT Security',
    //   color: '#ffaa00', glow: 'rgba(255,170,0,0.15)', border: 'rgba(255,170,0,0.25)',
    //   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/><circle cx="12" cy="10" r="3"/></svg>`,
    //   desc: 'Hack embedded devices, firmware, and protocols — MQTT, BLE, Zigbee, custom hardware.',
    //   difficulty: 'Medium → Expert', diffLevel: 4,
    //   count: 5, maxPts: 900,
    //   tags: ['MQTT', 'BLE', 'Firmware', 'UART', 'Zigbee', 'JTAG'],
    // },
    {
      id: 'forensics', label: 'FORENSICS', title: 'Digital Forensics',
      color: '#00d4ff', glow: 'rgba(0,212,255,0.15)', border: 'rgba(0,212,255,0.25)',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>`,
      desc: 'Recover deleted files, analyze memory dumps, dissect PCAPs, reconstruct digital crimes.',
      difficulty: 'Easy → Hard', diffLevel: 3,
      count: 7, maxPts: 600,
      tags: ['PCAP', 'Memory', 'Disk', 'Registry', 'Volatility', 'Timeline'],
    },
    {
      id: 'pwn', label: 'PWN', title: 'Binary Exploitation',
      color: '#ff3366', glow: 'rgba(255,51,102,0.15)', border: 'rgba(255,51,102,0.25)',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
      desc: 'Smash stacks, overwrite heaps, bypass ASLR/PIE/NX. Get shells via memory corruption.',
      difficulty: 'Hard → Expert', diffLevel: 5,
      count: 6, maxPts: 1000,
      tags: ['Buffer Overflow', 'ROP', 'Heap', 'Format String', 'ret2libc'],
    },
    {
      id: 'osint', label: 'OSINT', title: 'OSINT',
      color: '#a0ff00', glow: 'rgba(160,255,0,0.15)', border: 'rgba(160,255,0,0.25)',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
      desc: 'Hunt the open web — find personas, locate targets, reconstruct timelines from public data.',
      difficulty: 'Easy → Hard', diffLevel: 3,
      count: 6, maxPts: 500,
      tags: ['Geolocation', 'Metadata', 'WHOIS', 'Shodan', 'Google Dorking'],
    },
  ];

  let activeFilter = 'ALL';
  const filters = ['ALL', 'Easy', 'Medium', 'Hard', 'Expert'];
  $: filtered = activeFilter === 'ALL'
    ? domains
    : domains.filter(d => d.difficulty.toLowerCase().includes(activeFilter.toLowerCase()));
  const totalChallenges = domains.reduce((s, d) => s + d.count, 0);

  // ── Remaining placeholder sections ──────────────────────────────────────────
  const otherSections = [
    { id: 'section-three', num: '04', label: 'SPONSORS',    title: 'Section Three', icon: '🔐', color: '#0066ff' },
    { id: 'section-four',  num: '05', label: 'RESOURCES',   title: 'Section Four',  icon: '🛸', color: '#ff006e' },
  ];
</script>

<!-- ══════════════════════════════════════════════════════════════════════════
     SECTION ONE — CHALLENGES (fully implemented)
══════════════════════════════════════════════════════════════════════════ -->
<section id="section-one" class="relative py-24 md:py-36 overflow-hidden">

  <!-- Atmospheric background -->
  <div class="absolute inset-0 z-0 pointer-events-none" style="
    background:
      radial-gradient(ellipse at 80% 20%, rgba(0,245,255,0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 15% 80%, rgba(191,0,255,0.04) 0%, transparent 50%);
  "></div>

  <!-- Hex grid overlay -->
  <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.025]" style="
    background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpolygon points='30,1 59,17 59,35 30,51 1,35 1,17' fill='none' stroke='%2300f5ff' stroke-width='1'/%3E%3C/svg%3E&quot;);
    background-size: 60px 52px;
  "></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


    <!-- Header -->
    <div class="text-center mb-16">
      <h2 class="font-display font-black leading-none mb-3">
        <span class="text-gradient text-5xl md:text-6xl lg:text-7xl">CHALLENGE</span>
        <span class="block text-white/65 text-3xl md:text-4xl tracking-[0.3em] mt-2">ARENAS</span>
      </h2>
      <div class="w-32 h-px mx-auto my-6" style="background: linear-gradient(90deg,transparent,#00f5ff,#bf00ff,transparent);"></div>
      <p class="font-body text-white/50 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
        Nine domains of cyber warfare. Master them all or specialise in your craft —
        every flag you capture earns your team a step closer to the throne.
      </p>
    </div>

    <!-- Stats row -->
    <div class="flex flex-wrap justify-center gap-4 mb-14">
      {#each [/*[totalChallenges, 'Challenges'],*/ [domains.length, 'Domains'], ['24h', 'Duration'],['3k+ points']] as [val, lbl]}
        <div class="glass-card text-center px-6 py-4 min-w-[100px]" style="border:1px solid rgba(0,245,255,0.1);">
          <div class="font-display font-bold text-2xl text-neon-cyan">{val}</div>
          <div class="font-mono text-[10px] text-white/35 tracking-widest mt-1">{lbl}</div>
        </div>
      {/each}
    </div>

    <!-- Difficulty filters -->
    <div class="flex flex-wrap justify-center gap-2 mb-12">
      {#each filters as f}
        <button
          class="px-4 py-2 rounded-full font-mono text-xs tracking-widest transition-all duration-300 cursor-pointer"
          style="
            border: 1px solid {activeFilter === f ? '#00f5ff' : 'rgba(255,255,255,0.1)'};
            background: {activeFilter === f ? '#00f5ff' : 'transparent'};
            color: {activeFilter === f ? '#02010a' : 'rgba(255,255,255,0.45)'};
            {activeFilter === f ? 'box-shadow:0 0 20px rgba(0,245,255,0.35);font-weight:700;' : ''}
          "
          on:click={() => activeFilter = f}
        >{f}</button>
      {/each}
    </div>

    <!-- Domain cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each filtered as d, i}
        <article
          class="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
          style="
            background: rgba(255,255,255,0.025);
            border: 1px solid {d.border};
            box-shadow: 0 4px 24px {d.glow};
            animation: cardIn 0.4s ease both;
            animation-delay: {i * 55}ms;
          "
        >
          <!-- Top accent line -->
          <div class="absolute top-0 inset-x-0 h-0.5 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            style="background: linear-gradient(90deg, transparent, {d.color}, transparent);"></div>

          <!-- Hover glow -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style="background: radial-gradient(ellipse at 50% 0%, {d.glow} 0%, transparent 65%);"></div>

          <div class="relative p-5">
            <!-- Card header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style="color:{d.color}; background:{d.glow}; border:1px solid {d.border}; box-shadow:0 0 12px {d.glow};">
                  <div class="w-5 h-5">{@html d.icon}</div>
                </div>
                <div>
                  <div class="font-mono text-[9px] tracking-[4px] mb-0.5" style="color:{d.color}">{d.label}</div>
                  <h3 class="font-display font-bold text-sm text-star-white leading-tight">{d.title}</h3>
                </div>
              </div>
              <!-- <div class="text-center px-2.5 py-1 rounded-lg shrink-0" style="background:{d.glow}; border:1px solid {d.border};">
                <div class="font-display font-bold text-lg leading-none" style="color:{d.color}">{d.count}</div>
                <div class="font-mono text-[7px] text-white/30 tracking-wider mt-0.5">CHALLS</div>
              </div> -->
            </div>

            <!-- Description -->
            <p class="font-body text-xs text-white/48 leading-relaxed mb-4 group-hover:text-white/62 transition-colors duration-300">{d.desc}</p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              {#each d.tags.slice(0, 4) as tag}
                <span class="font-mono text-[8px] px-2 py-0.5 rounded tracking-wide bg-white/[0.04] border border-white/[0.07] text-white/35">{tag}</span>
              {/each}
              {#if d.tags.length > 4}
                <span class="font-mono text-[8px] px-2 py-0.5 rounded tracking-wide"
                  style="color:{d.color}; border:1px solid {d.border}; background:{d.glow}">+{d.tags.length - 4}</span>
              {/if}
            </div>

            <!-- Difficulty + points footer -->
            <div class="flex items-center justify-between pt-3.5" style="border-top:1px solid rgba(255,255,255,0.05);">
              <div class="flex items-center gap-2">
                <div class="flex gap-0.5">
                  {#each Array(5) as _, j}
                    <div class="w-3.5 h-1.5 rounded-full"
                      style="background:{j < d.diffLevel ? d.color : 'rgba(255,255,255,0.08)'}; {j < d.diffLevel ? `box-shadow:0 0 4px ${d.color};` : ''}">
                    </div>
                  {/each}
                </div>
                <span class="font-mono text-[8px] text-white/28 tracking-wide">{d.difficulty}</span>
              </div>
              <span class="font-mono text-[10px]" style="color:{d.color}">up to <strong>{d.maxPts}</strong> pts</span>
            </div>
          </div>
        </article>
      {/each}

      {#if filtered.length === 0}
        <div class="col-span-full text-center py-16 font-mono text-white/25 text-sm tracking-widest">
          // NO DOMAINS MATCH THIS FILTER
        </div>
      {/if}
    </div>

  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SECTIONS TWO, THREE, FOUR — Coming Soon placeholders
══════════════════════════════════════════════════════════════════════════ -->
{#each otherSections as sec, i}
  <section id={sec.id} class="relative py-20 md:py-28 overflow-hidden">
    <div class="absolute inset-0 z-0 pointer-events-none"
      style="background: radial-gradient(ellipse at {i % 2 === 0 ? '80%' : '20%'} 50%, {sec.color}11 0%, transparent 60%);">
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="font-mono text-xs tracking-widest mb-4" style="color: {sec.color}">// {sec.num}_{sec.label}</div>

      <div class="glass-card p-12 md:p-20 text-center" style="border: 1px solid {sec.color}33; box-shadow: 0 0 40px {sec.color}11;">
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

        <div class="mt-8 max-w-sm mx-auto text-left glass-card p-4 border border-white/5">
          <div class="font-mono text-xs text-white/30 space-y-1">
            <div><span class="text-neon-cyan">$</span> loading_{sec.label.toLowerCase()}...</div>
            <div><span class="text-white/20">// initiating sequence</span></div>
            <div><span class="text-neon-violet">›</span> STATUS: <span style="color:{sec.color}">PENDING</span></div>
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

<style>
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
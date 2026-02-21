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
      count: 6, maxPts: 400,
      tags: ['LSB', 'DCT', 'Audio', 'Video', 'Metadata', 'DNA'],
    },
    {
      id: 'ai', label: 'AI SEC', title: 'AI Security',
      color: '#ff00aa', glow: 'rgba(255,0,170,0.15)', border: 'rgba(255,0,170,0.25)',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="19" cy="5" r="3"/></svg>`,
      desc: 'Attack AI/ML systems — adversarial examples, model inversion, prompt injection, jailbreaks.',
      difficulty: 'Medium → Expert', diffLevel: 4,
      count: 5, maxPts: 1000,
      tags: ['LLM Jailbreak', 'Prompt Injection', 'Adversarial ML', 'Model Theft'],
    },
    {
      id: 'iot', label: 'IOT', title: 'IoT Security',
      color: '#ffaa00', glow: 'rgba(255,170,0,0.15)', border: 'rgba(255,170,0,0.25)',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/><circle cx="12" cy="10" r="3"/></svg>`,
      desc: 'Hack embedded devices, firmware, and protocols — MQTT, BLE, Zigbee, custom hardware.',
      difficulty: 'Medium → Expert', diffLevel: 4,
      count: 5, maxPts: 900,
      tags: ['MQTT', 'BLE', 'Firmware', 'UART', 'Zigbee', 'JTAG'],
    },
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

  // ── Placeholder sections (leaderboard + sponsors only) ──────────────────────
  const otherSections = [
    // { id: 'section-two',   num: '03', label: 'LEADERBOARD', title: 'Section Two',   icon: '🌌', color: '#bf00ff' },
    { id: 'section-three', num: '03', label: 'SPONSORS',    title: 'Section Three', icon: '🔐', color: '#0066ff' },
  ];

  // ── Resources data ───────────────────────────────────────────────────────────
  const toolCategories = [
    {
      label: 'Web & Network',
      color: '#00f5ff',
      tools: [
        { name: 'Burp Suite',   desc: 'Web app security testing proxy',        url: 'https://portswigger.net/burp' },
        { name: 'Wireshark',    desc: 'Network packet capture & analysis',     url: 'https://wireshark.org' },
        { name: 'sqlmap',       desc: 'Automated SQL injection tool',           url: 'https://sqlmap.org' },
        { name: 'ffuf',         desc: 'Fast web fuzzer for dirs & parameters', url: 'https://github.com/ffuf/ffuf' },
      ],
    },
    {
      label: 'Reverse Eng. & Pwn',
      color: '#ff6b35',
      tools: [
        { name: 'Ghidra',       desc: 'NSA open-source reverse engineering suite', url: 'https://ghidra-sre.org' },
        { name: 'IDA Free',     desc: 'Industry-standard disassembler',             url: 'https://hex-rays.com/ida-free' },
        { name: 'pwntools',     desc: 'Python CTF & exploit development library',   url: 'https://pwntools.com' },
        { name: 'GDB + peda',   desc: 'GNU debugger with exploit dev extension',    url: 'https://github.com/longld/peda' },
      ],
    },
    {
      label: 'Crypto & Steg',
      color: '#bf00ff',
      tools: [
        { name: 'CyberChef',    desc: 'Swiss-army knife for data transformations', url: 'https://gchq.github.io/CyberChef' },
        { name: 'SageMath',     desc: 'Mathematics software for crypto attacks',    url: 'https://sagemath.org' },
        { name: 'Steghide',     desc: 'Embed/extract data from image & audio',      url: 'https://steghide.sourceforge.net' },
        { name: 'zsteg',        desc: 'Detect steganography in PNG/BMP files',      url: 'https://github.com/zed-0xff/zsteg' },
      ],
    },
    {
      label: 'Forensics & OSINT',
      color: '#00d4ff',
      tools: [
        { name: 'Volatility 3', desc: 'Advanced memory forensics framework',        url: 'https://volatilityfoundation.org' },
        { name: 'Autopsy',      desc: 'Digital forensics platform & GUI',           url: 'https://sleuthkit.org/autopsy' },
        { name: 'Shodan',       desc: 'Search engine for internet-connected devices', url: 'https://shodan.io' },
        { name: 'ExifTool',     desc: 'Read/write metadata in files',               url: 'https://exiftool.org' },
      ],
    },
  ];

  const learningResources = [
    {
      category: 'Practice Platforms',
      color: '#00f5ff',
      icon: '⚔️',
      items: [
        { name: 'PicoCTF',          desc: 'Beginner-friendly CTF challenges by Carnegie Mellon',  url: 'https://picoctf.org' },
        { name: 'HackTheBox',       desc: 'Hacking labs and real-world machine challenges',         url: 'https://hackthebox.com' },
        { name: 'TryHackMe',        desc: 'Guided cybersecurity learning paths for all levels',     url: 'https://tryhackme.com' },
        { name: 'CTFlearn',         desc: 'Community-driven CTF challenge platform',                url: 'https://ctflearn.com' },
        { name: 'pwn.college',      desc: 'In-depth pwn and system security education',             url: 'https://pwn.college' },
      ],
    },
    {
      category: 'Writeup Archives',
      color: '#ff00aa',
      icon: '📝',
      items: [
        { name: 'CTFtime.org',      desc: 'Global CTF event tracker and writeup repository',        url: 'https://ctftime.org' },
        { name: 'GitHub Writeups',  desc: 'Search "CTF writeup" for thousands of solutions',        url: 'https://github.com/search?q=CTF+writeup' },
        { name: 'IppSec YouTube',   desc: 'HackTheBox walkthroughs by IppSec',                      url: 'https://youtube.com/@ippsec' },
        { name: 'LiveOverflow',     desc: 'In-depth hacking concepts and CTF explanations',         url: 'https://youtube.com/@LiveOverflow' },
      ],
    },
    {
      category: 'Reading & Docs',
      color: '#a0ff00',
      icon: '📚',
      items: [
        { name: 'PortSwigger Academy', desc: 'Free web security labs and learning material',        url: 'https://portswigger.net/web-security' },
        { name: 'pwn.college Modules', desc: 'ASM, kernel, and binary exploitation courses',        url: 'https://pwn.college/modules' },
        { name: 'CryptoHack',          desc: 'Interactive cryptography challenges and tutorials',   url: 'https://cryptohack.org' },
        { name: 'OWASP Top 10',        desc: 'The ten most critical web application risks',         url: 'https://owasp.org/Top10' },
      ],
    },
  ];

  const quickTips = [
    { num: '01', tip: 'Read the challenge description carefully — hints are often hidden in plain sight.' },
    { num: '02', tip: 'Flags follow the format: CS{your_flag_here}. Case-sensitive.' },
    { num: '03', tip: 'Stuck? Take a break. A fresh pair of eyes cracks more flags than caffeine.' },
    { num: '04', tip: 'Collaborate with your team — different people catch different things.' },
    { num: '05', tip: 'Document your approach as you go. Win or lose, writeups sharpen your skills.' },
    { num: '06', tip: 'Partial credit is available for some challenges — submit early, refine later.' },
  ];
</script>

<!-- ══════════════════════════════════════════════════════════════════════════
     SECTION ONE — CHALLENGES (fully implemented)
══════════════════════════════════════════════════════════════════════════ -->
<section id="challenges" class="relative py-24 md:py-36 overflow-hidden">

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

    <!-- Section label -->
    <div class="font-mono text-xl text-neon-cyan tracking-widest mb-10">// 02_CHALLENGES</div>

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
      {#each [[totalChallenges, 'Challenges'], [domains.length, 'Domains'], ['48h', 'Duration'], ['$10K', 'Prize Pool']] as [val, lbl]}
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
              <div class="text-center px-2.5 py-1 rounded-lg shrink-0" style="background:{d.glow}; border:1px solid {d.border};">
                <div class="font-display font-bold text-lg leading-none" style="color:{d.color}">{d.count}</div>
                <div class="font-mono text-[7px] text-white/30 tracking-wider mt-0.5">CHALLS</div>
              </div>
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
      <div class="font-mono text-xl tracking-widest mb-4" style="color: {sec.color}">// {sec.num}_{sec.label}</div>

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


<!-- ══════════════════════════════════════════════════════════════════════════
     SECTION FOUR — RESOURCES (fully implemented)
══════════════════════════════════════════════════════════════════════════ -->
<section id="section-four" class="relative py-24 md:py-36 overflow-hidden">

  <!-- Atmospheric background -->
  <div class="absolute inset-0 z-0 pointer-events-none" style="
    background:
      radial-gradient(ellipse at 85% 15%, rgba(255,0,110,0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 10% 85%, rgba(255,170,0,0.04) 0%, transparent 50%);
  "></div>

  <!-- Dot-grid overlay -->
  <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style="
    background-image: radial-gradient(circle, #ff006e 1px, transparent 1px);
    background-size: 28px 28px;
  "></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Section label -->
    <div class="font-mono text-xl tracking-widest mb-10" style="color:#ff006e;">// 04_RESOURCES</div>

    <!-- Header -->
    <div class="text-center mb-20">
      <h2 class="font-display font-black leading-none mb-3">
        <span class="text-5xl md:text-6xl lg:text-7xl" style="background:linear-gradient(135deg,#ff006e,#ffaa00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">RESOURCES</span>
        <span class="block text-white/65 text-3xl md:text-4xl tracking-[0.3em] mt-2">& TOOLS</span>
      </h2>
      <div class="w-32 h-px mx-auto my-6" style="background:linear-gradient(90deg,transparent,#ff006e,#ffaa00,transparent);"></div>
      <p class="font-body text-white/50 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
        Everything you need to prepare, compete, and level up.
        Hand-picked tools, platforms, and learning material from the community.
      </p>
    </div>

    <!-- ── TOOLS GRID ──────────────────────────────────────────────────────── -->
    <div class="mb-20">
      <div class="flex items-center gap-4 mb-8">
        <div class="font-mono text-xl tracking-[4px] text-white/40">// ESSENTIAL_TOOLS</div>
        <div class="flex-1 h-px" style="background:linear-gradient(90deg,rgba(255,0,110,0.3),transparent);"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each toolCategories as cat}
          <div class="glass-card p-6 group"
            style="border:1px solid rgba(255,255,255,0.07); box-shadow:0 4px 20px rgba(0,0,0,0.2);">

            <!-- Category header -->
            <div class="flex items-center gap-3 mb-5 pb-4" style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <div class="w-2 h-2 rounded-full" style="background:{cat.color}; box-shadow:0 0 8px {cat.color};"></div>
              <span class="font-mono text-xs tracking-[3px]" style="color:{cat.color};">{cat.label}</span>
            </div>

            <!-- Tools list -->
            <div class="space-y-3">
              {#each cat.tools as tool}
                <a href={tool.url} target="_blank" rel="noopener noreferrer"
                  class="tool-link flex items-center justify-between gap-3 px-4 py-3 rounded-xl group/tool transition-all duration-300"
                  style="background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.05);"
                  on:mouseenter={e => { e.currentTarget.style.borderColor = cat.color + '44'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  on:mouseleave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
                >
                  <div class="flex-1 min-w-0">
                    <div class="font-display font-bold text-sm text-star-white mb-0.5">{tool.name}</div>
                    <div class="font-body text-xs text-white/40 truncate">{tool.desc}</div>
                  </div>
                  <!-- Arrow -->
                  <div class="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                    style="background:{cat.color}18; border:1px solid {cat.color}33; color:{cat.color};">
                    <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover/tool:translate-x-0.5 group-hover/tool:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M7 17L17 7M7 7h10v10"/>
                    </svg>
                  </div>
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- ── LEARNING RESOURCES ──────────────────────────────────────────────── -->
    <div class="mb-20">
      <div class="flex items-center gap-4 mb-8">
        <div class="font-mono text-xl tracking-[4px] text-white/40">// LEARNING_RESOURCES</div>
        <div class="flex-1 h-px" style="background:linear-gradient(90deg,rgba(255,0,110,0.3),transparent);"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {#each learningResources as cat}
          <div class="glass-card p-6" style="border:1px solid rgba(255,255,255,0.07);">

            <!-- Category header -->
            <div class="flex items-center gap-3 mb-5">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                style="background:{cat.color}18; border:1px solid {cat.color}33;">
                {cat.icon}
              </div>
              <div>
                <div class="font-mono text-[9px] tracking-[4px] mb-0.5" style="color:{cat.color};">RESOURCES</div>
                <div class="font-display font-bold text-sm text-star-white">{cat.category}</div>
              </div>
            </div>

            <!-- Resource list -->
            <div class="space-y-2">
              {#each cat.items as item}
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  class="block px-3 py-2.5 rounded-lg transition-all duration-200 group/item"
                  style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04);"
                  on:mouseenter={e => { e.currentTarget.style.borderColor = cat.color + '30'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  on:mouseleave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-display font-bold text-xs text-star-white group-hover/item:text-white transition-colors">{item.name}</span>
                    <svg class="w-3 h-3 shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity" style="color:{cat.color}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M7 17L17 7M7 7h10v10"/>
                    </svg>
                  </div>
                  <p class="font-body text-[10px] text-white/35 mt-0.5 leading-relaxed">{item.desc}</p>
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- ── QUICK TIPS ──────────────────────────────────────────────────────── -->
    <div>
      <div class="flex items-center gap-4 mb-8">
        <div class="font-mono text-xl tracking-[4px] text-white/40">// CTF_PLAYBOOK</div>
        <div class="flex-1 h-px" style="background:linear-gradient(90deg,rgba(255,0,110,0.3),transparent);"></div>
      </div>

      <div class="glass-card p-8 md:p-10" style="border:1px solid rgba(255,0,110,0.15); box-shadow:0 0 40px rgba(255,0,110,0.05);">

        <!-- Header -->
        <div class="flex items-center gap-4 mb-8">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style="background:rgba(255,0,110,0.12); border:1px solid rgba(255,0,110,0.25);">
            ⚡
          </div>
          <div>
            <div class="font-mono text-[9px] tracking-[4px] mb-0.5" style="color:#ff006e;">INSIDER TIPS</div>
            <h3 class="font-display font-bold text-lg text-star-white">Before You Compete</h3>
          </div>
          <div class="ml-auto font-mono text-[10px] text-white/25 hidden md:block">// {quickTips.length} tips loaded</div>
        </div>

        <!-- Tips grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each quickTips as tip}
            <div class="flex items-start gap-4 group">
              <!-- Number -->
              <div class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                style="background:rgba(255,0,110,0.1); border:1px solid rgba(255,0,110,0.25); color:#ff006e;">
                {tip.num}
              </div>
              <p class="font-body text-sm text-white/55 leading-relaxed group-hover:text-white/75 transition-colors duration-300">
                {tip.tip}
              </p>
            </div>
          {/each}
        </div>

        <!-- Flag format reminder -->
        <div class="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style="border-top:1px solid rgba(255,255,255,0.06);">
          <div class="font-mono text-xs text-white/30">// FLAG FORMAT</div>
          <div class="font-mono text-sm px-5 py-2.5 rounded-lg tracking-wider"
            style="background:rgba(255,0,110,0.08); border:1px solid rgba(255,0,110,0.2); color:#ff006e;">
            CS&#123;<span class="text-white/50">your_flag_here</span>&#125;
          </div>
          <div class="font-mono text-[10px] text-white/25 text-right">case-sensitive · submit early</div>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SECTION SIX — RULES & GUIDELINES
══════════════════════════════════════════════════════════════════════════ -->
<section id="rules" class="relative py-24 md:py-36 overflow-hidden">

  <!-- Background -->
  <div class="absolute inset-0 z-0 pointer-events-none" style="
    background:
      radial-gradient(ellipse at 90% 10%, rgba(0,102,255,0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 5% 90%,  rgba(0,245,255,0.04) 0%, transparent 50%);
  "></div>
  <!-- Scan-line texture -->
  <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.018]" style="
    background-image: repeating-linear-gradient(0deg, #00f5ff 0px, #00f5ff 1px, transparent 1px, transparent 32px);
  "></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Header -->
    <div class="font-mono text-xl tracking-widest mb-10" style="color:#0066ff;">// 05_RULES_AND_GUIDELINES</div>
    <div class="text-center mb-16">
      <h2 class="font-display font-black leading-none mb-3">
        <span class="text-5xl md:text-6xl lg:text-7xl" style="background:linear-gradient(135deg,#0066ff,#00f5ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">RULES &</span>
        <span class="block text-white/65 text-3xl md:text-4xl tracking-[0.3em] mt-2">GUIDELINES</span>
      </h2>
      <div class="w-32 h-px mx-auto my-6" style="background:linear-gradient(90deg,transparent,#0066ff,#00f5ff,transparent);"></div>
      <p class="font-body text-white/50 max-w-xl mx-auto text-base leading-relaxed">
        Competing fairly is non-negotiable. Read and understand all rules before the competition begins.
        Violations will result in immediate disqualification.
      </p>
    </div>

    <!-- ── Rules grid ──────────────────────────────────────────────────────── -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

      <!-- Card 1: General Conduct -->
      <div class="glass-card p-6" style="border:1px solid rgba(0,102,255,0.18);">
        <div class="flex items-center gap-3 mb-5 pb-4" style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
            style="background:rgba(0,102,255,0.1); border:1px solid rgba(0,102,255,0.25);">⚖️</div>
          <div>
            <div class="font-mono text-[9px] tracking-[4px] mb-0.5" style="color:#0066ff;">SECTION_01</div>
            <h3 class="font-display font-bold text-sl text-star-white">General Conduct</h3>
          </div>
        </div>
        <ul class="space-y-3">
          {#each [
            'All participants must register before the deadline. No on-the-spot registration will be accepted.',
            'Teams may consist of 1 to 5 members. Solo participation is permitted.',
            'Each participant may only be a member of one team. Cross-team participation is not allowed.',
            'Participants must be students or working professionals — open to all skill levels.',
            'Treat all participants, organizers, and volunteers with respect at all times.',
            'Any form of harassment, offensive language, or discriminatory behavior will lead to immediate disqualification.',
          ] as rule}
            <li class="flex items-start gap-3">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style="background:#0066ff; box-shadow:0 0 6px #0066ff;"></span>
              <span class="font-body text-sl text-white/55 leading-relaxed">{rule}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Card 2: Competition Rules -->
      <div class="glass-card p-6" style="border:1px solid rgba(0,245,255,0.18);">
        <div class="flex items-center gap-3 mb-5 pb-4" style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
            style="background:rgba(0,245,255,0.1); border:1px solid rgba(0,245,255,0.25);">🏁</div>
          <div>
            <div class="font-mono text-[9px] tracking-[4px] mb-0.5" style="color:#00f5ff;">SECTION_02</div>
            <h3 class="font-display font-bold text-sl text-star-white">Competition Rules</h3>
          </div>
        </div>
        <ul class="space-y-3">
          {#each [
            'The CTF will run for 48 hours continuously from the official start time.',
            'Challenges span 9 domains: Web, Reverse Engineering, Cryptography, Steganography, AI Security, IoT Security, Forensics, Pwn, and OSINT.',
            'Flag format is CS{...}. Flags are case-sensitive and must be submitted exactly.',
            'Each challenge may only be solved once per team. Duplicate submissions are ignored.',
            'Hints may be available for select challenges at a point penalty. Decide wisely.',
            'The scoreboard updates in real time. In the event of a tie, the team that submitted the last flag earlier wins.',
          ] as rule}
            <li class="flex items-start gap-3">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style="background:#00f5ff; box-shadow:0 0 6px #00f5ff;"></span>
              <span class="font-body text-sl text-white/55 leading-relaxed">{rule}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Card 3: Prohibited Actions -->
      <div class="glass-card p-6" style="border:1px solid rgba(255,51,102,0.18);">
        <div class="flex items-center gap-3 mb-5 pb-4" style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
            style="background:rgba(255,51,102,0.1); border:1px solid rgba(255,51,102,0.25);">🚫</div>
          <div>
            <div class="font-mono text-[9px] tracking-[4px] mb-0.5" style="color:#ff3366;">SECTION_03</div>
            <h3 class="font-display font-bold text-sl text-star-white">Prohibited Actions</h3>
          </div>
        </div>
        <ul class="space-y-3">
          {#each [
            'Attacking the competition infrastructure, other teams\' systems, or any external systems is strictly prohibited.',
            'Sharing flags, solutions, or hints with other teams during the live competition window is forbidden.',
            'Automated brute-force attacks against the CTF platform will result in IP bans and disqualification.',
            'Using AI tools to generate complete exploit code or solutions is discouraged and may be penalized.',
            'Any attempt to manipulate the scoreboard, exploit platform vulnerabilities, or interfere with judging is grounds for disqualification.',
            'Teams found violating rules will be disqualified without refund of the entry fee.',
          ] as rule}
            <li class="flex items-start gap-3">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style="background:#ff3366; box-shadow:0 0 6px #ff3366;"></span>
              <span class="font-body text-sl text-white/55 leading-relaxed">{rule}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Card 4: Scoring & Prizes -->
      <div class="glass-card p-6" style="border:1px solid rgba(191,0,255,0.18);">
        <div class="flex items-center gap-3 mb-5 pb-4" style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
            style="background:rgba(191,0,255,0.1); border:1px solid rgba(191,0,255,0.25);">🏆</div>
          <div>
            <div class="font-mono text-[9px] tracking-[4px] mb-0.5" style="color:#bf00ff;">SECTION_04</div>
            <h3 class="font-display font-bold text-sl text-star-white">Scoring & Prizes</h3>
          </div>
        </div>
        <ul class="space-y-3">
          {#each [
            'Points are awarded upon first correct flag submission. Dynamic scoring may apply to high-volume challenges.',
            'Bonus points may be awarded for first blood (first team to solve a challenge).',
            'Prize distribution will be announced at the closing ceremony after score verification.',
            'Organizers reserve the right to perform post-competition verification of all submissions.',
            'Prizes may be forfeited if a winning team is found to have violated any rules after results are announced.',
            'Certificates of participation will be issued to all registered teams who attempt at least one challenge.',
          ] as rule}
            <li class="flex items-start gap-3">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style="background:#bf00ff; box-shadow:0 0 6px #bf00ff;"></span>
              <span class="font-body text-sl text-white/55 leading-relaxed">{rule}</span>
            </li>
          {/each}
        </ul>
      </div>

    </div>

    <!-- ── Acknowledgement banner ──────────────────────────────────────────── -->
    <div class="glass-card px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
      style="border:1px solid rgba(0,102,255,0.2); box-shadow:0 0 30px rgba(0,102,255,0.05);">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
          style="background:rgba(0,102,255,0.12); border:1px solid rgba(0,102,255,0.25);">📋</div>
        <p class="font-body text-sl text-white/55 leading-relaxed">
          By registering for Cyber Siege CTF, you confirm that you have read, understood,
          and agree to abide by all of the above rules and guidelines.
        </p>
      </div>
      <a href="/register"
        class="shrink-0 px-5 py-2.5 rounded-lg font-mono text-xl tracking-widest transition-all duration-300"
        style="background:rgba(0,102,255,0.12); border:1px solid rgba(0,102,255,0.3); color:#0066ff;"
        on:mouseenter={e => { e.currentTarget.style.background = 'rgba(0,102,255,0.22)'; }}
        on:mouseleave={e => { e.currentTarget.style.background = 'rgba(0,102,255,0.12)'; }}>
        REGISTER NOW ›
      </a>
    </div>

  </div>
</section>


<!-- ══════════════════════════════════════════════════════════════════════════
     SECTION SEVEN — CONTACT DETAILS
══════════════════════════════════════════════════════════════════════════ -->
<section id="contact" class="relative py-24 md:py-36 overflow-hidden">

  <!-- Background -->
  <div class="absolute inset-0 z-0 pointer-events-none" style="
    background:
      radial-gradient(ellipse at 20% 20%, rgba(255,0,110,0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(191,0,255,0.04) 0%, transparent 50%);
  "></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Header -->
    <div class="font-mono text-xl tracking-widest mb-10" style="color:#ff006e;">// 06_CONTACT_DETAILS</div>
    <div class="text-center mb-16">
      <h2 class="font-display font-black leading-none mb-3">
        <span class="text-5xl md:text-6xl lg:text-7xl" style="background:linear-gradient(135deg,#ff006e,#bf00ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">CONTACT</span>
        <span class="block text-white/65 text-3xl md:text-4xl tracking-[0.3em] mt-2">THE TEAM</span>
      </h2>
      <div class="w-32 h-px mx-auto my-6" style="background:linear-gradient(90deg,transparent,#ff006e,#bf00ff,transparent);"></div>
      <p class="font-body text-white/50 max-w-xl mx-auto text-base leading-relaxed">
        Have a question, issue, or just want to reach out?
        Drop us a message and we'll get back to you before the siege begins.
      </p>
    </div>

    <!-- ── Contact cards ───────────────────────────────────────────────────── -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">

      <!-- Email -->
      <div class="glass-card p-6 group hover:-translate-y-1 transition-all duration-300"
        style="border:1px solid rgba(255,0,110,0.18);">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
          style="background:rgba(255,0,110,0.1); border:1px solid rgba(255,0,110,0.25);">📧</div>
        <div class="font-mono text-[14px] tracking-[4px] mb-1" style="color:#ff006e;">PRIMARY_CONTACT</div>
        <h3 class="font-display font-bold text-sm text-star-white mb-3">Email Us</h3>
        <div class="font-mono text-xl px-3 py-2.5 rounded-lg"
          style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.35);">
          <!-- ↓ REPLACE WITH REAL EMAIL -->
          cynex.ctf@gmail.com
        </div>
        <p class="font-body text-xs text-white/35 mt-3 leading-relaxed">
          For registration issues, payment queries, and general inquiries.
        </p>
      </div>

      <!-- WhatsApp / Phone -->
      <div class="glass-card p-6 group hover:-translate-y-1 transition-all duration-300"
        style="border:1px solid rgba(160,255,0,0.18);">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
          style="background:rgba(160,255,0,0.08); border:1px solid rgba(160,255,0,0.22);">📱</div>
        <div class="font-mono text-[14px] tracking-[4px] mb-1" style="color:#a0ff00;">WHATSAPP_SUPPORT</div>
        <h3 class="font-display font-bold text-sl text-star-white mb-3">WhatsApp / Phone</h3>
        <div class="font-mono text-xl px-3 py-2.5 rounded-lg"
          style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.35);">
          <!-- ↓ REPLACE WITH REAL NUMBER -->
          +91 7349097923
        </div>
        <p class="font-body text-xs text-white/35 mt-3 leading-relaxed">
          Available on event day for urgent support and real-time help.
        </p>
      </div>

      <!-- Instagram / Social -->
      <div class="glass-card p-6 group hover:-translate-y-1 transition-all duration-300"
        style="border:1px solid rgba(191,0,255,0.18);">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
          style="background:rgba(191,0,255,0.1); border:1px solid rgba(191,0,255,0.25);">🌐</div>
        <div class="font-mono text-[9px] tracking-[4px] mb-1" style="color:#bf00ff;">SOCIAL_CHANNELS</div>
        <h3 class="font-display font-bold text-sm text-star-white mb-3">Follow Us</h3>
        <div class="space-y-2">
          <!-- ↓ REPLACE WITH REAL HANDLES -->
          {#each [
            ['Instagram', '@cybersiegectf'],
            ['LinkedIn',  'Cyber Siege CTF'],
            ['X / Twitter', '@cybersiegectf'],
          ] as [platform, handle]}
            <div class="flex items-center justify-between font-mono text-xs px-3 py-2 rounded-lg"
              style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06);">
              <span class="text-white/30">{platform}</span>
              <span style="color:rgba(191,0,255,0.7)">{handle}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Venue / Location -->
      <div class="glass-card p-6 group hover:-translate-y-1 transition-all duration-300"
        style="border:1px solid rgba(255,170,0,0.18);">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
          style="background:rgba(255,170,0,0.09); border:1px solid rgba(255,170,0,0.22);">📍</div>
        <div class="font-mono text-[9px] tracking-[4px] mb-1" style="color:#ffaa00;">VENUE_COORDINATES</div>
        <h3 class="font-display font-bold text-sm text-star-white mb-3">Venue</h3>
        <div class="font-mono text-[18px] px-3 py-2.5 rounded-lg leading-relaxed"
          style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.35);">
          <!-- ↓ REPLACE WITH REAL VENUE -->
           Auditorium <br>
          Alva's Institute of Engineering and Technology<br/>
          Mijar, Moodbidire
        </div>
        <!-- <p class="font-body text-xs text-white/35 mt-3 leading-relaxed">
          Online participation is also available for remote teams.
        </p> -->
      </div>

      <!-- Event Coordinators -->
      <div class="glass-card p-6 group hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-2"
        style="border:1px solid rgba(0,212,255,0.18);">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
          style="background:rgba(0,212,255,0.09); border:1px solid rgba(0,212,255,0.22);">👥</div>
        <div class="font-mono text-[9px] tracking-[4px] mb-1" style="color:#00d4ff;">EVENT_COORDINATORS</div>
        <h3 class="font-display font-bold text-sm text-star-white mb-4">Organising Team</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {#each [
            { role: 'Event Lead',        name: 'Nandhishwar E N',    phone: '+91 8050945774' },
            { role: 'Technical Lead',    name: 'Santhosh Gowda ',    phone: '+91 7349097923' },
            { role: 'Technical Lead',    name: 'Nishmal ',    phone: '+91 8904315326' },
            { role: 'Registration Lead', name: 'Karthik Gowda',    phone: '+91 6362886325' },
            { role: 'Registration Lead', name: 'Amith',    phone: '+91 9380485293' },
            { role: 'Media & Outreach',  name: 'Sathwik',    phone: '+91 7204211342' },
            { role: 'Media & Outreach',  name: 'Vaani',    phone: '+91 9482100118' },
            { role: 'Media & Outreach',  name: 'Shreya K P',    phone: '+91 9108571830' },
          ] as coord}
            <div class="px-4 py-3 rounded-xl" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06);">
              <div class="font-mono text-[20px] tracking-widest mb-1" style="color:#00d4ff;">{coord.role}</div>
              <div class="font-display font-bold text-[16px] text-star-white mb-1">{coord.name}</div>
              <div class="font-mono text-[14px] text-white/35">{coord.phone}</div>
            </div>
          {/each}
        </div>
      </div>

    </div>

    <!-- ── Response time note ──────────────────────────────────────────────── -->
    <div class="glass-card px-6 py-5 flex items-center gap-4"
      style="border:1px solid rgba(255,0,110,0.14); max-width:600px; margin:0 auto;">
      <div class="w-2 h-2 rounded-full animate-pulse shrink-0" style="background:#ff006e;"></div>
      <p class="font-mono text-xs text-white/35 leading-relaxed">
        // Response time is typically within 24 hours. For urgent issues on event day, use WhatsApp or phone.
      </p>
    </div>

  </div>
</section>

<style>
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
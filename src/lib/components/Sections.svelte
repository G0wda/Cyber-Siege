<script>
  // ── Challenge domain data (Section One / 02) ────────────────────────────────
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

  // ── Placeholder sections (Leaderboard 03 & Sponsors 04) ──────────────────────
  // Removed Resources from here since it is implemented below as 05.
  const otherSections = [
    // { id: 'leaderboard', num: '03', label: 'LEADERBOARD', title: 'RANK_INFILTRATION', icon: '🌌', color: '#bf00ff' },
    { id: 'sponsors',    num: '03', label: 'SPONSORS',    title: 'POWER_GRIDS',       icon: '🔐', color: '#0066ff' },
  ];

  // ── Resources data (Section 05) ──────────────────────────────────────────────
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
        { name: 'CryptoHack',           desc: 'Interactive cryptography challenges and tutorials',   url: 'https://cryptohack.org' },
        { name: 'OWASP Top 10',         desc: 'The ten most critical web application risks',         url: 'https://owasp.org/Top10' },
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

<section id="section-one" class="relative py-24 md:py-36 overflow-hidden">
  <div class="absolute inset-0 z-0 pointer-events-none" style="
    background:
      radial-gradient(ellipse at 80% 20%, rgba(0,245,255,0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 15% 80%, rgba(191,0,255,0.04) 0%, transparent 50%);
  "></div>

  <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.025]" style="
    background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpolygon points='30,1 59,17 59,35 30,51 1,35 1,17' fill='none' stroke='%2300f5ff' stroke-width='1'/%3E%3C/svg%3E&quot;);
    background-size: 60px 52px;
  "></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="font-mono text-xl text-neon-cyan tracking-widest mb-10">// 02_CHALLENGES</div>

    <div class="text-center mb-16">
      <h2 class="font-display font-black leading-none mb-3">
        <span class="text-gradient text-5xl md:text-6xl lg:text-7xl">CHALLENGE</span>
        <span class="block text-white/65 text-3xl md:text-4xl tracking-[0.3em] mt-2">ARENAS</span>
      </h2>
      <div class="w-32 h-px mx-auto my-6" style="background: linear-gradient(90deg,transparent,#00f5ff,#bf00ff,transparent);"></div>
    </div>

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
          <div class="relative p-5">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style="color:{d.color}; background:{d.glow}; border:1px solid {d.border};">
                  <div class="w-5 h-5">{@html d.icon}</div>
                </div>
                <div>
                  <div class="font-mono text-[9px] tracking-[4px] mb-0.5" style="color:{d.color}">{d.label}</div>
                  <h3 class="font-display font-bold text-sm text-star-white leading-tight">{d.title}</h3>
                </div>
              </div>
            </div>
            <p class="font-body text-xs text-white/48 mb-4">{d.desc}</p>
            <div class="flex items-center justify-between pt-3.5 border-t border-white/5">
               <span class="font-mono text-[10px]" style="color:{d.color}">MAX: <strong>{d.maxPts}</strong> pts</span>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

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
        
        <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
          style="border: 1px solid {sec.color}44; background: {sec.color}11;">
          <div class="w-2 h-2 rounded-full animate-pulse" style="background: {sec.color}"></div>
          <span class="font-mono text-sm tracking-widest" style="color: {sec.color}">COMING SOON</span>
        </div>

        <div class="mt-8 max-w-sm mx-auto text-left glass-card p-4 border border-white/5">
          <div class="font-mono text-xs text-white/30 space-y-1">
            <div><span class="text-neon-cyan">$</span> loading_{sec.label.toLowerCase()}...</div>
            <div><span class="text-neon-violet">›</span> STATUS: <span style="color:{sec.color}">PENDING</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
{/each}

<section id="section-five" class="relative py-24 md:py-36 overflow-hidden">
  <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style="
    background-image: radial-gradient(circle, #ff006e 1px, transparent 1px);
    background-size: 28px 28px;
  "></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="font-mono text-xl tracking-widest mb-10" style="color:#ff006e;">// 04_RESOURCES</div>

    <div class="text-center mb-20">
      <h2 class="font-display font-black leading-none mb-3">
        <span class="text-5xl md:text-6xl lg:text-7xl" style="background:linear-gradient(135deg,#ff006e,#ffaa00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">RESOURCES</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
      {#each toolCategories as cat}
        <div class="glass-card p-6" style="border:1px solid rgba(255,255,255,0.07);">
          <div class="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
            <div class="w-2 h-2 rounded-full" style="background:{cat.color}; box-shadow:0 0 8px {cat.color};"></div>
            <span class="font-mono text-xs tracking-[3px]" style="color:{cat.color};">{cat.label}</span>
          </div>
          <div class="space-y-3">
            {#each cat.tools as tool}
              <a href={tool.url} target="_blank" class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                <span class="font-display font-bold text-sm text-star-white">{tool.name}</span>
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </a>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="glass-card p-8 md:p-10" style="border:1px solid rgba(255,0,110,0.15);">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each quickTips as tip}
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs bg-pink-500/10 border border-pink-500/30 text-[#ff006e]">{tip.num}</div>
            <p class="text-sm text-white/55">{tip.tip}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* Base Card Entry Animation */
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Float Animation for Placeholders */
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }

  /* Utility class fallback */
  :global(.text-star-white) {
    color: #f8f9fa;
  }

  :global(.glass-card) {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
  }
</style>
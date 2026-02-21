<script>
  import { onMount } from 'svelte';

  // REAL event date — change this to your actual competition datetime
  const EVENT_DATE = new Date('2026-03-13T11:00:00+05:30'); // 11:00 AM IST

  let countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  let eventStarted = false;

  onMount(() => {
    function update() {
      const now = new Date();
      const diff = EVENT_DATE - now;
      if (diff <= 0) {
        eventStarted = true;
        countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return;
      }
      countdown = {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      };
    }
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  });

  function pad(n) { return String(n).padStart(2, '0'); }
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
  <div class="absolute inset-0 z-0" style="background: radial-gradient(ellipse at 50% 40%, #1a053344 0%, #0a021e22 50%, transparent 100%);"></div>

  <div class="absolute inset-0 z-0 opacity-10"
    style="background-image: linear-gradient(#00f5ff11 1px, transparent 1px), linear-gradient(90deg, #00f5ff11 1px, transparent 1px);
           background-size: 60px 60px;">
  </div>

  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none">
    <div class="absolute inset-0 rounded-full border border-neon-cyan animate-spin" style="animation-duration: 20s;"></div>
    <div class="absolute inset-8 rounded-full border border-neon-violet animate-spin" style="animation-duration: 15s; animation-direction: reverse;"></div>
    <div class="absolute inset-20 rounded-full border border-neon-blue animate-spin" style="animation-duration: 25s;"></div>
  </div>

  <div class="relative z-10 max-w-5xl mx-auto px-4 text-center">
    <div class="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass-card neon-border text-xl font-mono tracking-widest text-neon-cyan">
      <span class="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
      Deaprtment of ICB Presents
    </div>

    <h1 class="font-display font-black leading-none mb-6">
      <span class="block text-gradient text-6xl md:text-8xl lg:text-9xl">CYBER </span>
      <span class="block text-star-white opacity-90 text-5xl md:text-7xl lg:text-8xl tracking-widest">SIEGE</span>
    </h1>

    <p class="font-body text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
      Breach the cosmic firewall. Navigate digital voids.
      <span class="text-neon-cyan">Conquer the unknown.</span>
    </p>
    <p class="font-mono text-sm text-white/40 tracking-widest mb-12">
      // WHERE HACKERS BECOME LEGENDS //
    </p>

    {#if eventStarted}
      <div class="mb-12 glass-card neon-border inline-flex items-center gap-3 px-8 py-4">
        <span class="w-3 h-3 rounded-full bg-neon-cyan animate-pulse"></span>
        <span class="font-display font-bold text-xl text-neon-cyan tracking-widest">COMPETITION IS LIVE!</span>
      </div>
    {:else}
      <div class="mb-12">
        <p class="font-mono text-xs text-white/30 tracking-widest mb-4">// EVENT BEGINS IN</p>
        <div class="flex justify-center gap-4 md:gap-8">
          {#each [['days', countdown.days], ['hours', countdown.hours], ['mins', countdown.minutes], ['secs', countdown.seconds]] as [label, val]}
            <div class="glass-card neon-border px-4 py-4 md:px-6 md:py-5 min-w-[70px] md:min-w-[90px] text-center">
              <div class="font-display font-bold text-2xl md:text-4xl text-neon-cyan">{pad(val)}</div>
              <div class="font-mono text-xs text-white/40 tracking-widest mt-1">{label}</div>
            </div>
          {/each}
        </div>
        <p class="font-mono text-xxxs text-white/20 tracking-widest mt-4">MARCH 13, 2026 · 11:00 AM IST</p>
      </div>
    {/if}

    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a href="/register" class="btn-primary rounded-sm text-sm">⟩ Register Now</a>
      <a href="#about" class="px-8 py-4 font-display font-bold text-sm tracking-widest uppercase text-white/50 border border-white/20 rounded-sm hover:border-white/40 hover:text-white/80 transition-all duration-300">
        Learn More ↓
      </a>
    </div>

    <div class="flex justify-center gap-8 md:gap-16 mt-16 pt-8 border-t border-white/5">
      {#each [['200+', 'Participants'], ['24h', 'Duration'], ['50+', 'Challenges'], ['₹25K', 'Prize Pool']] as [val, label]}
        <div class="text-center">
          <div class="font-display font-bold text-xl md:text-2xl text-neon-cyan">{val}</div>
          <div class="font-body text-xs text-white/40 tracking-wider mt-1">{label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

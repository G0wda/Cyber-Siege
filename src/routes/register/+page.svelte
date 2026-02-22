<script>
  import { tick } from 'svelte';

  // ── Form state ───────────────────────────────────────────────────────────────
  let teamName        = '';
  let leaderName      = '';
  let leaderEmail     = '';
  let numberOfTeammates = 0;
  let teammateNames   = [];
  let collegeName     = '';
  let city            = '';
  let paymentFile     = null;
  let paymentPreview  = null;
  let paymentFileName = '';

  let errors          = {};
  let serverError     = '';
  let submitted       = false;
  let loading         = false;
  let agreedToRules   = false;
  let submitAttempted = false;

  const API_URL = import.meta.env.VITE_API_URL || 'https://cyber-siege-backend.vercel.app';
  const MAX_TEAMMATES = 3;

  // ── Reactively resize teammate name array ────────────────────────────────────
  $: {
    const n = parseInt(numberOfTeammates, 10) || 0;
    const clamped = Math.min(Math.max(n, 0), MAX_TEAMMATES);
    if (teammateNames.length < clamped) {
      teammateNames = [...teammateNames, ...Array(clamped - teammateNames.length).fill('')];
    } else if (teammateNames.length > clamped) {
      teammateNames = teammateNames.slice(0, clamped);
    }
  }

  // ── Payment screenshot handler ───────────────────────────────────────────────
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      errors.paymentScreenshot = 'Only JPEG, PNG, or WebP images are allowed';
      paymentFile = null;
      paymentPreview = null;
      paymentFileName = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      errors.paymentScreenshot = 'File must be under 5MB';
      paymentFile = null;
      paymentPreview = null;
      paymentFileName = '';
      return;
    }

    errors.paymentScreenshot = '';
    paymentFile    = file;
    paymentFileName = file.name;

    const reader = new FileReader();
    reader.onload = (ev) => { paymentPreview = ev.target.result; };
    reader.readAsDataURL(file);
  }

  function clearFile() {
    paymentFile     = null;
    paymentPreview  = null;
    paymentFileName = '';
    const input = document.getElementById('paymentScreenshot');
    if (input) input.value = '';
  }

  // ── Validation ───────────────────────────────────────────────────────────────
  function validate() {
    errors = {};
    if (!teamName.trim())      errors.teamName      = 'Team name is required';
    if (!leaderName.trim())    errors.leaderName    = 'Team leader name is required';
    if (!leaderEmail.trim())   errors.leaderEmail   = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(leaderEmail)) errors.leaderEmail = 'Invalid email format';
    if (!collegeName.trim())   errors.collegeName   = 'College name is required';
    if (!city.trim())          errors.city          = 'City is required';

    const n = parseInt(numberOfTeammates, 10);
    if (isNaN(n) || n < 0 || n > MAX_TEAMMATES) {
      errors.numberOfTeammates = `Enter a number between 0 and ${MAX_TEAMMATES}`;
    } else {
      teammateNames.forEach((name, i) => {
        if (!name.trim()) errors[`teammate_${i}`] = `Teammate ${i + 1} name is required`;
      });
    }

    if (!paymentFile) errors.paymentScreenshot = 'Payment screenshot is required';

    return Object.keys(errors).length === 0;
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    submitAttempted = true;
    serverError = '';
    if (!agreedToRules) return;
    if (!validate()) {
      await tick();
      const el = document.querySelector('[data-error]');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    loading = true;
    try {
      const fd = new FormData();
      fd.append('teamName',           teamName.trim());
      fd.append('leaderName',         leaderName.trim());
      fd.append('leaderEmail',        leaderEmail.trim().toLowerCase());
      fd.append('numberOfTeammates',  numberOfTeammates);
      fd.append('teammateNames',      JSON.stringify(teammateNames.map(n => n.trim())));
      fd.append('collegeName',        collegeName.trim());
      fd.append('city',               city.trim());
      fd.append('paymentScreenshot',  paymentFile);

      const res  = await fetch(`${API_URL}/api/register`, { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors?.length) {
          data.errors.forEach(e => { errors[e.field] = e.message; });
          errors = { ...errors };
        } else {
          serverError = data.message || 'Registration failed. Please try again.';
        }
        return;
      }

      submitted = true;
    } catch (err) {
      serverError = 'Unable to connect to the server. Please check your connection.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Register — Cyber Siege CTF</title>
</svelte:head>

<section class="min-h-screen pt-24 pb-20 relative overflow-hidden">

  <div class="absolute inset-0 z-0 pointer-events-none"
    style="background: radial-gradient(ellipse at 30% 20%, #1a053355 0%, transparent 55%),
                       radial-gradient(ellipse at 75% 80%, #00111a44 0%, transparent 55%);">
  </div>
  <div class="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
    style="background-image: linear-gradient(#00f5ff 1px, transparent 1px),
                             linear-gradient(90deg, #00f5ff 1px, transparent 1px);
           background-size: 48px 48px;">
  </div>
  <div class="absolute top-32 left-8 w-40 h-40 rounded-full blur-3xl opacity-20 animate-float pointer-events-none"
    style="background:#00f5ff; animation-delay:0s;"></div>
  <div class="absolute bottom-32 right-8 w-52 h-52 rounded-full blur-3xl opacity-15 animate-float pointer-events-none"
    style="background:#bf00ff; animation-delay:2.5s;"></div>

  {#if submitted}
    <div class="relative z-10 max-w-xl mx-auto px-4 pt-8">
      <div class="glass-card neon-border text-center p-12">
        <div class="text-7xl mb-6 animate-float">🚀</div>
        <h2 class="font-display font-bold text-3xl text-gradient mb-4">Registration Complete!</h2>
        <div class="w-16 h-px mx-auto mb-6" style="background:linear-gradient(90deg,transparent,#00f5ff,transparent)"></div>
        <p class="font-body text-white/60 mb-1">Welcome to Cyber Siege CTF, <span class="text-neon-cyan">{leaderName}</span>.</p>
        <p class="font-body text-white/40 text-sm mb-8">Team <span class="text-neon-violet">{teamName}</span> is locked in.</p>
        <div class="font-mono text-xs text-left glass-card p-4 mb-8 space-y-1">
          <div>$ registration_confirmed</div>
          <div><span class="text-neon-cyan">›</span> team:      <span class="text-white/70">{teamName}</span></div>
          <div><span class="text-neon-cyan">›</span> leader:    <span class="text-white/70">{leaderName}</span></div>
          <div><span class="text-neon-cyan">›</span> college:   <span class="text-white/70">{collegeName}</span></div>
          <div><span class="text-neon-cyan">›</span> city:      <span class="text-white/70">{city}</span></div>
          <div><span class="text-neon-cyan">›</span> squad:     <span class="text-white/70">{numberOfTeammates} teammate{numberOfTeammates !== 1 ? 's' : ''}</span></div>
          <div><span class="text-neon-cyan">›</span> payment:   <span class="text-green-400">Your comformation mail on the way</span></div>
          <div class="pt-1"><span class="text-neon-violet">›</span> status: <span class="text-neon-cyan">ACTIVE ▊</span></div>
        </div>
        <a href="/" class="btn-primary rounded-sm text-xs inline-block">← Return to Base</a>
      </div>
    </div>

  {:else}
  
    <div class="relative z-10 max-w-2xl mx-auto px-4">

      <div class="text-center mb-10">
        <div class="font-mono text-xs text-neon-cyan tracking-widest mb-3">// SECURE_REGISTRATION_PORTAL</div>
        <h1 class="font-display font-bold text-4xl md:text-5xl text-gradient mb-3">Join Cyber Siege CTF</h1>
        <div class="w-20 h-px mx-auto mb-4" style="background:linear-gradient(90deg,transparent,#00f5ff,transparent)"></div>
        <p class="font-body text-white/45 text-sm">Fill in your squad details to secure your spot in the arena.</p>
      </div>

      <div class="glass-card p-6 md:p-10"
        style="border:1px solid rgba(0,245,255,0.14); box-shadow:0 0 80px rgba(0,245,255,0.06), 0 0 120px rgba(191,0,255,0.04);">

        <div class="flex items-center gap-2 mb-8 pb-5 border-b border-white/[0.07]">
          <div class="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-400/70"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/70"></div>
          <span class="font-mono text-xs text-white/25 ml-2 tracking-wide">cyber_siege://register</span>
          <div class="ml-auto flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></div>
            <span class="font-mono text-[10px] text-neon-cyan/60 tracking-widest">SECURE</span>
          </div>
        </div>

        {#if serverError}
          <div class="mb-6 px-4 py-3 rounded-lg font-mono text-xs text-red-400 border border-red-500/30 bg-red-500/10 flex items-start gap-2">
            <span class="mt-0.5">⚠</span>
            <span>[ERROR] {serverError}</span>
          </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} novalidate class="space-y-0">

          <!-- SECTION 1: Team Info -->
          <div class="mb-2">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-5 h-5 rounded flex items-center justify-center text-[10px] font-display font-bold text-neon-cyan"
                style="border:1px solid rgba(0,245,255,0.3); background:rgba(0,245,255,0.07);">01</div>
              <span class="font-mono text-xs text-neon-cyan tracking-widest">SQUAD_IDENTITY</span>
              <div class="flex-1 h-px" style="background:linear-gradient(90deg,rgba(0,245,255,0.2),transparent)"></div>
            </div>

            <div class="mb-5" data-error={errors.teamName ? true : undefined}>
              <label class="font-mono text-[10px] text-white/40 tracking-widest mb-2 block" for="teamName">
                › TEAM_NAME <span class="text-neon-violet">*</span>
              </label>
              <input id="teamName" type="text" bind:value={teamName}
                placeholder="e.g. Void Runners"
                class="input-field {errors.teamName ? 'border-red-500/50' : ''}"/>
              {#if errors.teamName}
                <p class="font-mono text-[10px] text-red-400/80 mt-1.5 flex items-center gap-1"><span>✕</span> {errors.teamName}</p>
              {/if}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div data-error={errors.leaderName ? true : undefined}>
                <label class="font-mono text-[10px] text-white/40 tracking-widest mb-2 block" for="leaderName">
                  › LEADER_NAME <span class="text-neon-violet">*</span>
                </label>
                <input id="leaderName" type="text" bind:value={leaderName}
                  placeholder="Team leader's full name"
                  class="input-field {errors.leaderName ? 'border-red-500/50' : ''}"/>
                {#if errors.leaderName}
                  <p class="font-mono text-[10px] text-red-400/80 mt-1.5">✕ {errors.leaderName}</p>
                {/if}
              </div>
              <div data-error={errors.leaderEmail ? true : undefined}>
                <label class="font-mono text-[10px] text-white/40 tracking-widest mb-2 block" for="leaderEmail">
                  › COMMS_EMAIL <span class="text-neon-violet">*</span>
                </label>
                <input id="leaderEmail" type="email" bind:value={leaderEmail}
                  placeholder="leader@email.com"
                  class="input-field {errors.leaderEmail ? 'border-red-500/50' : ''}"
                  autocomplete="email"/>
                {#if errors.leaderEmail}
                  <p class="font-mono text-[10px] text-red-400/80 mt-1.5">✕ {errors.leaderEmail}</p>
                {/if}
              </div>
            </div>
          </div>

          <!-- SECTION 2: Teammates -->
          <div class="mb-2 pt-4">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-5 h-5 rounded flex items-center justify-center text-[10px] font-display font-bold text-neon-violet"
                style="border:1px solid rgba(191,0,255,0.3); background:rgba(191,0,255,0.07);">02</div>
              <span class="font-mono text-xs text-neon-violet tracking-widest">SQUAD_MEMBERS</span>
              <div class="flex-1 h-px" style="background:linear-gradient(90deg,rgba(191,0,255,0.2),transparent)"></div>
            </div>

            <div class="mb-5" data-error={errors.numberOfTeammates ? true : undefined}>
              <label class="font-mono text-[1px] text-white/40 tracking-widest mb-2 block" for="numTeammates">
                › NUMBER_OF_TEAMMATES <span class="text-neon-violet">*</span>
                <span class="text-white/20 ml-2">(0 – {MAX_TEAMMATES})</span>
              </label>
              <div class="flex items-center gap-3">
                <button type="button"
                  class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-neon-violet transition-all duration-200 hover:scale-110 active:scale-95 shrink-0"
                  style="border:1px solid rgba(191,0,255,0.3); background:rgba(191,0,255,0.07);"
                  on:click={() => numberOfTeammates = Math.max(0, (parseInt(numberOfTeammates)||0) - 1)}>−</button>
                <input id="numTeammates" type="number"
                  bind:value={numberOfTeammates} min="0" max={MAX_TEAMMATES}
                  class="input-field text-center font-display font-bold text-2xl text-neon-violet w-24 shrink-0
                         {errors.numberOfTeammates ? 'border-red-500/50' : ''}"
                  style="border-color: rgba(191,0,255,0.3); box-shadow:0 0 10px rgba(191,0,255,0.1);"/>
                <button type="button"
                  class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-neon-violet transition-all duration-200 hover:scale-110 active:scale-95 shrink-0"
                  style="border:1px solid rgba(191,0,255,0.3); background:rgba(191,0,255,0.07);"
                  on:click={() => numberOfTeammates = Math.min(MAX_TEAMMATES, (parseInt(numberOfTeammates)||0) + 1)}>+</button>
                {#if parseInt(numberOfTeammates) > 0}
                  <span class="font-mono text-xs text-white/30 tracking-wide">
                    {parseInt(numberOfTeammates)} operative{parseInt(numberOfTeammates) !== 1 ? 's' : ''} in your squad
                  </span>
                {:else}
                  <span class="font-mono text-xs text-white/20 tracking-wide">Solo operative</span>
                {/if}
              </div>
              {#if errors.numberOfTeammates}
                <p class="font-mono text-[10px] text-red-400/80 mt-1.5">✕ {errors.numberOfTeammates}</p>
              {/if}
            </div>

            {#if teammateNames.length > 0}
              <div class="space-y-3 pl-4" style="border-left: 2px solid rgba(191,0,255,0.15);">
                {#each teammateNames as _, i}
                  <div data-error={errors[`teammate_${i}`] ? true : undefined}>
                    <label class="font-mono text-[10px] text-white/30 tracking-widest mb-1.5 block" for="teammate_{i}">
                      › OPERATIVE_{String(i+1).padStart(2,'0')}
                    </label>
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] text-neon-violet/60 shrink-0"
                        style="border:1px solid rgba(191,0,255,0.2);">{i+1}</div>
                      <input id="teammate_{i}" type="text" bind:value={teammateNames[i]}
                        placeholder="Teammate {i+1} full name"
                        class="input-field flex-1 py-2.5 text-sm {errors[`teammate_${i}`] ? 'border-red-500/50' : ''}"/>
                    </div>
                    {#if errors[`teammate_${i}`]}
                      <p class="font-mono text-[10px] text-red-400/80 mt-1 ml-8">✕ {errors[`teammate_${i}`]}</p>
                    {/if}
                  </div>
                {/each}
              </div>
            {/if}
          </div>

          <!-- SECTION 3: Institution -->
          <div class="mb-2 pt-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-5 h-5 rounded flex items-center justify-center text-[10px] font-display font-bold"
                style="border:1px solid rgba(0,102,255,0.3); background:rgba(0,102,255,0.07); color:#0066ff;">03</div>
              <span class="font-mono text-xs tracking-widest" style="color:#0066ff;">BASE_COORDINATES</span>
              <div class="flex-1 h-px" style="background:linear-gradient(90deg,rgba(0,102,255,0.2),transparent)"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div data-error={errors.collegeName ? true : undefined}>
                <label class="font-mono text-[10px] text-white/40 tracking-widest mb-2 block" for="collegeName">
                  › INSTITUTION_NAME <span class="text-neon-violet">*</span>
                </label>
                <input id="collegeName" type="text" bind:value={collegeName}
                  placeholder="College or University"
                  class="input-field {errors.collegeName ? 'border-red-500/50' : ''}"/>
                {#if errors.collegeName}
                  <p class="font-mono text-[10px] text-red-400/80 mt-1.5">✕ {errors.collegeName}</p>
                {/if}
              </div>
              <div data-error={errors.city ? true : undefined}>
                <label class="font-mono text-[10px] text-white/40 tracking-widest mb-2 block" for="city">
                  › CITY_SECTOR <span class="text-neon-violet">*</span>
                </label>
                <input id="city" type="text" bind:value={city}
                  placeholder="Your city"
                  class="input-field {errors.city ? 'border-red-500/50' : ''}"/>
                {#if errors.city}
                  <p class="font-mono text-[10px] text-red-400/80 mt-1.5">✕ {errors.city}</p>
                {/if}
              </div>
            </div>
          </div>

          <!-- SECTION 4: Payment -->
          <div class="pt-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-5 h-5 rounded flex items-center justify-center text-[10px] font-display font-bold text-green-400"
                style="border:1px solid rgba(74,222,128,0.3); background:rgba(74,222,128,0.07);">04</div>
              <span class="font-mono text-xs text-green-400 tracking-widest">ENTRY_FEE_PROOF</span>
              <div class="flex-1 h-px" style="background:linear-gradient(90deg,rgba(74,222,128,0.2),transparent)"></div>
            </div>

            <!-- ── Entry fee notice ─────────────────────────────────────────── -->
            <div class="flex items-center justify-between px-4 py-3 rounded-xl mb-5"
              style="background:rgba(74,222,128,0.06); border:1px solid rgba(74,222,128,0.18);">
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-green-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <span class="font-body text-sm text-white/70">Entry Fee</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-display font-bold text-lg text-green-400">₹200</span>
                <span class="font-mono text-[16px] text-white/35 tracking-wide">per person</span>
              </div>
            </div>

            <!-- ── QR Code ─────────────────────────────────────────────────── -->
            <div class="rounded-2xl overflow-hidden mb-6"
              style="border:1px solid rgba(74,222,128,0.2); background:rgba(74,222,128,0.03);">

              <div class="flex items-center justify-between px-4 py-2.5"
                style="background:rgba(74,222,128,0.07); border-bottom:1px solid rgba(74,222,128,0.12);">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                  <span class="font-mono text-[10px] text-green-400 tracking-widest">SCAN_TO_PAY</span>
                </div>
                <!-- <span class="font-mono text-[18px] text-white/25 tracking-wider">₹200 × members in team</span> -->
              </div>

              <div class="flex flex-col sm:flex-row items-center gap-6 p-6">

                <!-- QR image -->
                <div class="relative shrink-0">
                  <div class="w-64 h-64 rounded-xl flex items-center justify-center overflow-hidden relative"
                    style="border:2px solid rgba(74,222,128,0.4); background: white; box-shadow:0 0 24px rgba(74,222,128,0.15);">
                    <img src="./assets/payment.jpeg" alt="Payment QR" class="w-full h-full object-cover p-0" />
                    <div class="absolute top-1.5 left-1.5 w-6 h-6 border-t-4 border-l-4 rounded-tl border-green-500"></div>
                    <div class="absolute top-1.5 right-1.5 w-6 h-6 border-t-4 border-r-4 rounded-tr border-green-500"></div>
                    <div class="absolute bottom-1.5 left-1.5 w-6 h-6 border-b-4 border-l-4 rounded-bl border-green-500"></div>
                    <div class="absolute bottom-1.5 right-1.5 w-6 h-6 border-b-4 border-r-4 rounded-br border-green-500"></div>
                    <div class="absolute inset-x-0 h-[3px] bg-green-400 shadow-[0_0_15px_#4ade80] animate-scan-slow opacity-80 z-10"></div>
                  </div>
                </div>

                <!-- Instructions -->
                <div class="flex-1 space-y-3">
                  <div class="font-display font-bold text-sm text-star-white">How to Pay</div>
                  <div class="space-y-2">
                    {#each [
                      ['01', 'Scan the QR code with any UPI app (GPay, PhonePe, Paytm, etc.)'],
                      ['02', 'Pay ₹200 per team member and note your transaction ID'],
                      ['03', 'Take a screenshot of the payment confirmation'],
                      ['04', 'Upload the screenshot below to complete registration'],
                    ] as [n, step]}
                      <div class="flex items-start gap-3">
                        <span class="font-mono text-[9px] text-green-400/60 shrink-0 mt-0.5 w-4">{n}</span>
                        <span class="font-body text-xs text-white/50 leading-relaxed">{step}</span>
                      </div>
                    {/each}
                  </div>
                  <div class="flex items-center gap-2 pt-1">
                    <svg class="w-3 h-3 text-green-400/60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span class="font-mono text-[9px] text-white/30 tracking-wide">Payments verified before event access</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Screenshot upload -->
            <div data-error={errors.paymentScreenshot ? true : undefined}>
              <label class="font-mono text-[10px] text-white/40 tracking-widest mb-3 block" for="paymentScreenshot">
                › PAYMENT_SCREENSHOT <span class="text-neon-violet">*</span>
                <span class="text-white/20 ml-2">JPEG / PNG / WebP · max 5MB</span>
              </label>

              {#if !paymentPreview}
                <label for="paymentScreenshot"
                  class="flex flex-col items-center justify-center gap-3 w-full rounded-xl py-10 px-6 cursor-pointer transition-all duration-300
                         {errors.paymentScreenshot ? 'border-red-500/50 bg-red-500/5' : 'hover:border-green-400/40 hover:bg-green-400/5'}"
                  style="border: 2px dashed rgba(74,222,128,0.2); background: rgba(74,222,128,0.03);">
                  <div class="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                    style="border:1px solid rgba(74,222,128,0.25); background:rgba(74,222,128,0.07);">📸</div>
                  <div class="text-center">
                    <p class="font-mono text-xs text-green-400/80 tracking-wide">DROP_FILE_HERE or CLICK_TO_BROWSE</p>
                    <p class="font-body text-white/25 text-xs mt-1">Upload your entry fee payment confirmation</p>
                  </div>
                  <input id="paymentScreenshot" type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    class="hidden"
                    on:change={handleFileChange}/>
                </label>
              {:else}
                <div class="rounded-xl overflow-hidden relative group"
                  style="border:1px solid rgba(74,222,128,0.3); box-shadow:0 0 20px rgba(74,222,128,0.08);">
                  <img src={paymentPreview} alt="Payment screenshot preview"
                    class="w-full max-h-56 object-contain bg-black/40"/>
                  <div class="absolute inset-0 flex items-center justify-center gap-3
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style="background:rgba(0,0,0,0.65);">
                    <button type="button" on:click={clearFile}
                      class="px-4 py-2 rounded font-mono text-xs text-red-400 border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 transition-colors">
                      ✕ REMOVE
                    </button>
                    <label for="paymentScreenshot"
                      class="px-4 py-2 rounded font-mono text-xs text-neon-cyan border border-neon-cyan/40 bg-neon-cyan/10 hover:bg-neon-cyan/20 transition-colors cursor-pointer">
                      ↺ REPLACE
                    </label>
                    <input id="paymentScreenshot" type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      class="hidden"
                      on:change={handleFileChange}/>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-2 border-t border-white/5">
                    <div class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <span class="font-mono text-[10px] text-white/40 truncate">{paymentFileName}</span>
                    <span class="font-mono text-[10px] text-green-400 ml-auto shrink-0">✓ READY</span>
                  </div>
                </div>
              {/if}

              {#if errors.paymentScreenshot}
                <p class="font-mono text-[10px] text-red-400/80 mt-2 flex items-center gap-1">
                  <span>✕</span> {errors.paymentScreenshot}
                </p>
              {/if}
            </div>
          </div>

          <!-- Disclaimer + Submit -->
          <div class="pt-8 border-t border-white/[0.06] mt-8">
            <p class="font-mono text-[10px] text-white/20 leading-relaxed mb-5">
              // By submitting, you confirm that payment has been made and all information provided is accurate.
              // All registrations are subject to verification.
            </p>

            <!-- Rules agreement checkbox -->
            <label class="flex items-start gap-3 mb-2 cursor-pointer group">
              <div class="relative mt-0.5 shrink-0 w-5 h-5">
                <input
                  type="checkbox"
                  bind:checked={agreedToRules}
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 m-0"
                />
                <div class="w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center pointer-events-none
                            {agreedToRules ? 'border-neon-cyan bg-neon-cyan/15' : 'border-white/25 bg-white/[0.04] group-hover:border-white/45'}">
                  {#if agreedToRules}
                    <svg class="w-3 h-3 text-neon-cyan" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 6l3 3 5-5"/>
                    </svg>
                  {/if}
                </div>
              </div>
              <span class="font-mono text-[11px] text-white/45 leading-relaxed group-hover:text-white/60 transition-colors select-none">
                I have read and agree to the
                <a href="/#rules" target="_blank"
                  class="text-neon-cyan underline underline-offset-2 hover:text-white transition-colors"
                  on:click|stopPropagation>
                  Rules &amp; Guidelines
                </a>
                of Cyber Siege CTF. I understand that violations may result in disqualification without refund.
              </span>
            </label>

            {#if submitAttempted && !agreedToRules}
              <p class="font-mono text-[10px] text-red-400/80 mt-1 mb-4 flex items-center gap-1.5">
                <span>✕</span> You must agree to the rules before registering
              </p>
            {:else}
              <div class="mb-4"></div>
            {/if}

            <button type="submit"
              class="btn-primary rounded-sm w-full flex items-center justify-center gap-3 py-5 transition-opacity duration-300"
              style="opacity: {agreedToRules ? '1' : '0.45'};"
              disabled={loading}>
              {#if loading}
                <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"
                    stroke-dasharray="32" stroke-dashoffset="8"/>
                </svg>
                <span>TRANSMITTING_DATA...</span>
              {:else}
                <span>⟩ INITIATE_REGISTRATION</span>
              {/if}
            </button>
          </div>
        </form>
      </div>

      <div class="text-center mt-6">
        <a href="/" class="font-mono text-xs text-white/25 hover:text-neon-cyan transition-colors tracking-wider">
          ← RETURN_TO_HOME
        </a>
      </div>
    </div>
  {/if}
</section>

<style>
  @keyframes scan-slow {
    0%   { top: 0%;   opacity: 0; }
    10%  { opacity: 1; }
    50%  { top: 100%; opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 0%;   opacity: 0; }
  }
  .animate-scan-slow {
    position: absolute;
    animation: scan-slow 6s ease-in-out infinite;
  }
</style>
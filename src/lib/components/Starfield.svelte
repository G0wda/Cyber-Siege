<script>
  import { onMount } from 'svelte';

  onMount(() => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    // Add some colored nebula particles
    const nebulas = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? '#00f5ff' : '#bf00ff',
      twinkleSpeed: Math.random() * 0.015 + 0.003,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw background gradient
      const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
      grad.addColorStop(0, 'rgba(26, 5, 51, 0.3)');
      grad.addColorStop(0.5, 'rgba(10, 2, 30, 0.2)');
      grad.addColorStop(1, 'rgba(2, 1, 10, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      stars.forEach(star => {
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= 1 || star.alpha <= 0.1) star.twinkleDir *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 244, 253, ${star.alpha})`;
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      // Draw nebula particles
      nebulas.forEach(n => {
        n.alpha += n.twinkleSpeed * n.twinkleDir;
        if (n.alpha >= 0.8 || n.alpha <= 0.1) n.twinkleDir *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.floor(n.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Add glow
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        glow.addColorStop(0, n.color + '44');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });
</script>

<canvas id="starfield"></canvas>

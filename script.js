document.addEventListener('DOMContentLoaded', function() {
    // Start animations
    setTimeout(() => {
      document.body.classList.remove("not-loaded");
    }, 1000);
  
    // Purple color palette
    const purpleColors = [
      '#e0aaff', '#d9a5ff', '#d19fff', '#c77dff', 
      '#b56bff', '#9d4edd'
    ];
    
    // Heart styles
    const heartStyles = ['❤️', '💜', '💖'];
    
    // Create floating hearts (reduced quantity)
    function createHeart() {
      const heart = document.createElement('div');
      heart.className = 'heart';
      
      const size = Math.random() * 18 + 12;
      const duration = Math.random() * 12 + 8; // Slower movement
      const delay = Math.random() * 8;
      const startX = Math.random() * 100;
      
      heart.innerHTML = heartStyles[Math.floor(Math.random() * heartStyles.length)];
      heart.style.left = startX + 'vw';
      heart.style.top = '100vh';
      heart.style.fontSize = size + 'px';
      heart.style.color = purpleColors[Math.floor(Math.random() * purpleColors.length)];
      heart.style.opacity = Math.random() * 0.5 + 0.3;
      heart.style.animation = `float-up ${duration}s ${delay}s linear forwards`;
      
      document.body.appendChild(heart);
      
      setTimeout(() => heart.remove(), (duration + delay) * 1000);
    }
    
    // Create hearts less frequently
    setInterval(createHeart, 2000); // Reduced frequency
    
    // Create initial hearts
    for (let i = 0; i < 6; i++) { // Fewer initial hearts
      setTimeout(createHeart, i * 1000);
    }
    
    // Enhanced flower interaction with purple particles
    const flowers = document.querySelectorAll('.flower');
    
    flowers.forEach(flower => {
      let isInteracting = false;
      let interactionTimer;
      
      // Mouse/touch start
      flower.addEventListener('mousedown', startInteraction);
      flower.addEventListener('touchstart', startInteraction, { passive: true });
      
      // Mouse/touch end
      flower.addEventListener('mouseup', endInteraction);
      flower.addEventListener('mouseleave', endInteraction);
      flower.addEventListener('touchend', endInteraction);
      
      function startInteraction(e) {
        if (isInteracting) return;
        isInteracting = true;
        
        // Pulse effect
        flower.style.transform = `${flower.style.transform} scale(1.1)`;
        
        // Continuous particle emission while interacting
        emitParticles(e, 8); // Initial burst
        interactionTimer = setInterval(() => {
          emitParticles(e, 3); // Continuous emission
        }, 150);
      }
      
      function endInteraction() {
        if (!isInteracting) return;
        isInteracting = false;
        clearInterval(interactionTimer);
        flower.style.transform = flower.style.transform.replace(' scale(1.1)', '');
      }
      
      function emitParticles(e, count) {
        const rect = flower.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Get position based on event or center
        let x, y;
        if (e && (e.clientX || e.touches)) {
          x = e.clientX || e.touches[0].clientX;
          y = e.clientY || e.touches[0].clientY;
        } else {
          x = centerX;
          y = centerY;
        }
        
        for (let i = 0; i < count; i++) {
          const particle = document.createElement('div');
          particle.className = 'purple-particle';
          
          // Randomize properties
          const size = Math.random() * 10 + 5;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.backgroundColor = purpleColors[Math.floor(Math.random() * 3)];
          particle.style.opacity = Math.random() * 0.7 + 0.3;
          
          // Position at interaction point
          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
          
          // Random movement
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 120 + 80;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance - 150;
          
          particle.style.setProperty('--tx', `${tx}px`);
          particle.style.setProperty('--ty', `${ty}px`);
          
          // Random duration and delay
          const duration = Math.random() * 1.5 + 0.7;
          particle.style.animationDuration = `${duration}s`;
          
          document.body.appendChild(particle);
          
          // Remove after animation
          setTimeout(() => {
            particle.remove();
          }, duration * 1000);
        }
      }
    });
  });
// Enhanced JavaScript for MegaPersonals Babylon Giveaway

// Countdown Timer
function updateCountdown() {
  const now = new Date().getTime();
  const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now
  const timeLeft = endTime - now;

  if (timeLeft > 0) {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  } else {
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
  }
}

// Progress Bar Animation
function updateProgressBar() {
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  let currentProgress = 47;
  const maxProgress = 50;
  
  const interval = setInterval(() => {
    if (currentProgress < maxProgress) {
      currentProgress++;
      const percentage = (currentProgress / maxProgress) * 100;
      progressFill.style.width = percentage + '%';
      progressText.textContent = currentProgress + '/' + maxProgress + ' Claims';
      
      if (currentProgress === maxProgress) {
        clearInterval(interval);
      }
    }
  }, 3000); // Update every 3 seconds
}

// Floating Action Buttons
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function showLiveChat() {
  alert('Live chat feature coming soon! For now, please use the claim button to proceed.');
}

// Enhanced Claim History with improved email format
function generateMaskedEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  
  // Generate starting letter
  const startLetter = letters[Math.floor(Math.random() * letters.length)];
  
  // Generate random domain
  const domain = domains[Math.floor(Math.random() * domains.length)];
  
  // Generate random number of stars (4-6)
  const starCount = Math.floor(Math.random() * 3) + 4;
  const stars = '*'.repeat(starCount);
  
  return `${startLetter}${stars}@${domain}`;
}

const claimHistory = [
  { id: '7907****', paypal: 's*****@gmail.com', status: 'approved' },
  { id: '8923****', paypal: 'm******@yahoo.com', status: 'approved' },
  { id: '4567****', paypal: 'e****@hotmail.com', status: 'approved' },
  { id: '2345****', paypal: 'j*****@gmail.com', status: 'approved' },
  { id: '6789****', paypal: 'l****@yahoo.com', status: 'approved' },
  { id: '3456****', paypal: 'd******@gmail.com', status: 'approved' },
  { id: '7890****', paypal: 'a*****@hotmail.com', status: 'approved' },
  { id: '1234****', paypal: 't****@gmail.com', status: 'approved' },
  { id: '5678****', paypal: 'm*****@yahoo.com', status: 'approved' },
  { id: '9012****', paypal: 'p******@hotmail.com', status: 'pending' }
];

function populateClaimHistory() {
  const tbody = document.getElementById('claim-history-body');
  tbody.innerHTML = '';

  claimHistory.forEach(claim => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${claim.id}</td>
      <td>${claim.paypal}</td>
      <td><span class="status ${claim.status}">${claim.status.toUpperCase()}</span></td>
    `;
    tbody.appendChild(row);
  });
}

// Function to add new claim with auto-generated email
function addNewClaim(id, status = 'approved') {
  const newClaim = {
    id: id,
    paypal: generateMaskedEmail(),
    status: status
  };
  
  claimHistory.unshift(newClaim); // Add to beginning of array
  
  // Keep only last 10 claims to maintain performance
  if (claimHistory.length > 10) {
    claimHistory.pop();
  }
  
  // Refresh the table
  populateClaimHistory();
  
  return newClaim;
}

// Animated Notification Text with enhanced email notifications
function updateNotificationText() {
  const notifications = [
    's*****@gmail.com received $1,000 • m******@yahoo.com received $1,000 • e****@hotmail.com received $1,000',
    'j*****@gmail.com received $1,000 • l****@yahoo.com received $1,000 • d******@gmail.com received $1,000',
    'a*****@hotmail.com received $1,000 • t****@gmail.com received $1,000 • m*****@yahoo.com received $1,000'
  ];
  
  let currentIndex = 0;
  const notificationText = document.getElementById('notification-text');
  
  setInterval(() => {
    notificationText.textContent = notifications[currentIndex];
    currentIndex = (currentIndex + 1) % notifications.length;
  }, 10000); // Change every 10 seconds
}

// Enhanced Animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all major sections
  const sections = document.querySelectorAll('.info-box, .testimonials-section, .history-box, .countdown-container, .progress-container');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// Testimonial Card Hover Effects
function addTestimonialEffects() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = 'none';
    });
  });
}

// Trust Indicators Animation
function animateTrustIndicators() {
  const trustItems = document.querySelectorAll('.trust-item');
  
  trustItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 100);
    }, index * 200);
  });
}

// Enhanced CTA Button Effects
function enhanceCTAButton() {
  const ctaButton = document.querySelector('.cta-button');
  
  ctaButton.addEventListener('mouseenter', () => {
    ctaButton.style.transform = 'translateY(-3px) scale(1.02)';
    ctaButton.style.boxShadow = '0 15px 35px rgba(255, 107, 107, 0.5)';
  });
  
  ctaButton.addEventListener('mouseleave', () => {
    ctaButton.style.transform = 'translateY(0) scale(1)';
    ctaButton.style.boxShadow = '0 10px 25px rgba(255, 107, 107, 0.4)';
  });
  
  ctaButton.addEventListener('click', () => {
    ctaButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
      ctaButton.style.transform = 'scale(1)';
    }, 150);
  });
}

// Floating Icons Animation Enhancement
function enhanceFloatingIcons() {
  const floatingIcons = document.querySelectorAll('.floating-icon');
  
  floatingIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 5}s`;
    icon.style.animationDuration = `${15 + index * 2}s`;
  });
}

// Progress Bar Pulse Effect
function addProgressPulse() {
  const progressFill = document.getElementById('progress-fill');
  
  setInterval(() => {
    progressFill.style.opacity = '0.8';
    setTimeout(() => {
      progressFill.style.opacity = '1';
    }, 500);
  }, 2000);
}

// Countdown Timer Pulse Effect
function addCountdownPulse() {
  const countdownItems = document.querySelectorAll('.countdown-item span');
  
  setInterval(() => {
    countdownItems.forEach(item => {
      item.style.transform = 'scale(1.1)';
      item.style.color = '#ff6b6b';
      setTimeout(() => {
        item.style.transform = 'scale(1)';
        item.style.color = '#ff6b6b';
      }, 200);
    });
  }, 1000);
}

// Initialize all functions when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Start countdown timer
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // Initialize progress bar
  updateProgressBar();
  
  // Populate claim history
  populateClaimHistory();
  
  // Update notification text
  updateNotificationText();
  
  // Add scroll animations
  addScrollAnimations();
  
  // Add testimonial effects
  addTestimonialEffects();
  
  // Animate trust indicators
  setTimeout(animateTrustIndicators, 1000);
  
  // Enhance CTA button
  enhanceCTAButton();
  
  // Enhance floating icons
  enhanceFloatingIcons();
  
  // Add progress pulse
  addProgressPulse();
  
  // Add countdown pulse
  addCountdownPulse();
  
  // Add smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add loading animation
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add loading state
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Enhanced error handling
window.addEventListener('error', function(e) {
  console.log('Error occurred:', e.error);
});

// Performance optimization
window.addEventListener('load', function() {
  // Remove loading animations after page is fully loaded
  const loadingElements = document.querySelectorAll('.loading');
  loadingElements.forEach(element => {
    element.style.display = 'none';
  });
});

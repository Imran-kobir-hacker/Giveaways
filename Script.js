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

// Enhanced Animated Notification Text with status changes
function updateNotificationText() {
  const notificationText = document.getElementById('notification-text');
  let currentIndex = 0;
  
  // Enhanced notifications with different statuses
  const notifications = [
    '✅ 7907**** APPROVED • 8923**** APPROVED • 4567**** APPROVED • 2345**** APPROVED',
    '⏳ 6789**** PENDING • 3456**** APPROVED • 7890**** APPROVED • 1234**** APPROVED',
    '✅ 5678**** APPROVED • 9012**** PENDING • 3456**** APPROVED • 7890**** APPROVED',
    '⏳ 1234**** PENDING • 5678**** APPROVED • 9012**** PENDING • 3456**** APPROVED',
    '✅ 7890**** APPROVED • 1234**** APPROVED • 5678**** PENDING • 9012**** APPROVED',
    '⏳ 3456**** PENDING • 7890**** APPROVED • 1234**** APPROVED • 5678**** APPROVED',
    '✅ 9012**** APPROVED • 3456**** APPROVED • 7890**** PENDING • 1234**** APPROVED',
    '⏳ 5678**** PENDING • 9012**** APPROVED • 3456**** APPROVED • 7890**** APPROVED'
  ];
  
  // Change notification every 3-5 seconds
  setInterval(() => {
    notificationText.textContent = notifications[currentIndex];
    const notificationBar = document.querySelector('.notification-bar');
    
    if (currentIndex % 2 === 0) {
      // Approved status
      notificationText.style.color = '#4CAF50';
      notificationBar.classList.add('approved');
      notificationBar.classList.remove('pending');
      
      // Add celebration effect
      addCelebrationEffect();
    } else {
      // Pending status
      notificationText.style.color = '#FF9800';
      notificationBar.classList.add('pending');
      notificationBar.classList.remove('approved');
    }
    
    currentIndex = (currentIndex + 1) % notifications.length;
  }, 4000); // Change every 4 seconds
}

// Add celebration effect when status changes to approved
function addCelebrationEffect() {
  const celebrationEmojis = ['🎉', '🎊', '🏆', '💎', '💰'];
  const backgroundAnimation = document.querySelector('.background-animation');
  
  celebrationEmojis.forEach((emoji, index) => {
    setTimeout(() => {
      const celebration = document.createElement('div');
      celebration.className = 'celebration-element';
      celebration.textContent = emoji;
      celebration.style.left = (20 + index * 15) + '%';
      celebration.style.top = '50%';
      backgroundAnimation.appendChild(celebration);
      
      setTimeout(() => {
        if (celebration.parentNode) {
          celebration.parentNode.removeChild(celebration);
        }
      }, 3000);
    }, index * 200);
  });
}

// Add dynamic background elements with cock/rooster theme
function addDynamicBackgroundElements() {
  const backgroundAnimation = document.querySelector('.background-animation');
  
  // Add cock/rooster emojis
  for (let i = 0; i < 5; i++) {
    const cockElement = document.createElement('div');
    cockElement.className = 'cock-element';
    cockElement.textContent = '🐓';
    cockElement.style.left = Math.random() * 100 + '%';
    cockElement.style.animationDelay = Math.random() * 10 + 's';
    backgroundAnimation.appendChild(cockElement);
  }
  
  // Add more animated elements
  const additionalElements = ['🎯', '🏆', '💎', '💰', '🎊', '🎉', '⭐', '🌟'];
  
  additionalElements.forEach((emoji, index) => {
    const element = document.createElement('div');
    element.className = 'additional-element';
    element.textContent = emoji;
    element.style.left = (10 + index * 10) + '%';
    element.style.animationDelay = (index * 2) + 's';
    backgroundAnimation.appendChild(element);
  });
  
  // Add dynamic sparkle effects
  addSparkleEffects();
}

// Add sparkle effects to background
function addSparkleEffects() {
  const backgroundAnimation = document.querySelector('.background-animation');
  
  setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✨';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    backgroundAnimation.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 5000);
  }, 2000);
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

// Add dynamic status changes to claim history
function addDynamicStatusChanges() {
  setInterval(() => {
    // Randomly change some pending statuses to approved
    const pendingClaims = claimHistory.filter(claim => claim.status === 'pending');
    if (pendingClaims.length > 0) {
      const randomPending = pendingClaims[Math.floor(Math.random() * pendingClaims.length)];
      randomPending.status = 'approved';
      populateClaimHistory();
      
      // Add visual feedback
      const notificationText = document.getElementById('notification-text');
      const originalText = notificationText.textContent;
      notificationText.textContent = `🎉 ${randomPending.id} STATUS CHANGED TO APPROVED! 🎉`;
      notificationText.style.color = '#4CAF50';
      
      setTimeout(() => {
        notificationText.textContent = originalText;
      }, 3000);
    }
    
    // Add new pending claim occasionally
    if (Math.random() < 0.3) {
      const newId = Math.floor(Math.random() * 9000) + 1000;
      addNewClaim(newId + '****', 'pending');
    }
  }, 8000); // Every 8 seconds
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
  
  // Add dynamic background elements
  addDynamicBackgroundElements();
  
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
  
  // Add dynamic status changes
  addDynamicStatusChanges();
  
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

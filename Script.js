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
  // Enhanced notification instead of alert
  showCustomNotification('Live chat feature coming soon! For now, please use the claim button to proceed.', 'info');
}

// Enhanced Claim History with improved email format
function generateMaskedEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
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

// Enhanced notification messages with more variety
const enhancedNotificationMessages = [
  {
    type: 'success',
    templates: [
      '{email} just received $1,200! 🎉',
      '{email} successfully claimed $1,200 reward! ✅',
      '{email} verified and received $1,200! 💰',
      '{email} completed claim for $1,200! 🏆',
      '{email} just won $1,200 giveaway! 🎊'
    ]
  },
  {
    type: 'activity', 
    templates: [
      '{email} is verifying their claim...',
      '{email} just joined the giveaway!',
      '{email} is completing verification...',
      'New member {email} just qualified!'
    ]
  }
];

// Generate dynamic notification text
function generateNotificationText() {
  const notifications = [];
  
  for (let i = 0; i < 3; i++) {
    const messageType = enhancedNotificationMessages[Math.floor(Math.random() * enhancedNotificationMessages.length)];
    const template = messageType.templates[Math.floor(Math.random() * messageType.templates.length)];
    const email = generateMaskedEmail();
    const message = template.replace('{email}', email);
    notifications.push(message);
  }
  
  return notifications.join(' • ');
}

const claimHistory = [
  { id: '7907****', paypal: 's*****@gmail.com', status: 'approved', timestamp: Date.now() - 3600000 },
  { id: '8923****', paypal: 'm******@yahoo.com', status: 'approved', timestamp: Date.now() - 7200000 },
  { id: '4567****', paypal: 'e****@hotmail.com', status: 'approved', timestamp: Date.now() - 10800000 },
  { id: '2345****', paypal: 'j*****@gmail.com', status: 'approved', timestamp: Date.now() - 14400000 },
  { id: '6789****', paypal: 'l****@yahoo.com', status: 'approved', timestamp: Date.now() - 18000000 },
  { id: '3456****', paypal: 'd******@gmail.com', status: 'approved', timestamp: Date.now() - 21600000 },
  { id: '7890****', paypal: 'a*****@hotmail.com', status: 'approved', timestamp: Date.now() - 25200000 },
  { id: '1234****', paypal: 't****@gmail.com', status: 'approved', timestamp: Date.now() - 28800000 },
  { id: '5678****', paypal: 'm*****@yahoo.com', status: 'pending', timestamp: Date.now() - 1800000 },
  { id: '9012****', paypal: 'p******@hotmail.com', status: 'pending', timestamp: Date.now() - 900000 }
];

function populateClaimHistory() {
  const tbody = document.getElementById('claim-history-body');
  tbody.innerHTML = '';

  // Sort by timestamp (newest first) but keep approved/pending status intact
  claimHistory.sort((a, b) => b.timestamp - a.timestamp);

  claimHistory.forEach(claim => {
    const row = document.createElement('tr');
    row.className = 'history-row';
    row.innerHTML = `
      <td>${claim.id}</td>
      <td>${claim.paypal}</td>
      <td><span class="status ${claim.status}">${claim.status.toUpperCase()}</span></td>
    `;
    tbody.appendChild(row);
  });
}

// Function to add new claim with auto-generated email - maintains existing approved/pending ratio
function addNewClaim() {
  // Generate new ID
  const newId = Math.floor(Math.random() * 9000) + 1000 + '****';
  
  // Determine status - maintain realistic ratio (80% approved, 20% pending)
  const statusRandom = Math.random();
  const status = statusRandom < 0.8 ? 'approved' : 'pending';
  
  const newClaim = {
    id: newId,
    paypal: generateMaskedEmail(),
    status: status,
    timestamp: Date.now()
  };
  
  claimHistory.unshift(newClaim); // Add to beginning of array
  
  // Keep only last 10 claims to maintain performance
  if (claimHistory.length > 10) {
    claimHistory.pop();
  }
  
  // Refresh the table with animation
  populateClaimHistory();
  
  // Add notification for new claim
  if (status === 'approved') {
    showCustomNotification(`${newClaim.paypal} just received $1,200! 🎉`, 'success');
  }
  
  return newClaim;
}

// Custom notification system
function showCustomNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `custom-notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${type === 'success' ? '✅' : type === 'info' ? 'ℹ️' : '⚠️'}</span>
      <span class="notification-message">${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Enhanced Animated Notification Text with dynamic updates
function updateNotificationText() {
  const notificationText = document.getElementById('notification-text');
  
  function updateMessage() {
    const newMessage = generateNotificationText();
    notificationText.textContent = newMessage;
  }
  
  // Initial update
  updateMessage();
  
  // Update every 8 seconds with new dynamic content
  setInterval(updateMessage, 8000);
  
  // Add new claims periodically (every 15-25 seconds)
  setInterval(() => {
    addNewClaim();
  }, Math.random() * 10000 + 15000); // Random between 15-25 seconds
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


// Smooth scrolling for navigation links
let cartCount = 0;
const cartCountEl = document.getElementById('cart-count');

document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// Add to cart functionality
document.querySelectorAll('.order-btn').forEach(button => {
  button.addEventListener('click', function() {
    const menuItem = this.closest('.menu-card').querySelector('h3').textContent;
    const price = this.closest('.menu-card').querySelector('.price span').textContent;
    
    // Visual feedback
    const originalText = this.textContent;
    this.textContent = 'Added! ✓';
    this.style.backgroundColor = '#2e7d32';
    
    // Animation effect
    this.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
      this.textContent = originalText;
      this.style.backgroundColor = '';
      this.style.transform = '';
    }, 1500);
    
    // In a real app, you would add to cart here
    console.log(`Added ${menuItem} (${price}) to cart`);
    cartCount++;
    cartCountEl.textContent = cartCount;

    
    // Show notification (optional)
    showNotification(`${menuItem} added to cart!`);
  });
});

// Order Now button functionality
document.querySelectorAll('.cta-button').forEach(button => {
  if (button.textContent.includes('Order Now')) {
    button.addEventListener('click', function() {
      // Scroll to menu section
      document.querySelector('#menu').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
});

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value;
    
    if (email) {
      // Show success message
      showNotification('Thank you for subscribing to our newsletter!');
      
      // Clear the input
      emailInput.value = '';
      
      // In a real app, you would send the email to your server here
      console.log(`Newsletter subscription: ${email}`);
    }
  });
}

// Show notification function
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--secondary);
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    font-weight: 500;
    animation: slideIn 0.3s ease;
  `;
  
  // Add CSS for animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => {
      document.body.removeChild(notification);
      document.head.removeChild(style);
    }, 300);
  }, 3000);
}

// Sticky header on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.padding = '0.5rem 0';
    header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.padding = '1rem 0';
    header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  }

});

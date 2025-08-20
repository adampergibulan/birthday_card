// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('birthdayForm');
    const cardContainer = document.getElementById('cardContainer');
    const userNameInput = document.getElementById('userName');
    const userAgeInput = document.getElementById('userAge');

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateBirthdayCard();
    });

    // Generate birthday card function
    function generateBirthdayCard() {
        const userName = userNameInput.value.trim();
        const userAge = userAgeInput.value.trim();

        // Validate inputs
        if (!userName || !userAge) {
            alert('Please fill in both name and age!');
            return;
        }

        if (userAge < 1 || userAge > 120) {
            alert('Please enter a valid age between 1 and 120!');
            return;
        }

        // Create the birthday card HTML
        const birthdayCard = createBirthdayCardHTML(userName, userAge);
        
        // Display the card with animation
        cardContainer.innerHTML = birthdayCard;
        
        // Add confetti effect
        createConfetti();
        
        // Scroll to the card smoothly
        cardContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    // Create birthday card HTML
    function createBirthdayCardHTML(name, age) {
        return `
            <div class="birthday-card">
                <h2>🎉 Happy Birthday ${name}! 🎉</h2>
                <h3>You are now ${age} years old</h3>
                <p>Wishing you endless happiness, success, and good health!</p>
                <button class="reset-btn" onclick="resetCard()">🎂 Create Another Card 🎂</button>
            </div>
        `;
    }

    // Create confetti effect
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#a55eea', '#26de81'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 2 + 's';
                
                // Random shapes
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                } else {
                    confetti.style.borderRadius = '2px';
                }
                
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 4000);
            }, i * 100);
        }
    }

    // Reset card function (global scope for onclick)
    window.resetCard = function() {
        // Clear the card container
        cardContainer.innerHTML = '';
        
        // Clear the form inputs
        userNameInput.value = '';
        userAgeInput.value = '';
        
        // Focus on the name input
        userNameInput.focus();
        
        // Scroll back to form
        form.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Add a little celebration for resetting
        setTimeout(() => {
            createMiniConfetti();
        }, 500);
    };

    // Mini confetti for reset
    function createMiniConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#f9ca24'];
        const confettiCount = 15;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = '6px';
                confetti.style.height = '6px';
                confetti.style.borderRadius = '50%';
                
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 80);
        }
    }

    // Add enter key support for better UX
    userNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            userAgeInput.focus();
        }
    });

    userAgeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateBirthdayCard();
        }
    });

    // Add some interactive feedback
    const generateBtn = document.getElementById('generateBtn');
    
    generateBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    generateBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    // Welcome message
    console.log('🎉 Birthday Card Generator loaded successfully! 🎉');
    
    // Focus on name input when page loads
    userNameInput.focus();
});
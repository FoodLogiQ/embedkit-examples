// Add interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle AI input focus
    const aiInput = document.querySelector('.ai-input');
    const inputBox = document.querySelector('.ai-input-box');

    if (aiInput && inputBox) {
        aiInput.addEventListener('focus', function() {
            inputBox.style.boxShadow = '0 4px 16px rgba(20, 115, 230, 0.15)';
            inputBox.style.borderColor = '#1473e6';
        });

        aiInput.addEventListener('blur', function() {
            inputBox.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            inputBox.style.borderColor = 'transparent';
        });
    }

    // Handle submit button
    const submitBtn = document.querySelector('.submit-btn');
    const input = document.querySelector('.ai-input');

    if (submitBtn && input) {
        submitBtn.addEventListener('click', function() {
            if (input.value.trim()) {
                console.log('Submitting:', input.value);
                // Add submit logic here
            }
        });

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && input.value.trim()) {
                console.log('Submitting:', input.value);
                // Add submit logic here
            }
        });

        // Update submit button state
        input.addEventListener('input', function() {
            if (input.value.trim()) {
                submitBtn.style.background = '#1473e6';
                submitBtn.querySelector('svg').style.color = 'white';
            } else {
                submitBtn.style.background = '#e1e1e1';
                submitBtn.querySelector('svg').style.color = '#6e6e6e';
            }
        });
    }

    // Handle prompt card clicks
    const promptCards = document.querySelectorAll('.prompt-card');
    promptCards.forEach(card => {
        card.addEventListener('click', function() {
            const promptText = this.querySelector('.prompt-text').textContent;
            if (aiInput) {
                aiInput.value = promptText;
                aiInput.focus();
                // Trigger input event to update submit button
                aiInput.dispatchEvent(new Event('input'));
            }
        });
    });

    // Handle sidebar navigation
    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sidebarBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle menu button (mobile)
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', function() {
            sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Handle search input
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.background = '#ffffff';
            this.parentElement.style.border = '1px solid #1473e6';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.background = '#f5f5f5';
            this.parentElement.style.border = 'none';
        });
    }

    // Add keyboard shortcut for search (Cmd/Ctrl + /)
    document.addEventListener('keydown', function(e) {
        if ((e.metaKey || e.ctrlKey) && e.key === '/') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
});

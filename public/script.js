document.addEventListener('DOMContentLoaded', () => {

	const ESCKey = false; /* Guardrail when testing - delete before production */ 

    // --- Fast Exit Functionality ---
    const fastExitButtons = document.querySelectorAll('.fast-exit');

    function performFastExit(event) {
    event.preventDefault(); // Prevent default link behavior if it's an anchor
    // Redirect to a neutral, common website and prevent back navigation
    location.replace('https://www.google.com');
    }

    fastExitButtons.forEach(button => {
        button.addEventListener('click', performFastExit);
    });

    // --- Fast Exit on ESC key ---
    document.addEventListener('keydown', (event) => {
		if (!ESCKey) return;
        if (event.key === 'Escape') {
            performFastExit(event);
        }
    });

    // --- Search Bar Functionality ---
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                alert('Search functionality is not implemented yet.');
                // In a real application, you would trigger the search here.
            }
        });
    }
    
    // --- Card Click Alert (for demonstration) ---
    const resourceCards = document.querySelectorAll('.card');
    
    resourceCards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            const cardTitle = card.querySelector('h3').textContent;
            alert(`You clicked on: "${cardTitle}".\nThis would navigate to the resource page.`);
        });
    });

});

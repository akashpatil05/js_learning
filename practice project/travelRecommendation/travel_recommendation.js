let destinationsData = {
    countries: [],
    temples: [],
    beaches: []
};

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDestinations();
});

// Load destinations from JSON file
function loadDestinations() {
    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            destinationsData = data;
            console.log('✅ All data loaded successfully!');
            console.log('Countries:', destinationsData.countries);
            console.log('Temples:', destinationsData.temples);
            console.log('Beaches:', destinationsData.beaches);
        })
        .catch(error => {
            console.error('❌ Error loading destinations:', error);
            alert('Failed to load destination data. Please check the JSON file.');
        });
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Clear search results when switching sections
    if (sectionId !== 'home') {
        clearResults();
    }
}

// Search destinations based on user input
function searchDestinations() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    if (!searchInput) {
        alert('Please enter a search term');
        return;
    }

    let results = [];
    const searchType = determineSearchType(searchInput);

    if (searchType === 'beaches') {
        results = searchBeaches(searchInput);
    } else if (searchType === 'temples') {
        results = searchTemples(searchInput);
    } else {
        results = searchCities(searchInput);
    }

    displayResults(results, searchInput);
}

// Determine search type based on input
function determineSearchType(input) {
    if (input.includes('beach') || input.includes('sea') || input.includes('sand')) {
        return 'beaches';
    } else if (input.includes('temple') || input.includes('spiritual') || input.includes('religious')) {
        return 'temples';
    }
    return 'cities';
}

// Search beaches
function searchBeaches(searchTerm) {
    return destinationsData.beaches.filter(beach =>
        beach.name.toLowerCase().includes(searchTerm) ||
        beach.description.toLowerCase().includes(searchTerm)
    );
}

// Search temples
function searchTemples(searchTerm) {
    return destinationsData.temples.filter(temple =>
        temple.name.toLowerCase().includes(searchTerm) ||
        temple.description.toLowerCase().includes(searchTerm)
    );
}

// Search cities (countries and their cities)
function searchCities(searchTerm) {
    let results = [];

    destinationsData.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(searchTerm) ||
                city.description.toLowerCase().includes(searchTerm) ||
                country.name.toLowerCase().includes(searchTerm)) {
                results.push({
                    ...city,
                    country: country.name
                });
            }
        });
    });

    return results;
}

// Get local time for a location
function getLocalTime(location) {
    // Map of locations to their timezones
    const timezones = {
        'sydney': 'Australia/Sydney',
        'melbourne': 'Australia/Melbourne',
        'tokyo': 'Asia/Tokyo',
        'kyoto': 'Asia/Tokyo',
        'rio de janeiro': 'America/Sao_Paulo',
        'são paulo': 'America/Sao_Paulo',
        'bora bora': 'Pacific/Tahiti',
        'copacabana': 'America/Sao_Paulo',
        'angkor wat': 'Asia/Bangkok',
        'taj mahal': 'Asia/Kolkata'
    };

    let timezone = null;
    const locationLower = location.toLowerCase();

    for (let key in timezones) {
        if (locationLower.includes(key)) {
            timezone = timezones[key];
            break;
        }
    }

    if (!timezone) {
        return 'Timezone information not available';
    }

    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return `Local time: ${formatter.format(new Date())}`;
    } catch (e) {
        return 'Timezone information not available';
    }
}

// Display search results
function displayResults(results, searchTerm) {
    const searchResultsDiv = document.getElementById('searchResults');

    if (results.length === 0) {
        searchResultsDiv.innerHTML = `
            <div class="no-results">
                No destinations found matching "${searchTerm}". Try searching for beaches, temples, or cities.
            </div>
        `;
        showSection('home');
        return;
    }

    let html = `<h2 class="results-header">Results for "${searchTerm}"</h2>`;
    html += '<div class="recommendations">';

    results.forEach(destination => {
        const localTime = getLocalTime(destination.name);
        html += `
            <div class="recommendation-card">
                <img src="${destination.imageUrl}" alt="${destination.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 200%22><rect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22>Image</text></svg>'">
                <h3>${destination.name}</h3>
                <p>${destination.description}</p>
                <div class="location-info">${localTime}</div>
            </div>
        `;
    });

    html += '</div>';
    searchResultsDiv.innerHTML = html;

    // Show home section with results
    showSection('home');
}

// Clear search results
function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

// Handle contact form submission
function submitContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate form submission (in real app, would send to server)
    console.log('Form submitted:', { name, email, message });

    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');

    // Reset form
    document.getElementById('contactForm').reset();

    // Hide success message after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Allow Enter key to search
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchDestinations();
        }
    });
});
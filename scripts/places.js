
// nje lloj si databaze per apartamente
const allApartments = [
    
    { id: 1, location: "Prishtina", name: "Dukagjini Residence", city: "Prishtina, Kosovo", price: 39, rating: 4.9, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" },
    { id: 2, location: "Prishtina", name: "Rruga B Apartment", city: "Prishtina, Kosovo", price: 15, rating: 4.8, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop" },
    { id: 3, location: "Prishtina", name: "Center Point Studio", city: "Prishtina, Kosovo", price: 45, rating: 4.7, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" },
    { id: 4, location: "Prishtina", name: "Sunny Hills Residence", city: "Prishtina, Kosovo", price: 55, rating: 5.0, image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop" },
    { id: 5, location: "Prishtina", name: "Modern City Loft", city: "Prishtina, Kosovo", price: 48, rating: 4.6, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop" },
    { id: 6, location: "Prishtina", name: "Downtown Studio", city: "Prishtina, Kosovo", price: 35, rating: 4.5, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" },
    
    
    { id: 7, location: "Tirana", name: "Blloku District Apartment", city: "Tirana, Albania", price: 35, rating: 4.8, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop" },
    { id: 8, location: "Tirana", name: "City Center Loft", city: "Tirana, Albania", price: 42, rating: 4.9, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" },
    { id: 9, location: "Tirana", name: "Skanderbeg Square Studio", city: "Tirana, Albania", price: 38, rating: 4.7, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop" },
    { id: 10, location: "Tirana", name: "Lake View Apartment", city: "Tirana, Albania", price: 67, rating: 4.8, image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop" },
    { id: 11, location: "Tirana", name: "Old Town Residence", city: "Tirana, Albania", price: 32, rating: 4.6, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" },
    
    
    { id: 12, location: "Other", name: "Skyline View Apartment", city: "Tokyo, Japan", price: 180, rating: 4.7, image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop" },
    { id: 13, location: "Other", name: "Eiffel Tower Loft", city: "Paris, France", price: 220, rating: 5.0, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" },
    { id: 14, location: "New York", name: "Times Square Studio Route 67", city: "New York, USA", price: 67, rating: 6.7, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop" },
    { id: 15, location: "Other", name: "Dubai Marina Apartment", city: "Dubai, UAE", price: 195, rating: 4.8, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" },
    { id: 16, location: "Other", name: "Barcelona Beach House", city: "Barcelona, Spain", price: 165, rating: 4.9, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop" },
];


const searchButton = document.querySelector('.search-button');
const whereInput = document.querySelector('.filter-item input[placeholder="Search destinations"]');
const defaultView = document.getElementById('default-view');
const searchView = document.getElementById('search-view');
const resultsGrid = document.getElementById('results-grid');
const resultsTitle = document.getElementById('results-title');
const resultsCount = document.getElementById('results-count');


// performon nje search per places.html nje funksion 
function performSearch() {
    const searchTerm = whereInput.value.toLowerCase().trim();
    
    let filteredApartments = [];
    let locationFilter = "All";
    
    
    if (searchTerm === "" || searchTerm === "all") {
        filteredApartments = allApartments;
        locationFilter = "All";
    } else if (searchTerm.includes("prishtina") || searchTerm.includes("pristina")) {
        filteredApartments = allApartments.filter(apt => apt.location === "Prishtina");
        locationFilter = "Prishtina";
    } else if (searchTerm.includes("tirana")) {
        filteredApartments = allApartments.filter(apt => apt.location === "Tirana");
        locationFilter = "Tirana";
    } else if (searchTerm.includes("newyork")) {
        filteredApartments = allApartments.filter(apt => apt.location === "New York");
        locationFilter = "New York";
    }
     else {
        
        filteredApartments = allApartments;
        locationFilter = "All";
    }
    
    
    defaultView.style.display = 'none';
    searchView.style.display = 'block';
    
    
    if (locationFilter === "All") {
        resultsTitle.textContent = "All Spots";
        resultsCount.textContent = `Showing all ${filteredApartments.length} properties`;
    } else {
        resultsTitle.textContent = `Spots in ${locationFilter}`;
        resultsCount.textContent = `Showing ${filteredApartments.length} properties in ${locationFilter}`;
    }
    
    
    resultsGrid.innerHTML = '';
    
    filteredApartments.forEach(apt => {
        const card = document.createElement('div');
        card.className = 'spot-card';
        card.innerHTML = `
            <div class="spot-image">
                <img src="${apt.image}" alt="${apt.name}">
            </div>
            <div class="spot-info">
                <div class="spot-location">${apt.city}</div>
                <h3>${apt.name}</h3>
                <div class="spot-details">
                    <span class="spot-price">$${apt.price}<small>/night</small></span>
                    <span class="spot-rating">⭐ ${apt.rating}</span>
                </div>
            </div>
        `;
        resultsGrid.appendChild(card);
    });
}

//event listeners per places.js
searchButton.addEventListener('click', performSearch);

whereInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});


whereInput.addEventListener('input', (e) => {
    if (e.target.value === '') {
        defaultView.style.display = 'block';
        searchView.style.display = 'none';
    }
});

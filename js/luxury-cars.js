// ========================================
// LUXURY CARS PAGE - JAVASCRIPT
// ========================================

// Video Switching Function (from main script)
function changeVideo(videoClass) {
    // Hide all videos
    document.querySelectorAll('.bg-video').forEach(video => {
        video.classList.remove('active');
    });
    
    // Hide all model titles
    document.querySelectorAll('.model').forEach(model => {
        model.classList.remove('active');
    });
    
    // Show selected video and title
    document.querySelector(`.bg-video.${videoClass}`).classList.add('active');
    document.querySelector(`.model.${videoClass}`).classList.add('active');
}

// Toggle Menu Function
function toggleMenu() {
    const menu = document.querySelector('header .menu');
    const nav = document.querySelector('.nav');
    
    menu.classList.toggle('active');
    nav.classList.toggle('active');
}

// Luxury Cars Database
const luxuryCars = [
    {
        id: 1,
        name: 'Ferrari F8 Tributo',
        brand: 'Ferrari',
        type: 'Supercar',
        pricePerDay: 2500,
        image: './images/cars/ferrari.jpg',
        specs: {
            power: '710 HP',
            acceleration: '2.9s (0-100)',
            topSpeed: '340 km/h',
            seats: '2'
        },
        features: ['Twin-Turbo V12', 'Carbon Fiber', 'Sport Suspension', 'Leather Interior'],
        rating: 4.9,
        reviews: 124,
        description: 'Experience pure Italian engineering. The Ferrari F8 Tributo delivers breathtaking performance with stunning design.'
    },
    {
        id: 2,
        name: 'Lamborghini Huracán',
        brand: 'Lamborghini',
        type: 'Supercar',
        pricePerDay: 2200,
        image: './images/cars/lamborghini.jpg',
        specs: {
            power: '640 HP',
            acceleration: '2.9s (0-100)',
            topSpeed: '325 km/h',
            seats: '2'
        },
        features: ['V10 Engine', 'All-Wheel Drive', 'Advanced Aerodynamics', 'Customizable Colors'],
        rating: 4.8,
        reviews: 98,
        description: 'Bold, aggressive, and incredibly fast. The Lamborghini Huracán is a work of art that comes to life on every road.'
    },
    {
        id: 3,
        name: 'McLaren 720S',
        brand: 'McLaren',
        type: 'Supercar',
        pricePerDay: 2400,
        image: './images/cars/mclaren.jpg',
        specs: {
            power: '710 HP',
            acceleration: '2.8s (0-100)',
            topSpeed: '341 km/h',
            seats: '2'
        },
        features: ['Twin-Turbo V8', 'Carbon Monocoque', 'Butterfly Doors', 'Premium Audio'],
        rating: 4.9,
        reviews: 156,
        description: 'Precision engineering meets British elegance. The McLaren 720S is a technological masterpiece.'
    },
    {
        id: 4,
        name: 'Porsche 911 Turbo',
        brand: 'Porsche',
        type: 'Sports',
        pricePerDay: 1800,
        image: './images/cars/porsche.jpg',
        specs: {
            power: '580 HP',
            acceleration: '2.7s (0-100)',
            topSpeed: '320 km/h',
            seats: '4'
        },
        features: ['Twin-Turbo Flat-6', 'AWD System', 'Sport Suspension', 'Panoramic Roof'],
        rating: 4.8,
        reviews: 187,
        description: 'The legendary 911 Turbo combines performance with practicality. Pure German engineering at its finest.'
    },
    {
        id: 5,
        name: 'Bentley Continental',
        brand: 'Bentley',
        type: 'Sedan',
        pricePerDay: 1600,
        image: './images/cars/bentley.jpg',
        specs: {
            power: '635 HP',
            acceleration: '3.5s (0-100)',
            topSpeed: '301 km/h',
            seats: '4'
        },
        features: ['W12 Engine', 'Luxury Interior', 'Four-Wheel Steering', 'Adaptive Suspension'],
        rating: 4.9,
        reviews: 142,
        description: 'Ultimate luxury and performance. The Bentley Continental GT is a timeless classic for discerning drivers.'
    },
    {
        id: 6,
        name: 'Rolls-Royce Ghost',
        brand: 'Rolls-Royce',
        type: 'Sedan',
        pricePerDay: 3000,
        image: './images/cars/rolls-royce.jpg',
        specs: {
            power: '563 HP',
            acceleration: '4.6s (0-100)',
            topSpeed: '250 km/h',
            seats: '5'
        },
        features: ['Twin-Turbo V12', 'Panoramic Roof', 'Handcrafted Interior', 'Starlight Headliner'],
        rating: 5.0,
        reviews: 87,
        description: 'The pinnacle of luxury motoring. Rolls-Royce Ghost offers unparalleled comfort and prestige.'
    },
    {
        id: 7,
        name: 'Lamborghini Revuelto',
        brand: 'Lamborghini',
        type: 'Hypercar',
        pricePerDay: 2800,
        image: './images/cars/revuelto.jpg',
        specs: {
            power: '1001 HP',
            acceleration: '2.5s (0-100)',
            topSpeed: '350 km/h',
            seats: '2'
        },
        features: ['Hybrid V12', 'Cutting-Edge Tech', 'Futuristic Design', 'Advanced AI'],
        rating: 5.0,
        reviews: 45,
        description: 'The future of hypercars is here. Lamborghini Revuelto combines hybrid power with breathtaking performance.'
    },
    {
        id: 8,
        name: 'Ferrari 296 GTB',
        brand: 'Ferrari',
        type: 'Supercar',
        pricePerDay: 2600,
        image: './images/cars/ferrari-296.jpg',
        specs: {
            power: '818 HP',
            acceleration: '2.9s (0-100)',
            topSpeed: '330 km/h',
            seats: '2'
        },
        features: ['Hybrid V6', 'Carbon Body', 'Lightweight Design', 'Track Mode'],
        rating: 4.9,
        reviews: 112,
        description: 'Innovation and tradition blend perfectly in the Ferrari 296 GTB. A modern masterpiece.'
    },
    {
        id: 9,
        name: 'Mercedes-AMG S63',
        brand: 'Mercedes-Benz',
        type: 'Sedan',
        pricePerDay: 1500,
        image: './images/cars/mercedes-amg.jpg',
        specs: {
            power: '630 HP',
            acceleration: '3.5s (0-100)',
            topSpeed: '305 km/h',
            seats: '5'
        },
        features: ['Twin-Turbo V8', 'AIRMATIC Suspension', '360° Camera', 'Burmester Audio'],
        rating: 4.8,
        reviews: 201,
        description: 'German precision meets luxury comfort. Mercedes-AMG S63 is the ultimate executive sedan.'
    },
    {
        id: 10,
        name: 'Aston Martin DB12',
        brand: 'Aston Martin',
        type: 'Sports',
        pricePerDay: 1900,
        image: './images/cars/aston-martin.jpg',
        specs: {
            power: '671 HP',
            acceleration: '3.1s (0-100)',
            topSpeed: '330 km/h',
            seats: '4'
        },
        features: ['Twin-Turbo V12', 'British Craftsmanship', 'Panoramic Roof', 'Bang & Olufsen'],
        rating: 4.9,
        reviews: 134,
        description: 'Iconic British design meets cutting-edge performance. The Aston Martin DB12 is elegance in motion.'
    },
    {
        id: 11,
        name: 'Bugatti Chiron',
        brand: 'Bugatti',
        type: 'Hypercar',
        pricePerDay: 5000,
        image: './images/cars/bugatti.jpg',
        specs: {
            power: '1479 HP',
            acceleration: '2.4s (0-100)',
            topSpeed: '490 km/h',
            seats: '2'
        },
        features: ['Quad-Turbo W16', 'Titanium Body', 'Sophisticated Tech', 'Exclusive Limited'],
        rating: 5.0,
        reviews: 28,
        description: 'The ultimate expression of automotive engineering. Bugatti Chiron is power, elegance, and exclusivity.'
    },
    {
        id: 12,
        name: 'Pagani Huayra',
        brand: 'Pagani',
        type: 'Hypercar',
        pricePerDay: 4500,
        image: './images/cars/pagani.jpg',
        specs: {
            power: '1200 HP',
            acceleration: '2.8s (0-100)',
            topSpeed: '370 km/h',
            seats: '2'
        },
        features: ['Twin-Turbo V12', 'Carbon Fiber', 'Handcrafted', 'Active Aerodynamics'],
        rating: 5.0,
        reviews: 32,
        description: 'Masterpiece of Italian craftsmanship. Pagani Huayra is automotive art at its finest.'
    }
    
];

// Global State
let filteredCars = [...luxuryCars];
let currentSelectedCar = null;

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    renderLuxuryCars();
    populateCarSelect();
    setupEventListeners();
});

// Render Luxury Cars
function renderLuxuryCars() {
    const gridContainer = document.getElementById('luxury-cars-grid');
    const noResults = document.getElementById('no-results');

    gridContainer.innerHTML = '';

    if (filteredCars.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    filteredCars.forEach((car, index) => {
        const carCard = createCarCard(car);
        carCard.style.animationDelay = `${index * 0.1}s`;
        gridContainer.appendChild(carCard);
    });
}

// Create Car Card
function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'luxury-car-card';
    card.dataset.carId = car.id;

    const starsHTML = Array(5).fill(0).map((_, i) => 
        `<i class="fas fa-star" style="color: ${i < Math.floor(car.rating) ? '#ffd700' : 'rgba(255,215,0,0.3)'}"></i>`
    ).join('');

    card.innerHTML = `
        <div class="car-image-wrapper">
            <img src="${car.image}" alt="${car.name}" onerror="this.src='./images/cars/placeholder.jpg'">
            <span class="car-badge">${car.type}</span>
            <div class="car-price-tag">₹${car.pricePerDay.toLocaleString()}/day</div>
        </div>
        <div class="car-details">
            <h3 class="car-title">${car.name}</h3>
            <p class="car-brand">${car.brand}</p>
            
            <div class="car-specs">
                <div class="spec-item">
                    <i class="fas fa-flash"></i>
                    <span>${car.specs.power}</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>${car.specs.acceleration}</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-rocket"></i>
                    <span>${car.specs.topSpeed}</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-chair"></i>
                    <span>${car.specs.seats} Seater</span>
                </div>
            </div>

            <p class="car-description">${car.description}</p>

            <div class="rating">
                <span class="stars">${starsHTML}</span>
                <span class="rating-count">(${car.reviews} reviews)</span>
            </div>

            <div class="car-actions">
                <button class="btn-book" onclick="openLuxuryBookingModal(${car.id})">Book Now</button>
                <button class="btn-details" onclick="showCarDetails(${car.id})">Details</button>
            </div>
        </div>
    `;

    return card;
}

// Populate Car Select
function populateCarSelect() {
    const select = document.getElementById('selected-car');
    
    luxuryCars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = `${car.name} - ₹${car.pricePerDay.toLocaleString()}/day`;
        select.appendChild(option);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    const brandFilter = document.getElementById('brand-filter');
    const priceFilter = document.getElementById('price-filter');
    const typeFilter = document.getElementById('type-filter');

    brandFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);

    // Date calculation
    const bookingDateInput = document.getElementById('booking-date');
    const returnDateInput = document.getElementById('return-date');
    const durationInput = document.getElementById('booking-duration');

    bookingDateInput.addEventListener('change', calculateDuration);
    returnDateInput.addEventListener('change', calculateDuration);

    // Booking form listeners
    document.getElementById('selected-car').addEventListener('change', updatePriceSummary);
    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener('change', updatePriceSummary);
    });
    document.querySelectorAll('input[name="service"]').forEach(checkbox => {
        checkbox.addEventListener('change', updatePriceSummary);
    });
}

// Apply Filters
function applyFilters() {
    const brandFilter = document.getElementById('brand-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const typeFilter = document.getElementById('type-filter').value;

    filteredCars = luxuryCars.filter(car => {
        // Brand filter
        if (brandFilter && car.brand !== brandFilter) return false;

        // Type filter
        if (typeFilter && car.type !== typeFilter) return false;

        // Price filter
        if (priceFilter) {
            if (priceFilter === '500-1000' && car.pricePerDay > 1000) return false;
            if (priceFilter === '1000-1500' && (car.pricePerDay < 1000 || car.pricePerDay > 1500)) return false;
            if (priceFilter === '1500-2000' && (car.pricePerDay < 1500 || car.pricePerDay > 2000)) return false;
            if (priceFilter === '2000+' && car.pricePerDay < 2000) return false;
        }

        return true;
    });

    renderLuxuryCars();
}

// Reset Filters
function resetFilters() {
    document.getElementById('brand-filter').value = '';
    document.getElementById('price-filter').value = '';
    document.getElementById('type-filter').value = '';
    
    filteredCars = [...luxuryCars];
    renderLuxuryCars();
}

// Calculate Duration
function calculateDuration() {
    const bookingDate = new Date(document.getElementById('booking-date').value);
    const returnDate = new Date(document.getElementById('return-date').value);

    if (bookingDate && returnDate && returnDate >= bookingDate) {
        const duration = Math.ceil((returnDate - bookingDate) / (1000 * 60 * 60 * 24));
        document.getElementById('booking-duration').value = duration || 1;
        updatePriceSummary();
    }
}

// Open Luxury Booking Modal
function openLuxuryBookingModal(carId = null) {
    const modal = document.getElementById('bookingModal');
    const select = document.getElementById('selected-car');

    if (carId) {
        select.value = carId;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updatePriceSummary();
}

// Close Booking Modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Update Price Summary
function updatePriceSummary() {
    const carId = document.getElementById('selected-car').value;
    const duration = parseInt(document.getElementById('booking-duration').value) || 1;

    if (!carId) {
        resetPriceSummary();
        return;
    }

    const car = luxuryCars.find(c => c.id == carId);
    if (!car) return;

    // Calculate base rate
    const baseRate = car.pricePerDay * duration;

    // Calculate delivery cost
    let deliveryCost = 0;
    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    if (deliveryType === 'delivery') {
        deliveryCost = 500;
    } else if (deliveryType === 'chauffeur') {
        deliveryCost = 800 * duration;
    }

    // Calculate additional services
    let servicesCost = 0;
    document.querySelectorAll('input[name="service"]:checked').forEach(checkbox => {
        if (checkbox.value === 'insurance') servicesCost += 200 * duration;
        if (checkbox.value === 'gps') servicesCost += 100 * duration;
        if (checkbox.value === 'wifi') servicesCost += 50 * duration;
        if (checkbox.value === 'valet') servicesCost += 300 * duration;
    });

    const totalAmount = baseRate + deliveryCost + servicesCost;

    // Update summary
    document.getElementById('summary-base').textContent = `₹${baseRate.toLocaleString()}`;
    document.getElementById('summary-delivery').textContent = `₹${deliveryCost.toLocaleString()}`;
    document.getElementById('summary-services').textContent = `₹${servicesCost.toLocaleString()}`;
    document.getElementById('summary-total').textContent = `₹${totalAmount.toLocaleString()}`;
}

// Reset Price Summary
function resetPriceSummary() {
    document.getElementById('summary-base').textContent = '₹0';
    document.getElementById('summary-delivery').textContent = '₹0';
    document.getElementById('summary-services').textContent = '₹0';
    document.getElementById('summary-total').textContent = '₹0';
}

// Submit Luxury Booking
function submitLuxuryBooking(event) {
    event.preventDefault();

    const formData = {
        car: document.getElementById('selected-car').value,
        name: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        phone: document.getElementById('customer-phone').value,
        license: document.getElementById('customer-license').value,
        bookingDate: document.getElementById('booking-date').value,
        bookingTime: document.getElementById('booking-time').value,
        returnDate: document.getElementById('return-date').value,
        duration: document.getElementById('booking-duration').value,
        delivery: document.querySelector('input[name="delivery"]:checked').value,
        services: Array.from(document.querySelectorAll('input[name="service"]:checked')).map(cb => cb.value),
        total: document.getElementById('summary-total').textContent
    };

    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('luxuryBookings') || '[]');
    bookings.push({
        ...formData,
        bookingId: 'LX-' + Date.now(),
        status: 'Pending',
        bookedAt: new Date().toISOString()
    });
    localStorage.setItem('luxuryBookings', JSON.stringify(bookings));

    // Show success message
    showSuccessMessage(formData);

    // Reset form
    document.getElementById('luxury-booking-form').reset();
    closeBookingModal();
}

// Show Success Message
function showSuccessMessage(bookingData) {
    const car = luxuryCars.find(c => c.id == bookingData.car);
    
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'booking-success-notification';
    notification.innerHTML = `
        <div style="background: linear-gradient(135deg, #00c2de 0%, #00a8b5 100%); 
                    padding: 30px; 
                    border-radius: 12px; 
                    color: white; 
                    position: fixed; 
                    top: 100px; 
                    right: 20px; 
                    z-index: 2000; 
                    max-width: 400px;
                    box-shadow: 0 10px 40px rgba(0,194,222,0.3);">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <i class="fas fa-check-circle" style="font-size: 2rem;"></i>
                <h3 style="margin: 0; font-size: 1.2rem;">Booking Confirmed!</h3>
            </div>
            <p style="margin: 10px 0; font-size: 0.95rem;">
                <strong>Vehicle:</strong> ${car.name}
            </p>
            <p style="margin: 10px 0; font-size: 0.95rem;">
                <strong>Duration:</strong> ${bookingData.duration} day(s)
            </p>
            <p style="margin: 10px 0; font-size: 0.95rem;">
                <strong>Total Amount:</strong> ${bookingData.total}
            </p>
            <p style="margin: 15px 0 0 0; font-size: 0.85rem; opacity: 0.9;">
                Confirmation details have been sent to ${bookingData.email}
            </p>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove notification
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Show Car Details Modal
function showCarDetails(carId) {
    const car = luxuryCars.find(c => c.id === carId);
    if (!car) return;

    const detailsHTML = `
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); 
                    border: 2px solid #00c2de; 
                    border-radius: 12px; 
                    padding: 30px; 
                    color: white; 
                    position: fixed; 
                    top: 50%; 
                    left: 50%; 
                    transform: translate(-50%, -50%); 
                    z-index: 2000; 
                    max-width: 600px; 
                    width: 90%; 
                    max-height: 90vh; 
                    overflow-y: auto;">
            <button onclick="this.parentElement.remove()" style="position: absolute; top: 15px; right: 15px; 
                    background: rgba(255,255,255,0.2); border: none; color: white; 
                    font-size: 24px; cursor: pointer; width: 40px; height: 40px; 
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                &times;
            </button>
            
            <h2 style="margin-top: 0; color: #00c2de;">${car.name}</h2>
            <p style="color: #ffd700; font-size: 1.1rem; margin: 10px 0;">
                ${car.brand} | ${car.type}
            </p>
            
            <h3 style="color: #00c2de; margin-top: 20px;">Specifications</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                <div>
                    <strong>Power Output:</strong> ${car.specs.power}
                </div>
                <div>
                    <strong>0-100 km/h:</strong> ${car.specs.acceleration}
                </div>
                <div>
                    <strong>Top Speed:</strong> ${car.specs.topSpeed}
                </div>
                <div>
                    <strong>Seating:</strong> ${car.specs.seats} Persons
                </div>
            </div>
            
            <h3 style="color: #00c2de;">Features</h3>
            <ul style="list-style: none; padding: 0;">
                ${car.features.map(feature => `
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,194,222,0.2);">
                        <i class="fas fa-check" style="color: #00c2de; margin-right: 10px;"></i>${feature}
                    </li>
                `).join('')}
            </ul>
            
            <h3 style="color: #00c2de; margin-top: 20px;">Rating</h3>
            <div style="display: flex; align-items: center; gap: 15px;">
                <div>
                    ${Array(5).fill(0).map((_, i) => 
                        `<i class="fas fa-star" style="color: ${i < Math.floor(car.rating) ? '#ffd700' : 'rgba(255,215,0,0.3)'}"></i>`
                    ).join('')}
                </div>
                <span>${car.rating}/5 (${car.reviews} reviews)</span>
            </div>
            
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(0,194,222,0.2);">
                <button onclick="openLuxuryBookingModal(${car.id}); this.parentElement.parentElement.remove();" 
                        style="width: 100%; padding: 12px; 
                                background: linear-gradient(135deg, #00c2de, #00a8b5); 
                                color: #1a1a2e; border: none; border-radius: 8px; 
                                font-weight: 700; cursor: pointer; font-size: 1rem;">
                    Book This Car Now
                </button>
            </div>
        </div>
    `;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1999;
        backdrop-filter: blur(5px);
    `;
    overlay.onclick = function() { this.remove(); document.body.querySelector('[style*="position: fixed"]').remove(); };

    document.body.appendChild(overlay);
    document.body.insertAdjacentHTML('beforeend', detailsHTML);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingModal();
    }
});

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const bookingDateInput = document.getElementById('booking-date');
    const returnDateInput = document.getElementById('return-date');
    
    if (bookingDateInput) bookingDateInput.setAttribute('min', today);
    if (returnDateInput) returnDateInput.setAttribute('min', today);
});

// Auto-open booking modal function for hero section
function openBookingModalFromHero() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        // Fallback to luxury booking modal
        openLuxuryBookingModal();
    }
}

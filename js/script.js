// toggle menu button
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const nav  = document.querySelector('.nav');
    menu.classList.toggle('active'); 
    nav.classList.toggle('active');
}

//Change the background video when click on gallery images
function changeVideo(name) {
    const bgVideoList = document.querySelectorAll('.bg-video');
    const models = document.querySelectorAll('.model')

    // javaScript higher order array function forEach
    // this is easier to do data mapping
    bgVideoList.forEach(video => {
        video.classList.remove('active');
        if (video.classList.contains(name)) {
            video.classList.add('active');
        }
    });

    // mapping model name change
    models.forEach(model => {
        model.classList.remove('active');
        if (model.classList.contains(name)) {
            model.classList.add('active');
        }
    });
}

// Google Maps API Variables (Now using Leaflet/OpenStreetMap)
let bookingMap = null;
let pickupMarker = null;
let currentSelectedLocation = null;
let geocoder = null;

function openBookingModal(event, carType) {
    event.preventDefault();
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    
    // Set the car type
    document.getElementById('carType').value = carType;
    
    // Initialize the map if not already initialized
    if (!bookingMap) {
        setTimeout(() => {
            initializeLeafletMap();
        }, 100);
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
}

function initializeLeafletMap() {
    const mapContainer = document.getElementById('pickupMap');
    const pickupInput = document.getElementById('pickupLocation');
    
    if (!mapContainer || !pickupInput) return;
    
    // Default center (center of India)
    const defaultCenter = [20.5937, 78.9629];
    
    // Create map with Leaflet
    bookingMap = L.map('pickupMap').setView(defaultCenter, 5);
    
    // Add OpenStreetMap tiles with better attribution
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
    }).addTo(bookingMap);
    
    // Search functionality using Nominatim (free geocoding service)
    let searchTimeout;
    pickupInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        const query = pickupInput.value.trim();
        
        if (query.length < 2) return;
        
        searchTimeout = setTimeout(() => {
            searchLocation(query, pickupInput, bookingMap);
        }, 300);
    });
    
    // Click on map to select location with visual feedback
    bookingMap.on('click', (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        
        currentSelectedLocation = { lat, lng };
        
        // Show loading state
        pickupInput.value = '⏳ Getting address...';
        pickupInput.dataset.lat = lat;
        pickupInput.dataset.lng = lng;
        
        // Get address from coordinates using Nominatim reverse geocoding with better parameters
        const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en`;
        
        fetch(reverseUrl)
            .then(response => response.json())
            .then(data => {
                let address = '';
                
                // Extract best available address components in order
                if (data.address) {
                    const addr = data.address;
                    // Priority: building/shop > street > locality > city > town
                    const mainPart = addr.building || 
                             addr.shop ||
                             addr.amenity ||
                             addr.road ||
                             addr.path ||
                             addr.residential ||
                             addr.locality ||
                             addr.village ||
                             addr.town ||
                             addr.city ||
                             addr.county ||
                             addr.district ||
                             addr.state;
                    
                    address = mainPart || data.display_name;
                    
                    // Add city/town for context
                    if ((addr.city || addr.town) && !address.includes(addr.city || addr.town)) {
                        address += `, ${addr.city || addr.town}`;
                    }
                    
                    // Add state for context
                    if (addr.state && !address.includes(addr.state)) {
                        address += `, ${addr.state}`;
                    }
                } else {
                    address = data.display_name;
                }
                
                // Show address with coordinates
                pickupInput.value = address;
                pickupInput.title = `${address}\nCoordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                
                updatePickupMarker(lat, lng, address);
            })
            .catch(error => {
                console.error('Reverse geocoding error:', error);
                const coordAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                pickupInput.value = coordAddress;
                pickupInput.title = coordAddress;
                updatePickupMarker(lat, lng, 'Selected Location');
            });
    });
    
    // Auto-focus map on first interaction
    pickupInput.addEventListener('focus', () => {
        if (!bookingMap._container.classList.contains('focused')) {
            setTimeout(() => {
                bookingMap.invalidateSize();
            }, 100);
        }
    });
}

function searchLocation(query, pickupInput, map) {
    // Improved search with better parameters for India
    const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}, India&limit=15&viewbox=68,8,97,35&bounded=1&countrycodes=in`;
    
    fetch(searchUrl)
        .then(response => response.json())
        .then(results => {
            if (results.length > 0) {
                displaySearchResults(results, pickupInput, map);
            } else {
                // Fallback: search without strict boundaries
                const fallbackUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10&countrycodes=in`;
                fetch(fallbackUrl)
                    .then(response => response.json())
                    .then(fallbackResults => {
                        if (fallbackResults.length > 0) {
                            displaySearchResults(fallbackResults, pickupInput, map);
                        }
                    });
            }
        })
        .catch(error => console.error('Search error:', error));
}

function displaySearchResults(results, pickupInput, map) {
    // Remove old suggestions
    let suggestionsList = document.getElementById('location-suggestions');
    if (suggestionsList) {
        suggestionsList.remove();
    }
    
    // Create suggestions container
    suggestionsList = document.createElement('div');
    suggestionsList.id = 'location-suggestions';
    suggestionsList.style.cssText = `
        position: absolute;
        background: #1a1a1a;
        border: 1px solid rgba(0, 194, 220, 0.5);
        border-radius: 6px;
        width: calc(100% - 30px);
        max-height: 250px;
        overflow-y: auto;
        z-index: 10001;
        margin-top: 2px;
        box-shadow: 0 4px 12px rgba(0, 194, 220, 0.2);
    `;
    
    pickupInput.parentNode.appendChild(suggestionsList);
    
    // Add each result as a suggestion
    results.forEach((result) => {
        const suggestion = document.createElement('div');
        
        // Extract cleaner location name
        const addressParts = result.display_name.split(',');
        const mainLocation = addressParts[0];
        const area = addressParts.slice(1, 3).join(',').trim();
        
        suggestion.innerHTML = `
            <div style="font-weight: 500; color: #00c2de;">${mainLocation}</div>
            <div style="font-size: 0.85em; color: #888; margin-top: 2px;">${area}</div>
        `;
        
        suggestion.style.cssText = `
            padding: 12px 15px;
            border-bottom: 1px solid rgba(0, 194, 220, 0.1);
            color: #ffffff;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.2s ease;
        `;
        
        suggestion.addEventListener('mouseover', () => {
            suggestion.style.backgroundColor = 'rgba(0, 194, 220, 0.15)';
            suggestion.style.borderLeftColor = '#00c2de';
            suggestion.style.borderLeft = '3px solid #00c2de';
            suggestion.style.paddingLeft = '12px';
        });
        
        suggestion.addEventListener('mouseout', () => {
            suggestion.style.backgroundColor = 'transparent';
            suggestion.style.borderLeft = 'none';
            suggestion.style.paddingLeft = '15px';
        });
        
        suggestion.addEventListener('click', () => {
            const lat = parseFloat(result.lat);
            const lng = parseFloat(result.lon);
            
            currentSelectedLocation = { lat, lng };
            pickupInput.value = mainLocation + (area ? `, ${area}` : '');
            
            // Update marker
            updatePickupMarker(lat, lng, result.display_name);
            
            // Center and zoom map
            map.setView([lat, lng], 15);
            
            // Remove suggestions
            suggestionsList.remove();
        });
        
        suggestionsList.appendChild(suggestion);
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target !== pickupInput && suggestionsList && suggestionsList.parentNode) {
            suggestionsList.remove();
        }
    });
}

function updatePickupMarker(lat, lng, title) {
    // Remove old marker
    if (pickupMarker) {
        bookingMap.removeLayer(pickupMarker);
    }
    
    // Create new draggable marker with Leaflet
    pickupMarker = L.marker([lat, lng], {
        title: title,
        draggable: true
    }).addTo(bookingMap);
    
    // Create custom popup with coordinates
    const popupContent = `
        <div style="padding: 8px; text-align: center;">
            <strong style="color: #00c2de; display: block;">Pickup Location</strong>
            <div style="color: #fff; font-size: 11px; margin-top: 4px; word-break: break-word;">
                ${title}
            </div>
            <div style="color: #888; font-size: 10px; margin-top: 4px;">
                ${lat.toFixed(6)}, ${lng.toFixed(6)}
            </div>
            <div style="color: #00c2de; font-size: 11px; margin-top: 6px;">
                <em>📍 Drag marker to adjust</em>
            </div>
        </div>
    `;
    
    pickupMarker.bindPopup(popupContent).openPopup();
    
    // Handle marker drag
    pickupMarker.on('dragend', () => {
        const newLat = pickupMarker.getLatLng().lat;
        const newLng = pickupMarker.getLatLng().lng;
        
        currentSelectedLocation = { lat: newLat, lng: newLng };
        
        // Update input field
        const pickupInput = document.getElementById('pickupLocation');
        pickupInput.value = '🔄 Updating location...';
        pickupInput.dataset.lat = newLat;
        pickupInput.dataset.lng = newLng;
        
        // Reverse geocode the new position
        const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}&zoom=18&addressdetails=1&accept-language=en`;
        
        fetch(reverseUrl)
            .then(response => response.json())
            .then(data => {
                let address = '';
                
                if (data.address) {
                    const addr = data.address;
                    const mainPart = addr.building || 
                             addr.shop ||
                             addr.amenity ||
                             addr.road ||
                             addr.path ||
                             addr.residential ||
                             addr.locality ||
                             addr.village ||
                             addr.town ||
                             addr.city ||
                             addr.county ||
                             addr.district ||
                             addr.state;
                    
                    address = mainPart || data.display_name;
                    
                    if ((addr.city || addr.town) && !address.includes(addr.city || addr.town)) {
                        address += `, ${addr.city || addr.town}`;
                    }
                    
                    if (addr.state && !address.includes(addr.state)) {
                        address += `, ${addr.state}`;
                    }
                } else {
                    address = data.display_name;
                }
                
                pickupInput.value = address;
                pickupInput.title = `${address}\nCoordinates: ${newLat.toFixed(6)}, ${newLng.toFixed(6)}`;
                
                // Update popup
                const newPopup = `
                    <div style="padding: 8px; text-align: center;">
                        <strong style="color: #00c2de; display: block;">Pickup Location</strong>
                        <div style="color: #fff; font-size: 11px; margin-top: 4px; word-break: break-word;">
                            ${address}
                        </div>
                        <div style="color: #888; font-size: 10px; margin-top: 4px;">
                            ${newLat.toFixed(6)}, ${newLng.toFixed(6)}
                        </div>
                        <div style="color: #00c2de; font-size: 11px; margin-top: 6px;">
                            <em>📍 Drag marker to adjust</em>
                        </div>
                    </div>
                `;
                pickupMarker.setPopupContent(newPopup).openPopup();
            })
            .catch(error => {
                const coordAddress = `${newLat.toFixed(6)}, ${newLng.toFixed(6)}`;
                pickupInput.value = coordAddress;
                pickupInput.title = coordAddress;
            });
    });
}

function useCurrentLocation(type) {
    if (navigator.geolocation) {
        const pickupBtn = document.querySelector('.btn-use-current-location');
        const pickupInput = document.getElementById('pickupLocation');
        
        pickupBtn.textContent = '⏳ Getting precise location...';
        pickupBtn.disabled = true;
        pickupInput.value = '⏳ Detecting your location...';
        
        // First try with high accuracy
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const accuracy = position.coords.accuracy;
                
                console.log(`Location found with accuracy: ${accuracy.toFixed(2)}m`);
                
                if (type === 'pickup') {
                    currentSelectedLocation = { lat, lng };
                    
                    // Store coordinates in input dataset
                    pickupInput.dataset.lat = lat;
                    pickupInput.dataset.lng = lng;
                    
                    // Show loading state with accuracy
                    pickupInput.value = `📍 Accuracy: ${accuracy.toFixed(0)}m - Getting address...`;
                    
                    // Get address from coordinates with high accuracy parameters
                    const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en`;
                    
                    fetch(reverseUrl)
                        .then(response => response.json())
                        .then(data => {
                            let address = '';
                            
                            // Extract best available address components
                            if (data.address) {
                                const addr = data.address;
                                // Priority for residential/street addresses
                                const mainPart = addr.building ||
                                         addr.shop ||
                                         addr.amenity ||
                                         addr.road ||
                                         addr.path ||
                                         addr.residential ||
                                         addr.locality ||
                                         addr.village ||
                                         addr.town ||
                                         addr.city ||
                                         addr.county ||
                                         addr.district;
                                
                                address = mainPart || data.display_name;
                                
                                // Add city/town
                                if ((addr.city || addr.town) && !address.includes(addr.city || addr.town)) {
                                    address += `, ${addr.city || addr.town}`;
                                }
                                
                                // Add state
                                if (addr.state && !address.includes(addr.state)) {
                                    address += `, ${addr.state}`;
                                }
                            } else {
                                address = data.display_name;
                            }
                            
                            pickupInput.value = address;
                            pickupInput.title = `${address}\nCoordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}\nAccuracy: ±${accuracy.toFixed(0)}m`;
                            
                            updatePickupMarker(lat, lng, address);
                            
                            // Center and zoom map
                            bookingMap.setView([lat, lng], 16);
                        })
                        .catch(error => {
                            console.error('Reverse geocoding error:', error);
                            const coordAddress = `📍 ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                            pickupInput.value = coordAddress;
                            pickupInput.title = `Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}\nAccuracy: ±${accuracy.toFixed(0)}m`;
                            updatePickupMarker(lat, lng, 'Your Current Location');
                            
                            // Center and zoom map
                            bookingMap.setView([lat, lng], 16);
                        });
                    
                    // Reset button after 2 seconds
                    setTimeout(() => {
                        pickupBtn.textContent = '📍 Use Current Location';
                        pickupBtn.disabled = false;
                    }, 2000);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                let errorMsg = '❌ Unable to get your location. ';
                
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg += 'Please enable location access in your browser settings.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg += 'Your device cannot determine its location.';
                        break;
                    case error.TIMEOUT:
                        errorMsg += 'Location detection took too long. Try again.';
                        break;
                }
                
                alert(errorMsg);
                pickupInput.value = '';
                pickupBtn.textContent = '📍 Use Current Location';
                pickupBtn.disabled = false;
            },
            {
                enableHighAccuracy: true,  // Request highest accuracy
                timeout: 15000,             // Wait up to 15 seconds
                maximumAge: 0               // Don't use cached location
            }
        );
    } else {
        alert('❌ Geolocation is not supported by your browser. Please update your browser or use search instead.');
    }
}

// Close modal when clicking on overlay
document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.querySelector('.booking-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeBookingModal);
    }
    
    // Handle form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                pickupLocation: document.getElementById('pickupLocation').value,
                returnLocation: document.getElementById('returnLocation').value,
                pickupDate: document.getElementById('pickupDate').value,
                returnDate: document.getElementById('returnDate').value,
                carType: document.getElementById('carType').value,
                driverAge: document.getElementById('driverAge').value,
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                specialRequests: document.getElementById('specialRequests').value,
                coordinates: currentSelectedLocation
            };
            
            // Validate form
            if (!formData.pickupLocation || !currentSelectedLocation) {
                alert('Please select a valid pickup location on the map.');
                return;
            }
            
            // Log the booking data (in production, send to backend)
            console.log('Booking Data:', formData);
            
            // Show success message
            alert('Booking request submitted successfully!\nWe will contact you at ' + formData.phone + ' soon.');
            
            // Reset form and close modal
            bookingForm.reset();
            closeBookingModal();
        });
    }
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('pickupDate').setAttribute('min', today);
    document.getElementById('returnDate').setAttribute('min', today);
    
    // Update return date minimum when pickup date changes
    document.getElementById('pickupDate').addEventListener('change', function() {
        document.getElementById('returnDate').setAttribute('min', this.value);
    });
});

 
            // Handle image carousel on hover/unhover with dot indicators
            document.querySelectorAll('.car-card').forEach(card => {
                const carousel = card.querySelector('.car-image-carousel');
                const indicators = card.querySelectorAll('.carousel-dot');
                if (!carousel) return;
                
                const images = carousel.querySelectorAll('.car-image');
                let currentImageIndex = 0;
                let carouselTimeout;
                let carouselInterval;
                
                // Function to update dots based on image visibility
                const updateDots = () => {
                    images.forEach((img, idx) => {
                        const opacity = window.getComputedStyle(img).opacity;
                        if (opacity > 0.5) {
                            currentImageIndex = idx;
                        }
                    });
                    
                    // Update active dot
                    indicators.forEach((dot, idx) => {
                        if (idx === currentImageIndex) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                };
                
                // Update dots periodically during hover
                const startDotAnimation = () => {
                    carouselInterval = setInterval(updateDots, 100);
                };
                
                const stopDotAnimation = () => {
                    clearInterval(carouselInterval);
                };
                
                card.addEventListener('mouseenter', () => {
                    clearTimeout(carouselTimeout);
                    startDotAnimation();
                    // Resume animations
                    images.forEach(img => {
                        img.style.animationPlayState = 'running';
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    stopDotAnimation();
                    // Get current visible image and freeze it
                    images.forEach((img, idx) => {
                        img.style.animationPlayState = 'paused';
                        if (window.getComputedStyle(img).opacity > 0.5) {
                            currentImageIndex = idx;
                        }
                    });
                    
                    // Show only the current image
                    images.forEach((img, idx) => {
                        if (idx === currentImageIndex) {
                            img.style.opacity = '1';
                            img.style.animation = 'none';
                        } else {
                            img.style.opacity = '0';
                            img.style.animation = 'none';
                        }
                    });
                    
                    // Update dots to frozen position
                    updateDots();
                });
                
                // Allow clicking dots to jump to that image
                indicators.forEach((dot, idx) => {
                    dot.addEventListener('click', (e) => {
                        e.preventDefault();
                        images.forEach(img => {
                            img.style.animationPlayState = 'paused';
                        });
                        
                        images.forEach((img, i) => {
                            if (i === idx) {
                                img.style.opacity = '1';
                                img.style.animation = 'none';
                            } else {
                                img.style.opacity = '0';
                                img.style.animation = 'none';
                            }
                        });
                        
                        currentImageIndex = idx;
                        updateDots();
                    });
                });
            });
            
class SushiDiscoveryMap {
    constructor() {
        this.restaurants = [];
        this.attractions = [];
        this.allPOIs = [];
        this.filteredPOIs = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.map = null;
        this.markerLayers = {
            restaurants: L.featureGroup(),
            attractions: L.featureGroup()
        };
        this.markers = {
            restaurants: new Map(),
            attractions: new Map()
        };
        this.activePOI = null;
        this.isSidebarOpen = window.innerWidth >= 768;

        this.init();
    }

    async init() {
        await this.loadData();
        this.initMap();
        this.setupEventListeners();
        this.renderPOIList();
        this.addMarkersToMap();
    }

    async loadData() {
        try {
            const [restaurantsRes, attractionsRes] = await Promise.all([
                fetch('data/restaurants.json'),
                fetch('data/attractions.json')
            ]);

            this.restaurants = await restaurantsRes.json();
            this.attractions = await attractionsRes.json();

            this.restaurants.forEach(r => r.type_category = 'restaurants');
            this.attractions.forEach(a => a.type_category = 'attractions');

            this.allPOIs = [...this.restaurants, ...this.attractions];
            this.filteredPOIs = [...this.allPOIs];
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    initMap() {
        this.map = L.map('map').setView([61.4973, 23.7619], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            minZoom: 11
        }).addTo(this.map);

        this.markerLayers.restaurants.addTo(this.map);
        this.markerLayers.attractions.addTo(this.map);
    }

    addMarkersToMap() {
        this.restaurants.forEach(restaurant => {
            const marker = this.createMarker(restaurant, 'restaurant');
            this.markerLayers.restaurants.addLayer(marker);
            this.markers.restaurants.set(restaurant.id, marker);
        });

        this.attractions.forEach(attraction => {
            const marker = this.createMarker(attraction, 'attraction');
            this.markerLayers.attractions.addLayer(marker);
            this.markers.attractions.set(attraction.id, marker);
        });
    }

    createMarker(poi, type) {
        const markerElement = document.createElement('div');
        markerElement.className = `poi-marker ${type}`;

        const marker = L.marker([poi.lat, poi.lng], {
            icon: L.divIcon({
                html: markerElement,
                className: '',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        });

        marker.on('click', () => {
            this.showPOIDetails(poi);
            this.highlightPOI(poi.id);
        });

        return marker;
    }

    setupEventListeners() {
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.applyFilters();
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.applyFilters();
            });
        });

        document.getElementById('layer-restaurants').addEventListener('change', (e) => {
            this.markerLayers.restaurants.remove();
            if (e.target.checked) {
                this.markerLayers.restaurants.addTo(this.map);
            }
        });

        document.getElementById('layer-attractions').addEventListener('change', (e) => {
            this.markerLayers.attractions.remove();
            if (e.target.checked) {
                this.markerLayers.attractions.addTo(this.map);
            }
        });

        document.getElementById('sidebar-toggle').addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
        });

        document.getElementById('popup-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'popup-overlay') {
                this.closePOIDetails();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                document.querySelector('.sidebar').classList.remove('open');
            }
        });
    }

    applyFilters() {
        this.filteredPOIs = this.allPOIs.filter(poi => {
            const matchesFilter =
                this.currentFilter === 'all' ||
                this.currentFilter === poi.type_category;

            const matchesSearch =
                this.searchTerm === '' ||
                poi.name.toLowerCase().includes(this.searchTerm) ||
                poi.address.toLowerCase().includes(this.searchTerm);

            return matchesFilter && matchesSearch;
        });

        this.renderPOIList();
    }

    renderPOIList() {
        const poiList = document.getElementById('poi-list');
        poiList.innerHTML = '';

        if (this.filteredPOIs.length === 0) {
            poiList.innerHTML = '<div style="padding: 1rem; text-align: center; color: #999;">No results found</div>';
            return;
        }

        this.filteredPOIs.forEach(poi => {
            const poiElement = document.createElement('div');
            poiElement.className = `poi-item ${poi.type_category}`;
            if (this.activePOI && this.activePOI.id === poi.id) {
                poiElement.classList.add('active');
            }

            const type = poi.type_category === 'restaurants' ? poi.type : poi.admission === 'free' ? 'Free Admission' : 'Paid Admission';

            poiElement.innerHTML = `
                <div class="poi-item-name">${poi.name}</div>
                <div class="poi-item-type">${type}</div>
                <div class="poi-item-address">${poi.address}</div>
            `;

            poiElement.addEventListener('click', () => {
                this.showPOIDetails(poi);
                this.highlightPOI(poi.id);
            });

            poiList.appendChild(poiElement);
        });
    }

    highlightPOI(poiId) {
        const poi = this.allPOIs.find(p => p.id === poiId);
        this.activePOI = poi;
        this.renderPOIList();

        if (poi.type_category === 'restaurants') {
            const marker = this.markers.restaurants.get(poiId);
            if (marker) {
                this.map.setView([poi.lat, poi.lng], 15, { animate: true });
                marker.openPopup();
            }
        } else {
            const marker = this.markers.attractions.get(poiId);
            if (marker) {
                this.map.setView([poi.lat, poi.lng], 15, { animate: true });
                marker.openPopup();
            }
        }

        if (window.innerWidth < 768) {
            document.querySelector('.sidebar').classList.remove('open');
        }
    }

    showPOIDetails(poi) {
        const overlay = document.getElementById('popup-overlay');
        const content = document.getElementById('popup-content');
        const isRestaurant = poi.type_category === 'restaurants';
        const type = isRestaurant ? poi.type : poi.admission === 'free' ? 'Free Admission' : 'Paid Admission';

        content.innerHTML = `
            <div class="popup-header">
                <div>
                    <span class="popup-type ${isRestaurant ? 'restaurant' : 'attraction'}">${type}</span>
                    <h2 class="popup-title">${poi.name}</h2>
                </div>
                <button class="popup-close" id="popup-close">×</button>
            </div>

            ${poi.curator_note ? `
                <div class="popup-curator-note">${poi.curator_note}</div>
            ` : ''}

            <div class="popup-info">
                <div class="popup-info-row">
                    <span class="popup-label">Address</span>
                    <span class="popup-value">${poi.address}</span>
                </div>

                ${poi.phone ? `
                    <div class="popup-info-row">
                        <span class="popup-label">Phone</span>
                        <span class="popup-value"><a href="tel:${poi.phone}">${poi.phone}</a></span>
                    </div>
                ` : ''}

                ${poi.url ? `
                    <div class="popup-info-row">
                        <span class="popup-label">Website</span>
                        <span class="popup-value"><a href="${poi.url}" target="_blank" rel="noopener">Visit</a></span>
                    </div>
                ` : ''}

                <div class="popup-info-row">
                    <span class="popup-label">${isRestaurant ? 'Hours' : 'Hours'}</span>
                    <span class="popup-value">${poi.hours}</span>
                </div>
            </div>

            <div class="popup-description">${poi.description}</div>
        `;

        overlay.classList.add('active');
        document.getElementById('popup-close').addEventListener('click', () => {
            this.closePOIDetails();
        });
    }

    closePOIDetails() {
        const overlay = document.getElementById('popup-overlay');
        overlay.classList.remove('active');
        this.activePOI = null;
        this.renderPOIList();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SushiDiscoveryMap();
});

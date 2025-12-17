// Google Reviews Fetcher
// Note: To use this, you need:
// 1. A Google Places API key
// 2. Your Google Place ID

const GOOGLE_CONFIG = {
    apiKey: 'AIzaSyApDfcuf4pIJOE3a7DOUa-4Kg7sFu0a3i8', // Replace with your actual API key
    placeId: 'ChIJW1UaCmVmXj4RGVYFgJrrH08' // Replace with your actual Place ID
};

// Function to fetch Google reviews
async function fetchGoogleReviews() {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_CONFIG.placeId}&fields=reviews&key=${GOOGLE_CONFIG.apiKey}`;

    try {
        // Note: Direct API calls from browser will fail due to CORS
        // You need a proxy server or use the Google Places JavaScript API
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        return data.result.reviews || [];
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        return [];
    }
}

function loadGoogleReviewsWithAPI() {
    if (typeof google === 'undefined' || !google.maps) {
        showFallbackReviews();
        return;
    }

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const request = {
        placeId: GOOGLE_CONFIG.placeId,
        fields: ['reviews', 'rating', 'user_ratings_total']
    };

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            // Filter out low ratings (only 4 and 5 stars) and sort by most recent
            const goodReviews = place.reviews
                .filter(review => review.rating >= 4)
                .sort((a, b) => b.time - a.time);

            // Get the 3 most recent good reviews
            const recentReviews = goodReviews.slice(0, 3);

            if (recentReviews.length > 0) {
                displayReviews(recentReviews);
            } else {
                showFallbackReviews();
            }
        } else {
            showFallbackReviews();
        }
    });
}


function displayReviews(reviews) {
    const container = document.getElementById('testimonials-container');

    if (!container) {
        console.error('Testimonials container not found');
        return;
    }

    // Clear loading state
    container.innerHTML = '';

    reviews.forEach((review, index) => {
        const delay = (index + 1) * 100;
        const reviewCard = createReviewCard(review, delay);
        container.appendChild(reviewCard);
    });
}

// Function to create a review card element
function createReviewCard(review, delay) {
    const col = document.createElement('div');
    col.className = 'col-lg-4';
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', delay);

    const stars = '⭐'.repeat(review.rating);
    const initials = getInitials(review.author_name);
    const timeAgo = getTimeAgo(review.time);

    col.innerHTML = `
    <div class="testimonial-card">
      <div class="mb-3">
        <span class="text-warning fs-5">${stars}</span>
        <span class="text-muted ms-2">${timeAgo}</span>
      </div>
      <p class="fs-5 text-dark mb-4">"${review.text}"</p>
      <div class="client-info">
        <div class="client-avatar">${initials}</div>
        <div>
          <h6 class="mb-1">${review.author_name}</h6>
          <p class="text-dark mb-0">
            <i class="fab fa-google me-1"></i>مراجعة من Google
          </p>
        </div>
      </div>
    </div>
  `;

    return col;
}

// Helper function to get initials
function getInitials(name) {
    const names = name.trim().split(' ');
    if (names.length >= 2) {
        return names[0][0] + '.' + names[1][0];
    }
    return name.substring(0, 2);
}

// Helper function to format relative time
function getTimeAgo(timestamp) {
    const now = Date.now();
    const reviewDate = timestamp * 1000; // Convert to milliseconds
    const diffInDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'اليوم';
    if (diffInDays === 1) return 'أمس';
    if (diffInDays < 7) return `منذ ${diffInDays} أيام`;
    if (diffInDays < 30) return `منذ ${Math.floor(diffInDays / 7)} أسابيع`;
    if (diffInDays < 365) return `منذ ${Math.floor(diffInDays / 30)} شهور`;
    return `منذ ${Math.floor(diffInDays / 365)} سنوات`;
}

// Function to show loading state
function showLoadingState() {
    const container = document.getElementById('testimonials-container');
    if (container) {
        container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">جاري التحميل...</span>
        </div>
        <p class="mt-3 text-muted">جاري تحميل آراء العملاء...</p>
      </div>
    `;
    }
}

// Function to show fallback reviews if API fails
function showFallbackReviews() {
    const fallbackReviews = [
        {
            author_name: 'يوسف التجاني محمد',
            rating: 5,
            text: 'فريق محترف جداً ساعدنا في تأسيس شركتنا خلال فترة قياسية، مع تقديم دعم قانوني كامل طوال الرحلة.',
            time: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60) // 30 days ago
        },
        {
            author_name: 'فاطمة السعيد',
            rating: 5,
            text: 'استشارات دقيقة وسريعة الاستجابة، أنصح بشدة بإسناد لأي احتياج قانوني. فريق متخصص يعرف عمله جيداً.',
            time: Math.floor(Date.now() / 1000) - (45 * 24 * 60 * 60) // 45 days ago
        },
        {
            author_name: 'نورة القاسمي',
            rating: 5,
            text: 'تعاملوا مع نزاع قانوني معقد بحرفية عالية، ووفر لنا الوقت والجهد والمال. شكراً لفريق إسناد المتميز.',
            time: Math.floor(Date.now() / 1000) - (60 * 24 * 60 * 60) // 60 days ago
        }
    ];

    displayReviews(fallbackReviews);
}

// Initialize reviews on page load
document.addEventListener('DOMContentLoaded', function () {
    showLoadingState();

    // Wait a bit for Google Maps API to fully load
    const checkGoogleAPI = () => {
        if (typeof google !== 'undefined' && google.maps && google.maps.places) {
            loadGoogleReviewsWithAPI();
        } else {
            showFallbackReviews();
        }
    };

    // Try multiple times with increasing delays
    setTimeout(checkGoogleAPI, 100);
    setTimeout(() => {
        if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
            checkGoogleAPI();
        }
    }, 500);
    setTimeout(() => {
        if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
            checkGoogleAPI();
        }
    }, 1000);
});

// Create floating hearts
function createHearts() {
    const container = document.getElementById('heartsContainer');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(heart);
    }
}

// Application data with localStorage
let donors = JSON.parse(localStorage.getItem('bloodDonors')) || [];
let requests = JSON.parse(localStorage.getItem('bloodRequests')) || [];

// Save data to localStorage
function saveData() {
    localStorage.setItem('bloodDonors', JSON.stringify(donors));
    localStorage.setItem('bloodRequests', JSON.stringify(requests));
}

// Show section function
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'donors') updateDonorsList();
    if (sectionId === 'requests') updateRequestsList();
}

// Add donor function
function addDonor() {
    const name = document.getElementById('donorName').value;
    const phone = document.getElementById('donorPhone').value;
    const city = document.getElementById('donorCity').value;
    const bloodType = document.getElementById('donorBloodType').value;
    
    if (name && phone && city && bloodType) {
        donors.push({
            id: Date.now(),
            name: name,
            phone: phone,
            city: city,
            bloodType: bloodType,
            date: new Date().toLocaleDateString('ar-LY'),
            badge: '🦸 بطل الحياة'
        });
        
        saveData();
        
        // Clear fields
        document.getElementById('donorName').value = '';
        document.getElementById('donorPhone').value = '';
        document.getElementById('donorCity').value = '';
        document.getElementById('donorBloodType').value = '';
        
        // Show success message
        showMagicAlert('🎉 تم انضمام البطل بنجاح!', 'success');
        updateDonorsList();
    } else {
        showMagicAlert('⚠️ يرجى ملء جميع الحقول', 'error');
    }
}

// Add request function
function addRequest() {
    const name = document.getElementById('patientName').value;
    const phone = document.getElementById('patientPhone').value;
    const city = document.getElementById('requestCity').value;
    const bloodType = document.getElementById('requestBloodType').value;
    const hospital = document.getElementById('hospital').value;
    
    if (name && phone && city && bloodType && hospital) {
        requests.push({
            id: Date.now(),
            name: name,
            phone: phone,
            city: city,
            bloodType: bloodType,
            hospital: hospital,
            date: new Date().toLocaleDateString('ar-LY'),
            time: new Date().toLocaleTimeString('ar-LY'),
            status: '🆘 عاجل'
        });
        
        saveData();
        
        // Clear fields
        document.getElementById('patientName').value = '';
        document.getElementById('patientPhone').value = '';
        document.getElementById('requestCity').value = '';
        document.getElementById('requestBloodType').value = '';
        document.getElementById('hospital').value = '';
        
        showMagicAlert('🎯 تم إطلاق نداء الحياة بنجاح!', 'success');
        updateRequestsList();
    } else {
        showMagicAlert('⚠️ يرجى ملء جميع الحقول', 'error');
    }
}

// Update donors list
function updateDonorsList() {
    const donorsList = document.getElementById('donorsList');
    donorsList.innerHTML = '';
    
    if (donors.length === 0) {
        donorsList.innerHTML = `
            <div class="data-card" style="text-align: center; grid-column: 1/-1;">
                <h3>👑 كن أول بطل للإنقاذ!</h3>
                <p>كن أول من ينضم لفرسان الحياة وينقذ الأرواح</p>
            </div>
        `;
        return;
    }
    
    donors.forEach(donor => {
        const donorCard = document.createElement('div');
        donorCard.className = 'data-card';
        donorCard.innerHTML = `
            <h3>${donor.badge} ${donor.name}</h3>
            <p>📞 ${donor.phone}</p>
            <p>📍 ${donor.city} | 🩸 ${donor.bloodType}</p>
            <small>📅 ${donor.date}</small>
        `;
        donorsList.appendChild(donorCard);
    });
}

// Update requests list
function updateRequestsList() {
    const requestsList = document.getElementById('requestsList');
    requestsList.innerHTML = '';
    
    if (requests.length === 0) {
        requestsList.innerHTML = `
            <div class="data-card" style="text-align: center; grid-column: 1/-1;">
                <h3>🕊️ لا توجد نداءات حالية</h3>
                <p>جميع الحالات مستقرة - الحمد لله</p>
            </div>
        `;
        return;
    }
    
    requests.forEach(request => {
        const requestCard = document.createElement('div');
        requestCard.className = 'data-card';
        requestCard.innerHTML = `
            <h3>${request.status} ${request.name}</h3>
            <p>📞 ${request.phone}</p>
            <p>📍 ${request.city} | 🩸 ${request.bloodType}</p>
            <p>🏥 ${request.hospital}</p>
            <small>⏰ ${request.date} - ${request.time}</small>
        `;
        requestsList.appendChild(requestCard);
    });
}

// Magic alert function
function showMagicAlert(message, type) {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #2ed573, #1e90ff)' : 'linear-gradient(135deg, #ff4757, #ff6348)'};
        color: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
        max-width: 300px;
    `;
    alert.innerHTML = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => alert.remove(), 500);
    }, 3000);
}

// Add CSS for alert animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    updateDonorsList();
    updateRequestsList();
    
    // Add some sample data for demonstration if empty
    if (donors.length === 0) {
        donors.push({
            id: Date.now(),
            name: "محمد الهادي",
            phone: "0912345678",
            city: "طرابلس",
            bloodType: "O+",
            date: new Date().toLocaleDateString('ar-LY'),
            badge: "🦸 البطل الأول"
        });
        saveData();
        updateDonorsList();
    }
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
          }

<script setup>
</script>

<template>
    <div class="home-container">
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-image-container">
                <img src="/promo_banner.png" alt="Patissier Promo Banner" class="hero-image" />
            </div>
            <div class="hero-overlay">
                <div class="hero-text">
                    <h1>Patissier</h1>
                    <p class="subtitle">Découvrez notre collection raffinée.</p>
                    <router-link to="/products">
                        <button class="cta-button">products</button>
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section class="values-section">
            <div class="value-card">
                <h3>Authenticity</h3>
                <p>Premium ingredients for an unforgettable taste.</p>
            </div>
            <div class="value-card">
                <h3>Craftsmanship</h3>
                <p>Handmade with passion and precision.</p>
            </div>
            <div class="value-card">
                <h3>Innovation</h3>
                <p>Modern creations inspired by tradition.</p>
            </div>
        </section>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400&display=swap');

:root {
    --color-beige-bg: #F9F7F2;
    --color-white: #FFFFFF;
    --color-marble-accent: #EFEBE9;
    --color-text-dark: #3E3E3E;
    --color-gold: #C5A059;
}

.home-container {
    font-family: 'Lato', sans-serif;
    color: #3E3E3E;
    background-color: #F9F7F2;
    width: 100%;
    margin-top: -20px;
    padding-bottom: 50px;
}

/* Hero Section */
.hero-section {
    position: relative;
    width: 100%;
    margin-bottom: 60px;
}

.hero-image-container {
    width: 100%;
    overflow: hidden;
}

.hero-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
}

.hero-overlay {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.85); /* Glassmorphism light */
    padding: 30px 50px;
    border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255,255,255, 0.5);
    max-width: 500px;
}

.hero-text h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: #3E3E3E;
    margin-bottom: 10px;
    letter-spacing: 1px;
}

.hero-text .subtitle {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 25px;
    font-weight: 300;
}

.cta-button {
    background-color: #C5A059;
    color: white;
    border: none;
    padding: 12px 30px;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.cta-button:hover {
    background-color: #b08d4b;
}

/* Values Section */
.values-section {
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 0 20px;
    margin-bottom: 80px;
    flex-wrap: wrap;
}

.value-card {
    background: #FFFFFF;
    padding: 40px 30px;
    text-align: center;
    width: 300px;
    border: 1px solid #eee;
    box-shadow: 0 5px 20px rgba(0,0,0,0.03);
    transition: transform 0.3s ease;
}

.value-card:hover {
    transform: translateY(-5px);
}

.value-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #C5A059;
}

.newsletter-section {
    background-color: #f3f3f3; 
    background-image: 
        radial-gradient(at 100% 100%, rgb(242, 242, 242) 0px, transparent 50%),
        radial-gradient(at 0% 0%, rgb(249, 247, 242) 0px, transparent 50%);
    padding: 80px 20px;
    text-align: center;
    margin: 0 auto;
    width: 80%;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
}

.newsletter-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    margin-bottom: 10px;
}

.input-group {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 10px;
}

.input-group input {
    padding: 12px 20px;
    border: 1px solid #ccc;
    width: 300px;
    font-family: 'Lato', sans-serif;
}

.input-group button {
    background-color: #3E3E3E;
    color: white;
    border: none;
    padding: 12px 25px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1px;
    transition: background-color 0.3s;
}

.input-group button:hover {
    background-color: #000;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-overlay {
        position: relative;
        top: 0;
        left: 0;
        transform: none;
        width: 100%;
        max-width: 100%;
        margin-top: -20px; 
        background: #fff;
    }
    
    .hero-text h1 {
        font-size: 2rem;
    }
    
    .values-section {
        flex-direction: column;
        align-items: center;
    }
    
    .newsletter-section {
        width: 95%;
    }
    
    .input-group {
        flex-direction: column;
        align-items: center;
    }
    
    .input-group input {
        width: 100%;
    }
}
</style>
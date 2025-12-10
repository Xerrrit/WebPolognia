<script setup>
</script>
<template>
    <div class="home-page">
        <section class="hero-section">
            <div class="hero-content">
                <h1>Welcome to WebPolognia</h1>
                
                <p class="tagline">Authenticity and Polish style delivered to your door. Discover our collection of modern and traditional clothing.</p>
            </div>
        </section>

        <hr class="section-separator">

        <section class="features-section">
            <h2>Polish Craftsmanship at the Heart of Our Creations</h2>
            <div class="features-grid">
                <div class="feature-item">
                    <h3>Authentic Design</h3>
                    <p>Patterns inspired by the folklore and regional traditions of Poland (Kraków, Kaszuby...).</p>
                </div>
                <div class="feature-item">
                    <h3>European Quality</h3>
                    <p>Garments made with durable materials and manufactured locally in Poland.</p>
                </div>
                <div class="feature-item">
                    <h3>Modern Style</h3>
                    <p>A perfect blend between cultural heritage and current urban fashion trends.</p>
                </div>
            </div>
        </section>

        <hr class="section-separator">

        <section class="secondary-info-section">
            <h2>Find Your Style: Traditional or Urban?</h2>
            <p>Explore our exclusive collections of t-shirts, sweaters, and accessories in Polish colors.</p>
        </section>

    </div>
</template>
<style scoped>
.home-page {
    padding: 0;
    width: 100%;
    margin-top: -20px; 
}


.hero-section {
    background-color: var(--color-card-background);
    padding: 100px 20px; 
    text-align: center;
    border-radius: 12px;
    margin-bottom: 40px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.hero-content h1 {
    font-size: 3.5rem;
    color: var(--color-text);
    margin-bottom: 15px;
}

.tagline {
    font-size: 1.3rem;
    color: var(--color-light-text);
    margin-bottom: 40px; 
}

.features-section {
    padding: 40px 20px;
    text-align: center;
}

.features-grid {
    display: flex;
    justify-content: space-around;
    gap: 30px;
    margin-top: 30px;
    flex-wrap: wrap;
}

.feature-item {
    max-width: 300px;
    padding: 20px;
    border-radius: 8px;
    background-color: var(--color-background); 
}

.feature-item h3 {
    font-size: 1.4rem;
    color: var(--color-primary);
}


.secondary-info-section {
    padding: 40px 20px;
    text-align: center;
}

.section-separator {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: 40px 0;
}

@media (max-width: 768px) {
    .hero-content h1 {
        font-size: 2.5rem;
    }

    .features-grid {
        flex-direction: column;
        align-items: center;
    }
}
</style>
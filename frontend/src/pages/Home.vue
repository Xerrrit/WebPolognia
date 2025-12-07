<script setup>
</script>
<template>
    <div class="home-page">
        <section class="hero-section">
            <div class="hero-content">
                <h1>Bienvenue chez WebPolognia</h1>
                <p class="tagline">L'authenticité et le style polonais à votre porte. Découvrez notre collection de vêtements traditionnels et modernes.</p>
            </div>
        </section>

        <hr class="section-separator">

        <section class="features-section">
            <h2>L'artisanat polonais au cœur de nos créations</h2>
            <div class="features-grid">
                <div class="feature-item">
                    <h3>Design Authentique</h3>
                    <p>Des motifs inspirés du folklore et des traditions régionales de Pologne (Kraków, Kaszuby...).</p>
                </div>
                <div class="feature-item">
                    <h3>Qualité Européenne</h3>
                    <p>Vêtements confectionnés avec des matériaux durables et fabriqués localement en Pologne.</p>
                </div>
                <div class="feature-item">
                    <h3>Style Moderne</h3>
                    <p>Un mélange parfait entre l'héritage culturel et les tendances actuelles de la mode urbaine.</p>
                </div>
            </div>
        </section>

        <hr class="section-separator">

        <section class="secondary-info-section">
            <h2>Trouvez votre style : Traditionnel ou Urbain ?</h2>
            <p>Explorez nos collections exclusives de t-shirts, pulls et accessoires aux couleurs polonaises.</p>
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
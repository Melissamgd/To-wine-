const knowledgeBase = [
    {
        id: "1",
        title: "Moelleux vs Sec : comprendre la différence simplement",
        category: "CONSEIL",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
        description: "Apprenez à distinguer le sucre résiduel de la simple rondeur en bouche.",
        content: `
            <div style="font-family: 'Playfair Display', serif; line-height: 1.8; color: #333;">
                <p>Quand on parle de vin, les termes “moelleux” et “sec” reviennent souvent. Ils décrivent principalement le taux de sucre encore présent dans le vin après la fermentation. Et pas le goût "doux" ou "rond" qu’on peut ressentir, c’est vraiment une question de sucre résiduel.</p>
                <h3 style="color:#4a0404; font-family:'Cinzel', serif; margin-top: 25px;">🥂 Vin sec : peu ou pas de sucre</h3>
                <p>Un vin est dit sec lorsque presque tout le sucre du raisin a été transformé en alcool pendant la fermentation.</p>
                <p><strong>Caractéristiques :</strong><br>- Peu sucré ou pas du tout<br>- Sensation de fraîcheur, parfois d’acidité<br>- Goût plus “droit”, plus “net”</p>
                <p><em>Exemples : Sauvignon Blanc, Chardonnay (non boisé), Riesling sec. Accords mets : Idéal avec poissons, fruits de mer, salades, plats légers.</em></p>
                <h3 style="color:#4a0404; font-family:'Cinzel', serif; margin-top: 25px;">🍯 Vin moelleux : plus sucré, plus doux</h3>
                <p>Un vin moelleux contient davantage de sucre résiduel. Cela peut venir d’une maturité plus poussée du raisin, d’un arrêt volontaire de fermentation ou parfois d’un développement naturel de pourriture noble (botrytis).</p>
                <p><strong>Caractéristiques :</strong><br>- Saveur douce mais pas autant qu’un vin liquoreux<br>- Textures souvent rondes, plus onctueuses<br>- Arômes de fruits mûrs, miel, fleurs</p>
                <p><em>Exemples : Gewurztraminer moelleux, Jurançon, Chenin moelleux (Vouvray…). Accords mets : Parfait avec fromages bleus, cuisine asiatique sucrée-salée, apéritifs.</em></p>
            </div>
        `
    },
    {
        id: "2",
        title: "Le TOP 10 : Des Pépites à Prix Doux",
        category: "SÉLECTION",
        image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=800&auto=format&fit=crop",
        description: "Notre palmarès de vins secs, fruités et accessibles à moins de 10€.",
        content: `
            <div style="font-family: 'Playfair Display', serif; line-height: 1.8; color: #333;">
                <p>Voici notre palmarès de vins secs, fruités, équilibrés et accessibles :</p>
                <h4 style="color:#c5a059; font-family:'Cinzel';">🍷 Bourgogne et Vallée de la Loire (Blanc)</h4>
                <p><strong>Mâcon-Villages :</strong> Un classique incontournable (100% Chardonnay). Fraîcheur, agrumes et fleurs blanches.</p>
                <p><strong>Muscadet Sèvre et Maine sur Lie :</strong> Léger, vif et salin, partenaire parfait des huîtres.</p>
                <h4 style="color:#c5a059; font-family:'Cinzel';">🍓 Bordeaux et Sud-Ouest (Rouge et Blanc)</h4>
                <p><strong>Bordeaux Supérieur :</strong> Souvent dominé par le Merlot, fruits rouges mûrs et tanins fondus.</p>
                <p><strong>Côtes de Gascogne :</strong> Vivacité et explosion d'arômes exotiques.</p>
                <h4 style="color:#c5a059; font-family:'Cinzel';">🥩 Vallée du Rhône et Provence</h4>
                <p><strong>Côtes-du-Rhône :</strong> Généreux, épicé et fruité. Parfait avec des plats mijotés.</p>
                <p><strong>Bandol Rosé :</strong> Élégant et subtilement fruité, incontournable pour l'été.</p>
                <h4 style="color:#c5a059; font-family:'Cinzel';">🌶️ Languedoc-Roussillon</h4>
                <p><strong>Corbières :</strong> Rouge puissant aux notes de garrigue et d'épices.</p>
                <p><strong>Picpoul de Pinet :</strong> Frais, léger et croquant, idéal avec les coquillages.</p>
                <h4 style="color:#c5a059; font-family:'Cinzel';">🍇 Autres et Mousseux</h4>
                <p><strong>Beaujolais-Villages :</strong> Un Gamay léger tout en fruit (cerise, framboise).</p>
                <p><strong>Crémant de Bourgogne ou d'Alsace :</strong> Finesse de bulles et complexité pour un prix abordable.</p>
                <p style="background:#f9f4eb; padding:15px; border-radius:10px;"><strong>💡 Conseils d'Achat :</strong> Visez les coopératives et ne snobez pas les IGP qui offrent une grande liberté et qualité.</p>
            </div>
        `
    },
    {
        id: "3",
        title: "Le Lexique de l'Oenologie",
        category: "LEXIQUE",
        image: "https://images.unsplash.com/photo-1553390774-b4822481c894?q=80&w=800&auto=format&fit=crop",
        description: "Maîtrisez les termes techniques de la dégustation comme un pro.",
        content: `
            <div style="font-family: 'Playfair Display', serif; line-height: 1.6; color: #333;">
                <h3 style="color:#4a0404; font-family:'Cinzel';">🍷 Les Vins (Termes Généraux)</h3>
                <p><strong>Terroir :</strong> Sol, climat et savoir-faire. <strong>Millésime :</strong> Année de récolte. <strong>Appellation :</strong> Zone délimitée (AOC/AOP). <strong>Cru :</strong> Vignoble de qualité supérieure.</p>
                
                <h3 style="color:#4a0404; font-family:'Cinzel'; margin-top:20px;">👁️ L'Examen Visuel</h3>
                <p><strong>Robe :</strong> Couleur et nuance. <strong>Larmes :</strong> Traces laissées sur le verre (alcool/glycérol). <strong>Limpidité :</strong> Absence de troubles.</p>
                
                <h3 style="color:#4a0404; font-family:'Cinzel'; margin-top:20px;">👃🏼 L'Examen Olfactif</h3>
                <p><strong>Nez :</strong> Sensations olfactives. <strong>Premier Nez :</strong> Avant agitation. <strong>Deuxième Nez :</strong> Après agitation.</p>
                <p><strong>Arômes :</strong> Primaires (cépage), Secondaires (fermentation), Tertiaires (vieillissement/bouquet).</p>
                <p><strong>Bouchonné :</strong> Défaut (odeur de moisi) lié au liège.</p>
                
                <h3 style="color:#4a0404; font-family:'Cinzel'; margin-top:20px;">👄 L'Examen Gustatif</h3>
                <p><strong>Attaque :</strong> Première impression. <strong>Tanins :</strong> Astringence (structure des rouges). <strong>Acidité :</strong> Fraîcheur et garde.</p>
                <p><strong>Corps :</strong> Poids et volume. <strong>Équilibre :</strong> Harmonie des composants. <strong>Longueur :</strong> Persistance en bouche (en secondes ou caudalies).</p>
                <p><strong>Finale :</strong> Dernière impression après déglutition. <strong>Souple/Rond :</strong> Agréable, tanins fondus.</p>
            </div>
        `
    },
    {
        id: "4",
        title: "Comment conserver son vin ?",
        category: "CONSEIL",
        // IMAGE MISE À JOUR (Celle-ci devrait s'afficher sans problème)
        image: "https://images.unsplash.com/photo-1594498653385-d5172b532c00?q=80&w=800&auto=format&fit=crop",
        description: "Température, lumière, humidité : les 3 règles d'or pour vos pépites.",
        content: `
            <div style="font-family: 'Playfair Display', serif; line-height: 1.8; color: #333;">
                <h3 style="color:#4a0404; font-family:'Cinzel';">🌡️ Les 3 Règles d'Or</h3>
                <p>1. <strong>La Température :</strong> Doit être stable, idéalement autour de 12°C. Les variations brutales sont l'ennemi du vin.</p>
                <p>2. <strong>L'Obscurité :</strong> La lumière (surtout les UV) dégrade les arômes. Préférez un endroit sombre.</p>
                <p>3. <strong>L'Hygrométrie :</strong> Une humidité de 70% est idéale pour éviter que le bouchon de liège ne sèche et laisse passer l'air.</p>
            </div>
        `
    },
    {
        id: "5",
        title: "L'art du carafage",
        category: "TECHNIQUE",
        image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=800&auto=format&fit=crop",
        description: "Faut-il toujours carafer son vin ? Apprenez à faire la différence.",
        content: "<p style=\"font-family: 'Playfair Display', serif;\">Le carafage aide les vins jeunes à s'ouvrir en les oxygénant, tandis que la décantation sépare le dépôt des vieux vins.</p>"
    },
    {
        id: "6",
        title: "Le secret des accords mets & vins",
        category: "SAVOIR",
        image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800&auto=format&fit=crop",
        description: "Rouge sur viande, blanc sur poisson ? Cassez les codes avec nos conseils.",
        content: "<p style=\"font-family: 'Playfair Display', serif;\">L'équilibre des saveurs est la clé d'un bon accord : puissance du vin vs puissance du plat.</p>"
    }
];
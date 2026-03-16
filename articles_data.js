const knowledgeBase = [
    {
        id: "1",
        title: "Moelleux vs Sec : comprendre la différence",
        category: "CONSEIL",
        image: "images/moelleux-sec.jpg",
        description: "Apprenez à distinguer le sucre résiduel de la simple rondeur en bouche.",
        content: `
            <p>Quand on parle de vin, les termes “moelleux” et “sec” reviennent souvent. Ils décrivent principalement le taux de sucre encore présent dans le vin après la fermentation.</p>
            
            <h3 style="color:#4a0404; font-family:Cinzel;">🥂 Vin sec : peu ou pas de sucre</h3>
            <p>Un vin est dit sec lorsque presque tout le sucre du raisin a été transformé en alcool pendant la fermentation.</p>
            <ul>
                <li><strong>Peu sucré ou pas du tout</strong></li>
                <li><strong>Sensation de fraîcheur</strong>, parfois d’acidité</li>
                <li><strong>Goût plus “droit”</strong>, plus “net”</li>
            </ul>
            <p><em>Exemples : Sauvignon Blanc, Chardonnay (non boisé), Riesling sec.</em><br>
            <strong>Accords mets :</strong> Idéal avec poissons, fruits de mer, salades, plats légers.</p>

            <h3 style="color:#4a0404; font-family:Cinzel;">🍯 Vin moelleux : plus sucré, plus doux</h3>
            <p>Un vin moelleux contient davantage de sucre résiduel. Cela peut venir d’une maturité plus poussée du raisin ou du développement naturel de pourriture noble (botrytis).</p>
            <ul>
                <li><strong>Saveur douce</strong> (mais moins qu’un vin liquoreux)</li>
                <li><strong>Textures souvent rondes</strong>, plus onctueuses</li>
                <li><strong>Arômes de fruits mûrs</strong>, miel, fleurs</li>
            </ul>
            <p><em>Exemples : Gewurztraminer moelleux, Jurançon, Chenin moelleux (Vouvray…).</em><br>
            <strong>Accords mets :</strong> Parfait avec fromages bleus, cuisine asiatique sucrée-salée, desserts légers.</p>
        `
    },
    {
        id: "2",
        title: "Le TOP 10 : Des Pépites à Prix Doux",
        category: "SÉLECTION",
        image: "images/selection.jpg",
        description: "Notre palmarès de vins secs, fruités et accessibles à moins de 10€.",
        content: `
            <p>Voici notre palmarès de vins secs, fruités, équilibrés et accessibles :</p>

            <h4 style="color:#c5a059; font-family:Cinzel;">🍷 Bourgogne et Vallée de la Loire</h4>
            <ul>
                <li><strong>Mâcon-Villages (Bourgogne) :</strong> 100% Chardonnay. Fraîcheur, notes d'agrumes et de fleurs blanches.</li>
                <li><strong>Muscadet Sèvre et Maine sur Lie :</strong> Léger, vif et salin, partenaire parfait des huîtres.</li>
            </ul>

            <h4 style="color:#c5a059; font-family:Cinzel;">🍓 Bordeaux et Sud-Ouest</h4>
            <ul>
                <li><strong>Bordeaux Supérieur :</strong> Dominé par le Merlot, arômes de fruits rouges mûrs et tanins fondus.</li>
                <li><strong>Côtes de Gascogne :</strong> Vivacité et explosion d'arômes exotiques.</li>
            </ul>

            <h4 style="color:#c5a059; font-family:Cinzel;">🥩 Vallée du Rhône et Provence</h4>
            <ul>
                <li><strong>Côtes-du-Rhône :</strong> Un vin généreux, épicé et fruité (Grenache, Syrah, Mourvèdre).</li>
                <li><strong>Bandol Rosé :</strong> Élégant, pâle et subtilement fruité, incontournable pour l'été.</li>
            </ul>

            <h4 style="color:#c5a059; font-family:Cinzel;">🌶️ Languedoc-Roussillon</h4>
            <ul>
                <li><strong>Corbières :</strong> Rouge puissant, notes de garrigue, d'épices et de fruits noirs.</li>
                <li><strong>Picpoul de Pinet :</strong> Frais, léger et croquant avec des notes de citron vert.</li>
            </ul>

            <h4 style="color:#c5a059; font-family:Cinzel;">🍇 Autres et Mousseux</h4>
            <ul>
                <li><strong>Beaujolais-Villages :</strong> Un Gamay léger, tout en fruit (cerise, framboise).</li>
                <li><strong>Crémant de Bourgogne ou d'Alsace :</strong> Finesse de bulles et complexité pour un prix imbattable.</li>
            </ul>

            <p style="background:#f9f9f9; padding:10px; border-radius:5px;"><strong>💡 Conseil :</strong> Visez les Coopératives et ne snobez pas les Vins de Pays (IGP), ils offrent souvent un excellent rapport qualité/prix.</p>
        `
    },
    {
        id: "3",
        title: "Le Lexique de l'Oenologie",
        category: "LEXIQUE",
        image: "images/lexique.jpg",
        description: "Maîtrisez les termes techniques de la dégustation comme un pro.",
        content: `
            <h3 style="color:#4a0404; font-family:Cinzel;">👁️ L'Examen Visuel</h3>
            <p><strong>Robe :</strong> L'aspect visuel du vin (couleur, nuance, intensité).</p>
            <p><strong>Larmes (ou Jambes) :</strong> Traces laissées sur le verre, liées à la teneur en alcool.</p>

            <h3 style="color:#4a0404; font-family:Cinzel;">👃🏼 L'Examen Olfactif</h3>
            <p><strong>Nez :</strong> Ensemble des sensations olfactives (Premier et Deuxième nez).</p>
            <p><strong>Arômes Primaires :</strong> Odeurs issues directement du cépage (fruit, fleur).</p>
            <p><strong>Arômes Tertiaires :</strong> Odeurs de vieillissement (cuir, truffe, vanille).</p>
            <p><strong>Bouchonné :</strong> Défaut olfactif majeur (odeur de moisi) causé par le bouchon.</p>

            <h3 style="color:#4a0404; font-family:Cinzel;">👄 L'Examen Gustatif</h3>
            <p><strong>Tanins :</strong> Composés qui apportent la structure et l'astringence (rugosité) au vin rouge.</p>
            <p><strong>Acidité :</strong> Apporte la fraîcheur et la vivacité.</p>
            <p><strong>Longueur (Caudalie) :</strong> Durée de persistance des arômes en bouche (1 seconde = 1 caudalie).</p>
            <p><strong>Souple/Rond :</strong> Décrit un vin agréable avec des tanins fondus.</p>
        `
    }
];
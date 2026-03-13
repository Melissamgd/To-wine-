/**
 * TO WINE - BASE DE DONNÉES DES ARTICLES
 * Contenu structuré avec HTML pour un affichage propre dans la page détail
 */

const knowledgeBase = [
    {
        id: "otr-001",
        title: "Différencier le moelleux du sec",
        category: "Savoir",
        tags: ["Blanc", "Moelleux", "Sec"],
        description: "Comprenez la différence réelle entre sucre résiduel et sensation de douceur.",
        content: `
            <h2 style="color:#4a0404;">🍷 Moelleux vs Sec : le guide simple</h2>
            <p>Quand on parle de vin, ces termes décrivent principalement le taux de sucre encore présent après la fermentation.</p>
            
            <h3 style="color:#d4af37;">🥂 Vin sec : la fraîcheur avant tout</h3>
            <p>Un vin est dit sec lorsque presque tout le sucre du raisin a été transformé en alcool. On y trouve une sensation de fraîcheur et d'acidité.</p>
            <ul>
                <li><b>Exemples :</b> Sauvignon Blanc, Chardonnay, Riesling sec.</li>
                <li><b>Accords :</b> Poissons, fruits de mer, salades.</li>
            </ul>

            <h3 style="color:#d4af37;">🍯 Vin moelleux : la douceur onctueuse</h3>
            <p>Le vin moelleux contient du sucre résiduel. Cela vient souvent d'une maturité plus poussée du raisin.</p>
            <ul>
                <li><b>Exemples :</b> Gewurztraminer, Jurançon, Chenin moelleux.</li>
                <li><b>Accords :</b> Fromages bleus, cuisine asiatique, desserts.</li>
            </ul>
        `,
        image: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/hlWSnDO6tfRMg2O96kOH-template-builder/pub/yEnUyq25yxvcAIONAsxe.jpg"
    },
    {
        id: "otr-002",
        title: "10 vins à moins de 10 euros",
        category: "Sélection",
        tags: ["Bourgogne", "Bordeaux", "Rouge", "Blanc", "Prix"],
        description: "Des pépites à prix doux : Mâcon-Villages, Muscadet, Bordeaux Supérieur...",
        content: `
            <h2 style="color:#4a0404;">🏆 Le TOP 10 des pépites accessibles</h2>
            
            <p>Voici notre sélection de vins équilibrés et abordables pour se faire plaisir sans se ruiner :</p>

            <h3 style="color:#d4af37;">🇫🇷 Bourgogne & Loire</h3>
            <p><b>Mâcon-Villages :</b> Un blanc 100% Chardonnay, frais et floral.</p>
            <p><b>Muscadet Sèvre et Maine :</b> Vif et salin, le compagnon des huîtres.</p>

            <h3 style="color:#d4af37;">🍷 Bordeaux & Sud-Ouest</h3>
            <p><b>Bordeaux Supérieur :</b> Dominé par le Merlot, souple et fruité.</p>
            <p><b>Côtes de Gascogne :</b> Une explosion d'arômes exotiques.</p>

            <h3 style="color:#d4af37;">🍇 Rhône & Languedoc</h3>
            <p><b>Côtes-du-Rhône :</b> Généreux, épicé et parfait pour les grillades.</p>
            <p><b>Picpoul de Pinet :</b> Frais, léger et croquant.</p>
            
            <p style="background:#f4f4f4; padding:10px; border-left:4px solid #d4af37;"><b>💡 Conseil d'expert :</b> N'hésitez pas à explorer les caves coopératives, elles offrent souvent un rapport qualité/prix imbattable !</p>
        `,
        image: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/hlWSnDO6tfRMg2O96kOH-template-builder/pub/fpCMjOLvnqy0KZqQpo1g.jpg"
    },
    {
        id: "otr-003",
        title: "Le vocabulaire de l'oenologie",
        category: "Lexique",
        tags: ["Savoir", "Dégustation"],
        description: "Terroir, Millésime, Tanins... les clés pour briller en dégustation.",
        content: `
            <h2 style="color:#4a0404;">👁️ L'Examen Visuel</h2>
            <p><b>Robe :</b> La couleur et l'intensité du vin.</p>
            <p><b>Larmes :</b> Les traces sur le verre qui indiquent souvent le taux d'alcool.</p>

            <h2 style="color:#4a0404;">👃🏼 L'Examen Olfactif</h2>
            <p><b>Premier Nez :</b> Les arômes perçus juste après avoir versé le vin.</p>
            <p><b>Arômes Primaires :</b> Odeurs issues directement du raisin (fruit, fleur).</p>

            <h2 style="color:#4a0404;">👄 L'Examen Gustatif</h2>
            <p><b>Tanins :</b> Apportent la structure
            <p><b>Tanins :</b> Apportent la structure et la sensation de rugosité au vin rouge.</p>
            <p><b>Longueur (PAI) :</b> La persistance des arômes, calculée en <b>caudalies</b> (1 seconde = 1 caudalie).</p>
            <p><b>Équilibre :</b> L'harmonie entre l'acidité, les tanins et l'alcool.</p>
        `,
        image: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/hlWSnDO6tfRMg2O96kOH-template-builder/pub/yDZa07spgzNNLPlAtLIu.jpg"
    }
];
/**
 * SmartFabricator.Pro - Concentric Cone Calculation Engine
 * Math formula models the flat development pattern accurately.
 */
function calculateConePattern() {
    // 1. Fetch raw workshop values from UI fields
    const D = parseFloat(document.getElementById('largeDia').value);
    const d = parseFloat(document.getElementById('smallDia').value);
    const H = parseFloat(document.getElementById('coneHeight').value);

    // 2. Input validation safety checks
    if (isNaN(D) || isNaN(d) || isNaN(H) || D <= 0 || d <= 0 || H <= 0) {
        alert("Please enter valid positive dimensions before running layout math.");
        return;
    }

    if (d >= D) {
        alert("Layout Error: The Large End Diameter must be larger than the Small End Diameter.");
        return;
    }

    // 3. True Slant Height Calculation (Pythagorean Theorem on the cone section)
    const radiusDifference = (D - d) / 2;
    const slantHeight = Math.sqrt(Math.pow(radiusDifference, 2) + Math.pow(H, 2));

    // 4. Flat Pattern Sweep Development Formulas
    // Outer sweep pattern boundary radius (R1)
    const R1 = (D * slantHeight) / (D - d);
    
    // Inner cutout scrap boundary radius (R2)
    const R2 = (d * slantHeight) / (D - d);

    // Development Pattern Sector Arc Angle in Degrees (theta)
    const theta = (180 * (D - d)) / slantHeight;

    // Check Cord Length (Straight line distance across the pattern arcs for layout checking)
    const checkCord = 2 * R1 * Math.sin((theta * Math.PI) / 360);

    // 5. Inject calculation output values safely into HTML UI
    document.getElementById('outRadius').innerText = R1.toFixed(1);
    document.getElementById('inRadius').innerText = R2.toFixed(1);
    document.getElementById('patternAngle').innerText = theta.toFixed(1);
    document.getElementById('checkCord').innerText = checkCord.toFixed(1);

    // Remove the 'hidden' css formatting class to reveal results dynamically
    document.getElementById('resultsArea').classList.remove('hidden');
}
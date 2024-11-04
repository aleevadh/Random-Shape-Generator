//to select elements
const svgPreview = document.getElementById('svgPreview');
const downloadButton = document.getElementById('downloadButton');

//checkboxes
const circleCheckbox = document.getElementById('circleCheckbox');
const rectangleCheckbox = document.getElementById('rectangleCheckbox');
const triangleCheckbox = document.getElementById('triangleCheckbox');
const starCheckbox = document.getElementById('starCheckbox');

//to clear canvas
function clearCanvas() {
    svgPreview.innerHTML = '';
    downloadButton.disabled = false;
}

// Generate multiple shapes based on selected options
function generateShapes() {
    clearCanvas();
    
    if (circleCheckbox.checked) generateCircles();
    if (rectangleCheckbox.checked) generateRectangles();
    if (triangleCheckbox.checked) generateTriangles();
    if (starCheckbox.checked) generateStars();

    prepareDownloadSVG(svgPreview);
}

// Shape-generating functions
function generateCircles() {
    for (let i = 0; i < 10; i++) {
        const cx = Math.floor(Math.random() * 700) + 70;
        const cy = Math.floor(Math.random() * 1000) + 70;
        const r = Math.floor(Math.random() * 50) + 20;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('stroke-width', '2');
        
        svgPreview.appendChild(circle);
    }
}

function generateRectangles() {
    for (let i = 0; i < 10; i++) {
        const x = Math.floor(Math.random() * 600) + 50;
        const y = Math.floor(Math.random() * 900) + 50;
        const width = Math.floor(Math.random() * 100) + 20;
        const height = Math.floor(Math.random() * 100) + 20;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', 'black');
        rect.setAttribute('stroke-width', '2');
        
        svgPreview.appendChild(rect);
    }
}

function generateTriangles() {
    for (let i = 0; i < 10; i++) {
        const points = `${Math.random() * 700 + 70},${Math.random() * 1000 + 70} ` +
                       `${Math.random() * 700 + 70},${Math.random() * 1000 + 70} ` +
                       `${Math.random() * 700 + 70},${Math.random() * 1000 + 70}`;
        
        const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        triangle.setAttribute('points', points);
        triangle.setAttribute('fill', 'none');
        triangle.setAttribute('stroke', 'black');
        triangle.setAttribute('stroke-width', '2');
        
        svgPreview.appendChild(triangle);
    }
}

function generateStars() {
    for (let i = 0; i < 10; i++) {
        const cx = Math.floor(Math.random() * 700) + 70;
        const cy = Math.floor(Math.random() * 1000) + 70;
        const outerRadius = Math.floor(Math.random() * 40) + 20;
        const innerRadius = outerRadius / 2;
        const points = [];

        for (let j = 0; j < 10; j++) {
            const angle = (j * Math.PI) / 5;
            const radius = j % 2 === 0 ? outerRadius : innerRadius;
            points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
        }

        const star = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        star.setAttribute('points', points.join(' '));
        star.setAttribute('fill', 'none');
        star.setAttribute('stroke', 'black');
        star.setAttribute('stroke-width', '2');
        
        svgPreview.appendChild(star);
    }
}

// Prepare the full-size SVG for download
function prepareDownloadSVG(svgPreview) {
    const svgDownload = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgDownload.setAttribute('width', '842');
    svgDownload.setAttribute('height', '1191');
    svgDownload.setAttribute('viewBox', '0 0 842 1191');
    svgDownload.innerHTML = svgPreview.innerHTML;

    downloadButton.onclick = () => downloadSVG(svgDownload.outerHTML);
}

// Download function
function downloadSVG(svgContent) {
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'random_shapes_to_penplot.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(svgUrl);
}

// Event listener for generate button
document.getElementById('generateShapesButton').addEventListener('click', generateShapes);

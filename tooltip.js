const tooltip = document.querySelector("#element-tooltip");
const image = tooltip.querySelector(".element-tooltip__image");
const symbol = tooltip.querySelector(".element-tooltip__symbol");
const name = tooltip.querySelector(".element-tooltip__name");
const number = tooltip.querySelector(".element-tooltip__number");
const protons = tooltip.querySelector(".element-tooltip__protons");
const electrons = tooltip.querySelector(".element-tooltip__electrons");
const neutrons = tooltip.querySelector(".element-tooltip__neutrons");
const mass = tooltip.querySelector(".element-tooltip__mass");
const category = tooltip.querySelector(".element-tooltip__category");
const configuration = tooltip.querySelector(".element-tooltip__configuration");

const symbolsWithoutImages = new Set(["Hs", "Mt", "Ds", "Rg", "Nh", "Fl", "Mc", "Lv", "Ts"]);

const categoryNames = {
    A: "Metal alcalino",
    E: "Metal alcalinotérreo",
    T: "Metal de transición",
    P: "Metal postransición",
    M: "Metaloide",
    N: "No metal",
    H: "Halógeno",
    G: "Gas noble",
    L: "Lantánido",
    C: "Actínido",
};

const elementData = `
1.0080|1s1|N
4.00260|1s2|G
6.94|[He] 2s1|A
9.012183|[He] 2s2|E
10.81|[He] 2s2 2p1|M
12.011|[He] 2s2 2p2|N
14.007|[He] 2s2 2p3|N
15.999|[He] 2s2 2p4|N
18.99840316|[He] 2s2 2p5|H
20.180|[He] 2s2 2p6|G
22.9897693|[Ne] 3s1|A
24.305|[Ne] 3s2|E
26.981538|[Ne] 3s2 3p1|P
28.085|[Ne] 3s2 3p2|M
30.97376200|[Ne] 3s2 3p3|N
32.07|[Ne] 3s2 3p4|N
35.45|[Ne] 3s2 3p5|H
39.948|[Ne] 3s2 3p6|G
39.0983|[Ar] 4s1|A
40.08|[Ar] 4s2|E
44.95591|[Ar] 4s2 3d1|T
47.867|[Ar] 4s2 3d2|T
50.9415|[Ar] 4s2 3d3|T
51.996|[Ar] 3d5 4s1|T
54.93804|[Ar] 4s2 3d5|T
55.84|[Ar] 4s2 3d6|T
58.93319|[Ar] 4s2 3d7|T
58.693|[Ar] 4s2 3d8|T
63.55|[Ar] 4s1 3d10|T
65.4|[Ar] 4s2 3d10|T
69.723|[Ar] 4s2 3d10 4p1|P
72.63|[Ar] 4s2 3d10 4p2|M
74.92159|[Ar] 4s2 3d10 4p3|M
78.97|[Ar] 4s2 3d10 4p4|N
79.90|[Ar] 4s2 3d10 4p5|H
83.80|[Ar] 4s2 3d10 4p6|G
85.468|[Kr] 5s1|A
87.62|[Kr] 5s2|E
88.90584|[Kr] 5s2 4d1|T
91.22|[Kr] 5s2 4d2|T
92.90637|[Kr] 5s1 4d4|T
95.95|[Kr] 5s1 4d5|T
96.90636|[Kr] 5s2 4d5|T
101.1|[Kr] 5s1 4d7|T
102.9055|[Kr] 5s1 4d8|T
106.42|[Kr] 4d10|T
107.868|[Kr] 5s1 4d10|T
112.41|[Kr] 5s2 4d10|T
114.818|[Kr] 5s2 4d10 5p1|P
118.71|[Kr] 5s2 4d10 5p2|P
121.760|[Kr] 5s2 4d10 5p3|M
127.6|[Kr] 5s2 4d10 5p4|M
126.9045|[Kr] 5s2 4d10 5p5|H
131.29|[Kr] 5s2 4d10 5p6|G
132.9054520|[Xe] 6s1|A
137.33|[Xe] 6s2|E
138.9055|[Xe] 6s2 5d1|L
140.116|[Xe] 6s2 4f1 5d1|L
140.90766|[Xe] 6s2 4f3|L
144.24|[Xe] 6s2 4f4|L
144.91276|[Xe] 6s2 4f5|L
150.4|[Xe] 6s2 4f6|L
151.964|[Xe] 6s2 4f7|L
157.25|[Xe] 6s2 4f7 5d1|L
158.92535|[Xe] 6s2 4f9|L
162.500|[Xe] 6s2 4f10|L
164.93033|[Xe] 6s2 4f11|L
167.26|[Xe] 6s2 4f12|L
168.93422|[Xe] 6s2 4f13|L
173.05|[Xe] 6s2 4f14|L
174.9667|[Xe] 6s2 4f14 5d1|L
178.49|[Xe] 6s2 4f14 5d2|T
180.9479|[Xe] 6s2 4f14 5d3|T
183.84|[Xe] 6s2 4f14 5d4|T
186.207|[Xe] 6s2 4f14 5d5|T
190.2|[Xe] 6s2 4f14 5d6|T
192.22|[Xe] 6s2 4f14 5d7|T
195.08|[Xe] 6s1 4f14 5d9|T
196.96657|[Xe] 6s1 4f14 5d10|T
200.59|[Xe] 6s2 4f14 5d10|T
204.383|[Xe] 6s2 4f14 5d10 6p1|P
207|[Xe] 6s2 4f14 5d10 6p2|P
208.98040|[Xe] 6s2 4f14 5d10 6p3|P
208.98243|[Xe] 6s2 4f14 5d10 6p4|M
209.98715|[Xe] 6s2 4f14 5d10 6p5|H
222.01758|[Xe] 6s2 4f14 5d10 6p6|G
223.01973|[Rn] 7s1|A
226.02541|[Rn] 7s2|E
227.02775|[Rn] 7s2 6d1|C
232.038|[Rn] 7s2 6d2|C
231.03588|[Rn] 7s2 5f2 6d1|C
238.0289|[Rn] 7s2 5f3 6d1|C
237.048172|[Rn] 7s2 5f4 6d1|C
244.06420|[Rn] 7s2 5f6|C
243.061380|[Rn] 7s2 5f7|C
247.07035|[Rn] 7s2 5f7 6d1|C
247.07031|[Rn] 7s2 5f9|C
251.07959|[Rn] 7s2 5f10|C
252.0830|[Rn] 7s2 5f11|C
257.09511|[Rn] 5f12 7s2|C
258.09843|[Rn] 7s2 5f13|C
259.10100|[Rn] 7s2 5f14|C
266.120|[Rn] 7s2 5f14 6d1|C
267.122|[Rn] 7s2 5f14 6d2|T
268.126|[Rn] 7s2 5f14 6d3|T
269.128|[Rn] 7s2 5f14 6d4|T
270.133|[Rn] 7s2 5f14 6d5|T
269.1336|[Rn] 7s2 5f14 6d6|T
277.154|[Rn] 7s2 5f14 6d7|T
282.166|[Rn] 7s2 5f14 6d8|T
282.169|[Rn] 7s2 5f14 6d9|T
286.179|[Rn] 7s2 5f14 6d10|T
286.182|[Rn] 5f14 6d10 7s2 7p1|P
290.192|[Rn] 7s2 7p2 5f14 6d10|P
290.196|[Rn] 7s2 7p3 5f14 6d10|P
293.205|[Rn] 7s2 7p4 5f14 6d10|P
294.211|[Rn] 7s2 7p5 5f14 6d10|H
295.216|[Rn] 7s2 7p6 5f14 6d10|G
`.trim().split("\n").map((line) => {
    const [atomicMass, electronConfiguration, categoryCode] = line.split("|");
    return { atomicMass, electronConfiguration, category: categoryNames[categoryCode] };
});

function getElementTile(target) {
    return target instanceof Element ? target.closest(".tabla > div > div") : null;
}

function showTooltip(tile) {
    const atomicNumber = tile.querySelector("i").textContent.trim();
    const elementSymbol = tile.querySelector("h1").textContent.trim();
    const elementName = tile.querySelector("p").textContent.trim();
    const properties = elementData[Number(atomicNumber) - 1];
    const placeholder = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="100"><rect width="100%" height="100%" fill="#514969"/><text x="50%" y="55%" fill="white" font-family="sans-serif" font-size="18" text-anchor="middle">${elementSymbol}</text></svg>`;

    symbol.textContent = elementSymbol;
    name.textContent = elementName;
    number.textContent = `Número atómico: ${atomicNumber}`;
    protons.textContent = `Protones: ${atomicNumber}`;
    electrons.textContent = `Electrones: ${atomicNumber}`;
    neutrons.textContent = `Neutrones (aprox.): ${Math.round(Number(properties.atomicMass)) - Number(atomicNumber)}`;
    mass.textContent = `Masa atómica: ${properties.atomicMass} u`;
    category.textContent = `Categoría: ${properties.category}`;
    configuration.textContent = `Estructura electrónica: ${properties.electronConfiguration}`;
    const imagePath = symbolsWithoutImages.has(elementSymbol)
        ? "placeholder.webp"
        : elementSymbol === "Og" ? "Og.png" : `${elementSymbol}.jpg`;
    image.src = tile.dataset.imagen || imagePath;
    image.onerror = () => {
        image.onerror = null;
        image.src = `data:image/svg+xml,${encodeURIComponent(placeholder)}`;
    };
    image.alt = `Imagen de ${elementName}`;

    tooltip.classList.add("is-visible");
    tooltip.setAttribute("aria-hidden", "false");

    const rect = tile.getBoundingClientRect();
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - tooltip.offsetWidth - 8));
    const top = rect.bottom + tooltip.offsetHeight + 8 <= window.innerHeight
        ? rect.bottom + 8
        : Math.max(8, rect.top - tooltip.offsetHeight - 8);

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

function hideTooltip() {
    tooltip.classList.remove("is-visible");
    tooltip.setAttribute("aria-hidden", "true");
}

document.querySelector(".tabla").addEventListener("pointerover", (event) => {
    const tile = getElementTile(event.target);
    if (tile && !tile.contains(event.relatedTarget)) {
        showTooltip(tile);
    }
});

document.querySelector(".tabla").addEventListener("pointerout", (event) => {
    const tile = getElementTile(event.target);
    if (tile && !tile.contains(event.relatedTarget)) {
        hideTooltip();
    }
});

window.addEventListener("scroll", hideTooltip, { passive: true });

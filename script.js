/* script.js
   Simula la escritura sobre la "hoja Word" con typing, delete, replace, comment y glitch.
   Está pensado para Neocities/GitHub Pages. */

const titleEl = document.getElementById('docTitle');
const metaEl = document.getElementById('docMeta');
const contentEl = document.getElementById('content');
const statusEl = document.getElementById('status');
const footerEl = document.getElementById('footer');

/* ========= Configuración del texto y la dramaturgia =========
   Definimos una lista de pasos (steps). Cada step es:
   - {type: 'setTitle', text: '...'}
   - {type: 'paragraph', text: '...'} → escribe como párrafo
   - {type: 'deleteChars', count: N} → borra N caracteres del párrafo actual
   - {type: 'replace', text: '...'} → inserta texto nuevo
   - {type: 'comment', text:'...'} → muestra comentario al lado
   - {type: 'glitch', range:[start,end]} → aplica glitch (visual)
   - {type: 'pause', ms: 1000}
   Los pasos siguen la dramaturgia que describimos.
*/

const steps = [
  {type:'setTitle', text: 'NEOFIGURACIÓN EN EL ARTE – Por Manuela Cadavid (Arte y Documento 2024-1s).'},
  {type:'setMeta', text: 'Galería Paul Bardwell — 9 de febrero de 2024'},
  {type:'paragraph', text: 'La Galería Paul Bardwell, ubicada dentro de la institución educativa Colombo Americano, abre sus puertas a “Meras Figuras – Preguntas por la representación en la pintura actual” el 9 de febrero del 2024. Bajo la curaduría de Alejandro Vásquez, esta exposición reúne el trabajo de nueve artistas provenientes de diferentes ciudades de Colombia, seleccionados a través de una convocatoria cerrada.'},
  {type:'pause', ms:350},
  // glitch in title moment
  {type:'glitchTitle', text: 'NEOFIGURACIÓN EN EL ARTE – Documento de análisis expositivo.' , ms:500},
  {type:'paragraph', text: 'Las obras de la exhibición reflexionan sobre la representación contemporánea y la imagen a través de la pintura, relacionándose con la producción cinematográfica, los videojuegos, el diseño gráfico e ilustración, el arte callejero, los memes y la fotografía.'},
  {type:'pause', ms:300},
  {type:'paragraph', text: 'Además de esto, algunos de estos trabajos establecen una conexión con temas espirituales, de introspección y las relaciones entre el humano y el territorio que lo rodea.'},
  {type:'pause', ms:400},
  {type:'paragraph', text: 'Todas las piezas exhibidas en la muestra son lienzos en óleo, dispuestas en el espacio de manera en que respondan al peso visual de cada una. La forma en que está organizada la exposición no sigue una regla de dirección específica, ya que está pensada para que se recorra según la propia educación visual de cada individuo.'},
  {type:'pause', ms:400},
  // autocorrección curatorial
  {type:'replaceInPara', find: 'La forma en que está organizada la exposición no sigue una regla de dirección específica,', replaceWith: 'La muestra prioriza la circulación de sentido por recorridos no lineales,'},
  {type:'paragraph', text: 'La curaduría optó por organizar las pinturas por autoría, asegurándose que cada artista tuviera sus obras una al lado de la otra.'},
  {type:'pause', ms:200},
  {type:'paragraph', text: 'Aunque la galería solicitó una base de 3 pinturas por cada uno, algunos artistas decidieron presentarse con dos, e incluso cuatro.'},
  {type:'pause', ms:300},
  {type:'paragraph', text: 'Es importante destacar que, aunque sea una muestra solo de pintura, hay una sola obra dentro de la galería que está acompañada por recursos audiovisuales (monitor y audífonos) que complementan la pintura, siendo esta “Ganso Ciego” de David Escobar.'},
  {type:'pause', ms:400},
  {type:'paragraph', text: 'Además, este mismo artista utiliza el recurso sonoro de la canción “Oompa Loompas, Doompety Doo”, para respaldar su pintura del mismo nombre, que también está exhibida en esta muestra.'},
  {type:'pause', ms:600},
  {type:'paragraph', text: 'Aunque las obras de los diferentes artistas varían en estilo y color, los tópicos que abordan establecen una relación conceptual entre sí.'},
  {type:'pause', ms:300},
  {type:'paragraph', text: 'Refiriéndose al espacio y su conexión con la identidad, el trabajo de Señor Ok se sumerge en las repercusiones de la violencia dentro de Colombia en ámbitos animal y vegetal, denominadas por él cómo “narco faunas”, resaltando los regímenes de organización política que desconocen su propio territorio.'},
  {type:'pause', ms:300},
  {type:'paragraph', text: 'Este tema se entrelaza con las obras de Johan Samboni, quien establece una conexión con el juego Grand Theft Auto con la realidad violenta que rodea el espacio en la cultura e identidad latinoamericana. Eliecer Salazar también aborda la identidad cultural, enfocándose en la sonoridad del Caribe popular y en cómo se relaciona con el paisaje.'},
  {type:'pause', ms:300},
  {type:'paragraph', text: 'José Ricardo Contreras y David Escobar, dialogan sobre la construcción de imágenes desde la ficción. Las pinturas de Contreras cuestionan la lectura de las imágenes de violencia, destacando las herramientas de edición necesarias para su creación.'},
  {type:'pause', ms:250},
  {type:'paragraph', text: 'Por otro lado, David Escobar explora el montaje incompleto y la producción fragmentada de las imágenes en el mundo cinematográfico, siendo contraparte de una pintura producida por un artista, que da la sensación de totalidad y acabado.'},
  {type:'pause', ms:350},
  {type:'paragraph', text: 'Además de eso, Escobar utiliza metáforas sociales retratadas y parodiadas a través de los memes en las redes digitales.'},
  {type:'pause', ms:300},
  {type:'paragraph', text: 'Los elementos formales del arte como la luz, la oscuridad, el color y la línea son contemplados por Dámaxo Henao y Elkin Correa como partes fundamentales que componen la construcción del espacio representado.'},
  {type:'pause', ms:300},
  {type:'paragraph', text: 'A través de ellos, se revela el mundo, y se llenan de los sentidos de impresiones y sentimientos que comienzan a tomar forma en el cuadro.'},
  {type:'pause', ms:500},
  {type:'paragraph', text: 'Gracias a la interacción cromática en la pintura, la artista Laura López utiliza sus obras como un vehículo y una herramienta de expresión personal y de introspección profunda con su entorno.'},
  {type:'pause', ms:250},
  {type:'paragraph', text: 'Estas ideas se conectan con las de Isabel Gómez Machado, quien, desde la comunicación gráfica narrativa, se cuestiona acerca de la familia, su legado y cómo éste le permite entender su entorno y su propio ser.'},
  {type:'pause', ms:450},
  // point of residual: parenthesis about victim
  {type:'paragraph', text: 'A pesar de que existe una posibilidad de que la diversidad de temas sociales y sobreexposición de imágenes con una fuerte carga cultural pueda distraer al espectador (cuya autora de este texto fue víctima), se pueden unificar como un mensaje implícito sobre la comunicación de experiencias humanas y sus preguntas sobre la representación por medio de la pintura contemporánea.'},
  {type:'pause', ms:400},
  // glitch/cycle on that parenthesis zone
  {type:'glitchPara', idx: null, ms: 1200},
  {type:'deleteChars', count: 140}, // borra parte del párrafo
  {type:'pause', ms:300},
  {type:'paragraph', text: 'No sé si lo escribo como observadora o como observada. '},
  {type:'pause', ms:800},
  {type:'paragraph', text: 'De ahí proviene su nombre; Meras Figuras, “meras” como lo básico, lo puro y lo simple, y “figuras” a la nueva figuración en la pintura que juega con los colores, atmósferas o temas.'},
  {type:'pause', ms:350},
  {type:'paragraph', text: 'Esta edición de la Galería Paul Bardwell ha sido visitada frecuentemente por los estudiantes de la institución y por personas ajenas a ella. Los estudiantes muestran atracción por las relaciones que establecen los artistas con la cultura popular: videojuegos, memes y películas, permitiendo una lectura más fácil de las obras.'},
  {type:'pause', ms:350},
  {type:'paragraph', text: 'Al ser pinturas, el espectador se puede enfrentar a ellas con más facilidad, ya que no es necesaria de una educación formal en artes para disfrutar de las imágenes que la exposición dispone al público.'},
  {type:'pause', ms:350},
  {type:'paragraph', text: 'Meras Figuras ha causado un cambio de paradigma dentro del Colombo Americano al ser la primera vez en mucho tiempo, que se realiza una exposición enfocada solo en la pintura contemporánea.'},
  {type:'pause', ms:1200},
  {type:'finalFade', ms:600}
];

/* ====== variables de control ====== */
let stepIndex = 0;
let currentParaEl = null;
let typingSpeed = 28; // ms por caracter
let deletingSpeed = 18;

function nextStep() {
  if (stepIndex >= steps.length) {
    statusEl.textContent = "— Fin del ciclo (loop lento).";
    // opcional: reiniciar lentamente
    setTimeout(()=> {
      // reinicia con una pausa larga
      stepIndex = 0;
      contentEl.innerHTML = '';
      titleEl.textContent = '';
      metaEl.textContent = '';
      footerEl.textContent = '';
      statusEl.textContent = "— Reiniciando —";
      setTimeout(nextStep, 900);
    }, 4000);
    return;
  }
  const step = steps[stepIndex++];
  switch(step.type) {
    case 'setTitle':
      typeTitle(step.text, () => nextStep());
      break;
    case 'setMeta':
      metaEl.textContent = step.text;
      setTimeout(nextStep, 220);
      break;
    case 'paragraph':
      createParagraph(step.text, () => nextStep());
      break;
    case 'pause':
      setTimeout(nextStep, step.ms);
      break;
    case 'replaceInPara':
      replaceInCurrentParagraph(step.find, step.replaceWith, nextStep);
      break;
    case 'glitchTitle':
      glitchTitle(step.text, step.ms, nextStep);
      break;
    case 'glitchPara':
      glitchCurrentParagraph(nextStep);
      break;
    case 'deleteChars':
      deleteChars(step.count, nextStep);
      break;
    case 'finalFade':
      footerEl.textContent = '';
      statusEl.textContent = "— Documento colapsó —";
      // efecto: desvanecer la paper
      document.querySelector('.paper').style.transition = "opacity 1s ease";
      document.querySelector('.paper').style.opacity = 0.06;
      setTimeout(nextStep, step.ms);
      break;
    default:
      setTimeout(nextStep, 200);
  }
}

/* ====== helpers ====== */

function typeTitle(text, cb) {
  titleEl.textContent = '';
  metaEl.textContent = '';
  let i = 0;
  const t = setInterval(()=> {
    titleEl.textContent += text.charAt(i++);
    if (i >= text.length) {
      clearInterval(t);
      setTimeout(cb, 140);
    }
  }, 12);
}

function createParagraph(fullText, cb) {
  const p = document.createElement('p');
  p.className = 'p';
  contentEl.appendChild(p);
  currentParaEl = p;
  typeTextIntoElement(fullText, p, cb);
}

function typeTextIntoElement(fullText, el, cb) {
  el.textContent = '';
  let i = 0;
  statusEl.textContent = "— escribiendo —";
  const tt = setInterval(()=> {
    const ch = fullText.charAt(i++);
    el.textContent += ch;
    // cursor visual simple: append temporary span
    if (i >= fullText.length) {
      clearInterval(tt);
      statusEl.textContent = "— texto escrito —";
      setTimeout(cb, 180);
    }
  }, typingSpeed);
}

function replaceInCurrentParagraph(find, replaceWith, cb) {
  if (!currentParaEl) { cb(); return; }
  const txt = currentParaEl.textContent;
  if (txt.includes(find)) {
    statusEl.textContent = "— autocorrección —";
    // borrar desde el lugar del find (retro borra rápida)
    const before = txt.substring(0, txt.indexOf(find));
    const after = txt.substring(txt.indexOf(find)+find.length);
    // efecto borrar: dejar before, borrar resto
    currentParaEl.textContent = before;
    // small pause then type replacement + after
    setTimeout(()=> {
      typeTextIntoElement(replaceWith + after, currentParaEl, ()=> {
        statusEl.textContent = "— corregido —";
        setTimeout(cb, 200);
      });
    }, 260);
  } else {
    cb();
  }
}

function deleteChars(count, cb) {
  if (!currentParaEl) { cb(); return; }
  statusEl.textContent = "— borrando —";
  let txt = currentParaEl.textContent;
  let i = 0;
  const t = setInterval(()=> {
    txt = txt.slice(0, -1);
    currentParaEl.textContent = txt;
    i++;
    if (i >= count || txt.length === 0) {
      clearInterval(t);
      statusEl.textContent = "— borrado —";
      setTimeout(cb, 250);
    }
  }, deletingSpeed);
}

/* glitch title (breve) */
function glitchTitle(newText, ms, cb) {
  const old = titleEl.textContent;
  // flash red/green then replace
  titleEl.classList.add('glitch');
  titleEl.setAttribute('data-text', old);
  setTimeout(()=> {
    titleEl.classList.remove('glitch');
    titleEl.textContent = newText;
    setTimeout(cb, 220);
  }, ms);
}

/* glitch current paragraph: aplica efecto visual y rotura textual */
function glitchCurrentParagraph(cb) {
  if (!currentParaEl) { cb(); return; }
  statusEl.textContent = "— interrupción —";
  // quick char corruption
  let txt = currentParaEl.textContent;
  const len = txt.length;
  // replace a middle segment with random chars briefly
  const start = Math.max(0, Math.floor(len*0.35));
  const end = Math.min(len, start + 28);
  const corrupted = txt.substring(0,start) + randomNoise( end-start ) + txt.substring(end);
  currentParaEl.textContent = corrupted;
  currentParaEl.classList.add('glitch');
  currentParaEl.setAttribute('data-text', txt);
  setTimeout(()=> {
    currentParaEl.classList.remove('glitch');
    // finally collapse: remove tail
    currentParaEl.textContent = txt.substring(0, Math.max(20, start));
    setTimeout(cb, 600);
  }, 900);
}

function randomNoise(n) {
  const chars = "█▓▒░▌▐<>!@#$%^&*()_+[]{};:,.?~";
  let s = '';
  for (let i=0;i<n;i++) s += chars.charAt(Math.floor(Math.random()*chars.length));
  return s;
}

/* inicio */
window.addEventListener('load', ()=> {
  statusEl.textContent = "— inicializando —";
  setTimeout(nextStep, 600);
});

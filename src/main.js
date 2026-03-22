import './style.css'

const API_BASE = 'http://localhost:3000';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const state = {
  route: 'home',
  projects: [
    {
      title: 'Project One',
      description: 'Short description of what you built and the impact.',
      tech: ['JavaScript', 'Bootstrap 5', 'SQLite'],
      repo: '',
      demo: '',
    },
    {
      title: 'Project Two',
      description: 'Short description of the problem and your solution.',
      tech: ['Node.js', 'Express'],
      repo: '',
      demo: '',
    },
    {
      title: 'Project Three',
      description: 'Short description with measurable results if possible.',
      tech: ['HTML5', 'CSS3'],
      repo: '',
      demo: '',
    },
  ],
};

function setRoute(route) {
  state.route = route;
  render();
}

function navLink(route, label) {
  const active = state.route === route ? 'active' : '';
  return `<li class="nav-item"><a class="nav-link ${active}" href="#${route}" data-route="${route}">${escapeHtml(label)}</a></li>`;
}

function layout(content) {
  return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#home" data-route="home">Your Name</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="nav">
          <ul class="navbar-nav ms-auto">
            ${navLink('home', 'Home')}
            ${navLink('resume', 'Resume')}
            ${navLink('projects', 'Projects')}
            ${navLink('contact', 'Contact')}
          </ul>
        </div>
      </div>
    </nav>

    <main class="container py-4">
      ${content}
    </main>

    <footer class="border-top bg-white">
      <div class="container py-3 d-flex flex-column flex-sm-row justify-content-between gap-2">
        <small class="text-muted">© ${new Date().getFullYear()} Your Name</small>
        <small class="text-muted">Built with HTML5, Bootstrap 5, JavaScript, SQLite</small>
      </div>
    </footer>
  `;
}

function homePage() {
  return layout(`
    <div class="row align-items-center g-4">
      <div class="col-lg-7">
        <h1 class="display-5 fw-bold">Software Developer</h1>
        <p class="lead text-secondary">
          I build reliable web applications with clean UI, solid APIs, and maintainable code.
        </p>
        <div class="d-flex gap-2 flex-wrap">
          <a class="btn btn-primary" href="#projects" data-route="projects">View Projects</a>
          <a class="btn btn-outline-secondary" href="#contact" data-route="contact">Contact Me</a>
        </div>
        <div class="mt-4 d-flex gap-3 flex-wrap">
          <span class="badge text-bg-light border">JavaScript</span>
          <span class="badge text-bg-light border">Node.js</span>
          <span class="badge text-bg-light border">Express</span>
          <span class="badge text-bg-light border">SQLite</span>
          <span class="badge text-bg-light border">Bootstrap 5</span>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="h5">Quick Info</h2>
            <ul class="list-unstyled mb-0">
              <li><strong>Location:</strong> Your City</li>
              <li><strong>Email:</strong> you@example.com</li>
              <li><strong>GitHub:</strong> github.com/yourhandle</li>
              <li><strong>LinkedIn:</strong> linkedin.com/in/yourhandle</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3 mt-4">
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h3 class="h5">Frontend</h3>
            <p class="text-secondary mb-0">HTML5, Bootstrap 5, accessible responsive UI.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h3 class="h5">Backend</h3>
            <p class="text-secondary mb-0">Express APIs, validation, pragmatic architecture.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h3 class="h5">Data</h3>
            <p class="text-secondary mb-0">SQLite schema design, queries, and data integrity.</p>
          </div>
        </div>
      </div>
    </div>
  `);
}

function resumePage() {
  return layout(`
    <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
      <div>
        <h1 class="h2 mb-1">Resume</h1>
        <p class="text-secondary mb-0">Update the sections below with your real experience.</p>
      </div>
      <a class="btn btn-outline-primary" href="#" onclick="window.print(); return false;">Print / Save PDF</a>
    </div>

    <hr class="my-4" />

    <div class="row g-4">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h2 class="h5">Skills</h2>
            <ul class="mb-0">
              <li>JavaScript (ES6+)</li>
              <li>HTML5 / CSS3</li>
              <li>Bootstrap 5</li>
              <li>Node.js / Express</li>
              <li>SQLite</li>
            </ul>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-body">
            <h2 class="h5">Education</h2>
            <p class="mb-0"><strong>Degree</strong><br />School, Year</p>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <h2 class="h5">Experience</h2>

            <div class="mb-3">
              <div class="d-flex justify-content-between flex-wrap gap-2">
                <strong>Software Developer — Company</strong>
                <span class="text-secondary">2024 — Present</span>
              </div>
              <ul class="mb-0">
                <li>Built feature X that improved Y by Z%.</li>
                <li>Implemented API endpoints and integrated frontend.</li>
                <li>Worked with databases and optimized queries.</li>
              </ul>
            </div>

            <div>
              <div class="d-flex justify-content-between flex-wrap gap-2">
                <strong>Developer — Company</strong>
                <span class="text-secondary">2022 — 2024</span>
              </div>
              <ul class="mb-0">
                <li>Shipped projects with clean UI and robust backend.</li>
                <li>Collaborated using Git and code reviews.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

function projectCard(p) {
  const techBadges = (p.tech ?? [])
    .map((t) => `<span class="badge text-bg-light border">${escapeHtml(t)}</span>`)
    .join(' ');

  const repoBtn = p.repo
    ? `<a class="btn btn-sm btn-outline-dark" href="${escapeHtml(p.repo)}" target="_blank" rel="noreferrer">Repo</a>`
    : '';
  const demoBtn = p.demo
    ? `<a class="btn btn-sm btn-primary" href="${escapeHtml(p.demo)}" target="_blank" rel="noreferrer">Live</a>`
    : '';

  return `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h3 class="h5">${escapeHtml(p.title)}</h3>
          <p class="text-secondary flex-grow-1">${escapeHtml(p.description)}</p>
          <div class="d-flex gap-1 flex-wrap mb-3">${techBadges}</div>
          <div class="d-flex gap-2">
            ${demoBtn}
            ${repoBtn}
          </div>
        </div>
      </div>
    </div>
  `;
}

function projectsPage() {
  const allTech = Array.from(
    new Set(state.projects.flatMap((p) => p.tech ?? []))
  ).sort();

  return layout(`
    <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
      <div>
        <h1 class="h2 mb-1">Projects</h1>
        <p class="text-secondary mb-0">Filter by tech and add your real project links.</p>
      </div>
      <div class="d-flex align-items-center gap-2">
        <label class="form-label mb-0" for="techFilter"><small class="text-secondary">Filter</small></label>
        <select id="techFilter" class="form-select form-select-sm" style="width: 220px;">
          <option value="">All technologies</option>
          ${allTech.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('')}
        </select>
      </div>
    </div>

    <hr class="my-4" />

    <div id="projectsGrid" class="row g-3">
      ${state.projects.map(projectCard).join('')}
    </div>
  `);
}

function contactPage() {
  return layout(`
    <div class="row g-4">
      <div class="col-lg-6">
        <h1 class="h2 mb-1">Contact</h1>
        <p class="text-secondary">Send me a message. It will be saved to the site database.</p>

        <div id="contactAlert"></div>

        <form id="contactForm" class="card shadow-sm">
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label" for="name">Name</label>
              <input class="form-control" id="name" name="name" required minlength="2" />
            </div>

            <div class="mb-3">
              <label class="form-label" for="email">Email</label>
              <input class="form-control" id="email" name="email" type="email" required />
            </div>

            <div class="mb-3">
              <label class="form-label" for="subject">Subject</label>
              <input class="form-control" id="subject" name="subject" required minlength="2" />
            </div>

            <div class="mb-3">
              <label class="form-label" for="message">Message</label>
              <textarea class="form-control" id="message" name="message" rows="5" required minlength="10"></textarea>
            </div>

            <button class="btn btn-primary" type="submit" id="contactSubmit">Send Message</button>
          </div>
        </form>
      </div>

      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h2 class="h5">Other ways to reach me</h2>
            <ul class="list-unstyled mb-0">
              <li><strong>Email:</strong> you@example.com</li>
              <li><strong>GitHub:</strong> github.com/yourhandle</li>
              <li><strong>LinkedIn:</strong> linkedin.com/in/yourhandle</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `);
}

function notFoundPage() {
  return layout(`
    <h1 class="h3">Not found</h1>
    <p class="text-secondary">That page does not exist.</p>
    <a class="btn btn-primary" href="#home" data-route="home">Go home</a>
  `);
}

function render() {
  let content = '';

  switch (state.route) {
    case 'home':
      content = homePage();
      break;
    case 'resume':
      content = resumePage();
      break;
    case 'projects':
      content = projectsPage();
      break;
    case 'contact':
      content = contactPage();
      break;
    default:
      content = notFoundPage();
  }

  document.querySelector('#app').innerHTML = content;

  // nav routing
  document.querySelectorAll('[data-route]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const route = el.getAttribute('data-route');
      if (!route) return;
      e.preventDefault();
      window.location.hash = route;
      setRoute(route);
    });
  });

  // projects filter
  const techFilter = document.querySelector('#techFilter');
  if (techFilter) {
    techFilter.addEventListener('change', () => {
      const value = techFilter.value;
      const filtered = value
        ? state.projects.filter((p) => (p.tech ?? []).includes(value))
        : state.projects;
      const grid = document.querySelector('#projectsGrid');
      if (grid) grid.innerHTML = filtered.map(projectCard).join('');
    });
  }

  // contact form
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', onSubmitContact);
  }
}

function showContactAlert(type, message) {
  const host = document.querySelector('#contactAlert');
  if (!host) return;

  host.innerHTML = `
    <div class="alert alert-${escapeHtml(type)}" role="alert">
      ${escapeHtml(message)}
    </div>
  `;
}

async function onSubmitContact(e) {
  e.preventDefault();

  const submitBtn = document.querySelector('#contactSubmit');
  if (submitBtn) submitBtn.disabled = true;

  try {
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    const resp = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      showContactAlert('danger', data.error || 'Failed to send message.');
      return;
    }

    showContactAlert('success', 'Message sent. Thanks!');
    form.reset();
  } catch (err) {
    showContactAlert('danger', 'Network error. Is the API server running?');
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

function routeFromHash() {
  const hash = window.location.hash.replace('#', '').trim();
  return hash || 'home';
}

window.addEventListener('hashchange', () => {
  setRoute(routeFromHash());
});

setRoute(routeFromHash());
render();

<script>
    // Footer year
    document.getElementById("year").textContent = new Date().getFullYear();

    /**
     * Insights / Blog
     *
     * How to add a new post later:
     * 1) Add a new object to the `INSIGHTS` array.
     * 2) If you want a new hero image, add it to assets/img and set `hero` to that path.
     * 3) Keep `slug` unique.
     */
    const INSIGHTS = [
      {
        slug: "end-of-lease-checklist",
        title: "End of lease cleaning checklist (what agents actually inspect)",
        date: "2026-01-22",
        tag: "Residential",
        excerpt: "A practical checklist to help your vacate clean pass inspection the first time — without stress.",
        hero: "assets/img/cleaning1.jpeg",
        body: `
          <p>End of lease inspections are usually strict — not because agents are difficult, but because they follow a checklist.</p>

          <h3>What gets checked the most</h3>
          <ul>
            <li>Skirting boards, door frames, and light switches</li>
            <li>Kitchen: oven, rangehood filters, splashback, cupboard edges</li>
            <li>Bathrooms: grout lines, shower screens, drains, and exhaust fans</li>
            <li>Windows: tracks and internal glass</li>
          </ul>

          <h3>Quick prep before cleaners arrive</h3>
          <ul>
            <li>Remove personal items from cupboards</li>
            <li>Defrost and empty the fridge</li>
            <li>Make sure power + water are connected</li>
          </ul>

          <div class="article-cta">
            <strong>Need a vacate clean that hits the checklist?</strong>
            <div style="color:#14532d; margin-top:0.35rem;">Email <a href="mailto:info@easycleanservices.com.au" style="color:inherit; text-decoration:underline;">info@easycleanservices.com.au</a> with your suburb + preferred date.</div>
          </div>
        `
      },
      {
        slug: "office-cleaning-frequency",
        title: "How often should an office be professionally cleaned?",
        date: "2026-01-22",
        tag: "Commercial",
        excerpt: "A simple guide based on foot traffic, shared spaces and hygiene expectations in NT workplaces.",
        hero: "assets/img/cleaning1.jpeg",
        body: `
          <p>There’s no one-size-fits-all schedule. The right frequency depends on people, usage, and the areas that create risk.</p>

          <h3>Good starting point</h3>
          <ul>
            <li><strong>Daily:</strong> kitchens, bathrooms, bins, high-touch points</li>
            <li><strong>2–3x weekly:</strong> common areas, meeting rooms, reception</li>
            <li><strong>Weekly:</strong> detailed dusting, glass, edges, spot walls</li>
            <li><strong>Monthly/Quarterly:</strong> carpets, strip & seal, high windows</li>
          </ul>

          <p>If you operate in a medical, childcare or high-public environment, the baseline should be higher.</p>

          <div class="article-cta">
            <strong>Want a simple cleaning schedule for your site?</strong>
            <div style="color:#14532d; margin-top:0.35rem;">Send your site type + region (Darwin/Katherine/Alice Springs) and we’ll suggest a plan.</div>
          </div>
        `
      },
      {
        slug: "strip-and-seal-basics",
        title: "Strip & seal floors: what it is and when you need it",
        date: "2026-01-22",
        tag: "Specialised",
        excerpt: "If your floors look dull, sticky or permanently ‘dirty’, it might be the finish — not the cleaning.",
        hero: "assets/img/cleaning2.png",
        body: `
          <p>Strip & seal removes old floor finish (the worn protective layer) and applies a new seal to bring back durability and shine.</p>

          <h3>Signs you need strip & seal</h3>
          <ul>
            <li>Permanent dull patches that don’t respond to normal cleaning</li>
            <li>Black edges, traffic lanes, or sticky feel</li>
            <li>Finish peeling or uneven gloss</li>
          </ul>

          <h3>Where it’s common</h3>
          <ul>
            <li>Schools, community centres and high-traffic corridors</li>
            <li>Medical sites and government buildings</li>
            <li>Hospitality venues</li>
          </ul>

          <div class="article-cta">
            <strong>Not sure if your site needs it?</strong>
            <div style="color:#14532d; margin-top:0.35rem;">Email a few photos + your region and we’ll tell you if strip & seal makes sense.</div>
          </div>
        `
      }
    ];

    const gridEl = document.getElementById("insightsGrid");
    const modalEl = document.getElementById("insightsModal");
    const openBtn = document.getElementById("openInsights");
    const closeBtn = document.getElementById("closeInsights");
    const listEl = document.getElementById("insightsList");
    const heroEl = document.getElementById("articleHero");
    const metaEl = document.getElementById("articleMeta");
    const bodyEl = document.getElementById("articleBody");

    function fmtDate(iso) {
      try {
        const d = new Date(iso + "T00:00:00");
        return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
      } catch {
        return iso;
      }
    }

    function openModal() {
      modalEl.classList.add("is-open");
      modalEl.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modalEl.classList.remove("is-open");
      modalEl.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      // Clean URL hash state
      if (location.hash.startsWith("#insights/")) {
        history.replaceState(null, "", "#insights");
      }
    }

    function renderGrid() {
      if (!gridEl) return;
      const featured = INSIGHTS.slice(0, 3);
      gridEl.innerHTML = featured.map(post => `
        <article class="insight-card" data-slug="${post.slug}" tabindex="0" role="button" aria-label="Read: ${post.title}">
          <img class="insight-img" src="${post.hero}" alt="${post.title}">
          <div class="insight-body">
            <div class="insight-meta">
              <span class="insight-tag">${post.tag}</span>
              <span>${fmtDate(post.date)}</span>
            </div>
            <div class="insight-title">${post.title}</div>
            <div class="insight-excerpt">${post.excerpt}</div>
            <div class="insight-link">Read guide →</div>
          </div>
        </article>
      `).join("");
    }

    function renderList(activeSlug) {
      listEl.innerHTML = INSIGHTS.map(post => {
        const active = post.slug === activeSlug;
        return `
          <div class="modal-list-item" data-slug="${post.slug}" style="border-color:${active ? "rgba(59,130,246,0.45)" : "rgba(148,163,184,0.35)"};">
            <div class="modal-list-kicker">
              <span class="insight-tag" style="font-size:0.64rem;">${post.tag}</span>
              <span>${fmtDate(post.date)}</span>
            </div>
            <h4>${post.title}</h4>
            <p>${post.excerpt}</p>
          </div>
        `;
      }).join("");
    }

    function renderArticle(slug) {
      const post = INSIGHTS.find(p => p.slug === slug) || INSIGHTS[0];
      heroEl.src = post.hero;
      heroEl.alt = post.title;
      metaEl.innerHTML = `
        <div><span class="insight-tag" style="text-transform:none;">${post.tag}</span></div>
        <div>${fmtDate(post.date)}</div>
      `;
      bodyEl.innerHTML = `<h2>${post.title}</h2>${post.body}`;
      renderList(post.slug);

      // Update hash so it can be shared/bookmarked
      if (!location.hash.startsWith("#insights/")) {
        history.replaceState(null, "", `#insights/${post.slug}`);
      } else {
        history.replaceState(null, "", `#insights/${post.slug}`);
      }
    }

    function openPost(slug) {
      openModal();
      renderArticle(slug);
    }

    // Wire up grid clicks
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".insight-card");
      if (card && card.dataset.slug) {
        openPost(card.dataset.slug);
      }

      const listItem = e.target.closest(".modal-list-item");
      if (listItem && listItem.dataset.slug) {
        renderArticle(listItem.dataset.slug);
      }

      // Close when clicking outside the panel
      if (e.target === modalEl) {
        closeModal();
      }
    });

    // Keyboard support for cards
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalEl.classList.contains("is-open")) {
        closeModal();
      }

      const active = document.activeElement;
      if ((e.key === "Enter" || e.key === " ") && active && active.classList && active.classList.contains("insight-card")) {
        e.preventDefault();
        openPost(active.dataset.slug);
      }
    });

    openBtn.addEventListener("click", () => openPost(INSIGHTS[0].slug));
    closeBtn.addEventListener("click", closeModal);

    // Open directly from hash e.g. #insights/office-cleaning-frequency
    function bootFromHash() {
      if (location.hash.startsWith("#insights/")) {
        const slug = location.hash.replace("#insights/", "");
        if (slug) openPost(slug);
      }
    }

    renderGrid();
    bootFromHash();
  </script>
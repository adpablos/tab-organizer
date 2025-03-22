document.addEventListener("DOMContentLoaded", () => {
  const saveTabBtn = document.getElementById("saveTabBtn");
  const linksList = document.getElementById("linksList");
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");
  const loading = document.getElementById("loading");
  const emptyState = document.getElementById("emptyState");

  // API URL
  const API_URL = "http://localhost:3000/api";

  // State
  let links = [];

  // Hide/show elements based on state
  function updateUI() {
    if (links.length === 0) {
      emptyState.style.display = "block";
    } else {
      emptyState.style.display = "none";
    }
    loading.style.display = "none";
  }

  // Fetch all saved links
  async function fetchLinks() {
    try {
      loading.style.display = "block";
      const response = await fetch(`${API_URL}/links`);
      if (!response.ok) throw new Error("Failed to fetch links");

      links = await response.json();
      renderLinks(links);
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      updateUI();
    }
  }

  // Render links in the UI
  function renderLinks(linksToRender) {
    linksList.innerHTML = "";

    if (linksToRender.length === 0) {
      updateUI();
      return;
    }

    linksToRender.forEach((link) => {
      const linkElement = document.createElement("div");
      linkElement.className = "link-item";
      linkElement.dataset.id = link.id;

      linkElement.innerHTML = `
        <div class="link-title">${link.title}</div>
        <div class="link-url">${link.url}</div>
        <div class="link-summary">${link.summary || "Processing..."}</div>
        <div class="link-tags">
          ${
            link.tags
              ? link.tags
                  .map((tag) => `<span class="tag">${tag}</span>`)
                  .join("")
              : ""
          }
        </div>
        <div class="link-status">
          <button class="status-btn status-unread" data-status="unread">Unread</button>
          <button class="status-btn status-read" data-status="read">Read</button>
          <button class="status-btn status-favorite" data-status="favorite">Favorite</button>
        </div>
      `;

      // Highlight active status
      const statusBtns = linkElement.querySelectorAll(".status-btn");
      statusBtns.forEach((btn) => {
        if (btn.dataset.status === link.status) {
          btn.style.backgroundColor = "#4285f4";
          btn.style.color = "white";
        }

        // Add event listener to update status
        btn.addEventListener("click", async (e) => {
          e.stopPropagation(); // Prevent triggering parent click
          const newStatus = btn.dataset.status;
          await updateLinkStatus(link.id, newStatus);
        });
      });

      // Add event listener to open link in new tab
      linkElement.addEventListener("click", (e) => {
        if (!e.target.classList.contains("status-btn")) {
          chrome.tabs.create({ url: link.url });
        }
      });

      linksList.appendChild(linkElement);
    });
  }

  // Save current tab
  async function saveCurrentTab() {
    try {
      loading.style.display = "block";

      // Get active tab
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      // Prepare link data
      const linkData = {
        url: tab.url,
        title: tab.title,
      };

      // Send to API
      const response = await fetch(`${API_URL}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(linkData),
      });

      if (!response.ok) throw new Error("Failed to save link");

      // Refresh list
      await fetchLinks();

      // Close the tab
      chrome.tabs.remove(tab.id);
    } catch (error) {
      console.error("Error saving tab:", error);
    } finally {
      updateUI();
    }
  }

  // Update link status
  async function updateLinkStatus(linkId, status) {
    try {
      const response = await fetch(`${API_URL}/links/${linkId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      // Update local state
      links = links.map((link) =>
        link.id === linkId ? { ...link, status } : link
      );

      // Re-render links
      renderLinks(filterLinks());
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  // Filter links based on search and status
  function filterLinks() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;

    return links.filter((link) => {
      const matchesSearch =
        link.title.toLowerCase().includes(searchTerm) ||
        link.url.toLowerCase().includes(searchTerm) ||
        (link.summary && link.summary.toLowerCase().includes(searchTerm)) ||
        (link.tags &&
          link.tags.some((tag) => tag.toLowerCase().includes(searchTerm)));

      const matchesStatus =
        statusValue === "all" || link.status === statusValue;

      return matchesSearch && matchesStatus;
    });
  }

  // Event Listeners
  saveTabBtn.addEventListener("click", saveCurrentTab);

  searchInput.addEventListener("input", () => {
    renderLinks(filterLinks());
  });

  statusFilter.addEventListener("change", () => {
    renderLinks(filterLinks());
  });

  // Initial load
  fetchLinks();
});

// Demo poem data: id, title, author, content, comments
let poems = [
  {
    id: Date.now(),
    title: "the echo of marble",
    author: "brian",
    content: "Silent halls where whispers roam,\nGrey veins trace the poet's home...",
    comments: [
      { user: "guest", text: "Beautiful imagery!" }
    ]
  }
];

let chatMessages = [
  { user: "admin", text: "Welcome to Marble Grey Poetry!" }
];

function renderPoemOfWeek() {
  const poem = poems[0];
  if(!poem) return;
  document.getElementById("poemOfWeek").innerHTML = `
    <div class="poem-title">${poem.title}</div>
    <span class="poem-author">by ${poem.author}</span>
    <div class="poem-content">${poem.content.replace(/\n/g, "<br>")}</div>
  `;
}

function renderPoemList() {
  const list = document.getElementById("poemList");
  if(poems.length < 2) {
    list.innerHTML = `<em>No more poems yet. Add yours!</em>`;
    return;
  }
  let html = "";
  // Skip the first poem (Poem of the Week)
  for(let i=1; i<poems.length; ++i) {
    const p = poems[i];
    html += `
    <div class="poem-card" data-id="${p.id}">
      <div class="poem-title">${p.title}</div>
      <span class="poem-author">by ${p.author}</span>
      <div class="poem-content">${p.content.replace(/\n/g, "<br>")}</div>
      <div class="comments-section">
        <b>comments:</b>
        <div class="poem-comments">
          ${p.comments.map(c=>`<div class="comment"><span>${c.user}:</span> ${c.text}</div>`).join("")}
        </div>
        <form class="comment-form" data-id="${p.id}">
          <input type="text" maxlength="120" placeholder="write a comment..." required>
          <button type="submit">send</button>
        </form>
      </div>
    </div>
    `;
  }
  list.innerHTML = html;

  // Attach event listeners for new comment forms
  document.querySelectorAll(".comment-form").forEach(form => {
    form.onsubmit = function(e) {
      e.preventDefault();
      const poemId = Number(form.getAttribute("data-id"));
      const input = form.querySelector("input");
      const comment = input.value.trim();
      if(comment) {
        const poem = poems.find(p=>p.id===poemId);
        poem.comments.push({ user: "guest", text: comment });
        input.value = "";
        renderPoemList();
      }
    }
  });
}

function renderChat() {
  const chatBox = document.getElementById("chatMessages");
  chatBox.innerHTML = chatMessages.map(m =>
    `<div class="chat-message"><span>${m.user}:</span>${m.text}</div>`
  ).join("");
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle poem submission
document.getElementById("poemForm").onsubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById("poemTitle").value.trim().toLowerCase();
  const author = document.getElementById("poemAuthor").value.trim();
  const content = document.getElementById("poemContent").value.trim();
  if(title && author && content) {
    poems.unshift({
      id: Date.now(),
      title,
      author,
      content,
      comments: []
    });
    // move previous poem of week to list, new poem is now poem of week
    renderPoemOfWeek();
    renderPoemList();
    document.getElementById("poemForm").reset();
  }
}

// Handle chat submission
document.getElementById("chatForm").onsubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if(msg) {
    chatMessages.push({ user: "admin", text: msg });
    input.value = "";
    renderChat();
  }
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Initial render
renderPoemOfWeek();
renderPoemList();
renderChat();

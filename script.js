document.addEventListener("DOMContentLoaded", () => {
  const toggleSidebarBtn = document.getElementById("toggle-sidebar");
  const sidebar = document.querySelector(".sidebar");
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message-input");
  const messages = document.getElementById("messages");

  const dummyReplies = [
    "Sure, let me check on that for you.",
    "Sounds good to me!", 
    "I’ll get back to you in a few minutes.",
    "That’s an interesting point.",
    "Let’s catch up later today."
  ];

  const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
}

  if (toggleSidebarBtn && sidebar) {
    toggleSidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = messageInput.value.trim();
      if (text) {
        addMessage("sent", text, "Sent");
        messageInput.value = "";
        setTimeout(() => {
      const lastStatus = messages.querySelector(".message.sent:last-child .status");
      if (lastStatus) {
        lastStatus.textContent = "Delivered";
      }
    }, 1500);
        setTimeout(() => simulateReply(), 2000);
      }
    });
  }

  function addMessage(type, text, status = '') {
    const message = document.createElement("div");
    message.className = `message ${type}`;
    message.innerHTML = `<p>${text}</p><span class="time">${getTime()}</span>
    ${status ? `<span class="status">${status}</span>` : ""}
  `;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function simulateReply() {
    const reply = dummyReplies[Math.floor(Math.random() * dummyReplies.length)];
    addMessage("received", reply);
  }

  function getTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});


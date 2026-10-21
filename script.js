const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Course links pre-select the matching course in the enquiry form.
document.querySelectorAll("[data-course]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("courseSelect");
    const course = link.dataset.course;
    [...select.options].forEach(option => {
      if (option.value === course || option.textContent.trim() === course) {
        select.value = option.value || option.textContent.trim();
      }
    });
  });
});

// This form prepares a WhatsApp message; it does not collect or store data on this website.
document.getElementById("enquiryForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const course = String(data.get("course") || "").trim();
  const message = String(data.get("message") || "").trim();
  const text = [
    "Namaste Ajit Coaching Centre,",
    "I want to enquire about admission/course details.",
    `Name: ${name}`,
    `My phone number: ${phone}`,
    `Course: ${course}`,
    message ? `Message: ${message}` : ""
  ].filter(Boolean).join("\n");
  const url = `https://wa.me/918920811053?text=${encodeURIComponent(text)}`;
  document.getElementById("formNote").textContent = "WhatsApp is opening with your enquiry. Please review it and press Send there.";
  window.open(url, "_blank", "noopener,noreferrer");
});

// Demo helper: replies from a small local FAQ list. This is NOT a live AI connection.
const chatWidget = document.getElementById("chatWidget");
const chatLauncher = document.getElementById("chatLauncher");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function openChat() {
  chatWidget.classList.add("open");
  chatWidget.setAttribute("aria-hidden", "false");
  chatLauncher.style.display = "none";
  setTimeout(() => chatInput.focus(), 50);
}
function closeChat() {
  chatWidget.classList.remove("open");
  chatWidget.setAttribute("aria-hidden", "true");
  chatLauncher.style.display = "flex";
}
chatLauncher.addEventListener("click", openChat);
chatClose.addEventListener("click", closeChat);

function addBubble(text, type) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function getReply(question) {
  const q = question.toLowerCase();
  if (/(hello|hi|hey|namaste|good morning)/.test(q)) {
    return "Namaste! Welcome to Ajit Coaching Centre. 😊 Ask me about school classes, computer courses, fees or contact details.";
  }
  if (/(class|classes|school|tuition|1-12|1 to 12|subject)/.test(q)) {
    return "We list tuition support for Classes 1–5, 6–8, 9–10 and 11–12. Subjects, batches and availability should be confirmed directly with the centre. Call +91 89208 11053.";
  }
  if (/(computer|digital|office|typing|excel|word)/.test(q)) {
    return "The website lists Computer Basics and Office & Digital Skills. Please call +91 89208 11053 to confirm which computer courses are currently available.";
  }
  if (/(fee|fees|price|cost|timing|time|batch|schedule)/.test(q)) {
    return "Fees and timings are not published here, so I don't want to give you incorrect information. Please call +91 89208 11053 or send an enquiry through the form.";
  }
  if (/(address|location|where|visit|reach)/.test(q)) {
    return "The listed area is Razapur Khurd, Delhi. Please call +91 89208 11053 to confirm the exact address before visiting.";
  }
  if (/(admission|admit|enrol|enroll|join|register)/.test(q)) {
    return "To enquire about admission, use the form on this page or call +91 89208 11053. Tell the centre the student's class or the computer course you're interested in.";
  }
  if (/(phone|call|contact|whatsapp|number)/.test(q)) {
    return "You can call Ajit Coaching Centre at +91 89208 11053. The enquiry form also prepares a WhatsApp message for you.";
  }
  return "I can answer basic questions about Classes 1–12, computer courses, fees, timings, admissions and contact details. For anything specific, please call +91 89208 11053.";
}
function sendChatMessage(text) {
  const question = text.trim();
  if (!question) return;
  addBubble(question, "user");
  const quick = chatMessages.querySelector(".quick-questions");
  if (quick) quick.remove();
  chatInput.value = "";
  window.setTimeout(() => addBubble(getReply(question), "bot"), 250);
}
chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendChatMessage(chatInput.value);
});
document.querySelectorAll(".quick-questions button").forEach(button => {
  button.addEventListener("click", () => sendChatMessage(button.dataset.question));
});

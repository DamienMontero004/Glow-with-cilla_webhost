document.addEventListener("DOMContentLoaded", () => {
  const paymentSelect = document.getElementById("payment-method");
  const momoFields = document.getElementById("momo-fields");
  const cardFields = document.getElementById("card-fields");
  const form = document.getElementById("checkout-form");
  const thankYou = document.getElementById("thank-you");

  // Payment method switch logic
  paymentSelect.addEventListener("change", () => {
    const selected = paymentSelect.value;

    momoFields.classList.add("hidden");
    cardFields.classList.add("hidden");

    if (selected === "momo") {
      momoFields.classList.remove("hidden");
    } else if (selected === "card") {
      cardFields.classList.remove("hidden");
    }
  });

  // Form submission handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Optional: Validate extra fields depending on payment type
    const payment = paymentSelect.value;
    if (payment === "momo") {
      const momoNumber = document.getElementById("momo-number").value;
      if (!momoNumber || momoNumber.length < 8) {
        alert("Please enter a valid Mobile Money number.");
        return;
      }
    } else if (payment === "card") {
      const cardNumber = document.getElementById("card-number").value;
      const expiry = document.getElementById("card-expiry").value;
      const cvv = document.getElementById("card-cvv").value;
      if (!cardNumber || !expiry || !cvv) {
        alert("Please complete your card details.");
        return;
      }
    }

    // Hide form and show success message
    form.classList.add("hidden");
    thankYou.classList.remove("hidden");

    // Optional: Clear localStorage cart
    localStorage.removeItem("cart");
  });
});

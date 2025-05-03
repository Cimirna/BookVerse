document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission
    alert("🎉 Your order has been placed successfully!");
    // You can also redirect to a 'Thank You' page if needed:
    // window.location.href = "thankyou.html";
  });
  
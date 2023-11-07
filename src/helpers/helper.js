export function logout() {
  localStorage.removeItem("name");
  localStorage.removeItem("photo");
  localStorage.removeItem("phone");
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("branch");
  window.location.href = window.location.origin;
}

export function isAdmin() {
  return localStorage.role !== undefined && localStorage.role == 1;
}

export function formatCurrency(currency) {
  return new Intl.NumberFormat("us", {
    style: "currency",
    currency: "LKR",
  }).format(currency);
}

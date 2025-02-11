(function () {
  const cal = new Calendar();
  const dt = cal.dateView({ year: 2025, month: 2, day: 12 });

  const p = document.createElement("code");
  p.innerHTML = JSON.stringify(dt,null,2);
  document.body.appendChild(p);
})();

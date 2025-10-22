const minesSelect = document.getElementById("mines_select");
for (let e = 1; e <= 24; e++) {
  const t = document.createElement("option");
  (t.value = e), (t.textContent = e), minesSelect.appendChild(t);
}
let balance = 1000.0;
document.addEventListener("DOMContentLoaded", function () {
  const e = [],
    t = document.getElementById("minesWrap"),
    n = document.querySelector(".submit-mines"),
    s = document.querySelector(".cashout"),
    a = document.getElementById("risk"),
    i = document.getElementById("mines_select"),
    l = document.querySelector("[data-multiplier] span"),
    o = document.getElementById("profit"),
    c = document.getElementById("gems"),
    d = document.getElementById("not-ingame"),
    r = document.getElementById("ingame");
  function checkBetButton() {
    let value = parseFloat(a.value);
    if (isNaN(value) || value <= 0) value = 0;
    if (value > balance) value = balance; // محدود کردن به موجودی
    a.value = value.toFixed(2);
    document.getElementById("balance").textContent = balance.toFixed(2);
    n.disabled = value <= 0 || value > balance;
  }
  a.addEventListener("input", checkBetButton);
  checkBetButton();
  let u = new Set(),
    m = 0,
    v = 25;
  for (let n = 1; n <= v; n++) {
    const s = document.createElement("button");
    (s.className = "mine"),
      (s.type = "button"),
      s.setAttribute("data-index", n),
      (s.innerHTML = '<span class="cover"></span>'),
      t.appendChild(s),
      e.push(s);
  }
  const h = document.getElementById("half"),
    p = document.getElementById("twox");
  const recentEl = document.getElementById("recent");
  const recentList = [];
  const RECENT_LIMIT = window.innerWidth < 992 ? 3 : 5;

  function updateRecent(obj) {
    if (!recentEl) return;
    recentList.unshift(obj);
    if (recentList.length > RECENT_LIMIT) recentList.pop();

    recentEl.innerHTML = recentList
      .map((m, idx) => {
        const cls = (m.win ? "win" : "") + (idx === 0 ? " new" : "");
        return `<div class="bubble ${cls}">${m.value}x</div>`;
      })
      .join("");
  }

  function f() {
    e.forEach((e) => {
      (e.disabled = !1),
        e.classList.remove("revealed", "mine-hit", "gem", "boom");
    }),
      (m = 0),
      (o.value = currentBet.toFixed(2)),
      (l.textContent = 1);
  }
  function g(e) {
    const t = document.querySelector(".game-side"),
      n = document.createElement("div");
    (n.className = "game-results"),
      (n.id = "game-results"),
      (n.innerHTML = `\n<div class='result'>\n<span class="multiplier">${e.multiplier}×</span>\n<div class="divider"></div>\n<div class="currency" role="presentation">\n<span class="content">\n  <span class="weight-bold line-height-default align-center size-default text-size-default variant-success numeric with-icon-space is-truncate" style="max-width: 12ch;">\n    ${e.payout}\n  </span>\n</span>\n<span class="weight-normal line-height-default align-left size-default text-size-default variant-subtle is-truncate" title="usdt" style="max-width: 12ch;">\n  <svg fill="none" viewBox="0 0 96 96" class="svg-icon">\n    <path d="M96 48c0 26.51-21.49 48-48 48S0 74.51 0 48 21.49 0 48 0s48 21.49 48 48Z" fill="#26A17B"></path>\n    <path d="M53.766 52.149v-.006c-.33.024-2.031.126-5.826.126-3.03 0-5.163-.09-5.913-.126v.009c-11.664-.513-20.37-2.544-20.37-4.974 0-2.427 8.706-4.458 20.37-4.98v7.932c.762.054 2.946.183 5.964.183 3.62 0 5.436-.15 5.775-.18v-7.929c11.64.519 20.325 2.55 20.325 4.974 0 2.43-8.685 4.455-20.325 4.971Zm0-10.77v-7.098h16.242V23.457H25.785v10.824h16.242v7.095c-13.2.606-23.127 3.222-23.127 6.354s9.927 5.745 23.127 6.354V76.83h11.739V54.078c13.179-.606 23.082-3.219 23.082-6.348s-9.903-5.742-23.082-6.351Z" fill="#fff"></path>\n  </svg>\n</span>\n</div>\n</div>\n`),
      t.appendChild(n);
    const s = document.querySelector(".win-sound");
    s &&
      ((s.currentTime = 0),
      s.play().catch((e) => {
        console.error("Win sound failed to play:", e);
      })),
      addToHistory({
        odds: e.multiplier,
        betAmount: parseFloat(document.getElementById("risk").value),
        winAmount: parseFloat(e.payout),
        isWin: true,
      }),
      updateRecent({ value: e.multiplier, win: true });
    f(), r.classList.add("hidden"), d.classList.remove("hidden");
    balance += parseFloat((currentBet * e.multiplier).toFixed(2));
    checkBetButton();
  }

  function y(e) {
    if (0 === e || 1 === e) return 1;
    let t = 1;
    for (let n = 2; n <= e; n++) t *= n;
    return t;
  }
  function E(e, t) {
    return t > e || t < 0 ? 0 : y(e) / (y(t) * y(e - t));
  }
  h.addEventListener("click", () => {
    if (a.disabled) return;

    let val = parseFloat(a.value) || 0;
    val = val / 2;
    a.value = val.toFixed(2);
    checkBetButton();
  }),
    p.addEventListener("click", () => {
      if (a.disabled) return;

      let val = parseFloat(a.value) || 0;
      val = Math.min(val * 2, balance); 
      a.value = val.toFixed(2);
      checkBetButton();
    }),
    n.addEventListener("click", function (e) {
      e.preventDefault();
      let bet = parseFloat(a.value) || 0;

      if (bet <= 0) bet = 0;
      if (bet > balance) bet = balance;
      currentBet = bet; // ذخیره شرط فعلی
      balance -= currentBet; // کم کردن از موجودی
      checkBetButton();

      document.getElementById("half").disabled = true;
      document.getElementById("twox").disabled = true;
      a.disabled = true;

      f(); // شروع بازی
      document.getElementById("half").disabled = true;
      document.getElementById("twox").disabled = true;
      document.getElementById("risk").disabled = true;

      const t = document.getElementById("game-results");
      t && t.remove();
      const n = parseInt(i.value);

      (function (e) {
        u.clear();
        while (u.size < e) {
          const e = Math.floor(Math.random() * v) + 1;
          u.add(e);
        }
      })(n);

      c.value = 25 - n;
      d.classList.add("hidden");
      r.classList.remove("hidden");
      a.value = currentBet.toFixed(2);
    });

  e.forEach((t) => {
    t.addEventListener("click", function () {
      const t = parseInt(this.getAttribute("data-index"));
      if (
        !r.classList.contains("hidden") &&
        !this.classList.contains("revealed") &&
        !this.classList.contains("boom")
      )
        if (u.has(t)) {
          document.getElementById("half").disabled = false;
          document.getElementById("twox").disabled = false;
          document.getElementById("risk").disabled = false;
          this.classList.add("mine-hit", "boom"),
            e.forEach((e) => {
              e.disabled = !0;
            }),
            (o.value = "0.00"),
            (l.textContent = "0");
          addToHistory({
            odds: 0,
            betAmount: parseFloat(document.getElementById("risk").value),
            winAmount: 0,
            isWin: false,
          });
          updateRecent({ value: l.textContent, win: false });

          const t = document.querySelector(".mine-sound");
          t &&
            ((t.currentTime = 0),
            t.play().catch((e) => console.error("Mine sound failed:", e))),
            r.classList.add("hidden"),
            d.classList.remove("hidden");
        } else {
          this.classList.add("revealed", "gem"), m++;
          const e = (function (e, t) {
              const n = 25,
                s = e,
                a = t,
                i = n - s,
                l = E(n, a),
                o = E(i, a);
              if (s + a <= 25 && a >= 0 && s >= 0) {
                return Math.round((l / o) * 0.99 * 100) / 100;
              }
              return 1;
            })(parseInt(i.value), m),
            t = parseFloat(a.value);
          (l.textContent = e), (o.value = (t * e).toFixed(2));
          const n = v - u.size;
          let s;
          if (
            ((c.value = n - m),
            (s =
              m < 8
                ? document.querySelector(".gem2-sound")
                : m < 15
                ? document.querySelector(".gem1-sound")
                : document.querySelector(".gem-sound")),
            s &&
              ((s.currentTime = 0),
              s.play().catch((e) => console.error("Gem sound failed:", e))),
            m === v - u.size)
          ) {
            const n = (t * e).toFixed(2);
            setTimeout(() => {
              g({ multiplier: e, payout: n });
            }, 500);
          }
        }
    });
  }),
    s.addEventListener("click", function (e) {
      document.getElementById("half").disabled = false;
      document.getElementById("twox").disabled = false;
      document.getElementById("risk").disabled = false;
      e.preventDefault();
      const t = parseFloat(a.value),
        n = parseFloat(l.textContent);
      g({ multiplier: n, payout: (t * n).toFixed(2) });
    }),
    (window.autoPlayUntilLastGem = function () {
      e.forEach((e, t) => {
        const n = parseInt(e.getAttribute("data-index"));
        u.has(n) ||
          setTimeout(() => {
            e.click();
          }, 100 * t);
      });
    });
});

//
function ShowHistory() {
  const element = document.getElementById("m-con-history");
  element.classList.add("m-show");
}

function HideHistory() {
  const element = document.getElementById("m-con-history");
  element.classList.remove("m-show");
}

function addToHistory({ odds, betAmount, winAmount, isWin }) {
  const historyList = document.getElementById("historyList");
  const empty = document.getElementById("empty-history");
  if (empty) empty.remove();

  const item = document.createElement("div");
  item.className = `history-item ${isWin ? "win" : "lose"}`;
  item.innerHTML = `
    <div><strong>Odds:</strong> ${odds.toFixed(2)}x</div>
    <div><strong>Bet Amount:</strong> $${betAmount.toFixed(2)}</div>
    <div><strong>Win Amount:</strong> ${
      isWin ? `$${winAmount.toFixed(2)}` : "-"
    }</div>
    <div class="time">${new Date().toLocaleTimeString()}</div>
  `;
  historyList.prepend(item);
}
window.addEventListener("resize", () => {
  canvas.width = document.getElementById("conAnimation").offsetWidth;
  canvas.height = document.getElementById("conAnimation").offsetHeight;
  maxHeight = canvas.height * 0.55;
});

document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
    e.preventDefault();
  }
});

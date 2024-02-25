let order = ["su", "bu", "sp", "bp", "dlc1", "ng1", "dlc2", "ng2", "dlc3", "ng3", "dlc4"]; // make something else reset dlcs?

const gn = (x) => {
  if (x == "su") return "small upgrade";
  if (x == "bu") return "big upgrade";
  if (x == "sp") return "small prestige";
  if (x == "bp") return "big prestige";
  if (x == "ng1") return "NG+";
  if (x == "ng2") return "NG++";
  if (x == "ng3") return "NG+++";
  if (x == "dlc1") return "DLC I";
  if (x == "dlc2") return "DLC II";
  if (x == "dlc3") return "DLC III";
  if (x == "dlc4") return "DLC IV";
};

const getCost = (x) => {
  if (x == "su") {
    let scaling = clamp(0, p.su, 100) ** 1.2;
    if (p.su > 100) scaling += (p.su - 100) ** (1 + 7 / 16);
    scaling /= (p.dlc3 ? 1.1 : 1) * 1.01 ** p.ng3;
    scaling -= (Math.log10(100 + 100 * p.ng2) / Math.log10(1.25)) * p.bp;
    return (1 * 1.25 ** scaling) / 1e5 ** p.ng1;
  }
  if (x == "bu") {
    let scaling = clamp(0, p.bu, 25) ** (1 + 1 / 3);
    if (p.bu > 20) scaling += (p.bu - 20) ** (1 + 2 / 3) / 2;
    if (p.bu > 100) scaling += (p.bu - 100) ** 3 / 50;
    scaling /= (p.dlc3 ? 1.1 : 1) * 1.01 ** p.ng3;
    scaling -= (Math.log10(100 + 100 * p.ng2) / Math.log10(2)) * p.bp;
    return (100 * 2 ** scaling) / 1e5 ** p.ng1;
  }
  if (x == "sp") {
    let scaling = clamp(0, p.sp, 11) ** 1.5;
    if (p.sp > 5) scaling += (p.sp - 5) ** 2;
    if (p.sp >= 15) scaling -= 3; // no shit timewalls
    scaling /= (p.dlc3 ? 1.05 : 1) * 1.01 ** p.ng3;
    scaling -= (Math.log10(10 + 10 * p.ng2) / Math.log10(7.5)) * p.bp;
    return (1e4 * 7.5 ** scaling) / 1e4 ** p.ng1;
  }
  if (x == "bp") {
    let scaling = clamp(0, p.bp, 16) ** 1.7;
    if (p.bp > 15) scaling += (p.bp - 15) ** 2.5;
    scaling /= (p.dlc3 ? 1.05 : 1) * 1.01 ** p.ng3;
    scaling -= (Math.log10(10 + 10 * p.ng2) / Math.log10(100)) * p.bp;
    return (1e8 * 100 ** scaling) / 1e4 ** p.ng1;
  }

  if (x == "ng1") {
    let scaling = p.ng1 ** 2;
    scaling /= 1.01 ** p.ng3;
    if (p.ng1 >= 2) scaling -= 1.1 + 1 / 3; // no timewalls
    return (1 / 3) * 1e34 * ((1 / 3) * 1e11) ** scaling;
  }
  if (x == "ng2") {
    let scaling = p.ng2 ** 2.5;
    scaling /= 1.01 ** p.ng3;
    return 1e100 * 1e50 ** scaling;
  }
  if (x == "ng3") {
    let scaling = p.ng3 ** 3;
    scaling /= 1.01 ** p.ng3;
    return 1e235 * 1e6 ** scaling;
  }

  if (x == "dlc1") return 1e25 * 1e300 ** +p.dlc1;
  if (x == "dlc2") return 1e70 * 1e300 ** +p.dlc2;
  if (x == "dlc3") return 1e135 * 1e300 ** +p.dlc3;
  if (x == "dlc4") return 1e260 * 1e300 ** +p.dlc4;

  return Infinity;
};

const lg = (has, x) => {
  if (has > 1) return `<span class="gray">${x}</span>`;
  else return "";
};
const sin1 = (x, what) => {
  if (x != what) return x;
  else return "";
};

let tmp = {
  dlc1: 1,
  dlc2: 1,
  dlc3: 1,
  dlc4: 1,
};

let text = {
  su: {
    a: () => `${gn("su")} ${p.su > 0 ? `${p.su}` : ""}`,
    b: () =>
      `+${1 + p.sp} point gain ${lg(p.su, "+" + format((1 + p.sp) * p.su))}<br>\
${format(1.01 + p.sp / 100)}x point gain ${lg(p.su, format((1.01 + p.sp / 100) ** p.su) + "x")}`,
    c: () => `cost: ${format(getCost("su"))}`,
  },
  bu: {
    a: () => `${gn("bu")} ${p.bu > 0 ? `${p.bu}` : ""}`,
    b: () => `${format(2 + p.sp / 10)}x point gain ${lg(p.bu, format((2 + p.sp / 10) ** p.bu) + "x")}`,
    c: () => `cost: ${format(getCost("bu"))}`,
  },
  sp: {
    a: () => `${gn("sp")} ${p.sp > 0 ? `${p.sp}` : ""}`,
    b: () =>
      `+1/+0.01x to ${gn("su")} base<br>+0.1x to ${gn("bu")} base<br>\
${format(2 * 5 ** p.ng2)}x point gain ${lg(p.sp, format((2 * 5 ** p.ng2) ** p.sp) + "x")}`,
    c: () => `cost: ${format(getCost("sp"))}`,
  },
  bp: {
    a: () => `${gn("bp")} ${p.bp > 0 ? `${p.bp}` : ""}`,
    b: () =>
      `${format(100 + 100 * p.ng2)}x cheaper upgrades ${lg(p.bp, format((100 + 100 * p.ng2) ** p.bp) + "x")}<br>\
${format(10 + 10 * p.ng2)}x cheaper prestiges ${lg(p.bp, format((10 + 10 * p.ng2) ** p.bp) + "x")}`,
    c: () => `cost: ${format(getCost("bp"))}`,
  },
  dlc1: {
    a: () => `${gn("dlc1")}`,
    b: () => `^1.15 point gain ${lg(p.dlc1 ? 2 : 1, format(tmp.dlc1 || 1) + "x")}<br>\
upgrade automation<br>prestiges no longer reset points<br>prestiges no longer reset upgrades`,
    c: () => (p.dlc1 ? "Bought!" : `cost:  ${format(getCost("dlc1"))}`),
  },
  ng1: {
    a: () => `${gn("ng1")} ${p.ng1 > 0 ? `${p.ng1}` : ""}`,
    b: () => `1e5x cheaper upgrades ${lg(p.ng1, format(1e5 ** p.ng1) + "x")}<br>\
1e4x cheaper prestiges ${lg(p.ng1, format(1e4 ** p.ng1) + "x")}<br>\
1e3x point gain ${lg(p.ng1, format(1e3 ** p.ng1) + "x")}`,
    c: () => `cost: ${format(getCost("ng1"))}`,
  },
  dlc2: {
    a: () => `${gn("dlc2")}`,
    b: () =>
      `^1.12 point gain ${lg(p.dlc2 ? 2 : 1, format(tmp.dlc2 || 1) + "x")}<br>prestige automation<br>\
bought upgrades' costs get refunded<br>buying an upgrade counts as buying 10`,
    c: () => (p.dlc2 ? "Bought!" : `cost:  ${format(getCost("dlc2"))}`),
  },
  ng2: {
    a: () => `${gn("ng2")} ${p.ng2 > 0 ? `${p.ng2}` : ""}`,
    b: () => `${format(5)}x to ${gn("sp")} point multiplier ${lg(p.ng2, format(5 ** p.ng2) + "x")}<br>+100/+10 to ${gn("bp")} bases`,
    c: () => `cost: ${format(getCost("ng2"))}`,
  },
  dlc3: {
    a: () => `${gn("dlc3")}`,
    b: () => `^1.09 point gain ${lg(p.dlc3 ? 2 : 1, format(tmp.dlc3 || 1) + "x")}<br>NG+ automation<br>\
1.10x slower upgrade scaling<br>1.05x slower prestige scaling`,
    c: () => (p.dlc3 ? "Bought!" : `cost:  ${format(getCost("dlc3"))}`),
  },
  ng3: {
    a: () => `${gn("ng3")} ${p.ng3 > 0 ? `${p.ng3}` : ""}`,
    b: () =>
      `1.01x slower upgrade, prestige & NG scaling ${lg(p.ng3, format(1.01 ** p.ng3) + "x")}<br>\
1e5x point gain ${lg(p.ng3, format(1e5 ** p.ng3) + "x")}`,
    c: () => `cost: ${format(getCost("ng3"))}`,
  },
  dlc4: {
    a: () => `${gn("dlc4")}`,
    b: () =>
      `^1.06 point gain ${lg(p.dlc4 ? 2 : 1, format(tmp.dlc4 || 1) + "x")}<br>NG++ & NG+++ automation<br>\
1.10x point gain for each thing bought ${lg(
        2,
        format(p.dlc4 ? 1.1 ** (p.su + p.bu + p.sp + p.bp + p.ng1 + p.ng2 + p.ng3 + p.dlc1 + p.dlc2 + p.dlc3 + p.dlc4) : 1) + "x"
      )}`,
    c: () => (p.dlc4 ? "Bought!" : `cost:  ${format(getCost("dlc4"))}`),
  },
};

const format = (x) => {
  if (x == 0) return "0.00";
  if (x < 10) return x.toFixed(2);
  if (x >= 10 && x < 1000) {
    let power = Math.floor(Math.log10(x));
    return x.toFixed(2 - power);
  }
  if (x >= 1000) {
    let power = Math.floor(Math.log10(x));

    if (power >= Infinity) return "Infinity";
    let mantissa = x / 10 ** power;
    return mantissa.toFixed(2) + "e" + power;
  }
};

const fn = (x) => {
  if (x < 10) return x.toFixed(2);
  else return x.toFixed(1);
};

const gameLoop = () => {
  let now = Date.now();
  let diff = (now - p.lastUpdate) / 1000;

  let ps = p.su * (1.01 + p.sp / 100) ** p.su * (2 + p.sp / 10) ** p.bu; // upgrades
  ps *= (2 * 5 ** p.ng2) ** p.sp * 1e3 ** p.ng1 * 1e5 ** p.ng3; // prestige + ng1 + ng3
  // ps *= p.dlc4 ? 1.01 ** (p.su + p.bu + p.sp + p.bp + p.ng1 + p.ng2 + p.ng3 + p.dlc1 + p.dlc2 + p.dlc3 + p.dlc4) : 1;

  // ps*=

  if (show(c("saving"), p.autosave)) {
    let last = (Date.now() - lastSave) / 1000;

    if (15 - last < 0) {
      save();
      last = (Date.now() - lastSave) / 1000;
    }
    c("saving").innerHTML = last > 1 ? `saving in ${fn(clamp(0, 15 - last, 15))}s` : "saved!";
  }

  {
    let old = ps + 0;
    ps **= p.dlc1 ? 1.151 : 1;
    tmp.dlc1 = ps / old;

    old = ps + 0;
    ps **= p.dlc2 ? 1.121 : 1;
    tmp.dlc2 = ps / old;

    old = ps + 0;
    ps **= p.dlc3 ? 1.091 : 1;
    tmp.dlc3 = ps / old;

    old = ps + 0;
    ps **= p.dlc4 ? 1.061 : 1; // added ones so it ends faster
    tmp.dlc4 = ps / old;

    if (tmp.dlc1 > 1) c(`dlc1-b`).innerHTML = text.dlc1.b();
    if (tmp.dlc2 > 1) c(`dlc2-b`).innerHTML = text.dlc2.b();
    if (tmp.dlc3 > 1) c(`dlc3-b`).innerHTML = text.dlc3.b();
    if (tmp.dlc4 > 1) c(`dlc4-b`).innerHTML = text.dlc4.b();
    // all this hurts but oh well/ maybe throw it to buy
  }

  p.points += ps * diff;

  if (p.su < 1) p.points = max(1, p.points);

  {
    Object.keys(p.auto).forEach((what) => {
      if (p.auto[what]) {
        buy(what, what == "su" && !p.dlc2 ? 0.5 : 1);
      }
    });
  }

  c("points").innerHTML = `points: ${format(p.points)}\
${ps > 0 ? ` <span class="lightgreen">${ps == Infinity ? "You win!" : format(ps)}</span>` : ""}`;

  let canShow = p.dlc4 > 0;
  canShow |= p.ng3 > 0;
  show(c("dlc4"), canShow) && toggleClass(c("dlc4"), "ok", p.points >= getCost("dlc4"));
  canShow |= p.dlc3 > 0;
  show(c("ng3"), canShow) && toggleClass(c("ng3"), "ok", p.points >= getCost("ng3"));
  canShow |= p.ng2 > 0;
  show(c("dlc3"), canShow) && toggleClass(c("dlc3"), "ok", p.points >= getCost("dlc3"));
  canShow |= p.dlc2 > 0;
  show(c("ng2"), canShow) && toggleClass(c("ng2"), "ok", p.points >= getCost("ng2"));
  canShow |= p.ng1 > 0;
  show(c("dlc2"), canShow) && toggleClass(c("dlc2"), "ok", p.points >= getCost("dlc2"));
  canShow |= p.dlc1 > 0;
  show(c("ng1"), canShow) && toggleClass(c("ng1"), "ok", p.points >= getCost("ng1"));
  canShow |= p.bp > 0;
  show(c("dlc1"), canShow) && toggleClass(c("dlc1"), "ok", p.points >= getCost("dlc1"));
  canShow |= p.sp > 0;
  show(c("bp"), canShow) && toggleClass(c("bp"), "ok", p.points >= getCost("bp"));
  canShow |= p.bu > 0;
  show(c("sp"), canShow) && toggleClass(c("sp"), "ok", p.points >= getCost("sp"));
  canShow |= p.su > 0;
  show(c("bu"), canShow) && toggleClass(c("bu"), "ok", p.points >= getCost("bu"));

  toggleClass(c("su"), "ok", p.points >= getCost("su"));

  show([c("automation2"), c("automation")], p.dlc1 || p.dlc2 || p.dlc3 || p.dlc4);

  show([c("ng1-auto")], p.dlc2);
  show([c("ng2-auto")], p.dlc2);
  show([c("ng3-auto")], p.dlc2);

  p.lastUpdate = now;
};

const buy = (what, autoMult = 1) => {
  if (p.points * min(1, p.su == 0 ? 1 : autoMult) < getCost(what) || getCost(what) == Infinity) return;

  if (what.endsWith("u") || (p.dlc1 && what.endsWith("p"))) p.points -= getCost(what);
  else p.points = 1;

  if (what == "bp" && p.bp == 0 && !p.dlc1 && $("info")) $("info").style.display = "";

  if (what.startsWith("dlc")) p[what] = true;
  else if (what.endsWith("u") && p.dlc2) p[what] += 10;
  else p[what] += 1;

  update(what);
  getSmaller(what).forEach((wht) => {
    if (wht.endsWith("u") && what.endsWith("p") && !p.dlc1) p[wht] = 0;
    if (wht.endsWith("p") && what.startsWith("ng")) p[wht] = 0;
    if (what.startsWith("ng") && !wht.startsWith("dlc") /**&& !p.dlc4*/) p[wht] = 0;
    if (what.startsWith("dlc") && !wht.startsWith("dlc")) p[wht] = 0;
  });
  Object.keys(text).forEach((what) => {
    update(what);
  });
};
const getSmaller = (what) => {
  i = order.indexOf(what);
  return order.filter((_, b) => b < i);
};

const update = (what) => {
  Object.keys(text[what]).forEach((part) => {
    c(`${what}-${part}`).innerHTML = text[what][part]();
  });
};

const init = () => {
  load();

  $("info").addEventListener("click", (e) => e.target.remove());
  $("info").addEventListener("keydown", (e) => e.which == 13 && e.target.remove());
  c("saving").addEventListener("click", (e) => (lastSave -= 15000));

  let show = () => {
    c("settings-modal").style.display = "";
    c("settings").style.display = "";
  };
  let hide = () => {
    c("settings-modal").style.display = "none";
    c("settings").style.display = "none";
  };

  hide();
  c("settings-button").addEventListener("click", show);
  c("settings-modal").addEventListener("click", (e) => {
    if (e.target.id == "settings-modal") hide();
  });
  c("x").addEventListener("click", hide);

  c("save").addEventListener("click", save);
  c("load").addEventListener("click", () => load());
  c("export").addEventListener("click", exportSave);
  c("import").addEventListener("click", importSave);

  c("autosave-check").checked = p.autosave;
  c("autosave-check").addEventListener("click", () => {
    p.autosave = !p.autosave;
    c("autosave-check").checked = p.autosave;
  });

  Object.keys(text).forEach((what) => {
    update(what);

    c(what).addEventListener("click", () => buy(what));

    toggleClass(c(`${what}-auto`), "on", p.auto[what]);
    c(`${what}-auto`).innerHTML = `<div>${gn(what)}</div><div>currently: ${p.auto[what] ? "on" : "off"}</div>`;

    c(`${what}-auto`).addEventListener("click", () => {
      p.auto[what] = !p.auto[what];
      let forceOff = !(
        (what.endsWith("u") && p.dlc1) ||
        (what.endsWith("p") && p.dlc2) ||
        (what == "ng1" && p.dlc3) ||
        ((what == "ng2" || what == "ng3") && p.dlc4)
      );
      c(`${what}-auto`).innerHTML = `<div>${gn(what)}</div><div>currently: ${!p.auto[what] || forceOff ? "off" : "on"}</div>`;

      if (what.endsWith("u") && !p.dlc1)
        (c(`${what}-auto`).innerHTML += `<div id="${what}-a">requires first DLC</div>`), (p.auto[what] = false);
      if (what.endsWith("p") && !p.dlc2)
        (c(`${what}-auto`).innerHTML += `<div id="${what}-a">requires second DLC</div>`), (p.auto[what] = false);
      if (what == "ng1" && !p.dlc3) (c(`${what}-auto`).innerHTML += `<div id="${what}-a">requires third DLC</div>`), (p.auto[what] = false);
      if ((what == "ng2" || what == "ng3") && !p.dlc4)
        (c(`${what}-auto`).innerHTML += `<div id="${what}-a">requires fourth DLC</div>`), (p.auto[what] = false);

      toggleClass(c(`${what}-auto`), "on", p.auto[what]);
    });
  });

  gameLoop();
  loop = setInterval(gameLoop, 50);
};
document.addEventListener("DOMContentLoaded", init);

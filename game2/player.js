const newPlayer = () => {
  return {
    points: 1,
    su: 0,
    bu: 0,
    sp: 0,
    bp: 0,

    ng1: 0,
    ng2: 0,
    ng3: 0,

    dlc1: false,
    dlc2: false,
    dlc3: false,
    dlc4: false,

    auto: {
      su: false,
      bu: false,
      sp: false,
      bp: false,

      ng1: false,
      ng2: false,
      ng3: false,

      dlc1: false,
      dlc2: false,
      dlc3: false,
      dlc4: false,
    },

    lastUpdate: Date.now(),
    autosave: true,
  };
};

let p = newPlayer();
let lastSave = Date.now();
let saveLocation = "gamegame";
let canUseLS = true;
try {
  localStorage.getItem(saveLocation);
} catch (error) {
  canUseLS = false;

  alert("saving/loading won't work unless you enable third party cookies");
}

const save = () => {
  if (!canUseLS) return;
  localStorage.setItem(saveLocation, JSON.stringify(p));
  lastSave = Date.now();
  $("save").innerText = "saved";
  setTimeout(() => ($("save").innerText = "save"), 2000);
};

const load = (saveStr = canUseLS && localStorage.getItem(saveLocation), change = false) => {
  if (!canUseLS) return;
  lastSave = Date.now() - 1001;
  let pe = newPlayer();

  if (saveStr) {
    let s = JSON.parse(saveStr);

    pe.points = s["points"] ?? pe["points"];
    pe.su = s["su"] ?? pe["su"];
    pe.bu = s["bu"] ?? pe["bu"];
    pe.sp = s["sp"] ?? pe["sp"];
    pe.bp = s["bp"] ?? pe["bp"];

    pe.ng1 = s["ng1"] ?? pe["ng1"];
    pe.ng2 = s["ng2"] ?? pe["ng2"];
    pe.ng3 = s["ng3"] ?? pe["ng3"];

    pe.dlc1 = s["dlc1"] ?? pe["dlc1"];
    pe.dlc2 = s["dlc2"] ?? pe["dlc2"];
    pe.dlc3 = s["dlc3"] ?? pe["dlc3"];
    pe.dlc4 = s["dlc4"] ?? pe["dlc4"];

    s.auto ??= pe.auto;

    let pa = pe["auto"];
    let sa = s["auto"];

    pe.auto = {
      su: sa["su"] ?? pa["su"],
      bu: sa["bu"] ?? pa["bu"],
      sp: sa["sp"] ?? pa["sp"],
      bp: sa["bp"] ?? pa["bp"],
      ng1: sa["ng1"] ?? pa["ng1"],
      ng2: sa["ng2"] ?? pa["ng2"],
      ng3: sa["ng3"] ?? pa["ng3"],
      dlc1: sa["dlc1"] ?? pa["dlc1"],
      dlc2: sa["dlc2"] ?? pa["dlc2"],
      dlc3: sa["dlc3"] ?? pa["dlc3"],
      dlc4: sa["dlc4"] ?? pa["dlc4"],
    };
    pe.lastUpdate = s["lastUpdate"] ?? pe["lastUpdate"];
    pe.autosave = s["autosave"] ?? pe["autosave"];

    p = pe;
    if (change) {
      $("load").innerText = "loaded";
      setTimeout(() => ($("load").innerText = "load"), 2000);
    }
  }
  Object.keys(text).forEach((what) => {
    update(what);
  });
};

const exportSave = () => {
  let output = $("saveExport");
  let parent = output.parentElement;

  parent.style.display = "";
  output.value = JSON.stringify(p);
  output.onblur = function () {
    parent.style.display = "none";
  };
  output.focus();
  output.select();

  try {
    if (document.execCommand("copy")) {
      output.blur();
    }
    $("export").innerText = "exported";
    setTimeout(() => ($("export").innerText = "export"), 2000);
  } catch (e) {
    console.log("problem exporting:", e);

    output.blur();
  }
};
const importSave = () => {
  let oldSave = localStorage.getItem(saveLocation);

  let saveStr = prompt("paste your save string\nMAKE SURE ITS CORRECT\nloading a save will overwrite current save");
  if (saveStr == null) return;
  try {
    load(saveStr);
    $("import").innerText = "imported";
    if (!canUseLS) return;
    localStorage.setItem(saveLocation, saveStr);
    setTimeout(() => ($("import").innerText = "import"), 2000);
    return;
  } catch (e) {
    if (oldSave) {
      console.log("loading save failed, loading last save", e);
      load(oldSave);
      if (!canUseLS) return;
      localStorage.setItem(saveLocation, oldSave);
    }
    return window.alert("loading save failed");
  }
};

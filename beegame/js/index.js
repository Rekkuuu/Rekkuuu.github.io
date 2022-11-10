"use strict";
let tmp = {
    gameSpeedFormTicks: 1,
    usedTime: 1,
};
// https://stackoverflow.com/a/196991
function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
const format = (x, p = 0) => {
    // @ts-ignore
    if (typeof x != "number" || x == null || x == undefined)
        return;
    if (x < -1000) {
        let power = Math.floor(Math.log10(Math.abs(x)));
        return (x / Math.pow(10, power) / 1.0001).toFixed(2) + "e" + power;
    }
    if (x < -100)
        return x.toFixed(Math.max(0, 1 + p));
    if (x < -10)
        return x.toFixed(Math.max(0, 2 + p));
    if (x < -1)
        return x.toFixed(Math.max(0, 3 + p));
    if (x == 0)
        return "0";
    if (x < 1)
        return x.toFixed(Math.max(0, 3 + p));
    if (x < 10)
        return x.toFixed(Math.max(0, 2 + p));
    if (x < 100)
        return x.toFixed(Math.max(0, 1 + p));
    if (x < 1000)
        return x.toFixed(Math.max(0, 0 + p));
    let power = Math.floor(Math.log10(x));
    return (x / Math.pow(10, power) / 1.0001).toFixed(2) + "e" + power;
};
const ft2 = (x) => Math.floor(x * 100) / 100;
const rt5 = (x) => Math.round(x * 100000) / 100000;
const c = Math.pow(10, (1 / 12));
const getBeePrice = () => {
    let a = Math.pow(c, p.bees);
    let price = 1 * a;
    price /= n_tributes.tmp.me[1];
    return price;
};
const getBeePriceMult = () => {
    let a = 1;
    a /= n_tributes.tmp.me[1];
    return a;
};
const getHivePrice = () => {
    let a = Math.pow(c, (p.hives - 1));
    let price = 2 * a;
    price /= n_sacrifices.tmp.capitalistGodEffect;
    return price;
};
const getHivePriceMult = () => {
    let a = 2;
    a /= n_sacrifices.tmp.capitalistGodEffect;
    return a;
};
const getFlowerFieldPrice = () => {
    let a = Math.pow(c, (p.flowerFields - 1));
    let price = 5 * a;
    price /= n_sacrifices.tmp.capitalistGodEffect;
    return price;
};
const getFlowerFieldPriceMult = () => {
    let a = 5;
    a /= n_sacrifices.tmp.capitalistGodEffect;
    return a;
};
const getMaxForagerBees = () => {
    let space = (3 + p.hives) / 5;
    space += Math.floor((4 + p.bees + n_tributes.tmp.me[3]) / 5);
    space += Math.floor(p.RJbees / 2.5);
    space += p.pollenGodTributes * n_tributes.tmp.me[5];
    space += p.pollenGodRJTributes;
    space *= n_sacrifices.tmp.capitalistGodEffect;
    if (p.cge) {
        return ft2(space);
    }
    else
        return Math.floor(space);
};
const getMaxHoneyBees = () => {
    let space = (3 + p.hives) / 5;
    space += Math.floor((4 + p.bees + n_tributes.tmp.me[3]) / 5);
    space += Math.floor(p.RJbees / 2.5);
    space += p.nectarGodTributes * n_tributes.tmp.me[5];
    space += p.nectarGodRJTributes;
    space *= n_sacrifices.tmp.capitalistGodEffect;
    if (p.cge) {
        return ft2(space);
    }
    else
        return Math.floor(space);
};
const getFlowerProduction = (flowerFields = p.flowerFields + (p.flowerGodTributes * n_tributes.tmp.me[5] + p.flowerGodRJTributes * 2)) => {
    let prod = flowerFields;
    prod *= Math.pow(1.01, Math.max(0, p.flowerFields - 1 + p.flowerGodTributes));
    prod *= Math.pow(1.01, (p.RJflowerFields * 2));
    prod *= Math.pow(1.03, ((p.flowerGodTributes + p.flowerGodRJTributes) * n_tributes.tmp.me[5]));
    prod *= n_tributes.tmp.me[0];
    prod *= tmp.gameSpeedFormTicks;
    prod *= n_jelly.tmp.RJBonus;
    return prod;
};
const getPollenProduction = (foragerBees = p.foragerBees) => {
    let prod = (foragerBees * 3) / 40;
    prod *= Math.pow(1.01, Math.max(0, p.flowerFields + p.flowerGodTributes * n_tributes.tmp.me[5] - 1));
    prod *= Math.pow(1.01, (p.RJflowerFields * 2));
    prod *= Math.pow(1.03, ((p.pollenGodTributes + p.pollenGodRJTributes) * n_tributes.tmp.me[5]));
    prod *= p.pge ? 2 : 1;
    prod *= n_tributes.tmp.me[8];
    prod *= tmp.gameSpeedFormTicks;
    prod *= n_jelly.tmp.RJBonus;
    return prod;
};
const getHoneyProduction = (honeyBees = p.honeyBees) => {
    let prod = honeyBees / 30;
    prod *= Math.pow(1.01, Math.max(0, p.hives));
    prod *= Math.pow(1.01, (p.RJhives * 2));
    prod *= Math.pow(1.03, (p.honeyGodTributes * n_tributes.tmp.me[5] + p.honeyGodRJTributes));
    prod *= p.nge ? 2 : 1;
    prod *= n_tributes.tmp.me[4];
    prod *= n_tributes.tmp.me[8];
    prod *= tmp.gameSpeedFormTicks;
    prod *= n_jelly.tmp.RJBonus;
    return prod;
};
let percentOfHoneySold = {
    1: 1 - Math.pow(0.99, 1),
    2: 1 - Math.pow(0.99, 2),
    5: 1 - Math.pow(0.99, 5),
    10: 1 - Math.pow(0.99, 10),
    20: 1 - Math.pow(0.99, 20),
    50: 1 - Math.pow(0.99, 50),
    100: 1 - Math.pow(0.99, 100),
};
const getHoneyToSell = (honeyToSell) => {
    if (totalBees() == 0)
    honeyToSell = p.honey - beeCost.costFunction();
if (honeyToSell < 0.1)
    return 0;
return honeyToSell * (1 - percentTimeSpeed[TMP.usedTime] || 0.01);
};
const getHoneyWorth = () => {
    let worth = n_tributes.tmp.me[7];
    worth *= n_jelly.tmp.RJBonus;
    return worth;
};
const tributeBaseScalling = Math.pow(10, (1 / 5));
const smallTributeBase = 50 / tributeBaseScalling;
const smallTributeBase2 = 500 / tributeBaseScalling;
//todo? idk these feel kinda off but i guess thats fine
// eyJmbG93ZXJzIjowLCJwb2xsZW4iOjIwNzYuNTY3NzE4MDYyMDE2NCwibmVjdGFyIjo0NzEuNTMzOTkwNjUxNTg4MiwiaG9uZXkiOjkxMS43ODg4MDYzNTIzMzM2LCJtb25leSI6MzM0LjQyMzM4OTQ2NDcwNzYsImhpZ2hlc3RmbG93ZXJzIjozMjk0LjcwMDU0MjgxMjQzMiwiaGlnaGVzdHBvbGxlbiI6MjA3Ni41Njc3MTgwNjIwMTY0LCJoaWdoZXN0bmVjdGFyIjo1MzAuNzA3MDg4NjkwMzI0MiwiaGlnaGVzdGhvbmV5Ijo5MTEuNzg4ODA2MzUyMzMzNiwiaGlnaGVzdG1vbmV5IjozMzQuNDIzMzg5NDY0NzA3NiwidG90YWxmbG93ZXJzIjoxNjY3OC4yMzMzNjkyNzM0OSwidG90YWxwb2xsZW4iOjQwMDIuMzU2ODQ2NjAzMjQxLCJ0b3RhbG5lY3RhciI6MzY1OC4yMjEwMDI2ODAxMDIsInRvdGFsaG9uZXkiOjIyOTEuMTY2MDU3NzYzMzUyLCJ0b3RhbG1vbmV5IjoyODIyLjc4ODAyODU2NzUxMzcsImJlZXMiOjEyLCJmcmVlQmVlcyI6MCwiZm9yYWdlckJlZXMiOjguNzcsImhvbmV5QmVlcyI6MTAuNDE2MDMyMzAwNjI3OTc1LCJmbG93ZXJGaWVsZHMiOjEsImhpdmVzIjoxOSwidG90YWxTYWNyaWZpY2VzIjowLCJwb2xsZW5Hb2RUcmlidXRlcyI6NCwibmVjdGFyR29kVHJpYnV0ZXMiOjIsImhvbmV5R29kVHJpYnV0ZXMiOjcsImZsb3dlckdvZFRyaWJ1dGVzIjoxLCJjYXBpdGFsaXN0R29kVHJpYnV0ZXMiOjQsImF1dG9Bc2lnbkJlZXNUbyI6WyJmb3JhZ2VyIiwiaG9uZXkiXSwicGdlIjp0cnVlLCJuZ2UiOnRydWUsImhnZSI6dHJ1ZSwiZmdlIjp0cnVlLCJjZ2UiOnRydWUsInNlbGxpbmdIb25leSI6ZmFsc2UsImF1dG9zYXZlcyI6ZmFsc2UsInVubG9ja3MiOnsiYmVlcyI6dHJ1ZSwiZm9yYWdlckJlZXMiOnRydWUsImhpdmUiOnRydWUsImhvbmV5QmVlcyI6dHJ1ZSwic2FjcmlmaWNpbmciOnRydWUsInRyaWJ1dGVzIjp0cnVlLCJqZWxseSI6ZmFsc2UsImplbGx5MiI6ZmFsc2V9LCJsYXN0VXBkYXRlIjoxNjY2OTc2NDc4MTc5LCJvZmZsaW5lVGltZSI6NjcxMjguMTcyOTk5OTkzMzYsIlJKIjowLCJoaWdoZXN0UkoiOjAsInRvdGFsUkoiOjAsIlJKYmVlcyI6MCwiUkpmbG93ZXJGaWVsZHMiOjAsIlJKaGl2ZXMiOjAsIlJKVHJpYnV0ZXMiOjAsInVudXNlZFJKVHJpYnV0ZXMiOjAsInBvbGxlbkdvZFJKVHJpYnV0ZXMiOjAsIm5lY3RhckdvZFJKVHJpYnV0ZXMiOjAsImhvbmV5R29kUkpUcmlidXRlcyI6MCwiZmxvd2VyR29kUkpUcmlidXRlcyI6MCwiY2FwaXRhbGlzdEdvZFJKVHJpYnV0ZXMiOjAsInRhYiI6InNldHRpbmdzIiwiZGFya21vZGUiOnRydWUsImJpZ0J1dHRvbnMiOmZhbHNlLCJkaXNwbGF5RXZlcnl0aGluZyI6ZmFsc2UsImV4Y2hhbmdlQ29uZmlybWF0aW9uIjp0cnVlLCJpY29uTW92ZSI6ZmFsc2V9
const getSmallGodTribute = (smallResource) => {
    let base = smallResource;
    base *= n_tributes.tmp.me[2];
    return Math.floor(Math.log(Math.max(1, base / smallTributeBase)) / Math.log(tributeBaseScalling));
};
const getSmallGodTribute2 = (smallResource) => {
    let base = smallResource;
    base *= n_tributes.tmp.me[2];
    return Math.floor(Math.log(Math.max(1, base / smallTributeBase2)) / Math.log(tributeBaseScalling));
};
const getNextsmallGodTribute = (tributes) => {
    let base = smallTributeBase;
    base /= n_tributes.tmp.me[2];
    return Math.pow(tributeBaseScalling, tributes) * base;
};
const getNextsmallGodTribute2 = (tributes) => {
    let base = smallTributeBase2;
    base /= n_tributes.tmp.me[2];
    return Math.pow(tributeBaseScalling, tributes) * base;
};
const getTotalSacrificeTributes = () => {
    return p.pollenGodTributes + p.nectarGodTributes + p.honeyGodTributes + p.flowerGodTributes + p.capitalistGodTributes;
};
const getTotalTributes = () => getTotalSacrificeTributes() + getTotalRJTributes();
const totalBees = () => {
    return p.freeBees + p.foragerBees + p.honeyBees;
};
const floor = (x) => Math.floor(x);
const stepwise1 = (s, n) => {
    let f = floor(n / s);
    let a = (n % s) * (f + 1);
    let b = (s * (f * (f + 1))) / 2;
    return a + b;
};
const stepwise2 = (s, n) => {
    let f = floor(n / s);
    let a = Math.pow(2, f) * (n % s);
    let b = s * Math.pow(2, f) - s;
    return a + b;
};
const reversedstepwise2 = (s, x) => {
    let base = floor(Math.log2((x + s) / s));
    let a = s * Math.pow(2, base) - s;
    let b = (x - a) / Math.pow(2, base);
    return base * s + b;
};
const getPSWithS = (what, x) => {
    if (x > 1)
        return `${format(x)} ${what}s per second`;
    else if (x == 1)
        return `${format(x)} ${what} per second`;
    else
        return `1 ${what} per ${format(1 / x)} seconds`;
};
const getPS = (what, x) => {
    if (x >= 1)
        return `${format(x)} ${what} per 1 second`;
    else
        return `1 ${what} per ${format(1 / x)} seconds`;
};
const getSGTBees = (tributes) => {
    return stepwise2(3, tributes) / n_tributes.tmp.me[2];
};
const getNSGTBees = (bees) => {
    return reversedstepwise2(3, bees * n_tributes.tmp.me[2]);
};
// prettier-ignore
let tributes = [
    { unlockAt: 2, showAt: 1, displayAt: 0, description: "1.02x flower production for every 2 free bee and for every 2 tributes" },
    { unlockAt: 5, showAt: 2, displayAt: 1, description: "bee price divided by 1.02x for every 2 tributes" },
    { unlockAt: 10, showAt: 5, displayAt: 2, description: "sacrifice requirement divided by 1.02 for every 2 tributes" },
    { unlockAt: 15, showAt: 10, displayAt: 5, description: "1 bee for every 5 tributes" },
    { unlockAt: 20, showAt: 15, displayAt: 10, description: "1.02x honey production per tribute" },
    { unlockAt: 30, showAt: 20, displayAt: 15, description: "1.02x tribute efficiency for every 10 tributes" },
    { unlockAt: 45, showAt: 30, displayAt: 20, description: "1.02x nectar production for every 2 tributes" },
    { unlockAt: 60, showAt: 40, displayAt: 25, description: "1.02x honey price multiplier per 3 tributes" },
    { unlockAt: 75, showAt: 50, displayAt: 30, description: "1.02x time speed multiplier per 5 tributes" },
    { unlockAt: 100, showAt: 100, displayAt: 75, description: "unlocks royal jelly" },
    { unlockAt: 110, showAt: 110, displayAt: 100, description: "combine a pair of gods" },
    { unlockAt: 120, showAt: 120, displayAt: 110, description: "combine another pair of gods" },
    { unlockAt: 135, showAt: 130, displayAt: 120, description: "combine another pair of gods" },
    { unlockAt: 155, showAt: 140, displayAt: 130, description: "combine another pair of gods" },
    { unlockAt: 180, showAt: 160, displayAt: 140, description: "challenges" },
];
const getConnectedTo = (god) => {
    let r = n_gods.tmp.connections.filter((a) => a.some((a) => a == god))[0];
    if (r)
        return r;
    else
        return [god];
};
const ft = (x) => {
    let rx = x;
    let t = "";
    if (x > 86400) {
        let d = Math.floor(x / 86400) % 365;
        x -= d * 86400;
        t += ` ${d}d`;
    }
    if (x > 3600) {
        let h = Math.floor(x / 3600) % 24;
        x -= h * 3600;
        t += ` ${h}h`;
    }
    if (x > 60) {
        let m = Math.floor(x / 60) % 60;
        x -= m * 60;
        t += ` ${m}m`;
    }
    if (x > 1 && rx < 86400) {
        let s = Math.floor(x) % 60;
        t += ` ${s}s`;
    }
    return t;
};
let gameSpeed = 1;
const getForagerBeeConsumption = () => Math.pow((11.85185185185185 * getNectarProduction(1) * getPollenProduction(1)), 0.5);
const updateOfflineTicks = (diff) => {
    if (diff > 5) {
        p.offlineTime += diff - 5;
        diff = 5;
    }
    if (p.offlineTime > 2) {
        d.ticksLeft.innerHTML = `offline time: ${ft(p.offlineTime)}`;
        d.offlineTicks.style.display = "";
    }
    else {
        d.offlineTicks.style.display = "none";
    }
    if (p.offlineTime > 1) {
        let ticksLeft = Math.max(0, Math.min(tmp.usedTime, p.offlineTime));
        p.offlineTime -= Math.max(0, ticksLeft - 1) * diff;
        tmp.gameSpeedFormTicks = Math.max(1, ticksLeft);
    }
    else {
        tmp.gameSpeedFormTicks = 1;
    }
    return diff;
};
const updateTmp = () => {
    tmp.usedTime = 1;
    if (d.offlineTicksSpeed2.checked)
        tmp.usedTime *= 2;
    if (d.offlineTicksSpeed5.checked)
        tmp.usedTime *= 5;
    if (d.offlineTicksSpeed10.checked)
        tmp.usedTime *= 10;
    if (!d.offlineTicksSpeed2.checked && !d.offlineTicksSpeed5.checked && !d.offlineTicksSpeed10.checked)
        tmp.usedTime = 1;
    tmp.usedTime = Math.max(0, Math.min(p.offlineTime, tmp.usedTime));
    if (tmp.usedTime < 1)
        tmp.usedTime = 0; // ouch
    if (p.offlineTime < 1)
        p.offlineTime = 0; // ouch
};
const updateUnlocks = () => {
    if (n_tributes.tmp.me[10])
        p.unlocks.c1 = true;
    if (n_tributes.tmp.me[11])
        p.unlocks.c2 = true;
    if (n_tributes.tmp.me[12])
        p.unlocks.c3 = true;
    if (n_tributes.tmp.me[13])
        p.unlocks.c4 = true;
    if (p.bees > 0)
        p.unlocks.bees = true;
    if (p.pollen >= 1)
        p.unlocks.hive = true;
    if (p.foragerBees > 0)
        p.unlocks.foragerBees = true;
    if (p.honeyBees > 0)
        p.unlocks.honeyBees = true;
    if (totalBees() >= 3 &&
        (p.highestpollen >= 35 || p.highestnectar >= 35 || p.highesthoney >= 35 || p.highestflowers >= 700 || p.highestmoney >= 35))
        p.unlocks.sacrificing = true;
    if (n_tributes.tmp.totalTributes > 0) {
        p.unlocks.tributes = true;
    }
    if (n_tributes.tmp.totalTributes >= tributes[9].unlockAt)
        p.unlocks.jelly = true;
    if (p.RJ > 0)
        p.unlocks.jelly2 = true;
};
const updateDisplay = () => {
    if (p.unlocks.c1)
        d.godsTabButton.style.display = "";
    else
        d.godsTabButton.style.display = "none";
    p.settings.sacrificeConfirmation = d.sacrificeConfirmation.checked;
    p.settings.exchangeConfirmation = d.exchangeConfirmation.checked;
    p.settings.toggleHoneyOfflineTime = d.toggleHoneyOfflineTime.checked;
    p.settings.toggleSacrificeOfflineTime = d.toggleSacrificeOfflineTime.checked;
    p.settings.toggleRJOfflineTime = d.toggleRJOfflineTime.checked;
    if (p.fge) {
        d.honeyCheckBox.disabled = false;
    }
    else {
        d.honeyCheckBox.disabled = true;
        d.honeyCheckBox.checked = false;
        p.sellingHoney = false;
    }
    if (d.honeyCheckBox.checked) {
        p.sellingHoney = true;
        d.moneyPS.classList.remove("lighttext");
    }
    else {
        p.sellingHoney = false;
        d.moneyPS.classList.add("lighttext");
    }
    if (d.toggleDarkmode.checked) {
        d.body.classList.add("dark-mode");
        p.settings.darkmode = true;
    }
    else {
        d.body.classList.remove("dark-mode");
        p.settings.darkmode = false;
    }
    if (d.toggleBigButtons.checked) {
        d.body.classList.add("big-buttons");
        p.settings.bigButtons = true;
    }
    else {
        d.body.classList.remove("big-buttons");
        p.settings.bigButtons = false;
    }
    if (d.disaplyeverything.checked)
        p.settings.displayEverything = true;
    else
        p.settings.displayEverything = false;
    if (d.exchangeConfirmation.checked)
        p.settings.exchangeConfirmation = true;
    else
        p.settings.exchangeConfirmation = false;
    if (p.money < getFlowerFieldPrice()) {
        d.quickBuyFlowerField.disabled = true;
        d.buyFlowerField.disabled = true;
    }
    else {
        d.quickBuyFlowerField.disabled = false;
        d.buyFlowerField.disabled = false;
    }
    if (p.honey < getBeePrice()) {
        d.quickBuyBee.disabled = true;
        d.buyBee.disabled = true;
    }
    else {
        d.quickBuyBee.disabled = false;
        d.buyBee.disabled = false;
    }
    if (p.pollen < getHivePrice()) {
        d.quickBuyHive.disabled = true;
        d.buyHive.disabled = true;
    }
    else {
        d.quickBuyHive.disabled = false;
        d.buyHive.disabled = false;
    }
    if (p.settings.displayEverything || p.unlocks.bees) {
        d.foragerbeeswrapper.style.display = "";
        d.quickbuyhivewrapper.style.display = "";
        d.beesEffect.style.display = "";
        d.fifthbeestatwrapper.style.display = "";
    }
    else {
        d.foragerbeeswrapper.style.display = "none";
        d.quickbuyhivewrapper.style.display = "none";
        d.beesEffect.style.display = "none";
        d.fifthbeestatwrapper.style.display = "none";
    }
    if ((!p.settings.displayEverything && !p.unlocks.foragerBees) || (p.unlocks.bees && !p.unlocks.foragerBees)) {
        d.foragerbeestext.innerHTML = "└";
    }
    else {
        d.foragerbeestext.innerHTML = "├";
    }
    if (p.settings.displayEverything || p.unlocks.hive) {
        d.hivewrapper.style.display = "";
        d.beehivestatwrapper.style.display = "";
    }
    else {
        d.hivewrapper.style.display = "none";
        d.beehivestatwrapper.style.display = "none";
    }
    if (p.settings.displayEverything || p.unlocks.foragerBees) {
        d.pollenwrapper.style.visibility = "visible";
        d.nectarwrapper.style.visibility = "visible";
        d.honeybeeswrapper.style.display = "";
        d.foragerstatwrapper.style.display = "";
    }
    else {
        d.pollenwrapper.style.visibility = "hidden";
        d.nectarwrapper.style.visibility = "hidden";
        d.honeybeeswrapper.style.display = "none";
        d.foragerstatwrapper.style.display = "none";
    }
    if (p.settings.displayEverything || p.unlocks.honeyBees) {
        d.honeywrapper.style.visibility = "visible";
        d.honeybeestatwrapper.style.display = "";
    }
    else {
        d.honeybeestatwrapper.style.display = "none";
        d.honeywrapper.style.visibility = "hidden";
    }
    if (n_tributes.tmp.totalTributes == 0)
        d.recomendedFlowers.style.display = "";
    else
        d.recomendedFlowers.style.display = "none";
    if (p.settings.displayEverything || p.fge) {
        d.moneywrapper.style.visibility = "visible";
        d.flowerfieldwrapper.style.display = "";
        d.quickBuyFlowerField.style.display = "";
        d.honeystatwrapper.style.display = "";
    }
    else {
        d.moneywrapper.style.visibility = "hidden";
        d.flowerfieldwrapper.style.display = "none";
        d.quickBuyFlowerField.style.display = "none";
        d.honeystatwrapper.style.display = "none";
    }
    if (p.settings.displayEverything || p.unlocks.sacrificing) {
        d.sacrificeWrapper.style.display = "";
    }
    else {
        d.sacrificeWrapper.style.display = "none";
    }
    if (p.settings.displayEverything || p.pge || p.highestpollen >= smallTributeBase)
        d.pollengodwrapper.style.display = "";
    else
        d.pollengodwrapper.style.display = "none";
    if (p.settings.displayEverything || p.nge || p.highestnectar >= smallTributeBase)
        d.nectargodwrapper.style.display = "";
    else
        d.nectargodwrapper.style.display = "none";
    if (p.settings.displayEverything || p.hge || p.highesthoney >= smallTributeBase)
        d.honeygodwrapper.style.display = "";
    else
        d.honeygodwrapper.style.display = "none";
    if (p.settings.displayEverything || p.fge || p.highestflowers >= smallTributeBase2)
        d.flowergodwrapper.style.display = "";
    else
        d.flowergodwrapper.style.display = "none";
    if (p.settings.displayEverything || p.cge || p.highestmoney >= smallTributeBase)
        d.capitalistgodwrapper.style.display = "";
    else
        d.capitalistgodwrapper.style.display = "none";
    if (p.settings.displayEverything || p.unlocks.tributes) {
        d.tributeswrapper.style.display = "";
        d.pernamentTributeEffects.style.display = "";
        d.pernamentTributeEffectsLabel.style.display = "";
    }
    else {
        d.tributeswrapper.style.display = "none";
        d.pernamentTributeEffects.style.display = "none";
        d.pernamentTributeEffectsLabel.style.display = "none";
    }
    if (p.settings.displayEverything || p.unlocks.jelly) {
        d.jellyTabButton.style.display = "";
        d.RJWrapper3.style.display = "";
    }
    else {
        d.jellyTabButton.style.display = "none";
        d.RJWrapper3.style.display = "none";
    }
    if (p.settings.displayEverything || p.unlocks.jelly2) {
        d.RJWrapper.style.display = "";
        d.RJWrapper2.style.display = "";
        // d.RJWrapper4.style.visibility = "visible";
    }
    else {
        d.RJWrapper.style.display = "none";
        d.RJWrapper2.style.display = "none";
        // d.RJWrapper4.style.visibility = "hidden";
    }
};
const getNectarProduction = (foragerBees = p.foragerBees) => {
    let prod = foragerBees / 8;
    prod *= Math.pow(1.01, Math.max(0, p.bees - 1 + n_tributes.tmp.me[3]));
    prod *= Math.pow(1.01, (p.RJbees * 2));
    prod *= Math.pow(1.03, (p.nectarGodTributes * n_tributes.tmp.me[5] + p.nectarGodRJTributes));
    prod *= n_tributes.tmp.me[6];
    prod *= tmp.gameSpeedFormTicks;
    prod *= n_jelly.tmp.RJBonus;
    return prod;
};
var n_resources;
(function (n_resources) {
    n_resources.tmp = {
        flowerProd: 0,
        pollenProd: 0,
        nectarProd: 0,
        honeyProd: 0,
        moneyProd: 0,
        flowerCons: 0,
        nectarCons: 0,
        honeyCons: 0,
        flowerEff: 0,
        nectarEff: 0,
    };
    n_resources.calc = (diff) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        // flowers
        n_resources.tmp.flowerProd = (_a = getFlowerProduction()) !== null && _a !== void 0 ? _a : 0;
        n_resources.tmp.flowerCons = (_b = p.foragerBees * getForagerBeeConsumption()) !== null && _b !== void 0 ? _b : 0;
        n_resources.tmp.flowerEff = 0;
        if (p.flowers + n_resources.tmp.flowerProd != 0 && n_resources.tmp.flowerCons != 0)
            n_resources.tmp.flowerEff = Math.min(1, (p.flowers + n_resources.tmp.flowerProd) / n_resources.tmp.flowerCons);
        p.flowers += (n_resources.tmp.flowerProd - n_resources.tmp.flowerCons * n_resources.tmp.flowerEff) * diff;
        // pollen
        n_resources.tmp.pollenProd = (_c = getPollenProduction()) !== null && _c !== void 0 ? _c : 0;
        p.pollen += n_resources.tmp.pollenProd * n_resources.tmp.flowerEff * diff;
        // nectar
        n_resources.tmp.nectarProd = (_d = getNectarProduction() * n_resources.tmp.flowerEff) !== null && _d !== void 0 ? _d : 0;
        n_resources.tmp.nectarCons = (_e = getHoneyProduction()) !== null && _e !== void 0 ? _e : 0;
        n_resources.tmp.nectarEff = 0;
        if (p.nectar + n_resources.tmp.nectarProd != 0 && n_resources.tmp.nectarCons != 0)
            n_resources.tmp.nectarEff = Math.min(1, (p.nectar + n_resources.tmp.nectarProd) / n_resources.tmp.nectarCons);
        n_resources.tmp.honeyProd *= n_resources.tmp.nectarEff;
        p.nectar += (n_resources.tmp.nectarProd - n_resources.tmp.nectarCons * n_resources.tmp.nectarEff) * diff;
        // honey
        n_resources.tmp.honeyProd = (_f = getHoneyProduction()) !== null && _f !== void 0 ? _f : 0;
        p.honey += (n_resources.tmp.honeyProd * n_resources.tmp.nectarEff - n_resources.tmp.honeyCons) * diff;
        n_resources.tmp.honeyCons = (_g = (p.sellingHoney ? getHoneyToSell() : 0)) !== null && _g !== void 0 ? _g : 0;
        // money
        n_resources.tmp.moneyProd = (_h = getHoneyToSell() * getHoneyWorth()) !== null && _h !== void 0 ? _h : 0;
        if (p.sellingHoney) {
            p.honey -= n_resources.tmp.honeyCons * diff;
            p.money += n_resources.tmp.moneyProd * diff;
        }
        // .
        if (p.flowers < 0.0005 || p.flowers == NaN) {
            p.flowers = 0;
        }
        if (p.pollen < 0.0005 || p.pollen == NaN) {
            p.pollen = 0;
        }
        if (p.nectar < 0.0005 || p.nectar == NaN) {
            p.nectar = 0;
        }
        if (p.honey < 0.0005 || p.honey == NaN) {
            p.honey = 0;
        }
        if (p.money < 0.0005 || p.money == NaN) {
            p.money = 0;
        }
        //
        // highest for sacrifice
        p.highestflowers = Math.max(p.flowers, (_j = p.highestflowers) !== null && _j !== void 0 ? _j : 0);
        p.highestpollen = Math.max(p.pollen, (_k = p.highestpollen) !== null && _k !== void 0 ? _k : 0);
        p.highestnectar = Math.max(p.nectar, (_l = p.highestnectar) !== null && _l !== void 0 ? _l : 0);
        p.highesthoney = Math.max(p.honey, (_m = p.highesthoney) !== null && _m !== void 0 ? _m : 0);
        p.highestmoney = Math.max(p.money, (_o = p.highestmoney) !== null && _o !== void 0 ? _o : 0);
        // total for royal jelly
        p.totalflowers += n_resources.tmp.flowerProd * diff;
        p.totalpollen += n_resources.tmp.pollenProd * diff;
        p.totalnectar += n_resources.tmp.nectarProd * diff;
        p.totalhoney += n_resources.tmp.honeyProd * diff;
        if (p.sellingHoney)
            p.totalmoney += +n_resources.tmp.moneyProd * diff;
    };
    n_resources.text = () => {
        // current
        d.flowers.innerHTML = ` ${format(p.flowers)}`;
        d.pollen.innerHTML = ` ${format(p.pollen)}`;
        d.nectar.innerHTML = ` ${format(p.nectar)}`;
        d.honey.innerHTML = ` ${format(Math.round(p.honey * 1e5) / 1e5)}`; //todo remove?
        d.money.innerHTML = ` ${format(p.money)}`;
        // per second
        d.flowersPS.innerHTML = `(${format(rt5(n_resources.tmp.flowerProd - n_resources.tmp.flowerCons * n_resources.tmp.flowerEff))}/s)`;
        d.pollenPS.innerHTML = `(${format(rt5(n_resources.tmp.pollenProd * n_resources.tmp.flowerEff))}/s)`;
        d.nectarPS.innerHTML = `(${format(rt5(n_resources.tmp.nectarProd - n_resources.tmp.nectarCons * n_resources.tmp.nectarEff))}/s)`;
        d.honeyPS.innerHTML = `(${format(rt5(n_resources.tmp.honeyProd * n_resources.tmp.nectarEff - n_resources.tmp.honeyCons))}/s)`;
        d.moneyPS.innerHTML = `(${format(rt5(n_resources.tmp.moneyProd))}/s)`;
    };
})(n_resources || (n_resources = {}));
// todo:  make n_bees?
var n_structures;
(function (n_structures) {
    n_structures.tmp = {
        maxForagerBees: 0,
        maxHoneyBees: 0,
        flowerFieldPrice: 1,
        beePrice: 1,
        hivePrice: 1,
        flowerFieldsToBuy: 0,
        flowerFieldsPrice: 1 / 0,
        beesToBuy: 0,
        beesPrice: 1 / 0,
        hivesToBuy: 0,
        hivesPrice: 1 / 0,
    };
    n_structures.text = () => {
        // flower fields
        d.flowerFieldPrice.innerHTML = format(n_structures.tmp.flowerFieldPrice);
        d.flowerFields.innerHTML = p.flowerFields.toFixed(0);
        if (p.flowerGodTributes > 0)
            if (n_tributes.tmp.me[5] == 1)
                d.flowerFields.innerHTML += " + " + p.flowerGodTributes.toFixed(0);
            else
                d.flowerFields.innerHTML += " + " + format(p.flowerGodTributes);
        if (p.RJflowerFields > 0)
            d.flowerFields.innerHTML += ` + <span class='rjtext'> ${p.RJflowerFields.toFixed(0)}</span>`;
        // bees
        d.beePrice.innerHTML = format(n_structures.tmp.beePrice);
        d.bees.innerHTML = p.bees.toFixed(0);
        if (n_tributes.tmp.totalTributes >= tributes[3].unlockAt)
            d.bees.innerHTML += " + " + format(n_tributes.tmp.me[3]);
        if (p.RJbees > 0)
            d.bees.innerHTML += ` + <span class='rjtext'> ${p.RJbees.toFixed(0)}</span>`;
        if (p.honeyGodTributes + p.honeyGodRJTributes == 0 && p.capitalistGodTributes + p.capitalistGodRJTributes == 0) {
            d.freeBees.innerHTML = "" + rt5(p.freeBees).toFixed(0) + "/" + totalBees().toFixed(0);
            d.foragerBees.innerHTML = "" + p.foragerBees.toFixed(0) + "/" + n_structures.tmp.maxForagerBees.toFixed(0);
            d.honeyBees.innerHTML = "" + p.honeyBees.toFixed(0) + "/" + n_structures.tmp.maxHoneyBees.toFixed(0);
        }
        else {
            d.freeBees.innerHTML = "" + format(rt5(p.freeBees)) + "/" + format(totalBees());
            d.foragerBees.innerHTML = "" + format(p.foragerBees) + "/" + format(n_structures.tmp.maxForagerBees);
            d.honeyBees.innerHTML = "" + format(p.honeyBees) + "/" + format(n_structures.tmp.maxHoneyBees);
        }
        // hives
        d.hivePrice.innerHTML = format(n_structures.tmp.hivePrice);
        d.hives.innerHTML = p.hives.toFixed(0);
        if (p.RJhives > 0)
            d.hives.innerHTML += ` + <span class='rjtext'> ${p.RJhives.toFixed(0)}</span>`;
        // boost from bought
        let totalbees = p.bees + n_tributes.tmp.me[3] + p.RJbees - 1;
        let totalHives = p.hives + p.RJhives - 1;
        let totalFlowerFields = p.flowerFields + p.flowerGodTributes + p.RJflowerFields + p.flowerGodRJTributes - 1;
        d.buyHive.title = `1.01 ^ ${totalHives.toFixed(0)} = ${format(Math.pow(1.01, totalHives))}`;
        if (n_tributes.tmp.me[5] == 1)
            d.buyFlowerField.title = `1.01 ^ ${totalFlowerFields.toFixed(0)} = ${format(Math.pow(1.01, totalFlowerFields))}`;
        else
            d.buyFlowerField.title = `1.01 ^ ${format(totalFlowerFields)} = ${format(Math.pow(1.01, totalFlowerFields))}`;
        if (n_tributes.tmp.me[5] == 1 && n_tributes.tmp.me[3] == 1)
            d.buyBee.title = `1.01 ^ ${totalbees.toFixed(0)} = ${format(Math.pow(1.01, totalbees))}`;
        else
            d.buyBee.title = `1.01 ^ ${format(totalbees)} = ${format(Math.pow(1.01, totalbees))}`;
        // buy max
        if (n_structures.tmp.flowerFieldsToBuy == 0)
            d.buyMaxFlowerField.disabled = true;
        else
            d.buyMaxFlowerField.disabled = false;
        if (n_structures.tmp.beesToBuy == 0)
            d.buyMaxBee.disabled = true;
        else
            d.buyMaxBee.disabled = false;
        if (n_structures.tmp.hivesToBuy == 0)
            d.buyMaxHive.disabled = true;
        else
            d.buyMaxHive.disabled = false;
        d.buyMaxFlowerFieldAmount.innerHTML = format(n_structures.tmp.flowerFieldsToBuy, -3);
        d.buyMaxBeeAmount.innerHTML = format(n_structures.tmp.beesToBuy, -3);
        d.buyMaxHiveAmount.innerHTML = format(n_structures.tmp.hivesToBuy, -3);
        d.buyMaxFlowerFieldPrice.innerHTML = format(n_structures.tmp.flowerFieldsPrice);
        d.buyMaxBeePrice.innerHTML = format(n_structures.tmp.beesPrice);
        d.buyMaxHivePrice.innerHTML = format(n_structures.tmp.hivesPrice);
        d.buyMaxFlowerFieldS.innerHTML = n_structures.tmp.flowerFieldsToBuy == 1 ? "" : "s";
        d.buyMaxBeeS.innerHTML = n_structures.tmp.beesToBuy == 1 ? "" : "s";
        d.buyMaxHiveS.innerHTML = n_structures.tmp.hivesToBuy == 1 ? "" : "s";
    };
    n_structures.display = () => {
        // 50% bees
        if (!p.hge) {
            d.equalResources.style.display = "none";
            d.maxForagerProduction.style.display = "none";
            d.maxHoneyProduction.style.display = "none";
        }
        else {
            d.equalResources.style.display = "";
            d.maxForagerProduction.style.display = "";
            d.maxHoneyProduction.style.display = "";
        }
        // 0/-/+/max bee
        if (!p.foragerBees)
            d.set0ForagerBees.disabled = true;
        else
            d.set0ForagerBees.disabled = false;
        if (p.foragerBees == n_structures.tmp.maxForagerBees || (p.honeyBees == 0 && p.freeBees == 0))
            d.maxForagerBees.disabled = true;
        else
            d.maxForagerBees.disabled = false;
        if (p.foragerBees == n_structures.tmp.maxForagerBees || (p.honeyBees < 1 && p.freeBees < 1) || p.foragerBees + 1 > n_structures.tmp.maxForagerBees)
            d.plusForagerBees.disabled = true;
        else
            d.plusForagerBees.disabled = false;
        if (p.foragerBees == 0 || p.foragerBees - 1 < 0)
            d.minusForagerBees.disabled = true;
        else
            d.minusForagerBees.disabled = false;
        if (!p.honeyBees)
            d.set0HoneyBees.disabled = true;
        else
            d.set0HoneyBees.disabled = false;
        if (p.honeyBees == n_structures.tmp.maxHoneyBees || (p.foragerBees == 0 && p.freeBees == 0))
            d.maxHoneyBees.disabled = true;
        else
            d.maxHoneyBees.disabled = false;
        if (p.honeyBees == n_structures.tmp.maxHoneyBees || (p.foragerBees < 1 && p.freeBees < 1) || p.honeyBees + 1 > n_structures.tmp.maxHoneyBees)
            d.plusHoneyBees.disabled = true;
        else
            d.plusHoneyBees.disabled = false;
        if (p.honeyBees == 0 || p.honeyBees - 1 < 0)
            d.minusHoneyBees.disabled = true;
        else
            d.minusHoneyBees.disabled = false;
        // auto assign
        d.foragerbeestextunderline.style.textDecorationLine = "none";
        d.honeybeestextunderline.style.textDecorationLine = "none";
        if (p.hge) {
            if (p.autoAsignBeesTo[0] == "forager")
                d.foragerbeestextunderline.style.textDecorationLine = "underline";
            if (p.autoAsignBeesTo[0] == "honey")
                d.honeybeestextunderline.style.textDecorationLine = "underline";
            if (p.autoAsignBeesTo[1] == "forager")
                d.foragerbeestextunderline.style.textDecorationLine = "underline";
            if (p.autoAsignBeesTo[1] == "honey")
                d.honeybeestextunderline.style.textDecorationLine = "underline";
            if (p.autoAsignBeesTo[0] == "forager")
                d.foragerbeestextunderline.style.textDecorationStyle = "solid";
            if (p.autoAsignBeesTo[0] == "honey")
                d.honeybeestextunderline.style.textDecorationStyle = "solid";
            if (p.autoAsignBeesTo[1] == "forager")
                d.foragerbeestextunderline.style.textDecorationStyle = "dashed";
            if (p.autoAsignBeesTo[1] == "honey")
                d.honeybeestextunderline.style.textDecorationStyle = "dashed";
        }
        else {
            p.autoAsignBeesTo = [];
        }
    };
    n_structures.calc = () => {
        // max bees
        n_structures.tmp.maxForagerBees = getMaxForagerBees();
        n_structures.tmp.maxHoneyBees = getMaxHoneyBees();
        // buy
        n_structures.tmp.flowerFieldPrice = getFlowerFieldPrice();
        n_structures.tmp.beePrice = getBeePrice();
        n_structures.tmp.hivePrice = getHivePrice();
        // buy max
        [n_structures.tmp.flowerFieldsToBuy, n_structures.tmp.flowerFieldsPrice] = flowerFieldCost.maxFunction(p.money);
        [n_structures.tmp.beesToBuy, n_structures.tmp.beesPrice] = beeCost.maxFunction(p.honey);
        [n_structures.tmp.hivesToBuy, n_structures.tmp.hivesPrice] = hiveCost.maxFunction(p.pollen);
    };
    n_structures.autobuy = () => {
        let a = p.autobuy.structures;
        if (a.flower || a.bee || a.hive) {
            d.autoStructures.style.display = "";
            d.structuresBuyAt.style.display = "";
        }
        else {
            d.autoStructures.style.display = "none";
            d.structuresBuyAt.style.display = "none";
        }
        if (a.flower) {
            d.autoflowerWrapper.style.display = "";
            d.autoflowerWrapper2.style.display = "";
            d.quickautoflowerBuy.style.display = "";
            d.autoflowerBuy.style.display = "";
            d.autoflowerButtonWrapper.style.display = "none";
        }
        else {
            d.autoflowerWrapper.style.display = "none";
            d.autoflowerWrapper2.style.display = "none";
            d.quickautoflowerBuy.style.display = "none";
            d.autoflowerBuy.style.display = "none";
            d.autoflowerButtonWrapper.style.display = "";
            d.quickautoflowerBuy.checked = false;
            d.autoflowerBuy.checked = false;
        }
        if (a.bee) {
            d.autobeeWrapper.style.display = "";
            d.autobeeWrapper2.style.display = "";
            d.quickautobeeBuy.style.display = "";
            d.autobeeBuy.style.display = "";
            d.autobeeButtonWrapper.style.display = "none";
        }
        else {
            d.autobeeWrapper.style.display = "none";
            d.autobeeWrapper2.style.display = "none";
            d.quickautobeeBuy.style.display = "none";
            d.autobeeBuy.style.display = "none";
            d.autobeeButtonWrapper.style.display = "";
            d.quickautobeeBuy.checked = false;
            d.autobeeBuy.checked = false;
        }
        if (a.hive) {
            d.autohiveWrapper.style.display = "";
            d.autohiveWrapper2.style.display = "";
            d.quickautohiveBuy.style.display = "";
            d.autohiveBuy.style.display = "";
            d.autohiveButtonWrapper.style.display = "none";
        }
        else {
            d.autohiveWrapper.style.display = "none";
            d.autohiveWrapper2.style.display = "none";
            d.quickautohiveBuy.style.display = "none";
            d.autohiveBuy.style.display = "none";
            d.autohiveButtonWrapper.style.display = "";
            d.quickautohiveBuy.checked = false;
            d.autohiveBuy.checked = false;
        }
        beeCost.level = p.bees;
        beeCost.offset = getBeePriceMult();
        hiveCost.level = p.hives;
        hiveCost.offset = getHivePriceMult();
        flowerFieldCost.level = p.flowerFields;
        flowerFieldCost.offset = getFlowerFieldPriceMult();
        let [ftb, fp] = flowerFieldCost.maxFunction((p.money / 100) * a.flowerBuyPercent);
        let [btb, bp] = beeCost.maxFunction((p.honey / 100) * a.beeBuyPercent);
        let [htb, hp] = hiveCost.maxFunction((p.pollen / 100) * a.hiveBuyPercent);
        // console.log(flowerFieldsToBuy, beesToBuy, hivesToBuy);
        if (a.on) {
            if (a.flower && a.flowerBuy) {
                p.money -= fp;
                p.flowerFields += ftb;
            }
            if (a.bee && a.beeBuy) {
                p.honey -= bp;
                p.bees += btb;
                if (btb > 0) {
                    let beesLeft = btb * n_sacrifices.tmp.honeyGodEffect;
                    if (p.autoAsignBeesTo[0] != undefined)
                        beesLeft = assignBeesTo(p.autoAsignBeesTo[0], beesLeft);
                    if (p.autoAsignBeesTo[1] != undefined)
                        beesLeft = assignBeesTo(p.autoAsignBeesTo[1], beesLeft);
                    assignBeesTo("free", beesLeft);
                }
            }
            if (a.hive && a.hiveBuy) {
                p.pollen -= hp;
                p.hives += htb;
            }
        }
    };
})(n_structures || (n_structures = {}));
var n_sacrifices;
(function (n_sacrifices) {
    n_sacrifices.tmp = {
        pollenGodEffect: 1,
        nectarGodEffect: 1,
        honeyGodEffect: 1,
        flowerGodEffect: 1,
        capitalistGodEffect: 1,
        pollenGodTributesToGet: 0,
        nectarGodTributesToGet: 0,
        honeyGodTributesToGet: 0,
        flowerGodTributesToGet: 0,
        capitalistGodTributesToGet: 0,
        pollenForNext: 0,
        nectarForNext: 0,
        honeyForNext: 0,
        flowersForNext: 0,
        moneyForNext: 0,
        pollenBeesForNext: 0,
        nectarBeesForNext: 0,
        honeyBeesForNext: 0,
        flowersBeesForNext: 0,
        moneyBeesForNext: 0,
    };
    n_sacrifices.text = () => {
        // first sacrifice reset highlight
        if (p.totalSacrifices > 0)
            d.sacrificeResets.classList.add("lighttext");
        else
            d.sacrificeResets.classList.remove("lighttext");
        // title / boost
        let pp = (p.pollenGodTributes + p.pollenGodRJTributes) * n_tributes.tmp.me[5];
        let np = (p.nectarGodTributes + p.nectarGodRJTributes) * n_tributes.tmp.me[5];
        let hp = (p.honeyGodTributes + p.honeyGodRJTributes) * n_tributes.tmp.me[5];
        let fp = (p.flowerGodTributes + p.flowerGodRJTributes) * n_tributes.tmp.me[5];
        let cp = (p.capitalistGodTributes + p.capitalistGodRJTributes) * n_tributes.tmp.me[5];
        d.sacrificeToPollenGod.title = `1.03 ^ ${format(pp, 1)} = ${format(n_sacrifices.tmp.pollenGodEffect)}`;
        d.sacrificeToNectarGod.title = `1.03 ^ ${format(np, 1)} = ${format(n_sacrifices.tmp.nectarGodEffect)}`;
        d.sacrificeToHoneyGod.title = `1.03 ^ ${format(hp, 1)} = ${format(n_sacrifices.tmp.honeyGodEffect)}`;
        d.sacrificeToFlowerGod.title = `1.03 ^ ${format(fp, 1)} = ${format(n_sacrifices.tmp.flowerGodEffect)}`;
        d.sacrificeToCapitalistGod.title = `1.03 ^ ${format(cp, 1)} = ${format(n_sacrifices.tmp.capitalistGodEffect)}`;
        // required resource
        if (n_gods.tmp.pollenGodMaxTributes <= p.pollenGodTributes + n_sacrifices.tmp.pollenGodTributesToGet)
            d.nextPollenGodTribute.innerHTML = "???";
        else
            d.nextPollenGodTribute.innerHTML = format(n_sacrifices.tmp.pollenForNext);
        if (n_gods.tmp.nectarGodMaxTributes <= p.nectarGodTributes + n_sacrifices.tmp.nectarGodTributesToGet)
            d.nextNectarGodTribute.innerHTML = "???";
        else
            d.nextNectarGodTribute.innerHTML = format(n_sacrifices.tmp.nectarForNext);
        if (n_gods.tmp.honeyGodMaxTributes <= p.honeyGodTributes + n_sacrifices.tmp.honeyGodTributesToGet)
            d.nextHoneyGodTribute.innerHTML = "???";
        else
            d.nextHoneyGodTribute.innerHTML = format(n_sacrifices.tmp.honeyForNext);
        if (n_gods.tmp.flowerGodMaxTributes <= p.flowerGodTributes + n_sacrifices.tmp.flowerGodTributesToGet)
            d.nextFlowerGodTribute.innerHTML = "???";
        else
            d.nextFlowerGodTribute.innerHTML = format(n_sacrifices.tmp.flowersForNext);
        if (n_gods.tmp.moneyGodMaxTributes <= p.capitalistGodTributes + n_sacrifices.tmp.capitalistGodTributesToGet)
            d.nextCapitalistGodTribute.innerHTML = "???";
        else
            d.nextCapitalistGodTribute.innerHTML = format(n_sacrifices.tmp.moneyForNext);
        // required bees
        if (n_tributes.tmp.me[2] == 1) {
            d.nextPollenGodTributeBees.innerHTML = "" + n_sacrifices.tmp.pollenBeesForNext + " bee" + (n_sacrifices.tmp.pollenBeesForNext == 1 ? "" : "s");
            d.nextNectarGodTributeBees.innerHTML = "" + n_sacrifices.tmp.nectarBeesForNext + " bee" + (n_sacrifices.tmp.nectarBeesForNext == 1 ? "" : "s");
            d.nextHoneyGodTributeBees.innerHTML = "" + n_sacrifices.tmp.honeyBeesForNext + " bee" + (n_sacrifices.tmp.honeyBeesForNext == 1 ? "" : "s");
            d.nextFlowerGodTributeBees.innerHTML = "" + n_sacrifices.tmp.flowersBeesForNext + " bee" + (n_sacrifices.tmp.flowersBeesForNext == 1 ? "" : "s");
            d.nextCapitalistGodTributeBees.innerHTML = "" + n_sacrifices.tmp.moneyBeesForNext + " bee" + (n_sacrifices.tmp.moneyBeesForNext == 1 ? "" : "s");
        }
        else {
            d.nextPollenGodTributeBees.innerHTML = "" + format(n_sacrifices.tmp.pollenBeesForNext) + " bees";
            d.nextNectarGodTributeBees.innerHTML = "" + format(n_sacrifices.tmp.nectarBeesForNext) + " bees";
            d.nextHoneyGodTributeBees.innerHTML = "" + format(n_sacrifices.tmp.honeyBeesForNext) + " bees";
            d.nextFlowerGodTributeBees.innerHTML = "" + format(n_sacrifices.tmp.flowersBeesForNext) + " bees";
            d.nextCapitalistGodTributeBees.innerHTML = "" + format(n_sacrifices.tmp.moneyBeesForNext) + " bees";
        }
        if (n_gods.tmp.pollenGodMaxTributes <= p.pollenGodTributes + n_sacrifices.tmp.pollenGodTributesToGet)
            d.nextPollenGodTributeBees.innerHTML = "??? bees";
        if (n_gods.tmp.nectarGodMaxTributes <= p.nectarGodTributes + n_sacrifices.tmp.nectarGodTributesToGet)
            d.nextNectarGodTributeBees.innerHTML = "??? bees";
        if (n_gods.tmp.honeyGodMaxTributes <= p.honeyGodTributes + n_sacrifices.tmp.honeyGodTributesToGet)
            d.nextHoneyGodTributeBees.innerHTML = "??? bees";
        if (n_gods.tmp.flowerGodMaxTributes <= p.flowerGodTributes + n_sacrifices.tmp.flowerGodTributesToGet)
            d.nextFlowerGodTributeBees.innerHTML = "??? bees";
        if (n_gods.tmp.moneyGodMaxTributes <= p.capitalistGodTributes + n_sacrifices.tmp.capitalistGodTributesToGet)
            d.nextCapitalistGodTributeBees.innerHTML = "??? bees";
        // tributes to get
        /*prettier-ignore*/ d.pollenGodTributesToGet.innerHTML = "" + n_sacrifices.tmp.pollenGodTributesToGet + " tribute" + (n_sacrifices.tmp.pollenGodTributesToGet == 1 ? '' : 's');
        /*prettier-ignore*/ d.nectarGodTributesToGet.innerHTML = "" + n_sacrifices.tmp.nectarGodTributesToGet + " tribute" + (n_sacrifices.tmp.nectarGodTributesToGet == 1 ? '' : 's');
        /*prettier-ignore*/ d.honeyGodTributesToGet.innerHTML = "" + n_sacrifices.tmp.honeyGodTributesToGet + " tribute" + (n_sacrifices.tmp.honeyGodTributesToGet == 1 ? '' : 's');
        /*prettier-ignore*/ d.flowerGodTributesToGet.innerHTML = "" + n_sacrifices.tmp.flowerGodTributesToGet + " tribute" + (n_sacrifices.tmp.flowerGodTributesToGet == 1 ? '' : 's');
        /*prettier-ignore*/ d.capitalistGodTributesToGet.innerHTML = "" + n_sacrifices.tmp.capitalistGodTributesToGet + " tribute" + (n_sacrifices.tmp.capitalistGodTributesToGet == 1 ? '' : 's');
        // current tributes -> tributes after sacrifice
        /*prettier-ignore*/ d.pollenGodTributesAfterSacrifice.innerHTML = "" + `${p.pollenGodTributes} -> ${p.pollenGodTributes + n_sacrifices.tmp.pollenGodTributesToGet}`;
        /*prettier-ignore*/ d.nectarGodTributesAfterSacrifice.innerHTML = "" + `${p.nectarGodTributes} -> ${p.nectarGodTributes + n_sacrifices.tmp.nectarGodTributesToGet}`;
        /*prettier-ignore*/ d.honeyGodTributesAfterSacrifice.innerHTML = "" + `${p.honeyGodTributes} -> ${p.honeyGodTributes + n_sacrifices.tmp.honeyGodTributesToGet}`;
        /*prettier-ignore*/ d.flowerGodTributesAfterSacrifice.innerHTML = "" + `${p.flowerGodTributes} -> ${p.flowerGodTributes + n_sacrifices.tmp.flowerGodTributesToGet}`;
        /*prettier-ignore*/ d.capitalistGodTributesAfterSacrifice.innerHTML = "" + `${p.capitalistGodTributes} -> ${p.capitalistGodTributes + n_sacrifices.tmp.capitalistGodTributesToGet}`;
        // + rj tributes
        /*prettier-ignore*/ if (p.pollenGodRJTributes)
            d.pollenGodTributesAfterSacrifice.innerHTML += " + <span class='rjtext'>" + p.pollenGodRJTributes + "</span>";
        /*prettier-ignore*/ if (p.nectarGodRJTributes)
            d.nectarGodTributesAfterSacrifice.innerHTML += " + <span class='rjtext'>" + p.nectarGodRJTributes + "</span>";
        /*prettier-ignore*/ if (p.honeyGodRJTributes)
            d.honeyGodTributesAfterSacrifice.innerHTML += " + <span class='rjtext'>" + p.honeyGodRJTributes + "</span>";
        /*prettier-ignore*/ if (p.flowerGodRJTributes)
            d.flowerGodTributesAfterSacrifice.innerHTML += " + <span class='rjtext'>" + p.flowerGodRJTributes + "</span>";
        /*prettier-ignore*/ if (p.capitalistGodRJTributes)
            d.capitalistGodTributesAfterSacrifice.innerHTML += " + <span class='rjtext'>" + p.capitalistGodRJTributes + "</span>";
    };
    n_sacrifices.calc = () => {
        // god tributes effect
        n_sacrifices.tmp.pollenGodEffect = Math.pow(1.03, (p.pollenGodTributes + p.pollenGodRJTributes));
        n_sacrifices.tmp.nectarGodEffect = Math.pow(1.03, (p.nectarGodTributes + p.nectarGodRJTributes));
        n_sacrifices.tmp.honeyGodEffect = Math.pow(1.03, (p.honeyGodTributes + p.honeyGodRJTributes));
        n_sacrifices.tmp.flowerGodEffect = Math.pow(1.03, (p.flowerGodTributes + p.flowerGodRJTributes));
        n_sacrifices.tmp.capitalistGodEffect = Math.pow(1.03, (p.capitalistGodTributes + p.capitalistGodRJTributes));
        // tributes to get from resources
        let frompollen = getSmallGodTribute(p.highestpollen);
        let fromnectar = getSmallGodTribute(p.highestnectar);
        let fromhoney = getSmallGodTribute(p.highesthoney);
        let fromflowers = getSmallGodTribute2(p.highestflowers);
        let frommoney = getSmallGodTribute(p.highestmoney);
        //? v ? ? ? idk
        // const getRequiredBees = (tributes: number): number => {
        //   return stepwise2(3, tributes * n_tributes.tmp.me[2]);
        // };
        // tributes to get from bees
        // TODO:!!!!!!!!!!!!!!!!!!!!
        // from resource bees
        let frombees = getNSGTBees(totalBees());
        let fpb = Math.floor(Math.min(frombees, frompollen));
        let fnb = Math.floor(Math.min(frombees, fromnectar));
        let fhb = Math.floor(Math.min(frombees, fromhoney));
        let ffb = Math.floor(Math.min(frombees, fromflowers));
        let fmb = Math.floor(Math.min(frombees, frommoney));
        //TODO put sacrifices to god in corrent positions
        n_sacrifices.tmp.pollenGodTributesToGet = Math.max(0, Math.min(frompollen, fpb) - p.pollenGodTributes);
        n_sacrifices.tmp.nectarGodTributesToGet = Math.max(0, Math.min(fromnectar, fnb) - p.nectarGodTributes);
        n_sacrifices.tmp.honeyGodTributesToGet = Math.max(0, Math.min(fromhoney, fhb) - p.honeyGodTributes);
        n_sacrifices.tmp.flowerGodTributesToGet = Math.max(0, Math.min(fromflowers, ffb) - p.flowerGodTributes);
        n_sacrifices.tmp.capitalistGodTributesToGet = Math.max(0, Math.min(frommoney, fmb) - p.capitalistGodTributes);
        let nextpt = Math.min(n_gods.tmp.pollenGodMaxTributes, p.pollenGodTributes + n_sacrifices.tmp.pollenGodTributesToGet + 1);
        let nextnt = Math.min(n_gods.tmp.nectarGodMaxTributes, p.nectarGodTributes + n_sacrifices.tmp.nectarGodTributesToGet + 1);
        let nextht = Math.min(n_gods.tmp.honeyGodMaxTributes, p.honeyGodTributes + n_sacrifices.tmp.honeyGodTributesToGet + 1);
        let nextft = Math.min(n_gods.tmp.flowerGodMaxTributes, p.flowerGodTributes + n_sacrifices.tmp.flowerGodTributesToGet + 1);
        let nextmt = Math.min(n_gods.tmp.moneyGodMaxTributes, p.capitalistGodTributes + n_sacrifices.tmp.capitalistGodTributesToGet + 1);
        /*prettier-ignore*/ n_sacrifices.tmp.pollenGodTributesToGet =
            Math.max(0, Math.min(n_gods.tmp.pollenGodMaxTributes, p.pollenGodTributes + n_sacrifices.tmp.pollenGodTributesToGet) - p.pollenGodTributes);
        /*prettier-ignore*/ n_sacrifices.tmp.nectarGodTributesToGet =
            Math.max(0, Math.min(n_gods.tmp.nectarGodMaxTributes, p.nectarGodTributes + n_sacrifices.tmp.nectarGodTributesToGet) - p.nectarGodTributes);
        /*prettier-ignore*/ n_sacrifices.tmp.honeyGodTributesToGet =
            Math.max(0, Math.min(n_gods.tmp.honeyGodMaxTributes, p.honeyGodTributes + n_sacrifices.tmp.honeyGodTributesToGet) - p.honeyGodTributes);
        /*prettier-ignore*/ n_sacrifices.tmp.flowerGodTributesToGet =
            Math.max(0, Math.min(n_gods.tmp.flowerGodMaxTributes, p.flowerGodTributes + n_sacrifices.tmp.flowerGodTributesToGet) - p.flowerGodTributes);
        /*prettier-ignore*/ n_sacrifices.tmp.capitalistGodTributesToGet =
            Math.max(0, Math.min(n_gods.tmp.moneyGodMaxTributes, p.capitalistGodTributes + n_sacrifices.tmp.capitalistGodTributesToGet) - p.capitalistGodTributes);
        // next from resource / bees
        n_sacrifices.tmp.pollenForNext = getNextsmallGodTribute(Math.max(nextpt));
        n_sacrifices.tmp.nectarForNext = getNextsmallGodTribute(Math.max(nextnt));
        n_sacrifices.tmp.honeyForNext = getNextsmallGodTribute(Math.max(nextht));
        n_sacrifices.tmp.flowersForNext = getNextsmallGodTribute2(Math.max(nextft));
        n_sacrifices.tmp.moneyForNext = getNextsmallGodTribute(Math.max(nextmt));
        n_sacrifices.tmp.pollenBeesForNext = getSGTBees(nextpt);
        n_sacrifices.tmp.nectarBeesForNext = getSGTBees(nextnt);
        n_sacrifices.tmp.honeyBeesForNext = getSGTBees(nextht);
        n_sacrifices.tmp.flowersBeesForNext = getSGTBees(nextft);
        n_sacrifices.tmp.moneyBeesForNext = getSGTBees(nextmt);
        // disable buttons
        if (n_sacrifices.tmp.pollenGodTributesToGet > 0)
            d.sacrificeToPollenGod.disabled = false;
        else
            d.sacrificeToPollenGod.disabled = true;
        if (n_sacrifices.tmp.nectarGodTributesToGet > 0)
            d.sacrificeToNectarGod.disabled = false;
        else
            d.sacrificeToNectarGod.disabled = true;
        if (n_sacrifices.tmp.honeyGodTributesToGet > 0)
            d.sacrificeToHoneyGod.disabled = false;
        else
            d.sacrificeToHoneyGod.disabled = true;
        if (n_sacrifices.tmp.flowerGodTributesToGet > 0)
            d.sacrificeToFlowerGod.disabled = false;
        else
            d.sacrificeToFlowerGod.disabled = true;
        if (n_sacrifices.tmp.capitalistGodTributesToGet > 0)
            d.sacrificeToCapitalistGod.disabled = false;
        else
            d.sacrificeToCapitalistGod.disabled = true;
    };
})(n_sacrifices || (n_sacrifices = {}));
var n_tributes;
(function (n_tributes) {
    /*prettier-ignore*/
    n_tributes.def = [
        1, 1, 1, 0, 1,
        1, 1, 1, 1, 0,
        0, 0, 0, 0, 0,
    ];
    n_tributes.formula = [
        (x = n_tributes.tmp.totalTributes * n_tributes.tmp.me[5]) => Math.pow(1.02, (x / 2)),
        (x = n_tributes.tmp.totalTributes * n_tributes.tmp.me[5]) => Math.pow(1.02, (x / 2)),
        (x = n_tributes.tmp.totalTributes * n_tributes.tmp.me[5]) => Math.pow(1.02, (x / 2)),
        (x = n_tributes.tmp.totalTributes * n_tributes.tmp.me[5]) => x / 5,
        (x = n_tributes.tmp.totalTributes * n_tributes.tmp.me[5]) => Math.pow(1.02, x),
        (x = n_tributes.tmp.totalTributes * n_tributes.tmp.me[5]) => Math.min(2, Math.pow(1.02, (x / 10))),
        (x = n_tributes.tmp.totalTributes * n_tributes.tmp.me[5]) => Math.pow(1.02, (x / 2)),
        (x = n_tributes.tmp.totalTributes * n_tributes.tmp.me[5]) => Math.pow(1.02, (x / 3)),
        (x = n_tributes.tmp.totalTributes * n_tributes.tmp.me[5]) => Math.pow(1.02, (x / 5)),
        () => 1,
        () => 1,
        () => 1,
        () => 1,
        () => 1,
        () => 1, // 14 challenges
    ];
    n_tributes.getText = [
        () => `${format(n_tributes.tmp.me[0])}x`,
        () => `${format(n_tributes.tmp.me[1])}x`,
        () => `${format(n_tributes.tmp.me[2])}x`,
        () => `+${format(n_tributes.tmp.me[3])}`,
        () => `${format(n_tributes.tmp.me[4])}x`,
        () => (n_tributes.tmp.me[5] == 2 ? "2.00x (capped)" : `${format(n_tributes.tmp.me[5])}x`),
        () => `${format(n_tributes.tmp.me[6])}x`,
        () => `${format(n_tributes.tmp.me[7])}x`,
        () => `${format(n_tributes.tmp.me[8])}x`,
        () => "unlocked",
        () => "unlocked",
        () => "unlocked",
        () => "unlocked",
        () => "unlocked",
        () => "current end of content", // 14 challenges
    ];
    n_tributes.tmp = {
        sacrificeTributes: 0,
        RJTributes: 0,
        totalTributes: 0,
        me: n_tributes.def,
    };
    n_tributes.text = () => {
        var _a, _b;
        // todo make it show that rj or combining gods is unlocked without it meeting required tributes
        // total tributes
        d.totalTributes.innerHTML = `${n_tributes.tmp.sacrificeTributes}`;
        if (n_tributes.tmp.me[5] > 1)
            d.totalTributes.innerHTML += ` + <span class="lighttext">${ft2((n_tributes.tmp.totalTributes - n_tributes.tmp.RJTributes) * n_tributes.tmp.me[5] - (n_tributes.tmp.totalTributes - n_tributes.tmp.RJTributes))}</span>`;
        if (p.RJTributes > 0)
            d.totalTributes.innerHTML += ` + <span class="rjtext">${p.RJTributes}</span>`;
        // tributes unlock
        for (let i = 0; i < tributes.length; i++)
            if (n_tributes.tmp.totalTributes < tributes[i].unlockAt)
                d[`m${i}e`].innerHTML = "";
            else
                d[`m${i}e`].innerHTML = n_tributes.getText[i]();
        // cool tree
        for (let i = 0; i < tributes.length; i++) {
            if (tributes[i].unlockAt < n_tributes.tmp.totalTributes && i != tributes.length) {
                d.m[i].innerHTML = "├";
            }
            else {
                d.m[i].innerHTML = " ";
            }
            if (i != 0 && ((_a = tributes[i]) === null || _a === void 0 ? void 0 : _a.unlockAt) > n_tributes.tmp.totalTributes && ((_b = tributes[i - 1]) === null || _b === void 0 ? void 0 : _b.unlockAt) <= n_tributes.tmp.totalTributes)
                d.m[i - 1].innerHTML = "└";
        }
        if (tributes[tributes.length - 1].unlockAt <= n_tributes.tmp.totalTributes)
            d.m[tributes.length - 1].innerHTML = "└";
    };
    n_tributes.calc = () => {
        n_tributes.tmp.sacrificeTributes = getTotalSacrificeTributes();
        n_tributes.tmp.RJTributes = getTotalRJTributes();
        n_tributes.tmp.totalTributes = n_tributes.tmp.sacrificeTributes + n_tributes.tmp.RJTributes;
        let tr = n_tributes.tmp.totalTributes * n_tributes.tmp.me[5];
        for (let i = 0; i < 15; i++) {
            if (n_tributes.tmp.totalTributes < tributes[i].unlockAt)
                n_tributes.tmp.me[i] = n_tributes.def[i];
            else
                n_tributes.tmp.me[i] = n_tributes.formula[i](tr);
        }
    };
})(n_tributes || (n_tributes = {}));
var n_jelly;
(function (n_jelly) {
    n_jelly.tmp = {
        RJBonus: 1,
        totalRJBonus: 1,
        tmpunusedRJTributes: 0,
        tmpRJpollenGodTributes: 0,
        tmpRJnectarGodTributes: 0,
        tmpRJhoneyGodTributes: 0,
        tmpRJflowerGodTributes: 0,
        tmpRJcapitalistGodTributes: 0,
        RJflowerFieldsCost: 0,
        RJbeesCost: 0,
        RJhivesCost: 0,
        maxtributesToBuy: 0,
        maxtributesPrice: 0,
        tributeCos: 0,
        RJToGet: 0,
    };
    n_jelly.display = () => {
        if (p.unusedRJTributes > 0 || n_jelly.tmp.tmpunusedRJTributes > 0)
            d.addpollenGodTribute.disabled = false;
        else
            d.addpollenGodTribute.disabled = true;
        if (p.unusedRJTributes > 0 || n_jelly.tmp.tmpunusedRJTributes > 0)
            d.addnectarGodTribute.disabled = false;
        else
            d.addnectarGodTribute.disabled = true;
        if (p.unusedRJTributes > 0 || n_jelly.tmp.tmpunusedRJTributes > 0)
            d.addhoneyGodTribute.disabled = false;
        else
            d.addhoneyGodTribute.disabled = true;
        if (p.unusedRJTributes > 0 || n_jelly.tmp.tmpunusedRJTributes > 0)
            d.addflowerGodTribute.disabled = false;
        else
            d.addflowerGodTribute.disabled = true;
        if (p.unusedRJTributes > 0 || n_jelly.tmp.tmpunusedRJTributes > 0)
            d.addcapitalistGodTribute.disabled = false;
        else
            d.addcapitalistGodTribute.disabled = true;
        if (p.pollenGodRJTributes > 0 || n_jelly.tmp.tmpRJpollenGodTributes > 0)
            d.removepollenGodTribute.disabled = false;
        else
            d.removepollenGodTribute.disabled = true;
        if (p.nectarGodRJTributes > 0 || n_jelly.tmp.tmpRJnectarGodTributes > 0)
            d.removenectarGodTribute.disabled = false;
        else
            d.removenectarGodTribute.disabled = true;
        if (p.honeyGodRJTributes > 0 || n_jelly.tmp.tmpRJhoneyGodTributes > 0)
            d.removehoneyGodTribute.disabled = false;
        else
            d.removehoneyGodTribute.disabled = true;
        if (p.flowerGodRJTributes > 0 || n_jelly.tmp.tmpRJflowerGodTributes > 0)
            d.removeflowerGodTribute.disabled = false;
        else
            d.removeflowerGodTribute.disabled = true;
        if (p.capitalistGodRJTributes > 0 || n_jelly.tmp.tmpRJcapitalistGodTributes > 0)
            d.removecapitalistGodTribute.disabled = false;
        else
            d.removecapitalistGodTribute.disabled = true;
    };
    n_jelly.text = () => {
        // rj to get
        d.RJToGet.innerHTML = format(n_jelly.tmp.RJToGet, 1);
        // first rj reset highlight
        if (p.totalExchanges > 0)
            d.RJExchangeResets.classList.add("lighttext");
        else
            d.RJExchangeResets.classList.remove("lighttext");
        // total resoruces
        d.totalpollen.innerHTML = format(p.totalpollen);
        d.totalnectar.innerHTML = format(p.totalnectar);
        d.totalhoney.innerHTML = format(p.totalhoney);
        d.totalflowers.innerHTML = format(p.totalflowers);
        d.totalmoney.innerHTML = format(p.totalmoney);
        // RJ / boosts
        d.RJ.innerHTML = format(p.RJ);
        d.RJtotal.innerHTML = format(p.totalRJ);
        d.RJBoost.innerHTML = "x" + format(n_jelly.tmp.RJBonus);
        d.RJtotalBoost.innerHTML = "x" + format(n_jelly.tmp.totalRJBonus);
        d.RJpollenGodTributes.innerHTML = "" + p.pollenGodRJTributes;
        d.RJnectarGodTributes.innerHTML = "" + p.nectarGodRJTributes;
        d.RJhoneyGodTributes.innerHTML = "" + p.honeyGodRJTributes;
        d.RJflowerGodTributes.innerHTML = "" + p.flowerGodRJTributes;
        d.RJcapitalistGodTributes.innerHTML = "" + p.capitalistGodRJTributes;
        // autobuyers
        if (p.autobuy.structures.on) {
            d.autoflowerBuy.disabled = false;
            d.autobeeBuy.disabled = false;
            d.autohiveBuy.disabled = false;
            d.quickautoflowerBuy.disabled = false;
            d.quickautobeeBuy.disabled = false;
            d.quickautohiveBuy.disabled = false;
        }
        else {
            d.autoflowerBuy.disabled = true;
            d.autobeeBuy.disabled = true;
            d.autohiveBuy.disabled = true;
            d.quickautoflowerBuy.disabled = true;
            d.quickautobeeBuy.disabled = true;
            d.quickautohiveBuy.disabled = true;
        }
        d.quickautoflowerBuy.checked = p.autobuy.structures.flowerBuy;
        d.autoflowerBuy.checked = p.autobuy.structures.flowerBuy;
        d.quickautobeeBuy.checked = p.autobuy.structures.beeBuy;
        d.autobeeBuy.checked = p.autobuy.structures.beeBuy;
        d.quickautohiveBuy.checked = p.autobuy.structures.hiveBuy;
        d.autohiveBuy.checked = p.autobuy.structures.hiveBuy;
        // rj structures
        if (p.RJTributes >= 30) {
            d.buyTribute.disabled = true;
            d.buyMaxTribute.disabled = true;
            d.buyMaxTributeAmount.innerHTML = "?";
            d.buyMaxTributeS.innerHTML = "s";
            d.buyMaxTributePrice.innerHTML = "?";
            d.tributePrice.innerHTML = "?";
        }
        else {
            d.buyTribute.disabled = false;
            d.buyMaxTribute.disabled = false;
            d.buyMaxTributeAmount.innerHTML = format(n_jelly.tmp.maxtributesToBuy, -3);
            d.buyMaxTributeS.innerHTML = n_jelly.tmp.maxtributesToBuy == 1 ? "" : "s";
            d.buyMaxTributePrice.innerHTML = format(n_jelly.tmp.maxtributesPrice);
            d.tributePrice.innerHTML = format(n_jelly.tmp.tributeCos);
        }
        d.RJflowerFields.innerHTML = "" + format(p.RJflowerFields, -3);
        d.RJbees.innerHTML = "" + format(p.RJbees, -3);
        d.RJhives.innerHTML = "" + format(p.RJhives, -3);
        // tributes
        d.RJTributes.innerHTML = "" + p.unusedRJTributes;
        //prettier-ignore
        if (n_jelly.tmp.tmpunusedRJTributes == n_jelly.tmp.tmpRJpollenGodTributes + n_jelly.tmp.tmpRJnectarGodTributes + n_jelly.tmp.tmpRJhoneyGodTributes + n_jelly.tmp.tmpRJflowerGodTributes + n_jelly.tmp.tmpRJcapitalistGodTributes) {
            d.exchangeToApplyChanges.style.display = "none";
        }
        else {
            d.exchangeToApplyChanges.style.display = "";
        }
        d.totalRJTributes.innerHTML = "" + p.RJTributes;
        // assigning rj tributes
        d.tmpunusedRJTributes.innerHTML = " -> " + n_jelly.tmp.tmpunusedRJTributes + "/30";
        if (n_jelly.tmp.tmpunusedRJTributes == 0)
            d.tmpunusedRJTributes.style.display = "none";
        else
            d.tmpunusedRJTributes.style.display = "";
        if (n_jelly.tmp.tmpRJpollenGodTributes == 0)
            d.tmpRJpollenGodTributes.innerHTML = "";
        else
            d.tmpRJpollenGodTributes.innerHTML = " -> " + (p.pollenGodRJTributes + n_jelly.tmp.tmpRJpollenGodTributes);
        if (n_jelly.tmp.tmpRJnectarGodTributes == 0)
            d.tmpRJnectarGodTributes.innerHTML = "";
        else
            d.tmpRJnectarGodTributes.innerHTML = " -> " + (p.nectarGodRJTributes + n_jelly.tmp.tmpRJnectarGodTributes);
        if (n_jelly.tmp.tmpRJhoneyGodTributes == 0)
            d.tmpRJhoneyGodTributes.innerHTML = "";
        else
            d.tmpRJhoneyGodTributes.innerHTML = " -> " + (p.honeyGodRJTributes + n_jelly.tmp.tmpRJhoneyGodTributes);
        if (n_jelly.tmp.tmpRJflowerGodTributes == 0)
            d.tmpRJflowerGodTributes.innerHTML = "";
        else
            d.tmpRJflowerGodTributes.innerHTML = " -> " + (p.flowerGodRJTributes + n_jelly.tmp.tmpRJflowerGodTributes);
        if (n_jelly.tmp.tmpRJcapitalistGodTributes == 0)
            d.tmpRJcapitalistGodTributes.innerHTML = "";
        else
            d.tmpRJcapitalistGodTributes.innerHTML = " -> " + (p.capitalistGodRJTributes + n_jelly.tmp.tmpRJcapitalistGodTributes);
        if (p.RJ < n_jelly.tmp.RJflowerFieldsCost)
            d.RJbuyflowerFields.disabled = true;
        else
            d.RJbuyflowerFields.disabled = false;
        if (p.RJ < n_jelly.tmp.RJbeesCost)
            d.RJbuybees.disabled = true;
        else
            d.RJbuybees.disabled = false;
        if (p.RJ < n_jelly.tmp.RJhivesCost)
            d.RJbuyhives.disabled = true;
        else
            d.RJbuyhives.disabled = false;
        d.RJfrombuyflowerFields.innerHTML = format(n_jelly.tmp.RJflowerFieldsCost);
        d.RJfrombuyhives.innerHTML = format(n_jelly.tmp.RJhivesCost);
        d.RJfrombuybees.innerHTML = format(n_jelly.tmp.RJbeesCost);
    };
    n_jelly.calc = () => {
        n_jelly.tmp.RJToGet = RJToGet();
        n_jelly.tmp.RJBonus = getRJBonus(p.RJ);
        n_jelly.tmp.totalRJBonus = getTotalRJBonus(p.totalRJ);
        p.highestRJ = Math.max(p.RJ, p.highestRJ);
        RJTributeCost.level = p.RJTributes;
        n_jelly.tmp.RJflowerFieldsCost = structurePrice(p.RJflowerFields);
        n_jelly.tmp.RJbeesCost = structurePrice(p.RJbees);
        n_jelly.tmp.RJhivesCost = structurePrice(p.RJhives);
        [n_jelly.tmp.maxtributesToBuy, n_jelly.tmp.maxtributesPrice] = RJTributeCost.maxFunction(p.RJ);
        n_jelly.tmp.tributeCos = RJTributeCost.costFunction();
    };
})(n_jelly || (n_jelly = {}));
var n_stats;
(function (n_stats) {
    n_stats.tmp = {
        RJFromtotalflowers: 0,
        RJFromtotalpollen: 0,
        RJFromtotalnectar: 0,
        RJFromtotalhoney: 0,
        RJFromtotalmoney: 0,
    };
    n_stats.calc = () => {
        n_stats.tmp.RJFromtotalflowers = Math.log10(Math.max(1, p.totalflowers));
        n_stats.tmp.RJFromtotalpollen = Math.log10(Math.max(1, p.totalpollen));
        n_stats.tmp.RJFromtotalnectar = Math.log10(Math.max(1, p.totalnectar));
        n_stats.tmp.RJFromtotalhoney = Math.log10(Math.max(1, p.totalhoney));
        n_stats.tmp.RJFromtotalmoney = Math.log10(Math.max(1, p.totalmoney));
    };
    n_stats.text = () => {
        d.RJfromflowers.innerHTML = format(n_stats.tmp.RJFromtotalflowers, 1) + " RJ";
        d.RJfrompollen.innerHTML = format(n_stats.tmp.RJFromtotalpollen, 1) + " RJ";
        d.RJfromnectar.innerHTML = format(n_stats.tmp.RJFromtotalnectar, 1) + " RJ";
        d.RJfromhoney.innerHTML = format(n_stats.tmp.RJFromtotalhoney, 1) + " RJ";
        d.RJfrommoney.innerHTML = format(n_stats.tmp.RJFromtotalmoney, 1) + " RJ";
        if (p.lastRJfromflowers + p.lastRJfrompollen + p.lastRJfromnectar + p.lastRJfromhoney + p.lastRJfrommoney) {
            d.RJlastReset.style.display = "";
            d.lastRJfromflowers.innerHTML = "" + format(p.lastRJfromflowers, 1) + " RJ";
            d.lastRJfrompollen.innerHTML = "" + format(p.lastRJfrompollen, 1) + " RJ";
            d.lastRJfromnectar.innerHTML = "" + format(p.lastRJfromnectar, 1) + " RJ";
            d.lastRJfromhoney.innerHTML = "" + format(p.lastRJfromhoney, 1) + " RJ";
            d.lastRJfrommoney.innerHTML = "" + format(p.lastRJfrommoney, 1) + " RJ";
        }
        else {
            d.RJlastReset.style.display = "none";
            d.lastRJfromflowers.innerHTML = "";
            d.lastRJfrompollen.innerHTML = "";
            d.lastRJfromnectar.innerHTML = "";
            d.lastRJfromhoney.innerHTML = "";
            d.lastRJfrommoney.innerHTML = "";
        }
        d.flowerConsumptionStat.innerHTML = getPSWithS("flower", getForagerBeeConsumption());
        d.nectarConsumptionStat.innerHTML = getPS("nectar", getHoneyProduction(1) / (p.nge ? 2 : 1));
        d.honeyWorthStat.innerHTML = format(getHoneyWorth());
        d.flowerPSStat.innerHTML = getPSWithS("flower", getFlowerProduction(1));
        d.pollenPSStat.innerHTML = getPS("pollen", getPollenProduction(1));
        d.nectarPSStat.innerHTML = getPS("nectar", getNectarProduction(1));
        d.honeyPSStat.innerHTML = getPS("honey", getHoneyProduction(1));
        d.beehiveSpaceEffectStat.innerHTML = `${format(0.2 * Math.pow(1.03, (p.capitalistGodTributes * n_tributes.tmp.me[5])))}`;
        d.beeSpaceEffectStat.innerHTML = `${format(1 * Math.pow(1.03, (p.capitalistGodTributes * n_tributes.tmp.me[5])))}`;
        d.beehiveSpaceEffectStatS.innerHTML = `${format(0.2 * Math.pow(1.03, (p.capitalistGodTributes * n_tributes.tmp.me[5]))) == "1.00" ? "" : "s"}`;
        d.beeSpaceEffectStatS.innerHTML = `${format(1 * Math.pow(1.03, (p.capitalistGodTributes * n_tributes.tmp.me[5]))) == "1.00" ? "" : "s"}`;
        d.pernamentTributeEffects.innerHTML = `${p.pge ? "✓" : "✗"} pollen: 2x pollen production<br>
    ${p.nge ? "✓" : "✗"} nectar: 2x honey production<br>
    ${p.hge ? "✓" : "✗"} honey: bees amount isn't rounded down & more ways to assign bees<br>
    ${p.fge ? "✓" : "✗"} flowers: lets you sell honey (requires at least 0.1 honey)<br>
    ${p.cge ? "✓" : "✗"} capitalist: worker spaces aren't rounded down`;
    };
})(n_stats || (n_stats = {}));
var n_gods;
(function (n_gods) {
    n_gods.tmp = {
        pollenGodMaxTributes: 20,
        nectarGodMaxTributes: 20,
        honeyGodMaxTributes: 20,
        flowerGodMaxTributes: 20,
        moneyGodMaxTributes: 20,
        godsToCombine: [],
        combinedGods: {
            flower: [],
            pollen: [],
            nectar: [],
            honey: [],
            money: [],
        },
        connections: [],
        cursor: 0,
        gods: ["pollen", "nectar", "flower", "honey", "money"],
        gods2: { pollen: "PG", nectar: "NG", flower: "FG", honey: "HG", money: "CG" },
    };
    n_gods.calc = (diff) => {
        n_gods.tmp.cursor += diff;
        // set god caps
        n_gods.tmp.connections.forEach((a) => {
            a.map((b, _, ar) => { var _a; return (n_gods.tmp[`${b}GodMaxTributes`] = 20 + ((_a = ar.length * 2) !== null && _a !== void 0 ? _a : 0)); });
        });
    };
    n_gods.text = () => {
        // TODO: add on reset or on sacrifice etc
        let totalCombinations = n_tributes.tmp.me[10] + n_tributes.tmp.me[11] + n_tributes.tmp.me[12] + n_tributes.tmp.me[13];
        let usedCombinations = n_gods.tmp.connections.length
            ? n_gods.tmp.connections.map((a) => a.length).reduce((a, b) => a + b) - n_gods.tmp.connections.length
            : 0;
        if (totalCombinations - usedCombinations <= 0)
            d.combinationsLeft.style.display = "none";
        else
            d.combinationsLeft.style.display = "";
        d.combinationsLeft.innerHTML = "" + (totalCombinations - usedCombinations) + " left";
        if (n_gods.tmp.godsToCombine.length == 2)
            d.combineConfirm.style.display = "";
        else
            d.combineConfirm.style.display = "none";
        n_gods.tmp.gods.forEach((god) => {
            if (n_gods.tmp.godsToCombine[0] == god)
                d[`combine${god}Button`].disabled = true;
            else
                d[`combine${god}Button`].disabled = false;
        });
        n_gods.tmp.gods.forEach((god) => {
            if (n_gods.tmp.godsToCombine[1] == god)
                d[`combine${god}Button`].disabled = true;
        });
        if (n_gods.tmp.godsToCombine[0])
            n_gods.tmp.combinedGods[n_gods.tmp.godsToCombine[0]].forEach((god) => {
                d[`combine${god}Button`].disabled = true;
            });
        d.combinedGods.innerHTML = n_gods.tmp.connections
            .map((a) => a.map((b) => n_gods.tmp.gods2[b]).join("x") + ` (+${a.length * 2} tribute cap)`)
            .join(" ");
        if (totalCombinations - usedCombinations <= 0 || p.combinedGods.length >= n_gods.tmp.gods.length - 1) {
            d.combinepollenButton.disabled = true;
            d.combinenectarButton.disabled = true;
            d.combineflowerButton.disabled = true;
            d.combinehoneyButton.disabled = true;
            d.combinemoneyButton.disabled = true;
        }
        if (n_gods.tmp.godsToCombine[0]) {
            d.combineA.innerHTML = (n_gods.tmp.godsToCombine[0] == "money" ? "Capitalist" : toTitleCase(n_gods.tmp.godsToCombine[0])) + " God";
            d.combineWith.style.visibility = "visible";
        }
        else {
            d.combineWith.style.visibility = "hidden";
        }
        if (n_gods.tmp.godsToCombine[1])
            d.combineB.innerHTML = (n_gods.tmp.godsToCombine[1] == "money" ? "Capitalist" : toTitleCase(n_gods.tmp.godsToCombine[1])) + " God?";
        else {
            d.combineB.innerHTML = n_gods.tmp.cursor % 1.8 > 0.9 ? "_" : "";
        }
    };
})(n_gods || (n_gods = {}));
const GameLoop = () => {
    if(totalBees()==0 && p.honey < getBeePrice()) p.honey=getBeePrice()
    var _a;
    let now = Date.now();
    let diff = ((now - p.lastUpdate) / 1000) * gameSpeed;
    updateTmp();
    //prettier-ignore
    // eyJmbG93ZXJzIjo1NTcuNTMwMjcyMTU3NTAxNCwicG9sbGVuIjoxMy4xMzg1Nzg1MzIyMzcyLCJuZWN0YXIiOjIuNzM0MzU2OTI3ODQ0MTQwNiwiaG9uZXkiOjIuOTMyMTEyNDkxODQ1ODgxLCJtb25leSI6MC43MzI4NTg5NTczMzIwNTUyLCJoaWdoZXN0Zmxvd2VycyI6NTU4Ljk3MjQ1Nzk5MTEyNTEsImhpZ2hlc3Rwb2xsZW4iOjEzLjEzODU3ODUzMjIzNzIsImhpZ2hlc3RuZWN0YXIiOjIuNzM0MzU2OTI3ODQ0MTQwNiwiaGlnaGVzdGhvbmV5IjozLjYwOTAxMTMzNDU0NjYxNCwiaGlnaGVzdG1vbmV5IjowLjczMjg1ODk1NzMzMjA1NTIsInRvdGFsZmxvd2VycyI6OTY3OS41MTAwNDIzNTQ4MzcsInRvdGFscG9sbGVuIjoxNTU1Ljg3ODEwNjQ3MzgxOTYsInRvdGFsbmVjdGFyIjoxNTgyLjEwMDM1MDg3MDUyNywidG90YWxob25leSI6NjgzLjg0NTAzOTY3Nzc5MTgsInRvdGFsbW9uZXkiOjI0ODkuMDk3NDk4MDYwMTU4LCJiZWVzIjo0LCJmcmVlQmVlcyI6MCwiZm9yYWdlckJlZXMiOjUuMDc3MDQxMzc3MjI5MDE0LCJob25leUJlZXMiOjQuMjcsImZsb3dlckZpZWxkcyI6MSwiaGl2ZXMiOjEsInRvdGFsU2FjcmlmaWNlcyI6MCwicG9sbGVuR29kVHJpYnV0ZXMiOjQsIm5lY3RhckdvZFRyaWJ1dGVzIjoyLCJob25leUdvZFRyaWJ1dGVzIjo3LCJmbG93ZXJHb2RUcmlidXRlcyI6MSwiY2FwaXRhbGlzdEdvZFRyaWJ1dGVzIjo0LCJhdXRvQXNpZ25CZWVzVG8iOlsiZm9yYWdlciIsImhvbmV5Il0sInBnZSI6dHJ1ZSwibmdlIjp0cnVlLCJoZ2UiOnRydWUsImZnZSI6dHJ1ZSwiY2dlIjp0cnVlLCJzZWxsaW5nSG9uZXkiOmZhbHNlLCJhdXRvc2F2ZXMiOmZhbHNlLCJ1bmxvY2tzIjp7ImJlZXMiOnRydWUsImZvcmFnZXJCZWVzIjp0cnVlLCJoaXZlIjp0cnVlLCJob25leUJlZXMiOnRydWUsInNhY3JpZmljaW5nIjp0cnVlLCJ0cmlidXRlcyI6dHJ1ZSwiamVsbHkiOmZhbHNlLCJqZWxseTIiOmZhbHNlfSwibGFzdFVwZGF0ZSI6MTY2NjkwNjc0Mzk1MSwib2ZmbGluZVRpbWUiOjEwOC4zNjU5OTk5OTk5NDY4NywiUkoiOjAsImhpZ2hlc3RSSiI6MCwidG90YWxSSiI6MCwiUkpiZWVzIjowLCJSSmZsb3dlckZpZWxkcyI6MCwiUkpoaXZlcyI6MCwiUkpUcmlidXRlcyI6MCwidW51c2VkUkpUcmlidXRlcyI6MCwicG9sbGVuR29kUkpUcmlidXRlcyI6MCwibmVjdGFyR29kUkpUcmlidXRlcyI6MCwiaG9uZXlHb2RSSlRyaWJ1dGVzIjowLCJmbG93ZXJHb2RSSlRyaWJ1dGVzIjowLCJjYXBpdGFsaXN0R29kUkpUcmlidXRlcyI6MCwidGFiIjoic2V0dGluZ3MiLCJkYXJrbW9kZSI6dHJ1ZSwiYmlnQnV0dG9ucyI6ZmFsc2UsImRpc3BsYXlFdmVyeXRoaW5nIjpmYWxzZSwiZXhjaGFuZ2VDb25maXJtYXRpb24iOnRydWUsImljb25Nb3ZlIjpmYWxzZX0=
    // use it and add x or + to me
    // TODO: add pentagram like - connection for connected god
    // pentagram and u can chose which gods u want to connect
    // can be in form of buttons for now // idk about all this
    beeCost.level = p.bees;
    beeCost.offset = getBeePriceMult();
    hiveCost.level = p.hives;
    hiveCost.offset = getHivePriceMult();
    flowerFieldCost.level = p.flowerFields;
    flowerFieldCost.offset = getFlowerFieldPriceMult();
    diff = (_a = updateOfflineTicks(diff)) !== null && _a !== void 0 ? _a : 0;
    n_gods.calc(diff);
    n_jelly.calc();
    n_tributes.calc();
    n_sacrifices.calc();
    n_structures.calc();
    n_resources.calc(diff);
    n_stats.calc();
    n_structures.autobuy();
    if (p.tab == "gods")
        n_gods.text();
    if (p.tab == "jelly")
        n_jelly.text();
    if (p.tab == "main") {
        n_tributes.text();
        n_sacrifices.text();
        n_structures.display();
        n_structures.text();
        n_resources.text();
    }
    if (p.tab == "statshelp")
        n_stats.text();
    updateUnlocks();
    updateDisplay();
    p.lastUpdate = now;
};

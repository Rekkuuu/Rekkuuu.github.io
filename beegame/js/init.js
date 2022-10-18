"use strict";
let loop;
let saveLoop;
let iconMoveLoop;
let leftIcon = true;
let lgmax = "20 (lower god cap)";
let lgmaxnumber = 20;
let flowerFieldCost;
let beeCost;
let hiveCost;
let RJTributeCost;
const init = () => {
    loop = setInterval(GameLoop, 30);
    load();
    flowerFieldCost = new Linear.Cost(c, p.flowerFields, getFlowerFieldPriceMult(), -1);
    beeCost = new Linear.Cost(c, p.bees, getBeePriceMult(), 0);
    hiveCost = new Linear.Cost(c, p.hives, getHivePriceMult(), 0);
    RJTributeCost = new Linear.Cost(c, p.RJTributes);
    d.toggleDarkmode.checked = p.darkmode;
    d.toggleBigButtons.checked = p.bigButtons;
    d.disaplyeverything.checked = p.displayEverything;
    d.toggleHarderTributes.checked = p.harderTributes;
    d.autosaves.checked = p.autosaves;
    d.exchangeConfirmation.checked = p.exchangeConfirmation;
    d.offlineTicksSpeed2.checked = false;
    d.offlineTicksSpeed5.checked = false;
    d.offlineTicksSpeed10.checked = false;
    e_switchTab1(p.tab);
    tmp.maxHoneyBees = getMaxForagerBees();
    tmp.maxForagerBees = getMaxHoneyBees();
    tmp.totalTributes = totalTributes();
    for (let i = 0; i < tributeMilestones.length; i++) {
        if (tributeMilestones[i] < totalTributes()) {
            d.m[i].innerHTML = "├";
        }
        else {
            d.m[i].innerHTML = " ";
        }
        if (i)
            if (tributeMilestones[i] > totalTributes() && tributeMilestones[i - 1] < totalTributes())
                d.m[i - 1].innerHTML = "└";
    }
    // d.honeyCheckBox.checked = !!p.sellingHoney;
    p.sellingHoney = false; // todo: make it a setting later
    if (p.autosaves)
        saveLoop = setInterval(save, 10000);
    d.autosaves.checked = p.autosaves;
    if (p.iconMove)
        iconMoveLoop = setInterval(moveIcon, 1000);
    d.iconMove.checked = p.iconMove;
};
const moveIcon = () => {
    leftIcon = !leftIcon;
    d["favicon"].setAttribute("href", leftIcon ? "faviconleft.ico" : "faviconright.ico");
};
init();
const toggleIconMove = () => {
    p.iconMove = !p.iconMove;
    d.iconMove.checked = !!p.iconMove;
    if (p.iconMove) {
        clearInterval(iconMoveLoop);
        iconMoveLoop = setInterval(moveIcon, 1000);
    }
    else {
        clearInterval(iconMoveLoop);
    }
    console.log(`move icon ${p.autosaves ? "on" : "off"}`);
};
d.iconMove.addEventListener("click", toggleIconMove);

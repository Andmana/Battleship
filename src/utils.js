const villains = {
    winningLines: [
        "All your efforts... for nothing.",
        "You're too weak to stop me now.",
        "Did you really think you could outsmart me?",
        "I told you, you'd regret opposing me.",
    ],

    lossingLines: [
        "You’ve only delayed the inevitable.",
        "Enjoy your triumph while you can… it will be short-lived.",
        "You think you've won? This is only a setback.",
        "You think you've seen the last of me? You're dreaming.",
    ],

    getHitLines: [
        "A little punch won’t stop me!",
        "You’ll regret making me bleed.",
        "Is that all you've got?!",
        "You dare strike me?!",
    ],

    noDamageLines: [
        "I barely felt that. Try harder!",
        "How cute. You think you can harm me?",
        "I’ll give you credit for trying, but it’s futile.",
        "That didn’t even leave a mark.",
        "Pathetic. That didn’t even hurt!",
    ],

    counterLines: [
        "I will crush everything you love!",
        "Take this, and feel my power!",
        "Here’s your punishment!",
        "Feel the full force of my rage!",
    ],
};

const heroes = {
    counterLines: [
        "You won't get away with this!",
        "Justice is coming for you!",
        "I’m not holding back anymore!",
        "This is for everyone who believed in me!",
    ],

    getHitLines: [
        "You won’t get away with this!",
        "You'll have to do better than that!",
        "You’ll regret that hit!",
        "I won’t give up, not now!",
    ],

    noDamageLines: [
        "You’ll have to do better than that!",
        "Is that the best you can do?",
        "Your attacks are weak. I’m not afraid of you.",
        "Pathetic. That didn’t even hurt!",
        "Is that all you’ve got? I’m still standing!",
        "I’m not so easily defeated!",
    ],
};

function getVillainWinningLine() {
    const index = Math.floor(Math.random() * villains.winningLines.length);
    return villains.winningLines[index];
}

function getVillainLosingLine() {
    const index = Math.floor(Math.random() * villains.lossingLines.length);
    return villains.lossingLines[index];
}

function getVillainGetHitLine() {
    const index = Math.floor(Math.random() * villains.getHitLines.length);
    return villains.getHitLines[index];
}

function getVillainNoDamageLine() {
    const index = Math.floor(Math.random() * villains.noDamageLines.length);
    return villains.noDamageLines[index];
}

function getVillainCounterLine() {
    const index = Math.floor(Math.random() * villains.counterLines.length);
    return villains.counterLines[index];
}

function getHeroCounterLine() {
    const index = Math.floor(Math.random() * heroes.counterLines.length);
    return heroes.counterLines[index];
}

function getHeroGetHitLine() {
    const index = Math.floor(Math.random() * heroes.getHitLines.length);
    return heroes.getHitLines[index];
}

function getHeroNoDamageLine() {
    const index = Math.floor(Math.random() * heroes.noDamageLines.length);
    return heroes.noDamageLines[index];
}

module.exports = {
    getHeroCounterLine,
    getHeroGetHitLine,
    getHeroNoDamageLine,
    getVillainCounterLine,
    getVillainGetHitLine,
    getVillainNoDamageLine,
    getVillainLosingLine,
    getVillainWinningLine,
};

const shipIcon3 = require("./assets/images/ship-3.svg");
const shipIcon4 = require("./assets/images/ship-4.svg");
const shipIcon5 = require("./assets/images/ship-5.svg");
const shipIcon2 = require("./assets/images/ship-2.svg");

const shipImages = {
    2: shipIcon2,
    3: shipIcon3,
    4: shipIcon4,
    5: shipIcon5,
};

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

    // getHitLines: [
    //     "A little punch won’t stop me!",
    //     "You’ll regret making me bleed.",
    //     "Is that all you've got?!",
    //     "You dare strike me?!",
    // ],

    // noDamageLines: [
    //     "I barely felt that. Try harder!",
    //     "How cute. You think you can harm me?",
    //     "I’ll give you credit for trying, but it’s futile.",
    //     "That didn’t even leave a mark.",
    //     "Pathetic. That didn’t even hurt!",
    // ],

    counterLines: [
        "I will crush everything you love!",
        "Take this, and feel my power!",
        "Here’s your punishment!",
        "Feel the full force of my rage!",
        "You think you can stop me? You're already too late!",
        "This world will crumble under my power!",
        "No one can save you now—prepare to meet your end!",
        "I have waited too long for this moment. Nothing will stand in my way!",
        "Your resistance is futile. It will all be over soon.",
        "I’m the nightmare you never saw coming!",
        "I will burn everything you love to the ground!",
        "You dare defy me? The consequences will be catastrophic!",
        "All your hope ends today—beginning with you!",
        "Chaos is the only thing that’s real. Welcome to the world I’m creating.",
    ],
};

const heroes = {
    counterLines: [
        "You won't get away with this!",
        "Justice is coming for you!",
        "I’m not holding back anymore!",
        "This is for everyone who believed in me!",
        "I won't let you hurt anyone. Not on my watch!",
        "You may have power, but I have something you'll never understand: hope.",
        "It’s not over yet. I’m just getting started!",
        "The light will always outshine the darkness, no matter how hard you try!",
        "You can break me, but I’ll rise every time. I’ll never give up!",
        "This ends now! You’ve gone too far, and I’m putting a stop to it!",
        "I stand for justice, and justice always prevails!",
        "I fight for the innocent. And I won't stop until you're defeated!",
        "You may be strong, but I'm stronger with the people who believe in me.",
        "Your reign of terror is over. The world will be safe again, starting with today!",
    ],

    // getHitLines: [
    //     "You won’t get away with this!",
    //     "You'll have to do better than that!",
    //     "You’ll regret that hit!",
    //     "I won’t give up, not now!",
    // ],

    // noDamageLines: [
    //     "You’ll have to do better than that!",
    //     "Is that the best you can do?",
    //     "Your attacks are weak. I’m not afraid of you.",
    //     "Pathetic. That didn’t even hurt!",
    //     "Is that all you’ve got? I’m still standing!",
    //     "I’m not so easily defeated!",
    // ],
};

function getVillainWinningLine() {
    const index = Math.floor(Math.random() * villains.winningLines.length);
    return villains.winningLines[index];
}

function getVillainLosingLine() {
    const index = Math.floor(Math.random() * villains.lossingLines.length);
    return villains.lossingLines[index];
}

function getVillainCounterLine() {
    const index = Math.floor(Math.random() * villains.counterLines.length);
    return villains.counterLines[index];
}

function getHeroCounterLine() {
    const index = Math.floor(Math.random() * heroes.counterLines.length);
    return heroes.counterLines[index];
}
// function getVillainGetHitLine() {
//     const index = Math.floor(Math.random() * villains.getHitLines.length);
//     return villains.getHitLines[index];
// }

// function getVillainNoDamageLine() {
//     const index = Math.floor(Math.random() * villains.noDamageLines.length);
//     return villains.noDamageLines[index];
// }

// function getHeroGetHitLine() {
//     const index = Math.floor(Math.random() * heroes.getHitLines.length);
//     return heroes.getHitLines[index];
// }

// function getHeroNoDamageLine() {
//     const index = Math.floor(Math.random() * heroes.noDamageLines.length);
//     return heroes.noDamageLines[index];
// }

module.exports = {
    shipImages,
    getHeroCounterLine,
    getVillainCounterLine,
    getVillainLosingLine,
    getVillainWinningLine,
    // getHeroGetHitLine,
    // getHeroNoDamageLine,
    // getVillainGetHitLine,
    // getVillainNoDamageLine,
};

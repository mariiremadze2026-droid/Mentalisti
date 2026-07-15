let currentScene = "scene1";
let lisbonMeter = 75; // 0-100

const scenes = {
    scene1: {
        title: "სცენა 1: არტურ კოულმენის სახლი",
        background: "https://picsum.photos/id/1015/1920/1080", // შეცვალე შენი სურათებით
        character: "https://picsum.photos/id/64/400/550", // ლისბონი ან ჯეინი
        speaker: "ტერეზა ლისბონი",
        dialogue: "ჯეინ, გთხოვ, ამჯერად მაინც მოიქეცი წესიერად. ადგილობრივი პოლიციის შეფ გვიყურებს.",
        choices: [
            {
                text: "„ლისბონ, მე უბრალოდ ჩაის დავლევ და გარემოს შევერწყმები.“",
                next: "scene1_observe"
            }
        ]
    },
    // აქ დავამატებთ დანარჩენ სცენებს...
};

function updateMeter() {
    const meter = document.getElementById('lisbon-meter');
    meter.style.width = `${lisbonMeter}%`;
    
    if (lisbonMeter < 30) meter.style.background = 'linear-gradient(90deg, #ff0000, #ff8800)';
}

function showScene(sceneKey) {
    const scene = scenes[sceneKey];
    if (!scene) return;

    currentScene = sceneKey;
    
    document.getElementById('scene-title').textContent = scene.title;
    document.getElementById('background').style.backgroundImage = `url('${scene.background}')`;
    document.getElementById('character').style.backgroundImage = `url('${scene.character}')`;
    document.getElementById('speaker').textContent = scene.speaker;
    document.getElementById('dialogue').textContent = scene.dialogue;

    // არჩევანი
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.onclick = () => {
            if (choice.effect) choice.effect();
            showScene(choice.next);
        };
        choicesDiv.appendChild(btn);
    });

    updateMeter();
}

// დავიწყოთ თამაში
window.onload = () => {
    showScene('scene1');
};

// მომავალი განახლებებისთვის შეგვიძლია დავამატოთ Observe მექანიკა, save system და ა.შ.

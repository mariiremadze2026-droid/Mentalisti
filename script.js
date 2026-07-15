let currentScene = "intro";
let lisbonMeter = 75;
let inventory = []; // მაგ: ["chess_king", "ring"]

const scenes = {
    intro: {
        title: "ეპიზოდი 1: წითელი ძაფები",
        background: "https://picsum.photos/id/1015/1920/1080",
        character: "",
        speaker: "ტერეზა ლისბონი",
        dialogue: "ჯეინ, გთხოვ, ამჯერად მაინც მოიქეცი წესიერად. ადგილობრივი პოლიციის შეფ გვიყურებს.",
        choices: [
            { 
                text: "„ლისბონ, მე უბრალოდ ჩაის დავლევ და გარემოს შევერწყმები. დაპირება დაპირებაა.“",
                next: "scene1_observe"
            }
        ]
    },

    scene1_observe: {
        title: "არტურ კოულმენის სახლი - დანაშაულის ადგილი",
        background: "https://picsum.photos/id/866/1920/1080",
        character: "https://picsum.photos/id/64/450/600",
        speaker: "პატრიკ ჯეინი (შენ)",
        dialogue: "მოდი, შევხედოთ... რას მეუბნება ეს ადგილი?",
        choices: [
            { text: "🔍 არტურის ცხედარი", next: "observe_body" },
            { text: "🔍 ჭადრაკის მაგიდა", next: "observe_chess" },
            { text: "🔍 საქორწინო სურათი", next: "observe_photo" },
            { text: "▶️ გავაგრძელოთ (დაკითხვა ელენორთან)", next: "eleanor_dialogue_start" }
        ]
    },

    observe_body: {
        title: "დაკვირვება: არტურის ცხედარი",
        background: "https://picsum.photos/id/866/1920/1080",
        dialogue: "მარჯვენა ხელის საჩვენებელ თითზე ქაღალდის ჭრილობებია... ის რაღაცას გამალებით ეძებდა დოკუმენტებში.",
        choices: [{ text: "← დაბრუნება", next: "scene1_observe" }]
    },

    observe_chess: {
        title: "დაკვირვება: ჭადრაკის მაგიდა",
        background: "https://picsum.photos/id/866/1920/1080",
        dialogue: "თეთრი მეფე იატაკზე გდია. პარტია დიდი ხნის დაწყებულია... რატომ მხოლოდ თეთრი მეფე?",
        choices: [{ text: "← დაბრუნება", next: "scene1_observe" }]
    },

    observe_photo: {
        title: "დაკვირვება: საქორწინო სურათი",
        background: "https://picsum.photos/id/866/1920/1080",
        dialogue: "არტურს ხელში დიდი ოქროსფერი ბეჭედი უკეთია უცნაური გრავირებით. ახლა ეს ბეჭედი აღარ არის.",
        choices: [{ text: "← დაბრუნება", next: "scene1_observe" }]
    },

    eleanor_dialogue_start: {
        title: "დაკითხვა: ელენორ კოულმენი",
        background: "https://picsum.photos/id/1005/1920/1080",
        character: "https://picsum.photos/id/201/450/600",
        speaker: "პატრიკ ჯეინი",
        dialogue: "ელენორ... რა მოუვიდა თქვენს ქმარს?",
        choices: [
            { text: "ემპათია", next: "eleanor_empathy" },
            { text: "პროვოკაცია", next: "eleanor_provoke" },
            { text: "მანიპულაცია (საუკეთესო)", next: "eleanor_manipulate" }
        ]
    },

    eleanor_empathy: {
        title: "დიალოგი ელენორთან",
        dialogue: "ძალიან ვწუხვარ თქვენი დანაკარგის გამო...",
        choices: [{ text: "გავაგრძელოთ", next: "team_phase" }],
        effect: () => { lisbonMeter += 5; }
    },

    eleanor_provoke: {
        title: "დიალოგი ელენორთან",
        dialogue: "მშვენიერი ცრემლებია, ელენორ...",
        choices: [{ text: "გავაგრძელოთ", next: "team_phase" }],
        effect: () => { lisbonMeter -= 30; }
    },

    eleanor_manipulate: {
        title: "დიალოგი ელენორთან",
        dialogue: "არტური ძალიან გულუხვი კაცი ყოფილა... სად გაქრა მისი საქორწინო ბეჭედი?",
        choices: [{ text: "გავაგრძელოთ", next: "team_phase" }],
        effect: () => { lisbonMeter += 10; inventory.push("clue_ring"); }
    },

    team_phase: {
        title: "CBI გუნდის დავალებები",
        background: "https://picsum.photos/id/133/1920/1080",
        dialogue: "რა დავალებებს მისცემ გუნდს?",
        choices: [
            { text: "ჩო — მარკუსი და ელენორი", next: "cho_result" },
            { text: "ვან პელტი — ფინანსები", next: "vanpelt_result" },
            { text: "რიგსბი — ჭადრაკის ყუთი", next: "rigsby_result" },
            { text: "▶️ კულმინაცია (ოფისი)", next: "climax" }
        ]
    },

    cho_result: {
        dialogue: "ჩო: მათი ფარული შეხვედრების სურათები ვიპოვე...",
        choices: [{ text: "გავაგრძელოთ", next: "team_phase" }]
    },

    vanpelt_result: {
        dialogue: "ვან პელტი: არტურმა 15 მილიონი გადარიცხა 'The Red Dawn'-ში...",
        choices: [{ text: "გავაგრძელოთ", next: "team_phase" }]
    },

    rigsby_result: {
        dialogue: "რიგსბი: ჭადრაკის ყუთში ბეჭედი იპოვე. შიგნით წერია: „R.J. 1998“",
        choices: [{ text: "გავაგრძელოთ", next: "team_phase" }],
        effect: () => { inventory.push("red_john_ring"); }
    },

    climax: {
        title: "კულმინაცია — CBI ოფისი",
        background: "https://picsum.photos/id/201/1920/1080",
        dialogue: "მარკუსი შემოდის... მე ვიცი ვინ ხარ შენ.",
        choices: [
            { text: "აჩვენე დეტექტივის სურათები", next: "ending" },
            { text: "აჩვენე ბეჭედი R.J. 1998", next: "ending" },
            { text: "ბლეფი: ელენორმა უკვე აღიარა", next: "ending" }
        ]
    },

    ending: {
        title: "ეპიზოდის დასასრული",
        dialogue: "მარკუსი: ის გიჟი იყო! წითელი ჯონი მას ყველაფერს წაართმევდა...",
        choices: [
            { text: "🔄 თავიდან დაწყება", next: "intro" }
        ]
    }
};

function updateMeter() {
    const meter = document.getElementById('lisbon-meter');
    meter.style.width = `${Math.max(0, Math.min(100, lisbonMeter))}%`;
}

function showScene(sceneKey) {
    const scene = scenes[sceneKey];
    if (!scene) return;

    currentScene = sceneKey;

    document.getElementById('scene-title').textContent = scene.title || "";
    document.getElementById('background').style.backgroundImage = `url('${scene.background}')`;
    
    const charDiv = document.getElementById('character');
    charDiv.style.backgroundImage = scene.character ? `url('${scene.character}')` : '';

    document.getElementById('speaker').textContent = scene.speaker || "პატრიკ ჯეინი";
    document.getElementById('dialogue').textContent = scene.dialogue;

    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    (scene.choices || []).forEach(choice => {
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

window.onload = () => {
    showScene('intro');
};

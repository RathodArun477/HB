document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const particleButton = document.getElementById('particleButton');
    const personalizeButton = document.getElementById('personalizeButton');
    const nameInput = document.getElementById('nameInput');
    const greeting = document.getElementById('greeting');
    const frontTitle = document.getElementById('front-title');
    const frontText = document.getElementById('front-text');
    const message1 = document.getElementById('message1');
    const message2 = document.getElementById('message2');
    const message3 = document.getElementById('message3');
    const signature = document.getElementById('signature');
    const emojis = document.getElementById('emojis');
    const canvas = document.getElementById('particleCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const myConfetti = confetti.create(canvas, { resize: true });

    let stage = 0;

    // Messages for each stage
    const stages = [
        {
            frontTitle: "A very special day...",
            frontText: "Click to proceed ahead🫡",
            backGreeting: "...",
            backMessages: ["As it is a special day for you...", "", ""],
            backSignature: "",
            backEmojis: ""
        },
        {
            frontTitle: "And a special surprise...",
            frontText: "Click to delve deeper.",
            backGreeting: "...",
            backMessages: ["Since this your special day...", "I created a little something!😁😁", "Click to see next part!!"],
            backSignature: "",
            backEmojis: ""
        },
        {
            frontTitle: "And a special surprise...",
            frontText: "Click to uncover more.",
            backGreeting: "...",
            backMessages: ["Hope you like it...", "If you don't like it!, For that I apologise😔", "If you do like it, Click to go further"],
            backSignature: "",
            backEmojis: ""
        },
        {
            frontTitle: "Just one more step...",
            frontText: "Click to reveal the truth!",
            backGreeting: "Happy Birthday, Bhanupriya!",
            backMessages: ["A day of thrills and chills awaits you!", "May you have unforgettable days ahead", "And I wish you a year full of joy, laughter, and unforgettable moments."],
            backSignature: "From Arun, your one and only friend.",
            backEmojis: "🖤🦇🔮"
        }
    ];

    // Fireworks effect for final stage
    function triggerFireworks() {
        const duration = 3 * 1000; // 3 seconds
        const animationEnd = Date.now() + duration;
        const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 0,
            colors: ['#ff4500', '#800080', '#ff69b4', '#ffd700', '#00CED1']
        };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // Fireworks bursts from different origins
            myConfetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                angle: randomInRange(45, 75)
            });
            myConfetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                angle: randomInRange(105, 135)
            });
        }, 250);
    }

    // Flip card and update content
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
            stage = Math.min(stage + 1, stages.length - 1);
            card.dataset.stage = stage;
            updateCardContent();
            if (stage === stages.length - 1) {
                triggerFireworks(); // Fireworks on final stage
            } else {
                myConfetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { y: 0.8 },
                    colors: ['#ff4500', '#800080', '#000'],
                    shapes: ['circle', 'square'],
                    scalar: 0.8
                });
            }
        } else {
            // Update front content for the next stage
            const nextStage = Math.min(stage + 1, stages.length - 1);
            frontTitle.textContent = stages[nextStage].frontTitle;
            frontText.textContent = stages[nextStage].frontText;
        }
    });

    // Update card content based on stage
    function updateCardContent() {
        const currentStage = stages[stage];
        greeting.textContent = currentStage.backGreeting;
        message1.textContent = currentStage.backMessages[0];
        message2.textContent = currentStage.backMessages[1];
        message3.textContent = currentStage.backMessages[2];
        signature.innerHTML = currentStage.backSignature;
        emojis.textContent = currentStage.backEmojis;
        nameInput.style.display = stage === stages.length - 1 ? 'block' : 'none';
        personalizeButton.style.display = stage === stages.length - 1 ? 'inline-block' : 'none';
        particleButton.style.display = stage === stages.length - 1 ? 'inline-block' : 'none';
    }

    // Initial particle effect on page load
    myConfetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 1.0 },
        colors: ['#ff4500', '#800080'],
        shapes: ['circle'],
        gravity: 0.5,
        scalar: 0.7
    });

    // Particle effect on button click
    particleButton.addEventListener('click', () => {
        myConfetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.8 },
            colors: ['#ff4500', '#800080', '#000'],
            shapes: ['circle', 'square'],
            scalar: 0.8
        });
    });

    // Personalize greeting
    personalizeButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            greeting.textContent = `Happy Birthday, ${name}!`;
            nameInput.value = '';
            myConfetti({
                particleCount: 60,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#ff69b4', '#ff4500']
            });
        } else {
            alert('Enter a name to unlock the mystery!');
        }
    });

    // Continuous particle effect (runs for 6 seconds)
    let particleInterval;
    setTimeout(() => {
        particleInterval = setInterval(() => {
            myConfetti({
                particleCount: 20,
                spread: 30,
                origin: { x: Math.random(), y: Math.random() },
                colors: ['#ff4500', '#800080'],
                shapes: ['circle'],
                gravity: 0.3,
                scalar: 0.6
            });
        }, 700);
        setTimeout(() => clearInterval(particleInterval), 6000);
    }, 1000);

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
// 7 Commands of a Biblically Healthy Church
const sevenCommands = [
  {
    number: 1,
    title: "Repent & Believe",
    icon: "&#x1F504;",
    color: "#8b5cf6",
    verse: "From then on Jesus began to preach, \"Repent of your sins and turn to God, for the Kingdom of Heaven is near.\"",
    reference: "Matthew 4:17 (NLT)",
    description: "Turn from sin and place your faith in Jesus Christ as Lord and Savior."
  },
  {
    number: 2,
    title: "Be Baptized",
    icon: "&#x1F4A7;",
    color: "#3b82f6",
    verse: "Peter replied, \"Each of you must repent of your sins and turn to God, and be baptized in the name of Jesus Christ for the forgiveness of your sins. Then you will receive the gift of the Holy Spirit.\"",
    reference: "Acts 2:38 (NLT)",
    description: "Publicly declare your faith through water baptism."
  },
  {
    number: 3,
    title: "Pray",
    icon: "&#x1F64F;",
    color: "#06b6d4",
    verse: "Devote yourselves to prayer with an alert mind and a thankful heart.",
    reference: "Colossians 4:2 (NLT)",
    description: "Maintain a constant, devoted prayer life with God."
  },
  {
    number: 4,
    title: "Love One Another",
    icon: "&#x2764;&#xFE0F;",
    color: "#ef4444",
    verse: "So now I am giving you a new commandment: Love each other. Just as I have loved you, you should love each other.",
    reference: "John 13:34 (NLT)",
    description: "Demonstrate sacrificial, Christ-like love within the body of believers."
  },
  {
    number: 5,
    title: "Holy Communion",
    icon: "&#x1F35E;",
    color: "#f59e0b",
    verse: "For every time you eat this bread and drink this cup, you are announcing the Lord's death until he comes again.",
    reference: "1 Corinthians 11:26 (NLT)",
    description: "Regularly remember Christ's sacrifice through the Lord's Supper."
  },
  {
    number: 6,
    title: "Give Offerings",
    icon: "&#x1F91D;",
    color: "#22c55e",
    verse: "You must each decide in your heart how much to give. And don't give reluctantly or in response to pressure. \"For God loves a person who gives cheerfully.\"",
    reference: "2 Corinthians 9:7 (NLT)",
    description: "Give generously and cheerfully to support the work of God."
  },
  {
    number: 7,
    title: "Go & Make Disciples",
    icon: "&#x1F30D;",
    color: "#f97316",
    verse: "Therefore, go and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit.",
    reference: "Matthew 28:19 (NLT)",
    description: "Share the gospel and multiply by making new disciples."
  }
];

function renderCommandsPage() {
  const container = document.getElementById('commands-content');
  container.innerHTML = `
    <div class="commands-header">
      <div class="commands-header-inner">
        <h1>The 7 Commands</h1>
        <p class="commands-subtitle">Marks of a Biblically Healthy House Church</p>
        <div class="commands-divider"></div>
        <p class="commands-intro">Every church in the 125CPV network is measured against these 7 commands from Scripture. A church obeying all 7 is considered fully healthy. These commands are the DNA of a multiplying church.</p>
      </div>
    </div>
    <div class="commands-grid">
      ${sevenCommands.map(cmd => `
        <div class="command-card" style="--cmd-color: ${cmd.color}">
          <div class="command-number" style="background: ${cmd.color}">${cmd.number}</div>
          <div class="command-icon">${cmd.icon}</div>
          <h2 class="command-title">${cmd.title}</h2>
          <p class="command-desc">${cmd.description}</p>
          <div class="command-verse-box" style="border-left-color: ${cmd.color}">
            <p class="command-verse">"${cmd.verse}"</p>
            <p class="command-ref">${cmd.reference}</p>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="commands-footer">
      <div class="commands-footer-inner">
        <div class="commands-score-guide">
          <h3>How Churches Are Scored</h3>
          <div class="score-bars">
            <div class="score-bar">
              <div class="score-fill" style="width: 100%; background: #22c55e;"></div>
              <span>7/7 - Fully healthy</span>
            </div>
            <div class="score-bar">
              <div class="score-fill" style="width: 85.7%; background: #4ade80;"></div>
              <span>6/7</span>
            </div>
            <div class="score-bar">
              <div class="score-fill" style="width: 71.4%; background: #eab308;"></div>
              <span>5/7</span>
            </div>
            <div class="score-bar">
              <div class="score-fill" style="width: 57.1%; background: #f97316;"></div>
              <span>4/7</span>
            </div>
            <div class="score-bar">
              <div class="score-fill" style="width: 42.8%; background: #ef4444;"></div>
              <span>3/7 or fewer - Needs attention</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

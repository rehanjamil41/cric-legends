export const cricketData = [
  {
      id: 'pak',
      name: 'Pakistan',
      flag: '🇵🇰',
      theme: { bg: 'bg-green-700', text: 'text-green-700', border: 'border-green-700', light: 'bg-green-50' },
      history: "Pakistan cricket is defined by passion, unpredictability, and raw talent. Gaining Test status in 1952, they stunned the world by winning the 1992 World Cup under Imran Khan.",
      players: [
          { name: "Imran Khan", role: "Captain / All-Rounder", stats: "1992 WC Winner", desc: "The charismatic leader who transformed Pakistan cricket." },
          { name: "Wasim Akram", role: "Fast Bowler", stats: "916 Intl Wickets", desc: "The 'Sultan of Swing'. Arguably the greatest left-arm pacer." },
          { name: "Babar Azam", role: "Batsman", stats: "Modern Great", desc: "The current superstar known for his exquisite cover drives." }
      ]
  },
  {
      id: 'ind',
      name: 'India',
      flag: '🇮🇳',
      theme: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600', light: 'bg-blue-50' },
      history: "India is the powerhouse of modern cricket. The turning point was the 1983 World Cup win.",
      players: [
          { name: "Sachin Tendulkar", role: "Batsman", stats: "100 Centuries", desc: "The 'God of Cricket'. Holder of most runs in Tests and ODIs." },
          { name: "Virat Kohli", role: "Batsman", stats: "Run Machine", desc: "Famous for his aggressive captaincy and chasing ability." }
      ]
  },
  // ... Aap baaki countries yahan add kar sakte hain same format mein ...
  {
    id: 'aus',
    name: 'Australia',
    flag: '🇦🇺',
    theme: { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-500', light: 'bg-yellow-50' },
    history: "The most successful team in World Cup history.",
    players: [
        { name: "Don Bradman", role: "Batsman", stats: "Avg 99.94", desc: "The greatest sportsman of all time statistically." },
        { name: "Ricky Ponting", role: "Captain", stats: "2 WC Titles", desc: "One of the most successful captains." }
    ]
  }
];
'use client'
import { useState } from 'react'

export default function HelpPage() {
  const [messages, setMessages] = useState([{from:'bot', text:'Hello Sir! Welcome to Help Centre. How can I help you?'}])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  function smartReply(text: string) {
    const t = text.toLowerCase()

    if (t.includes('thank')) {
      return 'You are Welcome Sir!'
    }
    if (t.includes('hi') || t.includes('hello') || t.includes('hlo')) {
      return 'Hello Sir! How can I help you today?'
    }
    if (t.includes('purch') || t.includes('pack') || t.includes('price')) {
      return 'To buy packages, please go to the Purchase Packages page from the top left. There you will see different packages. You can choose your desired package and buy it easily.'
    }
    if (t.includes('demo') || t.includes('10000') || t.includes('free') || t.includes('virtual')) {
      return 'Free Demo 10000$ means you get $10,000 virtual funds for practice. Click on Free Demo 10000$ or Start Trading Now button to start demo trading with no risk.'
    }
    if (t.includes('start')) {
      return 'Click on the Start Trading Now button in the center of the home page. You will get $10,000 virtual funds to practice trading with no risk.'
    }
    // Real Trading - 2 STEP LOGIC
    if (t.includes('real')) {
      // Agar purchase / buy ka pooche
      if (t.includes('buy') || t.includes('purch') || t.includes('binance')) {
        return 'After completing verification, now you should buy from Real Binance and do trading there. In Trading Master only learning is provided.'
      }
      // Agar kaise karni hai pooche
      return 'To do Real Trading, please go to Real and complete your verification first.'
    }
    if ((t.includes('what') || t.includes('wath')) && (t.includes('trad') || t.includes('master'))) {
      return 'Trading Master is a professional trading learning platform only for learning purpose. Here you can learn trading step by step, get daily signals, and start trading with Free Demo 10000$ practice funds.'
    }
    if (t.includes('trad')) {
      return 'Trading means buying low and selling high to make profit. We provide complete learning, live charts and daily signals. You can start with Free Demo 10000$.'
    }
    if (t.includes('sign')) {
      return 'To create a new account, click on the Sign Up button on the top right, enter your full name, email and password, then submit.'
    }
    if (t.includes('log')) {
      return 'To login, click on the Log In button on the top right, enter your registered email and password, then click Login.'
    }
    if (t.includes('forg') || t.includes('pasw') || t.includes('pass') || t.includes('reset')) {
      return 'To reset your password, click on the Forget button on the top right, enter your registered email. You will receive a reset link.'
    }
    
    return 'Sorry'
  }

  function send() {
    if (!input.trim()) return
    const userText = input
    const reply = smartReply(userText)
    
    setMessages(prev => [...prev, {from:'user', text: userText}])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {from:'bot', text: reply as string}])
      setTyping(false)
    }, 5000)
  }

  return (
    <div style={{maxWidth:600, margin:'0 auto', padding:20, fontFamily:'sans-serif', height:'100vh', display:'flex', flexDirection:'column'}}>
      <h1 style={{textAlign:'center'}}>Help Centre</h1>
      <div style={{flex:1, overflowY:'auto', border:'1px solid #ddd', borderRadius:12, padding:12, marginTop:10, background:'#fff'}}>
        {messages.map((m,i)=>(
          <div key={i} style={{textAlign: m.from==='user'?'right':'left', margin:'8px 0'}}>
            <span style={{display:'inline-block', padding:'10px 14px', borderRadius:12, background: m.from==='user'?'black':'#f1f1f1', color: m.from==='user'?'white':'black', maxWidth:'80%'}}>{m.text}</span>
          </div>
        ))}
        {typing && <div style={{textAlign:'left', margin:'8px 0'}}><span style={{display:'inline-block', padding:'10px 14px', borderRadius:12, background:'#f1f1f1', color:'#888', fontSize:'13px'}}>typing...</span></div>}
      </div>
      <div style={{display:'flex', gap:8, marginTop:12}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} placeholder="Type your question..." style={{flex:1, padding:12, borderRadius:8, border:'1px solid #ccc'}} />
        <button onClick={send} style={{background:'black', color:'white', padding:'12px 20px', borderRadius:8}}>Send</button>
      </div>
    </div>
  )
}

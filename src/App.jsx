import React, { useEffect, useState, useRef } from 'react';

const GAMES = [
  { id:1, title:'Grand Theft Auto V', genre:'Action', price:29.99, cover:'/public_placeholder.png', store:'https://store.epicgames.com/'},
  { id:2, title:'Red Dead Redemption 2', genre:'Adventure', price:39.99, cover:'/public_placeholder.png', store:'https://store.playstation.com/'},
  { id:3, title:'Elden Ring', genre:'Action', price:59.99, cover:'/public_placeholder.png', store:'https://store.steampowered.com/'},
  { id:4, title:'Forza Horizon 5', genre:'Racing', price:49.99, cover:'/public_placeholder.png', store:'https://www.microsoft.com/'},
  { id:5, title:'Microsoft Flight Simulator', genre:'Simulation', price:59.99, cover:'/public_placeholder.png', store:'https://www.microsoft.com/'},
  { id:6, title:'Halo Infinite', genre:'Shooter', price:39.99, cover:'/public_placeholder.png', store:'https://www.xbox.com/'},
  { id:7, title:'Cyberpunk 2077', genre:'Action', price:29.99, cover:'/public_placeholder.png', store:'https://store.epicgames.com/'},
  { id:8, title:'The Witcher 3: Wild Hunt', genre:'Adventure', price:14.99, cover:'/public_placeholder.png', store:'https://store.steampowered.com/'},
  { id:9, title:'Minecraft', genre:'Adventure', price:19.99, cover:'/public_placeholder.png', store:'https://www.minecraft.net/'},
  { id:10, title:'Assassin\'s Creed Valhalla', genre:'Action', price:49.99, cover:'/public_placeholder.png', store:'https://store.ubisoft.com/'},
];

function Header({user,onSignOut,subscribed}){
  return <div className='header'>
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <img src="/dino_logo_transparent.png" alt="DinoWorld" style={{height:36}}/>
      <strong>DinoWorld</strong>
    </div>
    <div style={{display:'flex',gap:12,alignItems:'center'}}>
      <div style={{fontSize:13,color:'#cfe3ff'}}>{subscribed?'Subscribed':'Free'}</div>
      {user? <div style={{display:'flex',gap:8,alignItems:'center'}}><div style={{fontSize:13}}>{user.email}</div><button className='btn' onClick={onSignOut}>Sign out</button></div>:null}
    </div>
  </div>
}

function Splash({onContinue}) {
  const audioRef = useRef();
  useEffect(()=>{ // preload and autoplay when allowed
    const a = audioRef.current;
    if(a){
      a.load();
      const play = ()=>{ a.play().catch(()=>{}); window.removeEventListener('click', play); }
      window.addEventListener('click', play);
    }
  },[]);
  return <div className='splash' onClick={onContinue}>
    <img src="/dino_logo_transparent.png" alt="logo" style={{width:240}}/>
    <h1 style={{color:'#fff',margin:0}}>DinoWorld</h1>
    <p style={{color:'#9fb3d6'}}>Cloud Gaming — Demo</p>
    <small style={{color:'#9fb3d6'}}>Click to continue</small>
    <audio ref={audioRef} preload="auto">
      <source src="/intro.wav" type="audio/wav"/>
    </audio>
  </div>
}

function Auth({onSignIn,onSubscribe,subscribed}) {
  const [email,setEmail] = useState('');
  return <div className='authBox'>
    <h2>Sign in</h2>
    <input className='input' placeholder='your email' value={email} onChange={e=>setEmail(e.target.value)}/>
    <div style={{display:'flex',gap:8}}>
      <button className='btn' onClick={()=>onSignIn(email||'guest@example.com')}>Sign in (demo)</button>
      {!subscribed && <button className='btnPrimary' onClick={onSubscribe}>Subscribe</button>}
    </div>
    <p style={{marginTop:12,fontSize:13}}>This is a demo. Real streaming & payments require licensing and backend infrastructure.</p>
  </div>
}

function Library({games,onPlay,onOpenStore,subscribed}) {
  const [query,setQuery]=useState('');
  const [genre,setGenre]=useState('All');
  const genres=['All','Action','Adventure','Racing','Shooter','Simulation'];
  const filtered = games.filter(g=> (genre==='All' || g.genre===genre) && g.title.toLowerCase().includes(query.toLowerCase()));
  return <div className='library'>
    <div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
      <input className='input' placeholder='Search games...' value={query} onChange={e=>setQuery(e.target.value)} style={{maxWidth:320}}/>
      <div style={{display:'flex',gap:8}}>
        {genres.map(g=><button key={g} className='btn' onClick={()=>setGenre(g)} style={{background:genre===g?'#0ea5e9':'#fff'}}>{g}</button>)}
      </div>
    </div>
    <div className='grid' style={{marginTop:12}}>
      {filtered.map(g=><div className='card' key={g.id}>
        <img className='cover' src={g.cover} alt=''/>
        <h3 style={{margin:'6px 0'}}>{g.title}</h3>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>${g.price.toFixed(2)}</div>
          <div style={{display:'flex',gap:8}}>
            <button className='btn' onClick={()=>onOpenStore(g)}>Buy</button>
            <button className='btnPrimary' onClick={()=>onPlay(g)}>Play</button>
          </div>
        </div>
      </div>)}
    </div>
  </div>
}

export default function App(){
  const [view,setView]=useState('splash');
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('dino_user'))||null}catch{return null}});
  const [subscribed,setSubscribed]=useState(()=>{try{return JSON.parse(localStorage.getItem('dino_subscribed'))||false}catch{return false}});
  const [message,setMessage]=useState(null);
  useEffect(()=>{ if(view==='splash'){const t=setTimeout(()=>setView(user?'library':'auth'),3500); return ()=>clearTimeout(t)} },[view,user]);
  useEffect(()=>{localStorage.setItem('dino_user',JSON.stringify(user))},[user]);
  useEffect(()=>{localStorage.setItem('dino_subscribed',JSON.stringify(subscribed))},[subscribed]);

  function mockSignIn(email){ const u={email,id:'user_'+btoa(email).slice(0,8)}; setUser(u); setMessage('Signed in as '+email); setView('library');}
  function mockSignOut(){ setUser(null); setSubscribed(false); setView('auth'); setMessage('Signed out');}
  function startSubscription(){ setSubscribed(true); setMessage('Subscription active — thanks for subscribing!');}
  function handlePlay(game){ if(!user){ setMessage('Please sign in to play.'); setView('auth'); return;} if(!subscribed){ setMessage('This is a paid app — please subscribe to play.'); return;} setMessage('Starting demo stream for '+game.title); alert('Demo: streaming '+game.title);}

  return <div className='app'>
    <Header user={user} onSignOut={mockSignOut} subscribed={subscribed}/>
    {view==='splash' && <Splash onContinue={()=>setView(user?'library':'auth')}/>}
    {view==='auth' && <Auth onSignIn={mockSignIn} onSubscribe={startSubscription} subscribed={subscribed}/>}
    {view==='library' && <Library games={GAMES} onPlay={handlePlay} onOpenStore={(g)=>window.open(g.store,'_blank')} subscribed={subscribed}/>}
    <div className='footer'>{message||'DinoWorld • Demo cloud gaming UI'}</div>
  </div>
}

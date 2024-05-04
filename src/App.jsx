import { useRef, useState } from 'react'
import { Tabs, Tab } from "baseui/tabs-motion";
import Veicoli from './components/Veicoli';
import Casa from './components/Casa';
import Title from './components/Title';
import { Notification } from "baseui/notification";
import Stepper from './components/Stepper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';

function App() {
  const [activeKey, setActiveKey] = useState("0");
  const [showNotice,setShowNotice]=useState(false);
  const [notice,setNotice]=useState(false);
  const noticeRef=useRef();
  const preventivoRef=useRef();

  return (
   <div className='w-full min-h-[100vh] bg-white flex flex-col gap-10 items-center'>
      <div id="navbar" className='w-full h-[7vh] bg-slate-200 flex flex-row items-center'>
        <div className='text-2xl text-primary ml-[10px] font-semibold'>Assicurazioni Castellana</div>
        <img src={"https://github.com/assicurazioni-castellana/assicurazioni-castellana.github.io/blob/main/logo.png"} className='h-[5vh] ml-auto pointer-events-none select-none'></img>
        <Button variant="contained" style={{marginLeft:"auto",marginRight:"10px"}} onClick={()=>preventivoRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>RICHIEDI UN PREVENTIVO</Button>
      </div>

      <div className='w-full h-[40vh] bg-slate-50 flex items-center justify-evenly shadow-[0_20px_40px_-20px] shadow-slate-300'>
        <div className='text-3xl text-secondary allianz'>PLURIMANDATARI</div>
        <div className='w-24 h-[1.5px] bg-secondary'></div>
        <div className='text-3xl text-secondary allianz'>4 COMPAGNIE PRIMARIE</div>
        <div className='w-24 h-[1.5px] bg-secondary'></div>
        <div className='text-3xl text-secondary allianz'>DAL 1987</div>
      </div>
      
      <Title ref={preventivoRef}>RICHIEDI UN PREVENTIVO</Title>

      <Stepper/>

      <div id="main-page" className='relative sm:w-[90vw] lg:w-[60vw] h-min py-6 shadow-[0_5px_40px_-15px] shadow-primary rounded-lg flex justify-center items-center'>
        <Tabs activeKey={activeKey} onChange={({ activeKey }) => {setActiveKey(activeKey);}} activateOnFocus
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              width: "90%",
              height:"min-content"
            })
          },
          TabList:{
            style: ({ $theme }) => ({
              "justify-content":"center"
            })
          }
        }}>
          <Tab title="Veicoli">
            <Veicoli setShowNotice={setShowNotice} setNotice={setNotice}/>
          </Tab>
          <Tab title="Casa">
            <Casa setShowNotice={setShowNotice} setNotice={setNotice}/>
          </Tab>
          <Tab title="Infortuni/Malattia"></Tab>
        </Tabs>

        {showNotice && <Notification closeable onClose={()=>setShowNotice(false)}
          overrides={{
              Body: {
              style: ({ $theme }) => ({
                  position:"absolute",
                  bottom:"10px",
                  right:"10px"
                })
              }
          }} ref={noticeRef}>{notice}</Notification>}
      </div>

      <Title>CONTATTI</Title>
      <div className='flex flex-col gap-10'>
        <div className='flex gap-4'>
          <FontAwesomeIcon icon={faPhoneSquare} className='text-secondary text-4xl' />
          <div className='text-secondary text-2xl'>080 487 9888</div>
        </div>
        <div className='flex gap-4'>
          <FontAwesomeIcon icon={faEnvelope} className='text-secondary text-4xl' />
          <div className='text-secondary text-2xl'>assicurazionicastellana@email.it</div>
        </div>
      </div>

      <Title>DOVE SIAMO</Title>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.7399089370538!2d17.338294299999994!3d40.701725499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134653a0a4d00e7f%3A0xe6a00a38cefe06a6!2sAssicurazioni%20A.%20Castellana%20Plurimandato!5e0!3m2!1sit!2sit!4v1714202874292!5m2!1sit!2sit" width="600" height="450" className='rounded-2xl shadow-[0_10px_30px_-15px] shadow-primary' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      
      <div className='w-full py-7 bg-slate-200 flex flex-row items-center justify-around'>
        <div className='flex flex-col grow-[0.3] gap-2'>
          <div className='text-2xl text-primary font-semibold'>Assicurazioni Castellana</div>
          <div className='text-slate-900'>Viale della libertà 14<br/>Martina Franca (TA)<br/>080 665 7777</div>
        </div>
        
        <div className='flex flex-col gap-2'>
          {/*IUBENDA*/}
          <a href="https://www.iubenda.com/privacy-policy/88756523" className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe" title="Privacy Policy ">Privacy Policy</a>
          <a href="https://www.iubenda.com/privacy-policy/88756523/cookie-policy" className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe" title="Cookie Policy ">Cookie Policy</a>
        </div>
      </div>
   </div>
  )
}

export default App

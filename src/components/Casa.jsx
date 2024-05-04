import TextField from '@mui/material/TextField';
import ReactInputMask from 'react-input-mask';
import { Select } from "baseui/select";
import Autocomplete from '@mui/material/Autocomplete';
import {Checkbox,LABEL_PLACEMENT} from "baseui/checkbox";
import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import Divider from './utils/Divider';
import { Spinner } from 'baseui/spinner';
import { cittaItaliane } from '../data/citta';
import { sendEmail } from '../controller/SendMail';
import appData from '../data/data';
import addConsent from '../controller/Firebase';

function Casa(props) {
    const [data,setData]=useState({nome:"",cognome:"",dataNascita:"",cellulare:"+39",mail:"",luogoNascita:"",citta:"",tipoCasa:[],annoCostruzione:"",mq2:"",garanzie:[],consent:false});
    const [loading,setLoading]=useState(false);

    const tipiCase=[
        {
            label: "Appartamento",
            id: "#1F"
        },
        {
            label: "Villa",
            id: "#2"
        }
    ];

    const garanzie=[
        {
            label:"Incendio Fabbricato",
            id:"#3"
        },
        {
            label:"Incendio Contenuto",
            id:"#4"
        },
        {
            label:"Furto Contenuto",
            id:"#5"
        },
        {
            label:"Fenomeno Elettrico",
            id:"#6"
        },
        {
            label:"Assistenza Abitazione",
            id:"#7"
        },
        {
            label:"RC Fabbricato",
            id:"#8"
        },
        {
            label:"RD Famiglia",
            id:"#9"
        }
    ];

    const changeGaranzia=(params)=>{
        setData({
            ...data,
            garanzie:params.value
        })
    }

    const checkData=(d)=>{
        if (Object.values(d).indexOf("")!=-1){
            props.setNotice("Riempi tutti i campi obbligatori")
            props.setShowNotice(true)
            return false
        }

        if(d.tipoCasa.length==0){
            props.setNotice("Seleziona il tipo di casa")
            props.setShowNotice(true)
            return false
        }

        if(d.dataNascita.includes(" ")){
            props.setNotice("Data di nascita non valida")
            props.setShowNotice(true)
            return false
        }

        if(d.mq2<=0){
            props.setNotice("Metri Quadrati non validi")
            props.setShowNotice(true)
            return false
        }

        if(!d.mail.includes("@") || !d.mail.includes(".")){
            props.setNotice("Mail non valida")
            props.setShowNotice(true)
            return false
        }

        if(d.annoCostruzione<=0 || d.annoCostruzione>new Date().getFullYear()){
            props.setNotice("Anno di costruzione non valido")
            props.setShowNotice(true)
            return false
        }

        if(d.consent==false){
            props.setNotice("Spuntare il consenso per inviare")
            props.setShowNotice(true)
            return false
        }

        return true
    }

    const submit = async (e)=>{

        if (!checkData(data)){
            return
        }

        var emailText="Nuovo Preventivo!<br>Mail: "+data.mail+"<br>Cellulare: "+data.cellulare+"<br>Nome: "+data.nome+"<br>Cognome: "+data.cognome+
        "<br>Data Di Nascita: "+data.dataNascita+"<br>Luogo Di Nascita: "+data.luogoNascita+"<br><br>Dati della casa<br>↓  ↓   ↓<br><br>Citta: "+data.citta+"<br>Metri Quadri: "+data.mq2+
        "<br>Anno di costruzione: "+data.annoCostruzione+"<br>Tipo Casa: "+data.tipoCasa[0].label+"<br>Garanzie:<br>"

        data.garanzie.forEach(g=>emailText=emailText+"- "+g.label+"<br>")

        setLoading(true)

        //memorizza i consensi
        const dataToStore={
            mail:data.mail,
            cellulare:data.cellulare,
            dataNascita:data.dataNascita,
            citta:data.citta,
            metriQuardi:data.mq2,
            annoCostruzione:data.annoCostruzione,
            tipoCasa:data.tipoCasa[0].label,
            consenso:data.consent
        }

        const resp=await addConsent(dataToStore)

        if(resp){
            //se il consenso è memorizzato correttamente
            //invio la mail
            const response = await sendEmail(emailText)

            if (response){
                props.setNotice("Richiesta Inviata Correttamente")
            }else{
                props.setNotice("Richiesta Fallita")
            }
        }else{
            props.setNotice("Memorizzazione Fallita")
        }

        props.setShowNotice(true)

        setLoading(false)
    }

    return(
        <div className="h-min flex flex-row flex-wrap gap-7 content-start">
            <Divider text="DATI CLIENTE"/>

            <TextField value={data.nome} onChange={e=>setData({...data,nome:e.target.value})} 
            label="Nome" variant="filled" autoComplete='off'></TextField>

            <TextField value={data.cognome} onChange={e=>setData({...data,cognome:e.target.value})} 
            label="Cognome" variant="filled" autoComplete='off'></TextField>

            <ReactInputMask
                mask="99/99/9999"
                value={data.dataNascita} 
                onChange={e=>setData({...data,dataNascita:e.target.value})}
                disabled={false}
                maskChar=' '
                >
                {() => <TextField label="Data Di Nascita" variant="filled" autoComplete='off'></TextField>}
            </ReactInputMask>

            <ReactInputMask
                mask={(data.cellulare.includes("+39")?"+99 999 999 9999":"999 999 9999")}
                value={data.cellulare} onChange={e=>setData({...data,cellulare:e.target.value})}
                disabled={false}
                maskChar=' '
                >
                {()=><TextField label="Cellulare" variant="filled" autoComplete='off'></TextField>}
            </ReactInputMask>

            <TextField value={data.mail} onChange={e=>setData({...data,mail:e.target.value})} 
            label="Mail" variant="filled" autoComplete='off'></TextField>

            <Autocomplete
                disablePortal
                options={cittaItaliane}
                onBlur={()=>{return}}
                filterOptions={(options, state) => {  //used to display cities autocomplete after typed 2 chars
                    if (state.inputValue.length > 2) {
                        return options.filter((item) =>
                        String(item.label)
                            .toLowerCase()
                            .includes(state.inputValue.toLowerCase())
                        );
                    }
                    return [];
                }}
                clearOnBlur={false}
                sx={{ width: "30%" }}
                renderInput={(params) => <TextField value={data.luogoNascita} onChange={e=>setData({...data,luogoNascita:e.target.value})} 
                label="Luogo Di Nascita" variant="filled" autoComplete='off' {...params}></TextField>}
            />
            
            <Divider text="DATI CASA"/>

            <Autocomplete
                disablePortal
                options={cittaItaliane}
                onBlur={()=>{return}}
                filterOptions={(options, state) => {  //used to display cities autocomplete after typed 2 chars
                    if (state.inputValue.length > 2) {
                        return options.filter((item) =>
                        String(item.label)
                            .toLowerCase()
                            .includes(state.inputValue.toLowerCase())
                        );
                    }
                    return [];
                }}
                clearOnBlur={false}
                sx={{ width: "30%" }}
                renderInput={(params) => <TextField value={data.citta} onChange={e=>setData({...data,citta:e.target.value})} 
                label="Citta" variant="filled" autoComplete='off' {...params}></TextField>}
            />

            <TextField value={data.mq2} onChange={e=>setData({...data,mq2:e.target.value.replace(/\D+/g, '')})} 
            label="Metri Quadrati" variant="filled" autoComplete='off'></TextField>

            <TextField value={data.annoCostruzione} onChange={e=>setData({...data,annoCostruzione:e.target.value.replace(/\D+/g, '')})} 
            label="Anno Di Costruzione" variant="filled" autoComplete='off'></TextField>

            <Select
                options={tipiCase}
                value={data.tipoCasa}
                placeholder="Tipo Casa"
                onChange={params=>setData({...data,tipoCasa:params.value})}
            />

            <Select
                options={garanzie}
                value={data.garanzie}
                placeholder="Garanzie"
                multi
                onChange={e=>changeGaranzia(e)}
            />
            
            <div className='basis-full h-0'></div>

            {/*CONSENT CHECKBOX*/}

            <Checkbox
                checked={data.consent}
                onChange={e => setData({...data,consent:e.target.checked})}
                labelPlacement={LABEL_PLACEMENT.right}
                overrides={{
                    Label: {
                      style: ({ $theme }) => ({
                        color: $theme.colors.secondary,
                      }),
                    },
                    Checkmark: {
                      style: ({ $checked, $theme }) => ({
                        borderLeftColor: $theme.colors.secondary,
                        borderRightColor: $theme.colors.secondary,
                        borderTopColor: $theme.colors.secondary,
                        borderBottomColor: $theme.colors.secondary,
                        backgroundColor: $checked ? $theme.colors.secondary : null,
                      }),
                    }}}
            >Accetto che i miei dati inviati vengano raccolti ed archiviati e dichiaro di aver letto ed accettato la <a href={appData.privacyPolicy} target='_blank'>Privacy Policy</a> Per maggiori informazioni consulta la nostra <a href={appData.privacyPolicy} target='_blank'>Privacy Policy</a></Checkbox>

            <div className='basis-full h-0'></div>

            <Button variant="text" type='submit' onClick={e=>submit(e)}>INVIA</Button>
            
            {loading && <div className='text-md text-secondary ml-auto flex gap-4 items-center'>Invio Richiesta...<Spinner/></div>}

        </div>
    )
}

export default Casa;
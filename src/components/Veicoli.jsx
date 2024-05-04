import TextField from '@mui/material/TextField';
import ReactInputMask from 'react-input-mask';
import { Select } from "baseui/select";
import {Checkbox,LABEL_PLACEMENT} from "baseui/checkbox";
import { useState } from "react";
import { Button } from '@mui/material';
import Divider from './utils/Divider';
import { sendEmail } from '../controller/SendMail';
import appData from '../data/data';
import { Spinner } from 'baseui/spinner';
import addConsent from '../controller/Firebase';

function Veicoli(props) {
    const [data,setData]=useState({dataNascita:"",cellulare:"+39",mail:"",targa:"",tipoPoliza:[],giaAssicurato:false,consent:false});
    const [loading,setLoading]=useState(false)

    const tipiPoliza=[
        {
            label: "RCA",
            id: "#1F"
        },
        {
            label: "Incedio e Furto",
            id: "#2"
        },
        {
            label: "Infortuni",
            id: "#3"
        },
        {
            label: "Cristalli",
            id: "#4"
        },
        {
            label: "Assistenza Stradale",
            id: "#5"
        },
        {
            label: "Atti Vandalici",
            id: "#6"
        },
        {
            label: "Eventi Naturali",
            id: "#7"
        },
        {
            label: "Kasko",
            id: "#8"
        }
    ];

    const changeTarga=(e)=>{
        setData({
            ...data,
            targa:e.target.value
        })
    }

    const changeTipoPoliza=(params)=>{
        setData({
            ...data,
            tipoPoliza:params.value
        })
    }

    const changeCellulare=(e)=>{
        setData({
            ...data,
            cellulare:e.target.value
        })
    }

    const changeDataNascita=(e)=>{
        setData({
            ...data,
            dataNascita:e.target.value
        })
    }

    const changeEmail=(e)=>{
        setData({
            ...data,
            mail:e.target.value
        })
    }

    const changeAssicurato=(val)=>{
        setData({
            ...data,
            giaAssicurato:val
        })
    }

    const checkData=(d)=>{
        if (Object.values(d).indexOf("")!=-1){
            props.setNotice("Riempi tutti i campi obbligatori")
            props.setShowNotice(true)
            return false
        }

        if(d.tipoPoliza.length==0){
            props.setNotice("Seleziona il tipo di polizza")
            props.setShowNotice(true)
            return false
        }

        if(d.dataNascita.includes(" ")){
            props.setNotice("Data di nascita non valida")
            props.setShowNotice(true)
            return false
        }

        if(!d.mail.includes("@") || !d.mail.includes(".")){
            props.setNotice("Mail non valida")
            props.setShowNotice(true)
            return false
        }

        if(d.targa.length!=9 || d.targa.charAt(d.targa.length-1)==' '){
            props.setNotice("Targa non valida")
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

        const emailText="Nuovo Preventivo!<br>Mail: "+data.mail+"<br>Cellulare: "+data.cellulare+
        "<br>Data Di Nascita: "+data.dataNascita+"<br><br>Dati del veicolo<br>↓  ↓   ↓<br><br>Targa: "+data.targa+"<br>Tipo Poliza<br>: "+data.tipoPoliza[0].label
        setLoading(true)

        //memorizza i consensi
        const dataToStore={
            mail:data.mail,
            cellulare:data.cellulare,
            dataNascita:data.dataNascita,
            targa:data.targa,
            tipoPolizza:data.tipoPoliza[0].label,
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
            <ReactInputMask
                mask="99/99/9999"
                value={data.dataNascita} 
                onChange={e=>changeDataNascita(e)}
                disabled={false}
                maskChar=' '
                >
                {() => <TextField label="Data Di Nascita" variant="filled" autoComplete='off'></TextField>}
            </ReactInputMask>

            <ReactInputMask
                mask={(data.cellulare.includes("+39")?"+99 999 999 9999":"999 999 9999")}
                value={data.cellulare} onChange={e=>changeCellulare(e)}
                disabled={false}
                maskChar=' '
                >
                {()=><TextField label="Cellulare" variant="filled" autoComplete='off'></TextField>}
            </ReactInputMask>

            <TextField value={data.mail} onChange={e=>changeEmail(e)} 
            label="Mail" variant="filled" autoComplete='off'></TextField>
            
            <Divider text="DATI VEICOLO"/>

            <ReactInputMask
                mask="aa 999 aa"
                value={data.targa} onChange={e=>changeTarga(e)} 
                disabled={false}
                maskChar=' '
                >
                {()=><TextField label="Targa" variant="filled" autoComplete='off'></TextField>}
            </ReactInputMask>

            <Select
                options={tipiPoliza}
                value={data.tipoPoliza}
                placeholder="Garanzie"
                onChange={e=>changeTipoPoliza(e)}
            />

            <div className='basis-full h-0'></div>

            <Checkbox
                checked={data.giaAssicurato}
                onChange={e => changeAssicurato(e.target.checked)}
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
            >Veicolo Già Assicurato Presso Altra Compagnia</Checkbox>

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

export default Veicoli;
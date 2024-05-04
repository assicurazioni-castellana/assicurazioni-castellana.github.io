function Stepper(){
    return(
        <div className="w-full flex items-center justify-center">
            <div className="rounded-3xl p-1 px-3 text-lg text-secondary bg-slate-200">RICHIEDI UN PREVENTIVO</div>
            <div className="w-10 h-1 bg-slate-200"></div>
            <div className="rounded-3xl p-1 px-3 text-lg text-secondary bg-slate-200">ATTENDI LA CHIAMATA</div>
            <div className="w-10 h-1 bg-slate-200"></div>
            <div className="rounded-3xl p-1 px-3 text-lg text-secondary bg-slate-200">PASSA IN UFFICIO</div>
        </div>
    )
}

export default Stepper;
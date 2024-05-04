function Divider(props){
    return(
        <div className="basis-full flex flex-row items-center justify-center gap-3 mt-3">
            <div className="w-[40px] h-[1.5px] bg-secondary"></div>
            <div className="text-md text-primary whitespace-nowrap">{props.text}</div>
            <div className="basis-full h-[1.5px] bg-secondary"></div>
        </div>
    )
}

export default Divider;
import { forwardRef } from "react";

const Title = forwardRef((props, ref)=> {
    return(
        <div ref={ref} className="text-4xl text-secondary title mt-7">{props.children}</div>
    )
})

export default Title;
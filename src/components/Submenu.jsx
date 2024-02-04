
const Submenu = props => {
    return (
        <div
            className="hover:shadow hover:transition hover:duration-300 hover:translate-x-3 hover:bg-gray-100 rounded-md select-none py-3"
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}>
            <p
                className="w-full text-xl text-gray-400 font-bold px-2 mx-2"
            >{props.titulo}</p>
            {props.children}
        </div>
    )
}

export default Submenu
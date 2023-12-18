import {ColorRing} from "react-loader-spinner";

const Loader = () => {
    return (
        <div
            data-testid={"loader-test"}
             style={{"display": "flex", justifyContent: "center", alignItems: "center"}}
        >
            <ColorRing width={100} height={100}/>
        </div>
    )
}

export default Loader
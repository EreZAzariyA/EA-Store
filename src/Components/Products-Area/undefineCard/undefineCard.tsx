import "./undefineCard.css";
import image from "../../../Assets/undefine-card-img.jpg";
import { NavLink } from "react-router-dom";

function UndefineCard(): JSX.Element {
    return (
        <div className="undefineCard">
            <div className="card" aria-hidden="true">
                <img src={image} className="card-img-top placeholder-glow" alt="..." />
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <NavLink to={"/"} tabIndex={-1} className="btn btn-primary disabled placeholder col-6"></NavLink>
                </div>
            </div>
        </div>
    );
}

export default UndefineCard;

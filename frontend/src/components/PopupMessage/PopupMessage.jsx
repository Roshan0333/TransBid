import Styles from "./PopupMessage.module.css"

function PopupMessage({message}) {
    return (
        <div className={Styles.popMessageDiv}>
            <p className={Styles.popMessage}>{message}</p>
        </div>
    )
}

export default PopupMessage;
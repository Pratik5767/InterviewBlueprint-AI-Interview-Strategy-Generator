const Loading = ({ message = "Loading..." }) => {
    return (
        <div className="loading-overlay">
            <div className="loading-card">
                <div className="loading-spinner">
                    <div className="spinner-ring"></div>

                    <div className="spinner-ring spinner-ring--delay"></div>
                </div>

                <p className="loading-message">{message}</p>
            </div>
        </div>
    )
}

export default Loading
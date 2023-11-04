export function Foot () {
    const footerStyle = {
        backgroundColor: '#000000',
        color: '#F8F8FF',
        padding: '20px 0',
       position: 'fixed',
        width: '100%',
        bottom: '0',
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
    };

    const pStyle = {
        margin: 0,
    };


        return (
            <>
            <footer style={footerStyle}>
                <div style={containerStyle}>
                    <p style={pStyle}>&copy; trees 2023</p>
                </div>
            </footer>
            </>
    )
}
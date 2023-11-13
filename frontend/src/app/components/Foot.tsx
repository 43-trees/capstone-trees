export function Foot () {
    const footerStyle = {
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
            <footer className='bg-neutral/75' style={footerStyle}>
                <div style={containerStyle}>
                    <p className='text-center' style={pStyle}>&copy; Urban Orchard 2023</p>
                </div>
            </footer>
            </>
    )
}
type InfoProps = {
    text: string
    link: string
}


export function Info(infoProps: InfoProps) {
    const {link, text} = infoProps
    return (
        <section>
            <p>{text}</p>
            <a href={link}/>
        </section>
    )
}

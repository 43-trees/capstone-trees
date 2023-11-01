type InfoProps = {
    text: string
    link: string
}


export function Info(infoProps: InfoProps) {
    const {link, text} = infoProps
    return (
        <section className="">
            <p>{text}</p>
            <a href={link}/>
        </section>
    )
}

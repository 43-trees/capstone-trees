type InfoProps = {
    header: string
    text: string
}


export function InfoBox(infoProps: InfoProps) {
    const {header, text} = infoProps
    return (
        <section className="bg-primary mx-54">
            <h1 className="text-3xl">{header}</h1>
            <p>{text}</p>
        </section>
    )
}

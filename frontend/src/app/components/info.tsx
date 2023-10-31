type InfoProps = {
    header: string
    text: string
}


export function InfoBox(infoProps: InfoProps) {
    const {header, text} = infoProps
    return (
        <section className="bg-primary p-4">
            <h1 className="text-3xl">{header}</h1>
            <p className="p-6">{text}</p>
        </section>
    )
}

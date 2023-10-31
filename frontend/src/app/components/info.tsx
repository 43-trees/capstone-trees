type InfoProps = {
    text: string
}


export function InfoBox(infoProps: InfoProps) {
    const {text} = infoProps
    return (
        <section className="bg-primary mx-54">
            <p>{text}</p>
        </section>
    )
}

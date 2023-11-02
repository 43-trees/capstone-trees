export default function About() {
    return (
        <>
            <section className="bg-primary p-6 mx-56 my-12 drop-shadow-lg">
                <h1 className="text-3xl">About the Project</h1>
                <div className="p-6">
                    <p>
                        Urban Orchard was created as a capstone project for CNM Ingenuity's Deep Dive Full Stack bootcamp. With this project we hope to not only make fruit more accessible to the public but also to reduce food waste by allowing farmers and community members to list their excess fruit.
                    </p>
                </div>
            </section>
            <section className="bg-primary p-6 mx-56 my-12 drop-shadow-lg">
                <h2 className="text-3xl pb-6">About the Developers</h2>
                <div className="flex md:flex-row flex-col gap-12">
                <div>
                    <div>
                        <img className="rounded-full mx-auto pb-4" src="http://placekitten.com/200/300" alt=""/>
                    </div>
                    <p className="">This is an about me. This is an about me. THis is an about me.</p>
                </div>
                <div>
                    <div>
                        <img className="rounded-full mx-auto pb-4" src="http://placekitten.com/200/300" alt=""/>
                    </div>
                    <p className="">This is an about me. This is an about me. THis is an about me.</p>
                </div>
                <div>
                    <div>
                        <img className="rounded-full mx-auto pb-4" src="http://placekitten.com/200/300" alt=""/>
                    </div>
                    <p className="">This is an about me. This is an about me. THis is an about me.</p>
                </div>
                </div>
            </section>
        </>
    )
}
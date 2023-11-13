export default function About() {
    return (
        <>
            <section className="bg-primary p-6 mx-56 my-12 drop-shadow-lg">
                <h1 className="text-3xl">About the Project</h1>
                <div className="p-6 text-lg">
                    <p>
                        Urban Orchard was created as a capstone project for CNM Ingenuity's Deep Dive Full Stack bootcamp. With this project we hope to not only make fruit more accessible to the public but also to reduce food waste by allowing community members to identify publicly available fruit.
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
                        <h2 className="text-neutral font-semibold">Nic Crow, MBA, DASM</h2>
                        <p className="">Nic is an experienced project manager and junior developer </p>
                    </div>
                    <div>
                        <div>
                            <img className="rounded-full mx-auto pb-4" src="http://placekitten.com/200/300" alt=""/>
                        </div>
                        <h2 className="text-neutral font-semibold">Jordan DeRaad</h2>
                        <p className="">Jordan is a passionate marketing and media professional with a vision for starting a marketing and communications company focused on the aerospace division in New Mexico. He has experience in web development, video editing, and social media marketing. Jordan is eager to help aerospace companies in New Mexico reach their marketing and communications goals.
                        </p>
                    </div>
                    <div>
                        <div>
                            <img className="rounded-full mx-auto pb-4" src="http://placekitten.com/200/300" alt=""/>
                        </div>
                        <h2 className="text-neutral font-semibold">Rashaan Marrow</h2>
                        <p className="">Rashaan is a dedicated developer and beyond that she is a blogger with a passion for creating visually appealing and functional websites. Rashaan excels in both web development and design, showcasing a keen eye for aesthetics and user experience. Rashaan extends creativity to the digital realm by maintaining an engaging blog. Rashaan is happy to make a lasting impact in the dynamic world of web development.</p>
                    </div>
                </div>
            </section>
        </>
    )
}